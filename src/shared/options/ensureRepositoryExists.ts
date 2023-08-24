import * as prompts from "@clack/prompts";
import { Octokit } from "octokit";

import { doesRepositoryExist } from "../doesRepositoryExist.js";
import { handleCancel, handlePromptCancel } from "../prompts.js";
import { InputValues } from "./readOptions.js";

export type EnsureRepositoryExistsValues = Pick<
	InputValues,
	"createRepository" | "owner" | "repository"
>;

export interface RepositoryExistsResult {
	octokit: Octokit | undefined;
	repository: string;
}

export async function ensureRepositoryExists(
	octokit: Octokit | undefined,
	values: EnsureRepositoryExistsValues,
): Promise<RepositoryExistsResult> {
	// We'll only respect input options once before prompting for them
	let { createRepository, repository } = values;

	// We'll continuously pester the user for a repository
	// until they bail, create a new one, or it exists.
	while (octokit) {
		if (await doesRepositoryExist(octokit, values)) {
			return { octokit, repository };
		}

		const selection = createRepository
			? "create"
			: handlePromptCancel(
					(await prompts.select({
						message: `Repository ${values.repository} doesn't seem to exist under ${values.owner}. What would you like to do?`,
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
				handleCancel();
				break;

			case "create":
				await octokit.rest.repos.createUsingTemplate({
					name: repository,
					owner: values.owner,
					template_owner: "JoshuaKGoldberg",
					template_repo: "template-typescript-node-package",
				});
				return { octokit, repository };

			case "different":
				const newRepository = handlePromptCancel(
					await prompts.text({
						message: `What would you like to call the repository?`,
					}),
				);

				repository = newRepository;
				break;

			case "local":
				octokit = undefined;
				break;
		}
	}

	return { octokit, repository };
}
