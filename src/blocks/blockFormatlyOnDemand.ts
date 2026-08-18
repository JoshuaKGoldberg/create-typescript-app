import { z } from "zod";

import { base } from "../base.js";
import { resolveUses } from "./actions/resolveUses.js";
import { blockRepositorySecrets } from "./blockRepositorySecrets.js";
import { createCallerWorkflowFile } from "./files/createCallerWorkflowFile.js";
import { intakeFileAsYaml } from "./intake/intakeFileAsYaml.js";

interface FormatWorkflowYaml {
	jobs?: {
		format?: {
			secrets?: Record<string, string>;
			with?: Record<string, string>;
		};
	};
}

const detectWorkflowName = "Formatly on Demand Detect";

const version = "v0";

const workflowsRepository = "JoshuaKGoldberg/formatly-on-demand";

export const blockFormatlyOnDemand = base.createBlock({
	about: {
		name: "Formatly on Demand",
	},
	addons: {
		install: z.string().optional(),
		pushTokenSecret: z.string().optional(),
	},
	intake({ files }) {
		const workflow = intakeFileAsYaml(files, [
			".github",
			"workflows",
			"formatly-on-demand-format.yaml",
		]) as FormatWorkflowYaml | undefined;

		const job = workflow?.jobs?.format;

		if (!job) {
			return undefined;
		}

		return {
			install: job.with?.install,
			pushTokenSecret: /secrets\.(\w+)/.exec(
				job.secrets?.["push-token"] ?? "",
			)?.[1],
		};
	},
	produce({ addons, options }) {
		const {
			install = "corepack enable && pnpm install --frozen-lockfile",
			pushTokenSecret = "FORMATLY_ON_DEMAND_TOKEN",
		} = addons;

		const inputs = {
			install,
			"node-version": options.node.pinned ?? options.node.minimum,
		};

		const workflowUses = (workflow: string) =>
			resolveUses(
				`${workflowsRepository}/.github/workflows/${workflow}.yaml`,
				version,
				options.workflowsVersions,
			);

		return {
			addons: [
				blockRepositorySecrets({
					secrets: [
						{
							description:
								"a GitHub PAT with public_repo permissions, so formatting can be pushed to pull requests from forks",
							name: pushTokenSecret,
						},
					],
				}),
			],
			files: {
				".github": {
					workflows: {
						"formatly-on-demand-detect.yaml": createCallerWorkflowFile({
							jobName: "detect",
							name: detectWorkflowName,
							on: { pull_request: null },
							uses: workflowUses("detect"),
							with: inputs,
						}),
						"formatly-on-demand-format.yaml": createCallerWorkflowFile({
							jobName: "format",
							name: "Formatly on Demand Format",
							on: { issue_comment: { types: ["created"] } },
							permissions: {
								issues: "write",
								"pull-requests": "read",
							},
							secrets: {
								"push-token": `\${{ secrets.${pushTokenSecret} }}`,
							},
							uses: workflowUses("format"),
							with: inputs,
						}),
						"formatly-on-demand-offer.yaml": createCallerWorkflowFile({
							jobName: "offer",
							name: "Formatly on Demand Offer",
							on: {
								workflow_run: {
									types: ["completed"],
									workflows: [detectWorkflowName],
								},
							},
							permissions: {
								actions: "read",
								issues: "write",
								"pull-requests": "read",
							},
							uses: workflowUses("offer"),
						}),
					},
				},
			},
		};
	},
});
