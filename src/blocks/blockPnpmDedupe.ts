import { base } from "../base.ts";
import { blockCSpell } from "./blockCSpell.ts";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.ts";
import { blockPackageJson } from "./blockPackageJson.ts";
import { blockPrettier } from "./blockPrettier.ts";
import { blockRemoveWorkflows } from "./blockRemoveWorkflows.ts";

export const blockPnpmDedupe = base.createBlock({
	about: {
		name: "pnpm Dedupe",
	},
	produce() {
		return {
			extensions: [
				blockCSpell({
					ignorePaths: ["/_tmp_*"],
				}),
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
				blockPrettier({
					ignores: ["/_tmp_*"],
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
