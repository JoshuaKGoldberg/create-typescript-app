import type { CreatedOctokitRequest } from "bingo-requests";

import { z } from "zod";

import { base, BaseOptions } from "../base.js";

export const blockRepositoryBranchRuleset = base.createBlock({
	about: {
		name: "Repository Branch Ruleset",
	},
	addons: {
		requiredStatusChecks: z.array(z.string()).optional(),
	},
	setup({ addons, options }) {
		return {
			requests: [
				{
					endpoint: "POST /repos/{owner}/{repo}/rulesets",
					parameters: createRulesetParameters(
						addons.requiredStatusChecks,
						options,
					),
					type: "octokit",
				},
			],
		};
	},
	transition({ addons, options }) {
		return {
			requests: [
				options.rulesetId
					? {
							endpoint: "PUT /repos/{owner}/{repo}/rulesets/{ruleset_id}",
							parameters: createRulesetParameters(
								addons.requiredStatusChecks,
								options,
								options.rulesetId,
							),
							type: "octokit",
						}
					: {
							endpoint: "POST /repos/{owner}/{repo}/rulesets",
							parameters: createRulesetParameters(
								addons.requiredStatusChecks,
								options,
							),
							type: "octokit",
						},
			],
		};
	},
	// TODO: Make produce() optional, so this empty-ish produce() can be removed
	// https://github.com/JoshuaKGoldberg/bingo/issues/295
	produce() {
		return {};
	},
});

function createRulesetParameters(
	contexts: string[] | undefined,
	options: BaseOptions,
	rulesetId?: string,
) {
	return {
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
					required_status_checks:
						contexts?.map((context) => ({
							context,
						})) ?? [],
					strict_required_status_checks_policy: false,
				},
				type: "required_status_checks",
			},
		],
		ruleset_id: rulesetId === undefined ? rulesetId : Number(rulesetId),
		target: "branch",
	} satisfies CreatedOctokitRequest["parameters"];
}
