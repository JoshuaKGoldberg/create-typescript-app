import { base } from "../base.mjs";
import { resolveUses } from "./actions/resolveUses.mjs";
import { intakeFileYamlSteps } from "./actions/steps.mjs";
import { blockRemoveFiles } from "./blockRemoveFiles.mjs";
import { createSoloWorkflowFile } from "./files/createSoloWorkflowFile.mjs";
import { z } from "zod";
//#region src/blocks/blockOctoGuide.ts
const blockOctoGuide = base.createBlock({
	about: { name: "OctoGuide" },
	addons: { config: z.union([z.literal("recommended"), z.literal("strict")]).optional() },
	intake({ files }) {
		const steps = intakeFileYamlSteps(files, [
			".github",
			"workflows",
			"octoguide.yaml"
		], [
			"jobs",
			"octoguide",
			"steps"
		]);
		if (!steps) return;
		const runOctoGuideStep = steps.find((step) => typeof step.uses === "string" && step.uses.startsWith("JoshuaKGoldberg/octoguide"));
		if (!runOctoGuideStep) return;
		return { config: runOctoGuideStep.with?.config };
	},
	produce({ addons, options }) {
		return { files: { ".github": { workflows: { "octoguide.yaml": createSoloWorkflowFile({
			if: "${{ !endsWith(github.actor, '[bot]') }}",
			name: "OctoGuide",
			on: {
				discussion: { types: ["created", "edited"] },
				discussion_comment: { types: [
					"created",
					"deleted",
					"edited"
				] },
				issue_comment: { types: [
					"created",
					"deleted",
					"edited"
				] },
				issues: { types: ["edited", "opened"] },
				pull_request_review_comment: { types: [
					"created",
					"deleted",
					"edited"
				] },
				pull_request_target: { types: ["edited", "opened"] }
			},
			permissions: {
				discussions: "write",
				issues: "write",
				"pull-requests": "write"
			},
			steps: [{
				uses: resolveUses("JoshuaKGoldberg/octoguide", "0.11.1", options.workflowsVersions),
				with: {
					config: addons.config ?? "recommended",
					"github-token": "${{ secrets.GITHUB_TOKEN }}"
				}
			}]
		}) } } } };
	},
	transition() {
		return { addons: [blockRemoveFiles({ files: [
			".github/workflows/accessibility-alt-text-bot.{yaml,yml}",
			".github/workflows/compliance.{yaml,yml}",
			".github/workflows/octoguide.yml"
		] })] };
	}
});
//#endregion
export { blockOctoGuide };
