import { base } from "../base.js";
import { createSoloWorkflowFile } from "./files/createSoloWorkflowFile.js";

export const blockPRCompliance = base.createBlock({
	about: {
		name: "PR Compliance",
	},
	produce() {
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
									uses: "mtfoley/pr-compliance-action@main",
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
