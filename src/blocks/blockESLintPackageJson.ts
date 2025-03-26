import { base } from "../base.js";
import { blockESLint } from "./blockESLint.js";
import { blockPackageJson } from "./blockPackageJson.js";
import { blockRemoveDependencies } from "./blockRemoveDependencies.js";
import { blockRemoveFiles } from "./blockRemoveFiles.js";
import { blockRemoveWorkflows } from "./blockRemoveWorkflows.js";

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
				blockPackageJson({
					properties: {
						scripts: {
							"lint:package-json": undefined,
						},
					},
				}),
			],
		};
	},
	transition() {
		return {
			addons: [
				blockRemoveFiles({
					files: [".npmpackagejsonlintrc*"],
				}),
				blockRemoveDependencies({
					dependencies: [
						"npm-package-json-lint",
						"npm-package-json-lint-config-default",
					],
				}),
				blockRemoveWorkflows({
					workflows: ["lint-package-json"],
				}),
			],
		};
	},
});
