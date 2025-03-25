import { base } from "../base.js";
import { resolveUses } from "./actions/resolveUses.js";
import { createSoloWorkflowFile } from "./files/createSoloWorkflowFile.js";

export const blockPRCompliance = base.createBlock({
	about: {
		name: "PR Compliance",
	},
	produce({ options }) {
		return {
			files: {
				".github": {
					workflows: {
						"compliance.yml": createSoloWorkflowFile({
							name: "Compliance",
							on: {
								pull_request: {
									branches: ["main"],
									types: ["edited", "opened", "reopened", "synchronize"],
								},
							},
							permissions: {
								"pull-requests": "write",
							},
							steps: [
								{
									uses: resolveUses(
										"mtfoley/pr-compliance-action",
										"main",
										options.workflowsVersions,
									),
									with: {
										"body-auto-close": false,
										"ignore-authors": [
											"allcontributors",
											"allcontributors[bot]",
											"renovate",
											"renovate[bot]",
										].join("\n"),
										"ignore-team-members": false,
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
