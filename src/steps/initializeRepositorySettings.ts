import { Octokit } from "octokit";

import { InputValues } from "../shared/inputs.js";

type MigrateRepositoryValues = Pick<
	InputValues,
	"description" | "owner" | "repository"
>;

export async function initializeRepositorySettings(
	octokit: Octokit,
	{ description, owner, repository }: MigrateRepositoryValues,
) {
	console.log("Will update repo settings");
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
		security_and_analysis: {
			secret_scanning: {
				status: "enabled",
			},
			secret_scanning_push_protection: {
				status: "enabled",
			},
		},
		squash_merge_commit_message: "PR_BODY",
		squash_merge_commit_title: "PR_TITLE",
	});
}