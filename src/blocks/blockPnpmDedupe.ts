import { base } from "../base.ts";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.ts";
import { blockPackageJson } from "./blockPackageJson.ts";
import { blockRemoveWorkflows } from "./blockRemoveWorkflows.ts";

export const blockPnpmDedupe = base.createBlock({
	about: {
		name: "pnpm Dedupe",
	},
	produce() {
		return {
			extensions: [
				blockGitHubActionsCI({
					jobs: [
						{
							name: "Dedupe Check",
							steps: [{ run: "pnpm dedupe --check" }],
						},
					],
				}),
				blockPackageJson({
					cleanupCommands: ["pnpm dedupe --prefer-offline"],
				}),
			],
		};
	},
	transition() {
		return {
			extensions: [
				blockRemoveWorkflows({
					workflows: ["lint-packages"],
				}),
			],
		};
	},
});
