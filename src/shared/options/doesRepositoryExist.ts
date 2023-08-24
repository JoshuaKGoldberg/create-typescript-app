import { Octokit, RequestError } from "octokit";

export interface DoesRepositoryExistOptions {
	owner: string;
	repository: string;
}

export async function doesRepositoryExist(
	octokit: Octokit,
	options: DoesRepositoryExistOptions,
) {
	// Because the Octokit SDK throws on 404s (😡),
	// we try/catch to check whether the repo exists.
	try {
		await octokit.rest.repos.get({
			owner: options.owner,
			repo: options.repository,
		});
		return true;
	} catch (error) {
		if ((error as RequestError).status !== 404) {
			throw error;
		}

		return false;
	}
}
