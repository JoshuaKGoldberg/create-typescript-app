import { createSoloWorkflowFile } from "../../steps/writing/creation/dotGitHub/createSoloWorkflowFile.js";
import { schema } from "../schema.js";

export const blockPRCompliance = schema.createBlock({
	about: {
		name: "PR Compliance",
	},
	async produce() {
		return {
			files: {
				".github": {
					workflows: {
						"compliance.yml": await createSoloWorkflowFile({
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
