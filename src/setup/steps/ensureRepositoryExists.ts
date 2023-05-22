import * as prompts from "@clack/prompts";
import { RequestError } from "@octokit/request-error";
import { Octokit } from "octokit";

import { handleCancel, handlePromptCancel } from "../cli/prompts.js";

export async function ensureRepositoryExists(
	octokit: Octokit | undefined,
	owner: string,
	repository: string
) {
	if (!octokit) {
		return repository;
	}

	// We'll continuously pester the user for a repository
	// until they bail, create a new one, or it exists.
	while (true) {
		// Because the Octokit SDK throws on 404s (😡),
		// we try/catch to check whether the repo exists.
		try {
			await octokit.rest.repos.get({
				owner,
				repo: repository,
			});
			return repository;
		} catch (error) {
			if ((error as RequestError).status !== 404) {
				throw error;
			}
		}

		const selection = (await prompts.select({
			message: `Repository ${repository} doesn't seem to exist under ${owner}. What would you like to do?`,
			options: [
				{ label: "Bail out and maybe try again later", value: "bail" },
				{ label: "Create a new repository", value: "create" },
				{
					label: "Try again with a different repository",
					value: "different",
				},
			],
		})) as "bail" | "create" | "different";

		handlePromptCancel(selection);

		switch (selection) {
			case "bail":
				handleCancel();
				break;

			case "create":
				await octokit.rest.repos.createUsingTemplate({
					name: repository,
					owner,
					template_owner: "JoshuaKGoldberg",
					template_repo: "template-typescript-node-package",
				});
				break;

			case "different":
				const newRepository = await prompts.text({
					message: `What would you like to call the repository?`,
				});
				handlePromptCancel(newRepository);
				repository = newRepository;
				break;
		}
	}

	return repository;
}
