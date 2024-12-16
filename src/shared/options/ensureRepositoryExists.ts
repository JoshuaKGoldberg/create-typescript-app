import * as prompts from "@clack/prompts";
import { Octokit } from "octokit";

import { doesRepositoryExist } from "../doesRepositoryExist.js";
import { isUsingCreateEngine } from "../isUsingCreateEngine.js";
import { filterPromptCancel } from "../prompts.js";
import { Options } from "../types.js";
import { createRepositoryWithApi } from "./createRepositoryWithApi.js";

export type EnsureRepositoryExistsOptions = Pick<
	Options,
	"mode" | "owner" | "preserveGeneratedFrom" | "repository"
>;

export interface RepositoryExistsResult {
	octokit: Octokit | undefined;
	repository: string;
}

export async function ensureRepositoryExists(
	octokit: Octokit | undefined,
	options: EnsureRepositoryExistsOptions,
): Promise<Partial<RepositoryExistsResult>> {
	// We'll only respect input options once before prompting for them
	let { repository } = options;
	let createRepository = options.mode === "create";

	// We'll continuously pester the user for a repository
	// until they bail, create a new one, or it exists.
	while (octokit) {
		if (
			isUsingCreateEngine() ||
			(await doesRepositoryExist(octokit, options))
		) {
			return { octokit, repository };
		}

		const selection = createRepository
			? "create"
			: filterPromptCancel(
					(await prompts.select({
						message: `Repository ${options.repository} doesn't seem to exist under ${options.owner}. What would you like to do?`,
						options: [
							{ label: "Create a new repository", value: "create" },
							{
								label: "Switch to a different repository name",
								value: "different",
							},
							{
								label: "Keep changes local",
								value: "local",
							},
							{ label: "Bail out and maybe try again later", value: "bail" },
						],
					})) as "bail" | "create" | "different" | "local",
				);

		createRepository = false;

		switch (selection) {
			case "bail":
			case undefined:
				return {};

			case "create":
				await createRepositoryWithApi(octokit, {
					owner: options.owner,
					preserveGeneratedFrom: options.preserveGeneratedFrom,
					repository,
				});
				return { octokit, repository };

			case "different": {
				const newRepository = filterPromptCancel(
					await prompts.text({
						message: `What would you like to call the repository?`,
					}),
				);

				if (!newRepository) {
					return {};
				}

				repository = newRepository;
				break;
			}

			case "local":
				octokit = undefined;
				break;
		}
	}

	return { octokit, repository };
}
