import { z } from "zod";

import { base } from "../base.ts";
import { resolveUses } from "./actions/resolveUses.ts";
import { zActionStep } from "./actions/steps.ts";
import { blockRemoveFiles } from "./blockRemoveFiles.ts";
import { blockRenovate } from "./blockRenovate.ts";
import { blockRepositoryBranchRuleset } from "./blockRepositoryBranchRuleset.ts";
import {
	getMatrixJobCheckNames,
	MatrixJob,
	withVersionComments,
	zMatrixJob,
} from "./ci/matrixJobs.ts";
import { createJobName } from "./files/createJobName.ts";
import {
	createMultiWorkflowFile,
	zMultiWorkflowJobPermissions,
} from "./files/createMultiWorkflowFile.ts";
import { createSoloWorkflowFile } from "./files/createSoloWorkflowFile.ts";
import { formatYaml } from "./files/formatYaml.ts";
import { groupParallelJobs } from "./files/groupParallelJobs.ts";
import { withPreviously } from "./files/withPreviously.ts";
import { intakeFileAsYaml } from "./intake/intakeFileAsYaml.ts";

export const blockGitHubActionsCI = base.createBlock({
	about: {
		name: "GitHub Actions CI",
	},
	intake({ files }) {
		const { data } = z
			.object({ jobs: z.record(z.string(), z.unknown()) })
			.safeParse(intakeFileAsYaml(files, [".github", "workflows", "ci.yaml"]));

		const existingMatrixJobs = Object.entries(data?.jobs ?? {}).flatMap(
			([id, job]): [string, MatrixJob][] => {
				const matrixJob = zMatrixJob.safeParse(job).data;
				return matrixJob ? [[id, matrixJob]] : [];
			},
		);

		return existingMatrixJobs.length
			? { existingMatrixJobs: Object.fromEntries(existingMatrixJobs) }
			: undefined;
	},
	produce({ options, props }) {
		const { existingMatrixJobs, jobs } = props;
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
								"v7",
								options.workflowsVersions,
								"949feb2413d6458794dcd2491c4babbbce0c15c1",
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
		const ciJobs =
			jobsWithEnginesCheck &&
			groupParallelJobs(
				jobsWithEnginesCheck.filter(
					(job) => !(createJobName(job.name) in existingMatrixJobs),
				),
			);
		const ciMatrixJobs = Object.fromEntries(
			(jobsWithEnginesCheck ?? []).flatMap((job) => {
				const id = createJobName(job.name);
				return id in existingMatrixJobs
					? [
							[
								id,
								withVersionComments(
									existingMatrixJobs[id],
									options.workflowsVersions,
								),
							],
						]
					: [];
			}),
		);
		const prReviewLabelsUses = resolveUses(
			"JoshuaKGoldberg/pr-review-labels-action",
			"v0.1.0",
			options.workflowsVersions,
			"fee8e8b7d88399731e77a567973876c50a054e6d",
		);

		return {
			extensions: [
				blockRepositoryBranchRuleset({
					requiredStatusChecks: ciJobs && [
						...ciJobs.map((job) => job.name),
						...Object.values(ciMatrixJobs).flatMap(getMatrixJobCheckNames),
					],
				}),
				...(ciJobs
					? [
							blockRenovate({
								packageRules: [
									{
										description:
											"The Engines Check job's Node.js version is the minimum from engines.node.",
										enabled: false,
										matchDepNames: ["node"],
										matchFileNames: [".github/workflows/ci.yaml"],
									},
								],
							}),
						]
					: []),
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
													"v6",
													options.workflowsVersions,
													"73e46992e05b19abd31f2f3c20e0e7370d762115",
												),
											},
											{
												uses: resolveUses(
													"actions/setup-node",
													"v7",
													options.workflowsVersions,
													"949feb2413d6458794dcd2491c4babbbce0c15c1",
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
							ciJobs &&
								createMultiWorkflowFile({
									jobs: ciJobs,
									matrixJobs: ciMatrixJobs,
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
	props: {
		existingMatrixJobs: z.record(z.string(), zMatrixJob).default({}),
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
	transition() {
		return {
			extensions: [
				blockRemoveFiles({
					files: [".circleci", ".github/workflows/ci.yml", "travis.{yaml,yml}"],
				}),
			],
		};
	},
});
