import { base } from "../base.js";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.js";
import { blockPackageJson } from "./blockPackageJson.js";
import { blockRemoveWorkflows } from "./blockRemoveWorkflows.js";

export const blockPnpmDedupe = base.createBlock({
	about: {
		name: "pnpm Dedupe",
	},
	produce() {
		return {
			addons: [
				blockGitHubActionsCI({
					jobs: [
						{
							name: "Dedupe Check",
							steps: [{ run: "pnpm dedupe --check" }],
						},
					],
				}),
				blockPackageJson({
					cleanupCommands: ["pnpm dedupe"],
				}),
			],
		};
	},
	transition() {
		return {
			addons: [
				blockRemoveWorkflows({
					workflows: ["lint-packages"],
				}),
			],
		};
	},
});
