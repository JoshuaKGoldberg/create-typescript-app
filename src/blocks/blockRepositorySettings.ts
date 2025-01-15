import * as htmlToText from "html-to-text";

import { base } from "../base.js";

export const blockRepositorySettings = base.createBlock({
	about: {
		name: "Repository Settings",
	},
	produce({ options }) {
		const description = htmlToText.convert(options.description);

		return {
			requests: [
				{
					id: "repository-settings",
					async send({ octokit }) {
						await octokit.rest.repos.update({
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
						});
					},
				},
			],
		};
	},
});
