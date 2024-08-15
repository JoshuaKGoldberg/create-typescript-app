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
