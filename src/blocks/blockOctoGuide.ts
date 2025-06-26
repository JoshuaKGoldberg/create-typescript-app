import { z } from "zod";

import { base } from "../base.js";
import { resolveUses } from "./actions/resolveUses.js";
import { intakeFileYamlSteps } from "./actions/steps.js";
import { blockRemoveFiles } from "./blockRemoveFiles.js";
import { createSoloWorkflowFile } from "./files/createSoloWorkflowFile.js";

export const blockOctoGuide = base.createBlock({
	about: {
		name: "OctoGuide",
	},
	addons: {
		config: z.union([z.literal("recommended"), z.literal("strict")]).optional(),
	},
	intake({ files }) {
		const steps = intakeFileYamlSteps(
			files,
			[".github", "workflows", "octoguide.yml"],
			["jobs", "octoguide", "steps"],
		);
		if (!steps) {
			return undefined;
		}

		const runOctoGuideStep = steps.find(
			(step) =>
				typeof step.uses === "string" &&
				step.uses.startsWith("JoshuaKGoldberg/octoguide"),
		);
		if (!runOctoGuideStep) {
			return undefined;
		}

		return {
			config: runOctoGuideStep.with?.config as
				| "recommended"
				| "strict"
				| undefined,
		};
	},
	produce({ addons, options }) {
		return {
			files: {
				".github": {
					workflows: {
						"octoguide.yml": createSoloWorkflowFile({
							if: "${{ !endsWith(github.actor, '[bot]') }}",
							name: "OctoGuide",
							on: {
								discussion: {
									types: ["created", "edited"],
								},
								discussion_comment: {
									types: ["created", "deleted", "edited"],
								},
								issue_comment: {
									types: ["created", "deleted", "edited"],
								},
								issues: {
									types: ["edited", "opened"],
								},
								pull_request_review_comment: {
									types: ["created", "deleted", "edited"],
								},
								pull_request_target: {
									types: ["edited", "opened"],
								},
							},
							permissions: {
								discussions: "write",
								issues: "write",
								"pull-requests": "write",
							},
							steps: [
								{
									uses: resolveUses(
										"JoshuaKGoldberg/octoguide",
										"0.11.1",
										options.workflowsVersions,
									),
									with: {
										config: addons.config ?? "recommended",
										"github-token": "${{ secrets.GITHUB_TOKEN }}",
									},
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
					files: [
						".github/workflows/accessibility-alt-text-bot.yml",
						".github/workflows/compliance.yml",
					],
				}),
			],
		};
	},
});
