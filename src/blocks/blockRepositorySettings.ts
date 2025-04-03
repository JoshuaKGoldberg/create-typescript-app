import { base } from "../base.js";
import { htmlToTextSafe } from "../utils/htmlToTextSafe.js";

export const blockRepositorySettings = base.createBlock({
	about: {
		name: "Repository Settings",
	},
	produce({ options }) {
		const description = htmlToTextSafe(options.description);

		return {
			requests: [
				{
					endpoint: "PATCH /repos/{owner}/{repo}",
					parameters: {
						allow_auto_merge: true,
						allow_merge_commit: false,
						allow_rebase_merge: false,
						allow_squash_merge: true,
						delete_branch_on_merge: true,
						description,
						has_wiki: false,
						owner: options.owner,
						repo: options.repository,
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
					},
					type: "octokit",
				},
			],
		};
	},
});
