import { inputFromOctokit } from "../inputs/inputFromOctokit.mjs";
//#region src/options/readRulesetId.ts
async function readRulesetId(take, getOwner, getRepository) {
	return (await take(inputFromOctokit, {
		endpoint: "GET /repos/{owner}/{repo}/rulesets",
		options: {
			owner: await getOwner(),
			repo: await getRepository()
		}
	}))?.find((ruleset) => ruleset.name === "Branch protection for main")?.id;
}
//#endregion
export { readRulesetId };
