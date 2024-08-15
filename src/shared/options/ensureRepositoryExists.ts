import * as prompts from "@clack/prompts";

import { doesRepositoryExist } from "../doesRepositoryExist.js";
import { filterPromptCancel } from "../prompts.js";
import { Options } from "../types.js";
import { createRepositoryWithApi } from "./createRepositoryWithApi.js";
import { GitHub } from "./getGitHub.js";

export type EnsureRepositoryExistsOptions = Pick<
	Options,
	"mode" | "owner" | "preserveGeneratedFrom" | "repository"
>;

export interface RepositoryExistsResult {
	github: GitHub | undefined;
	repository: string;
}

export async function ensureRepositoryExists(
	github: GitHub | undefined,
	options: EnsureRepositoryExistsOptions,
): Promise<Partial<RepositoryExistsResult>> {
	// We'll only respect input options once before prompting for them
	let { repository } = options;
	let createRepository = options.mode === "create";

	// We'll continuously pester the user for a repository
	// until they bail, create a new one, or it exists.
	while (github) {
		if (await doesRepositoryExist(github.octokit, options)) {
			return { github, repository };
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
			case undefined:
			case "bail":
				return {};

			case "create":
				await createRepositoryWithApi(github.octokit, {
					owner: options.owner,
					preserveGeneratedFrom: options.preserveGeneratedFrom,
					repository,
				});
				return { github, repository };

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
				github = undefined;
				break;
		}
	}

	return { github, repository };
}
