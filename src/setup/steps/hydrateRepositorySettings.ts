import { Octokit } from "octokit";

import { InputValues } from "../../shared/inputs.js";

type HydrateRepositoryValues = Pick<
	InputValues,
	"description" | "owner" | "repository"
>;

export async function hydrateRepositorySettings(
	octokit: Octokit,
	{ description, owner, repository }: HydrateRepositoryValues
) {
	await octokit.rest.repos.update({
		allow_auto_merge: true,
		allow_rebase_merge: false,
		allow_squash_merge: true,
		default_branch: "main",
		delete_branch_on_merge: true,
		description,
		has_wiki: false,
		owner,
		repo: repository,
		squash_merge_commit_message: "PR_BODY",
		squash_merge_commit_title: "PR_TITLE",
	});
}
