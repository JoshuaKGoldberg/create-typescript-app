import { z } from "zod";

import { base } from "../base.ts";
import { createSoloWorkflowFile } from "./files/createSoloWorkflowFile.ts";

export const blockSlopUnlinkIssues = base.createBlock({
	about: {
		name: "Slop Unlink Issues",
	},
	addons: {
		labels: z.array(z.string()).default([]),
	},
	produce({ addons }) {
		const { labels } = addons;
		if (!labels.length) {
			return {};
		}

		const labelChecks = labels
			.toSorted()
			.map(
				(label) =>
					`contains(github.event.pull_request.labels.*.name, '${label}')`,
			)
			.join(" || ");

		return {
			files: {
				".github": {
					workflows: {
						"slop-unlink-issues.yaml": createSoloWorkflowFile({
							concurrency: {
								"cancel-in-progress": true,
								group: "${{ github.workflow }}-${{ github.event.number }}",
							},
							if: `github.event.pull_request.merged == false && (${labelChecks})`,
							name: "Slop Unlink Issues",
							on: {
								pull_request_target: {
									types: ["closed"],
								},
							},
							permissions: {
								"pull-requests": "write",
							},
							steps: [
								{
									env: {
										GH_TOKEN: "${{ secrets.GITHUB_TOKEN }}",
										PR: "${{ github.event.pull_request.number }}",
										REPO: "${{ github.repository }}",
									},
									name: "Unlink issues from slop PRs",
									// There's no API to unlink an issue from a PR,
									// so this replaces issue references in the PR body.
									run: `issues=$(gh pr view "$PR" --repo "$REPO" --json closingIssuesReferences --jq '.closingIssuesReferences[].number')

if [ -z "$issues" ]; then
  echo 'No linked issues.'
  exit 0
fi

echo "Unlinking: $issues"

body=$(gh pr view "$PR" --repo "$REPO" --json body --jq .body)

for issue in $issues; do
  body=$(printf '%s' "$body" | perl -pe "s/#$issue\\b/#~$issue~/g")
done

gh pr edit "$PR" --repo "$REPO" --body "$body"
`,
								},
							],
						}),
					},
				},
			},
		};
	},
});
