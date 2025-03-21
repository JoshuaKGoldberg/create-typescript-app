import { base } from "../base.js";
import { blockESLint } from "./blockESLint.js";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.js";
import { blockPackageJson } from "./blockPackageJson.js";
import { blockRemoveDependencies } from "./blockRemoveDependencies.js";

export const blockESLintPackageJson = base.createBlock({
	about: {
		name: "ESLint package.json Plugin",
	},
	produce() {
		return {
			addons: [
				blockESLint({
					extensions: ["packageJson.configs.recommended"],
					imports: [
						{
							source: "eslint-plugin-package-json",
							specifier: "packageJson",
						},
					],
				}),
				blockGitHubActionsCI({
					removedWorkflows: ["lint-package-json"],
				}),
				blockPackageJson({
					properties: {
						scripts: {
							"lint:package-json": undefined,
						},
					},
				}),
				blockRemoveDependencies({
					dependencies: [
						"npm-package-json-lint",
						"npm-package-json-lint-config-default",
					],
				}),
			],
		};
	},
});
