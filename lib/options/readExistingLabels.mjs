import { inputFromOctokit } from "../inputs/inputFromOctokit.mjs";
import { githubDefaultLabels } from "github-default-labels";
//#region src/options/readExistingLabels.ts
async function readExistingLabels(take, getOwner, getRepository) {
	const [owner, repository] = await Promise.all([getOwner(), getRepository()]);
	const existingLabelsActual = owner && repository && await take(inputFromOctokit, {
		endpoint: "GET /repos/{owner}/{repo}/labels",
		options: {
			owner,
			repo: repository
		}
	});
	if (existingLabelsActual) return existingLabelsActual.map((label) => ({
		color: label.color,
		description: label.description,
		name: label.name
	}));
	return githubDefaultLabels;
}
//#endregion
export { readExistingLabels };
