import { z } from "zod";

import { base } from "../base.ts";
import { resolveUses } from "./actions/resolveUses.ts";
import { zActionStep } from "./actions/steps.ts";
import { blockRemoveFiles } from "./blockRemoveFiles.ts";
import { blockRepositoryBranchRuleset } from "./blockRepositoryBranchRuleset.ts";
import {
	createMultiWorkflowFile,
	zMultiWorkflowJobPermissions,
} from "./files/createMultiWorkflowFile.ts";
import { createSoloWorkflowFile } from "./files/createSoloWorkflowFile.ts";
import { formatYaml } from "./files/formatYaml.ts";
import { withPreviously } from "./files/withPreviously.ts";

export const blockGitHubActionsCI = base.createBlock({
	about: {
		name: "GitHub Actions CI",
	},
	addons: {
		jobs: z
			.array(
				z.object({
					checkoutWith: z.record(z.string(), z.string()).optional(),
					if: z.string().optional(),
					name: z.string(),
					permissions: zMultiWorkflowJobPermissions.optional(),
					steps: z.array(zActionStep),
				}),
			)
			.optional(),
	},
	produce({ addons, options }) {
		const { jobs } = addons;
		const minimumNodeVersion = options.node.minimum
			.replace(/^\D*/u, "")
			.split(/[^\d.]/u, 1)[0];
		const jobsWithEnginesCheck =
			jobs &&
			[
				...jobs,
				{
					name: "Engines Check",
					steps: [
						{
							uses: resolveUses(
								"actions/setup-node",
								"v4",
								options.workflowsVersions,
							),
							with: {
								cache: "pnpm",
								"node-version": minimumNodeVersion,
							},
						},
						{ run: "pnpm install --prod --engine-strict --ignore-scripts" },
					],
				},
			].toSorted((a, b) => a.name.localeCompare(b.name));
		const prReviewLabelsUses = resolveUses(
			"JoshuaKGoldberg/pr-review-labels-action",
			"v0.1.0",
			options.workflowsVersions,
		);

		return {
			addons: [
				blockRepositoryBranchRuleset({
					requiredStatusChecks: jobsWithEnginesCheck?.map((job) => job.name),
				}),
			],
			files: {
				".github": {
					actions: {
						prepare: {
							"action.yaml": withPreviously(
								formatYaml({
									description: "Prepares the repo for a typical CI job",
									name: "Setup",
									runs: {
										steps: [
											{
												uses: resolveUses(
													"pnpm/action-setup",
													"v4",
													options.workflowsVersions,
												),
											},
											{
												uses: resolveUses(
													"actions/setup-node",
													"v4",
													options.workflowsVersions,
												),
												with: {
													cache: "pnpm",
													"node-version": "lts/*",
												},
											},
											{
												run: "pnpm install --frozen-lockfile",
												shell: "bash",
											},
										],
										using: "composite",
									},
								}),
								["action.yml"],
							),
						},
					},
					workflows: {
						"ci.yaml": withPreviously(
							jobsWithEnginesCheck &&
								createMultiWorkflowFile({
									jobs: jobsWithEnginesCheck,
									name: "CI",
									workflowsVersions: options.workflowsVersions,
								}),
							["ci.yml"],
						),
						"pr-review-labels.yaml": withPreviously(
							createSoloWorkflowFile({
								name: "PR Review Labels",
								on: {
									pull_request_target: {
										types: ["review_requested"],
									},
									workflow_run: {
										types: ["completed"],
										workflows: ["PR Review Submitted"],
									},
								},
								permissions: {
									actions: "read",
									"pull-requests": "write",
								},
								steps: [{ uses: prReviewLabelsUses }],
							}),
							["pr-review-requested.yaml", "pr-review-requested.yml"],
						),
						"pr-review-submitted.yaml": createSoloWorkflowFile({
							name: "PR Review Submitted",
							on: {
								pull_request_review: {
									types: ["submitted"],
								},
							},
							permissions: {},
							steps: [{ uses: prReviewLabelsUses }],
						}),
					},
				},
			},
		};
	},
	transition() {
		return {
			addons: [
				blockRemoveFiles({
					files: [".circleci", ".github/workflows/ci.yml", "travis.{yaml,yml}"],
				}),
			],
		};
	},
});
