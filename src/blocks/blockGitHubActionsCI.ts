import _ from "lodash";
import { z } from "zod";

import { base } from "../base.js";
import { resolveUses } from "./actions/resolveUses.js";
import { blockRemoveFiles } from "./blockRemoveFiles.js";
import { blockRepositoryBranchRuleset } from "./blockRepositoryBranchRuleset.js";
import { createMultiWorkflowFile } from "./files/createMultiWorkflowFile.js";
import { createSoloWorkflowFile } from "./files/createSoloWorkflowFile.js";
import { formatYaml } from "./files/formatYaml.js";
import { intakeFileAsYaml } from "./intake/intakeFileAsYaml.js";

export const zActionStep = z.intersection(
	z.object({
		env: z.record(z.string(), z.string()).optional(),
		if: z.string().optional(),
		with: z.record(z.string(), z.string()).optional(),
	}),
	z.union([z.object({ run: z.string() }), z.object({ uses: z.string() })]),
);

interface RunStep {
	uses?: unknown;
	with?: Record<string, string>;
}

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
		nodeVersion: z.union([z.number(), z.string()]).optional(),
	},
	intake({ files }) {
		const actionYml = intakeFileAsYaml(files, [
			".github",
			"actions",
			"prepare",
			"action.yml",
		]);
		if (!actionYml) {
			return;
		}

		const steps = _.get(actionYml, ["runs", "steps"]) as RunStep[] | undefined;
		if (!steps || !Array.isArray(steps)) {
			return undefined;
		}

		const setupNodeStep = steps.find(
			(step) =>
				typeof step.uses === "string" &&
				step.uses.startsWith("actions/setup-node"),
		);
		if (!setupNodeStep) {
			return undefined;
		}

		const nodeVersion = setupNodeStep.with?.["node-version"];
		if (!nodeVersion) {
			return undefined;
		}

		return { nodeVersion };
	},
	produce({ addons, options }) {
		const { jobs, nodeVersion = options.node.pinned ?? options.node.minimum } =
			addons;

		return {
			addons: [
				blockRepositoryBranchRuleset({
					requiredStatusChecks: jobs?.map((job) => job.name),
				}),
			],
			files: {
				".github": {
					actions: {
						prepare: {
							"action.yml": formatYaml({
								description: "Prepares the repo for a typical CI job",
								name: "Prepare",
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
												"node-version": nodeVersion,
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
						},
					},
					workflows: {
						"accessibility-alt-text-bot.yml": createSoloWorkflowFile({
							if: "${{ !endsWith(github.actor, '[bot]') }}",
							name: "Accessibility Alt Text Bot",
							on: {
								issue_comment: {
									types: ["created", "edited"],
								},
								issues: {
									types: ["edited", "opened"],
								},
								pull_request: {
									types: ["edited", "opened"],
								},
							},
							permissions: {
								issues: "write",
								"pull-requests": "write",
							},
							steps: [
								{
									uses: resolveUses(
										"github/accessibility-alt-text-bot",
										"v1.4.0",
										options.workflowsVersions,
									),
								},
							],
						}),
						"ci.yml":
							jobs &&
							createMultiWorkflowFile({
								jobs: jobs.sort((a, b) => a.name.localeCompare(b.name)),
								name: "CI",
								workflowsVersions: options.workflowsVersions,
							}),
						"pr-review-requested.yml": createSoloWorkflowFile({
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
					},
				},
			},
		};
	},
	transition() {
		return {
			addons: [
				blockRemoveFiles({
					files: [".circleci", "travis.yml"],
				}),
			],
		};
	},
});
