import { TakeInput } from "bingo";
import { githubDefaultLabels } from "github-default-labels";
import { OutcomeLabel } from "set-github-repository-labels";

import { inputFromOctokit } from "../inputs/inputFromOctokit.js";

export async function readExistingLabels(
	take: TakeInput,
	getOwner: () => Promise<string | undefined>,
	getRepository: () => Promise<string | undefined>,
) {
	const [owner, repository] = await Promise.all([getOwner(), getRepository()]);

	// When transitioning an existing repo, it should already have labels
	const existingLabelsActual =
		owner &&
		repository &&
		((await take(inputFromOctokit, {
			endpoint: "GET /repos/{owner}/{repo}/labels",
			options: {
				owner,
				repo: repository,
			},
		})) as OutcomeLabel[] | undefined);

	if (existingLabelsActual) {
		// The labels API includes more properties than we use
		return existingLabelsActual.map((label) => ({
			color: label.color,
			description: label.description,
			name: label.name,
		}));
	}

	// In setup mode, options evaluate before creating the repository.
	// We'd want the owner's defaults in case they've customized them...
	// ...except, GitHub doesn't have an API for this 🙁.
	// We instead go with the known default labels:
	return githubDefaultLabels;
}
