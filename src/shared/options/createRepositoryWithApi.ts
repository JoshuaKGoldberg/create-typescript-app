import { Octokit } from "octokit";

export interface CreateRepositoryWithApiOptions {
	owner: string;
	preserveGeneratedFrom?: boolean;
	repository: string;
}

export async function createRepositoryWithApi(
	octokit: Octokit,
	options: CreateRepositoryWithApiOptions,
) {
	if (options.preserveGeneratedFrom) {
		await octokit.rest.repos.createUsingTemplate({
			name: options.repository,
			owner: options.owner,
			template_owner: "JoshuaKGoldberg",
			template_repo: "create-typescript-app",
		});
		return;
	}

	const currentUser = await octokit.rest.users.getAuthenticated();

	try {
		if (currentUser.data.login === options.owner) {
			await octokit.rest.repos.createForAuthenticatedUser({
				name: options.repository,
			});
		} else {
			await octokit.rest.repos.createInOrg({
				name: options.repository,
				org: options.owner,
			});
		}
	} catch (error) {
		throw new Error("Failed to create new repository on GitHub.", {
			cause: error,
		});
	}
}
