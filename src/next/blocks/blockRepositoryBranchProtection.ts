import { z } from "zod";

import { base } from "../base.js";

export const blockRepositoryBranchProtection = base.createBlock({
	about: {
		name: "Repository Branch Protection",
	},
	addons: {
		requiredStatusChecks: z.array(z.string()).default([]),
	},
	produce({ addons, options }) {
		return {
			requests: [
				{
					id: "branch-protection",
					async send({ octokit }) {
						await octokit.request(
							`PUT /repos/{owner}/{repo}/branches/{branch}/protection`,
							{
								allow_deletions: false,
								allow_force_pushes: true,
								allow_fork_pushes: false,
								allow_fork_syncing: true,
								block_creations: false,
								branch: "main",
								enforce_admins: false,
								owner: options.owner,
								repo: options.repository,
								required_conversation_resolution: true,
								required_linear_history: false,
								required_pull_request_reviews: null,
								required_status_checks: {
									contexts: addons.requiredStatusChecks,
									strict: true,
									// checks: addons.requiredStatusChecks.map((context) => ({
									// 	context,
									// })),
									// strict: false,
								},
								restrictions: null,
							},
						);
					},
				},
			],
		};
	},
});
