import { TakeInput } from "bingo";

import { inputFromOctokit } from "../inputs/inputFromOctokit.js";

export async function readRulesetId(
	take: TakeInput,
	getOwner: () => Promise<string | undefined>,
	getRepository: () => Promise<string | undefined>,
) {
	const rulesets = (await take(inputFromOctokit, {
		endpoint: "GET /repos/{owner}/{repo}/rulesets",
		options: {
			owner: await getOwner(),
			repo: await getRepository(),
		},
	})) as undefined | { id: string; name: string }[];

	return rulesets?.find(
		(ruleset) => ruleset.name === "Branch protection for main",
	)?.id;
}
