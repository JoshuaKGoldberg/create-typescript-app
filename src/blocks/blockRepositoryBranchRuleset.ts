import { BlockCreation } from "bingo-stratum";
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
		return createRequestSend(
			addons.requiredStatusChecks,
			"POST /repos/{owner}/{repo}/rulesets",
			options,
			"branch-ruleset-create",
			undefined,
		);
	},
	transition({ addons, options }) {
		return createRequestSend(
			addons.requiredStatusChecks,
			`PUT /repos/{owner}/{repo}/rulesets/{ruleset_id}`,
			options,
			"branch-ruleset-update",
			options.rulesetId,
		);
	},
	// TODO: Make produce() optional
	// This needs createBlock to be generic to know if block.produce({}) is ok
	produce() {
		return {};
	},
});

function createRequestSend(
	contexts: string[],
	endpoint: string,
	options: BaseOptions,
	requestId: string,
	rulesetId: string | undefined,
): Partial<BlockCreation<BaseOptions>> {
	return {
		requests: [
			{
				id: requestId,
				async send({ octokit }) {
					await octokit.request(endpoint, {
						bypass_actors: [
							{
								// This *seems* to be the Repository Admin role always?
								// https://github.com/github/rest-api-description/issues/4406
								actor_id: 5,
								actor_type: "RepositoryRole",
								bypass_mode: "always",
							},
						],
						conditions: {
							ref_name: {
								exclude: [],
								include: ["refs/heads/main"],
							},
						},
						enforcement: "active",
						name: "Branch protection for main",
						owner: options.owner,
						repo: options.repository,
						rules: [
							{ type: "deletion" },
							{
								parameters: {
									allowed_merge_methods: ["squash"],
									dismiss_stale_reviews_on_push: false,
									require_code_owner_review: false,
									require_last_push_approval: false,
									required_approving_review_count: 0,
									required_review_thread_resolution: false,
								},
								type: "pull_request",
							},
							{
								parameters: {
									required_status_checks: contexts.map((context) => ({
										context,
									})),
									strict_required_status_checks_policy: false,
								},
								type: "required_status_checks",
							},
						],
						ruleset_id: rulesetId,
						target: "branch",
					});
				},
			},
		],
	};
}
