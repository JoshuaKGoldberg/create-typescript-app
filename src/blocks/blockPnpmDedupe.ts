import { base } from "../base.js";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.js";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.js";
import { blockPackageJson } from "./blockPackageJson.js";

export const blockPnpmDedupe = base.createBlock({
	about: {
		name: "pnpm Dedupe",
	},
	produce() {
		return {
			addons: [
				blockDevelopmentDocs({
					sections: {
						Linting: {
							contents: {
								items: [
									`- \`pnpm lint:packages\` ([pnpm dedupe --check](https://pnpm.io/cli/dedupe)): Checks for unnecessarily duplicated packages in the \`pnpm-lock.yml\` file`,
								],
							},
						},
					},
				}),
				blockGitHubActionsCI({
					jobs: [
						{
							name: "Lint Packages",
							steps: [{ run: "pnpm lint:packages" }],
						},
					],
				}),
				blockPackageJson({
					cleanupCommands: ["pnpm dedupe --offline"],
					properties: {
						scripts: {
							"lint:packages": "pnpm dedupe --check",
						},
					},
				}),
			],
		};
	},
});
