import { z } from "zod";

import { base } from "../base.ts";
import { resolveUses } from "./actions/resolveUses.ts";
import { zActionStep } from "./actions/steps.ts";
import { blockRemoveFiles } from "./blockRemoveFiles.ts";
import { blockRepositoryBranchRuleset } from "./blockRepositoryBranchRuleset.ts";
import { createMultiWorkflowFile } from "./files/createMultiWorkflowFile.ts";
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
					steps: z.array(zActionStep),
				}),
			)
			.optional(),
	},
	produce({ addons, options }) {
		const { jobs } = addons;
		const minimumNodeVersion = options.node.minimum
			.replace(/^\D*/u, "")
			.split(/[^\d.]/u)[0];
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
						"pr-review-requested.yaml": withPreviously(
							createSoloWorkflowFile({
								name: "PR Review Requested",
								on: {
									pull_request_target: {
										types: ["review_requested"],
									},
								},
								permissions: {
									"pull-requests": "write",
								},
								steps: [
									{
										uses: resolveUses(
											"actions-ecosystem/action-remove-labels",
											"v1",
											options.workflowsVersions,
										),
										with: {
											labels: "status: waiting for author",
										},
									},
									{
										if: "failure()",
										run: 'echo "Don\'t worry if the previous step failed."\necho "See https://github.com/actions-ecosystem/action-remove-labels/issues/221."\n',
									},
								],
							}),
							["pr-review-requested.yml"],
						),
					},
				},
			},
		};
	},
	transition() {
		return {
			addons: [
				blockRemoveFiles({
					files: [".circleci", "travis.{yaml,yml}"],
				}),
			],
		};
	},
});
