import { RequestError } from "@octokit/request-error";
import { Octokit } from "octokit";

import { Options } from "../../shared/types.js";

export async function initializeBranchProtectionSettings(
	octokit: Octokit,
	options: Options,
) {
	try {
		await octokit.request(
			`PUT /repos/${options.owner}/${options.repository}/branches/main/protection`,
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
					checks: [
						{ context: "build" },
						{ context: "lint" },
						{ context: "prettier" },
						...(options.excludeCompliance ? [] : [{ context: "compliance" }]),
						...(options.excludeLintKnip ? [] : [{ context: "lint_knip" }]),
						...(options.excludeLintMd ? [] : [{ context: "lint_markdown" }]),
						...(options.excludeLintPackages
							? []
							: [{ context: "lint_packages" }]),
						...(options.excludeLintSpelling
							? []
							: [{ context: "lint_spelling" }]),
						...(options.excludeTests ? [] : [{ context: "test" }]),
					],
					strict: false,
				},
				restrictions: null,
			},
		);
	} catch (error) {
		if ((error as RequestError).status === 403) {
			return false;
		}

		throw error;
	}
}
