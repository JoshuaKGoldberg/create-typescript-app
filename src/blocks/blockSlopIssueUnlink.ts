import { z } from "zod";

import { base } from "../base.ts";
import { resolveUses } from "./actions/resolveUses.ts";
import { createSoloWorkflowFile } from "./files/createSoloWorkflowFile.ts";

export const blockSlopIssueUnlink = base.createBlock({
	about: {
		name: "Slop Issue Unlink",
	},
	addons: {
		labels: z.array(z.string()).default([]),
	},
	produce({ addons, options }) {
		const { labels } = addons;
		if (!labels.length) {
			return {};
		}

		return {
			files: {
				".github": {
					workflows: {
						"slop-issue-unlink.yaml": createSoloWorkflowFile({
							if: "${{ !github.event.pull_request.merged }}",
							name: "Slop Issue Unlink",
							on: {
								pull_request_target: {
									types: ["closed", "labeled"],
								},
							},
							permissions: {
								"pull-requests": "write",
							},
							steps: [
								{
									uses: resolveUses(
										"JoshuaKGoldberg/slop-issue-unlink-action",
										"v0.2.0",
										options.workflowsVersions,
									),
									with: {
										labels: labels.toSorted().join("\n"),
									},
								},
							],
						}),
					},
				},
			},
		};
	},
});
