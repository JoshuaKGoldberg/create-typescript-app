import { BlockWithAddons } from "bingo-stratum";
import { z } from "zod";

import { base, BaseOptions } from "../base.ts";
import { WorkflowsVersions } from "../schemas.ts";
import { resolveUses } from "./actions/resolveUses.ts";
import { agentScanLabels, blockAgentScan } from "./blockAgentScan.ts";
import { antiSlopFailureLabel, blockAntiSlop } from "./blockAntiSlop.ts";
import { blockZizmor } from "./blockZizmor.ts";
import { createSoloWorkflowFile } from "./files/createSoloWorkflowFile.ts";

const defaultLabels = [
	"agentscan:automated-account",
	"agentscan:community-flagged",
	"agentscan:mixed-signals",
	"suspected ai slop",
];

// Explicitly typed to break the type cycle with the blocks it adds steps to.
export const blockSlopIssueUnlink: BlockWithAddons<
	{ labels: string[] },
	BaseOptions
> = base.createBlock({
	about: {
		name: "Slop Issue Unlink",
	},
	addons: {
		labels: z.array(z.string()).default([]),
	},
	produce({ addons, options }) {
		if (!addons.labels.length) {
			return {};
		}

		const createStep = (labels: readonly string[]) =>
			createUnlinkStep(labels, options.workflowsVersions);

		return {
			// Closures made with GITHUB_TOKEN don't trigger other workflows,
			// so the actions that close slop also unlink in the same job.
			addons: [
				blockAgentScan({
					actionSteps: [createStep(agentScanLabels)],
				}),
				blockAntiSlop({
					actionSteps: [createStep([antiSlopFailureLabel])],
				}),
				blockZizmor({
					rules: {
						"dangerous-triggers": { ignore: ["slop-issue-unlink.yaml"] },
					},
				}),
			],
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
							steps: [createStep(addons.labels)],
						}),
					},
				},
			},
		};
	},
});

function createUnlinkStep(
	labels: readonly string[],
	workflowsVersions: undefined | WorkflowsVersions,
) {
	const sorted = labels.toSorted();
	const usesDefaultLabels =
		sorted.length === defaultLabels.length &&
		sorted.every((label, i) => label === defaultLabels[i]);

	return {
		uses: resolveUses(
			"JoshuaKGoldberg/slop-issue-unlink-action",
			"v0.3.0",
			workflowsVersions,
		),
		...(!usesDefaultLabels && {
			with: {
				labels: sorted.join("\n"),
			},
		}),
	};
}
