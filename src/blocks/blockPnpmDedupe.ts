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
	transition({ options }) {
		return {
			extensions: [
				// Older versions of this template ran dedupe as a lint:packages script
				...(options.packageData?.scripts?.["lint:packages"] ===
				"pnpm dedupe --check"
					? [
							blockPackageJson({
								properties: {
									scripts: {
										"lint:packages": undefined,
									},
								},
							}),
						]
					: []),
				blockRemoveWorkflows({
					workflows: ["lint-packages"],
				}),
			],
		};
	},
});
