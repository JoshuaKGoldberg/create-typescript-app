import { z } from "zod";

import { base, BaseOptions } from "../base.js";

export const blockRepositoryBranchRuleset = base.createBlock({
	about: {
		name: "Repository Branch Ruleset",
	},
	addons: {
		requiredStatusChecks: z.array(z.string()).default([]),
	},
	setup({ addons, options }) {
		return {
			requests: [
				{
					id: "branch-ruleset-create",
					async send({ octokit }) {
						await octokit.request(
							"POST /repos/{owner}/{repo}/rulesets",
							createInnerSend(addons.requiredStatusChecks, options),
						);
					},
				},
			],
		};
	},
	transition({ addons, options }) {
		return {
			requests: [
				{
					id: "branch-ruleset-update",
					async send({ octokit }) {
						if (options.rulesetId) {
							await octokit.request(
								`PUT /repos/{owner}/{repo}/rulesets/{ruleset_id}`,
								createInnerSend(
									addons.requiredStatusChecks,
									options,
									options.rulesetId,
								),
							);
						} else {
							await octokit.request(
								`POST /repos/{owner}/{repo}/rulesets/{ruleset_id}`,
								createInnerSend(addons.requiredStatusChecks, options),
							);
						}
					},
				},
			],
		};
	},
	// TODO: Make produce() optional
	// This needs createBlock to be generic to know if block.produce({}) is ok
	produce() {
		return {};
	},
});

function createInnerSend(
	contexts: string[],
	options: BaseOptions,
	rulesetId?: string,
) {
	return {
		bypass_actors: [
			{
				// This *seems* to be the Repository Admin role always?
				// https://github.com/github/rest-api-description/issues/4406
				actor_id: 5,
				actor_type: "RepositoryRole" as const,
				bypass_mode: "always" as const,
			},
		],
		conditions: {
			ref_name: {
				exclude: [],
				include: ["refs/heads/main"],
			},
		},
		enforcement: "active" as const,
		name: "Branch protection for main",
		owner: options.owner,
		repo: options.repository,
		rules: [
			{ type: "deletion" as const },
			{
				parameters: {
					allowed_merge_methods: ["squash"],
					dismiss_stale_reviews_on_push: false,
					require_code_owner_review: false,
					require_last_push_approval: false,
					required_approving_review_count: 0,
					required_review_thread_resolution: false,
				},
				type: "pull_request" as const,
			},
			{
				parameters: {
					required_status_checks: contexts.map((context) => ({
						context,
					})),
					strict_required_status_checks_policy: false,
				},
				type: "required_status_checks" as const,
			},
		],
		// Type fun because the GitHub Octokit APIs don't provide named types...
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		ruleset_id: (rulesetId === undefined ? rulesetId : Number(rulesetId))!,
		target: "branch" as const,
	};
}
