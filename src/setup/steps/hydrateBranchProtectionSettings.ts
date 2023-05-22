import { RequestError } from "@octokit/request-error";
import { Octokit } from "octokit";

import { InputValues } from "../settings/inputs.js";

export async function hydrateBranchProtectionSettings(
	octokit: Octokit,
	{ owner, repository }: Pick<InputValues, "owner" | "repository">
) {
	try {
		await octokit.request(
			`PUT /repos/${owner}/${repository}/branches/main/protection`,
			{
				allow_deletions: false,
				allow_force_pushes: true,
				allow_fork_pushes: false,
				allow_fork_syncing: true,
				block_creations: false,
				branch: "main",
				enforce_admins: false,
				owner,
				repo: repository,
				required_conversation_resolution: true,
				required_linear_history: false,
				required_pull_request_reviews: null,
				required_status_checks: {
					checks: [
						{ context: "build" },
						{ context: "compliance" },
						{ context: "lint" },
						{ context: "lint_knip" },
						{ context: "lint_markdown" },
						{ context: "lint_package" },
						{ context: "lint_packages" },
						{ context: "lint_spelling" },
						{ context: "prettier" },
						{ context: "test" },
					],
					strict: false,
				},
				restrictions: null,
			}
		);
	} catch (error) {
		if ((error as RequestError).status === 403) {
			return false;
		}

		throw error;
	}
}
