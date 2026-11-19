import { base } from "../base.ts";
import { resolveUses } from "./actions/resolveUses.ts";
import { blockCSpell } from "./blockCSpell.ts";
import { createSoloWorkflowFile } from "./files/createSoloWorkflowFile.ts";

export const blockAntiSlop = base.createBlock({
	about: {
		name: "Anti-Slop",
	},
	produce({ options }) {
		return {
			addons: [
				blockCSpell({
					words: ["peakoss"],
				}),
			],
			files: {
				".github": {
					workflows: {
						"anti-slop.yaml": createSoloWorkflowFile({
							name: "Anti-Slop",
							on: {
								pull_request_target: {
									types: ["opened", "ready_for_review", "reopened"],
								},
							},
							permissions: {
								contents: "read",
								issues: "read",
								"pull-requests": "write",
							},
							steps: [
								{
									uses: resolveUses(
										"peakoss/anti-slop",
										"v0.3.0",
										options.workflowsVersions,
									),
									with: {
										"exempt-draft-prs": true,
										"failure-add-pr-labels": "suspected ai slop",
										"failure-pr-message": [
											"Thanks for the PR! This repository's automated PR quality checks flagged it as likely low-quality or AI-generated, so it's been closed.",
											"If you believe that's a mistake, please comment with more context and a maintainer will take a look.",
										].join(" "),
										"require-pr-template": true,
									},
								},
							],
						}),
					},
				},
			},
		};
	},
});
