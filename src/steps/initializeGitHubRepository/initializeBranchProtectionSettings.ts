import { RequestError } from "@octokit/request-error";
import { Octokit } from "octokit";

import { Options } from "../../shared/types.js";

export async function initializeBranchProtectionSettings(
	octokit: Octokit,
	options: Options,
) {
	try {
		await octokit.request("POST /repos/{owner}/{repo}/rulesets", {
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
						// @ts-expect-error -- https://github.com/github/rest-api-description/issues/4405
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
						required_status_checks: [
							{ context: "Build" },
							...(options.excludeCompliance ? [] : [{ context: "Compliance" }]),
							{ context: "Lint" },
							...(options.excludeLintKnip ? [] : [{ context: "Lint Knip" }]),
							...(options.excludeLintMd ? [] : [{ context: "Lint Markdown" }]),
							...(options.excludeLintPackages
								? []
								: [{ context: "Lint Packages" }]),
							...(options.excludeLintSpelling
								? []
								: [{ context: "Lint Spelling" }]),
							{ context: "Prettier" },
							...(options.excludeTests ? [] : [{ context: "Test" }]),
						],
						strict_required_status_checks_policy: false,
					},
					type: "required_status_checks",
				},
			],
			target: "branch",
		});
	} catch (error) {
		if ((error as RequestError).status === 403) {
			return false;
		}

		throw error;
	}
}
