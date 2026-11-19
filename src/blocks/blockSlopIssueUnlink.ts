import { z } from "zod";

import { base } from "../base.ts";
import { resolveUses } from "./actions/resolveUses.ts";
import { createSoloWorkflowFile } from "./files/createSoloWorkflowFile.ts";

const defaultLabels = [
	"agentscan:automated-account",
	"agentscan:community-flagged",
	"agentscan:mixed-signals",
	"suspected ai slop",
];

export const blockSlopIssueUnlink = base.createBlock({
	about: {
		name: "Slop Issue Unlink",
	},
	addons: {
		labels: z.array(z.string()).default([]),
	},
	produce({ addons, options }) {
		const labels = addons.labels.toSorted();
		if (!labels.length) {
			return {};
		}

		const usesDefaultLabels =
			labels.length === defaultLabels.length &&
			labels.every((label, i) => label === defaultLabels[i]);

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
									...(!usesDefaultLabels && {
										with: {
											labels: labels.join("\n"),
										},
									}),
								},
							],
						}),
					},
				},
			},
		};
	},
});
