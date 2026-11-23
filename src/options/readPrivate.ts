import { TakeInput } from "bingo";

import { inputFromOctokit } from "../inputs/inputFromOctokit.ts";

export async function readPrivate(
	take: TakeInput,
	getOwner: () => Promise<string | undefined>,
	getRepository: () => Promise<string | undefined>,
) {
	const [owner, repository] = await Promise.all([getOwner(), getRepository()]);
	if (!owner || !repository) {
		return undefined;
	}

	// In setup mode, options evaluate before creating the repository,
	// so this will only find repositories that already exist on GitHub.
	const data = (await take(inputFromOctokit, {
		endpoint: "GET /repos/{owner}/{repo}",
		options: {
			owner,
			repo: repository,
		},
	})) as undefined | { private?: boolean };

	return data?.private;
}
