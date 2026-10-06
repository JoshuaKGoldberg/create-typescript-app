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
						"pr-review-submitted.yaml": createSoloWorkflowFile({
							if: "github.event.review.state == 'changes_requested'",
							name: "PR Review Submitted",
							on: {
								pull_request_review: {
									types: ["submitted"],
								},
							},
							permissions: {},
							steps: [
								{
									env: {
										PR_NUMBER: "${{ github.event.pull_request.number }}",
									},
									run: 'echo "$PR_NUMBER" > pr-number',
								},
								{
									uses: resolveUses(
										"actions/upload-artifact",
										"v7",
										options.workflowsVersions,
									),
									with: {
										name: "pr-number",
										path: "pr-number",
										"retention-days": 1,
									},
								},
							],
						}),
						"pr-review-submitted-label.yaml": createSoloWorkflowFile({
							if: "github.event.workflow_run.event == 'pull_request_review' && github.event.workflow_run.conclusion == 'success'",
							name: "PR Review Submitted Label",
							on: {
								workflow_run: {
									types: ["completed"],
									workflows: ["PR Review Submitted"],
								},
							},
							permissions: {
								actions: "read",
								"pull-requests": "write",
							},
							steps: [
								{
									uses: resolveUses(
										"actions/download-artifact",
										"v8",
										options.workflowsVersions,
									),
									with: {
										"github-token": "${{ secrets.GITHUB_TOKEN }}",
										name: "pr-number",
										"run-id": "${{ github.event.workflow_run.id }}",
									},
								},
								{
									env: {
										GH_TOKEN: "${{ secrets.GITHUB_TOKEN }}",
										HEAD_SHA: "${{ github.event.workflow_run.head_sha }}",
									},
									run: [
										"pr_number=$(cat pr-number)",
										'if [[ ! "$pr_number" =~ ^[0-9]+$ ]]; then',
										'  echo "The pr-number artifact does not contain a PR number."',
										"  exit 1",
										"fi",
										'if [[ "$(gh api "repos/$GITHUB_REPOSITORY/pulls/$pr_number" --jq .head.sha)" != "$HEAD_SHA" ]]; then',
										`  echo "PR #$pr_number's head commit is not the reviewed commit, so it is not labeled."`,
										"  exit 0",
										"fi",
										'gh api "repos/$GITHUB_REPOSITORY/issues/$pr_number/labels" --silent -f "labels[]=status: waiting for author"',
										"",
									].join("\n"),
								},
							],
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
