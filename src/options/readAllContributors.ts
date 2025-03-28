import { TakeInput } from "bingo";
import { inputFromFileJSON } from "input-from-file-json";

import { startingOwnerContributions } from "../data/contributions.js";
import { inputFromOctokit } from "../inputs/inputFromOctokit.js";
import { AllContributorsData } from "../types.js";

export async function readAllContributors(take: TakeInput) {
	const contributions = (await take(inputFromFileJSON, {
		filePath: ".all-contributorsrc",
	})) as AllContributorsData | Error;

	if (!(contributions instanceof Error)) {
		return contributions.contributors;
	}

	const user = (await take(inputFromOctokit, {
		endpoint: "GET /user",
	})) as
		| undefined
		| { avatar_url: string; blog: string; login: string; name: string };

	return (
		user && [
			{
				avatar_url: user.avatar_url,
				contributions: startingOwnerContributions,
				login: user.login,
				name: user.name,
				profile: user.blog,
			},
		]
	);
}
