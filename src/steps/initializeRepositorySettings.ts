import { Octokit } from "octokit";

import { Options } from "../shared/types.js";

type InitializeRepositorySettings = Pick<
	Options,
	"description" | "owner" | "repository"
>;

export async function initializeRepositorySettings(
	octokit: Octokit,
	{ description, owner, repository }: InitializeRepositorySettings,
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
