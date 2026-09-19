import { base } from "../base.ts";
import { blockESLint } from "./blockESLint.ts";
import { blockPackageJson } from "./blockPackageJson.ts";
import { blockRemoveDependencies } from "./blockRemoveDependencies.ts";
import { blockRemoveFiles } from "./blockRemoveFiles.ts";
import { blockRemoveWorkflows } from "./blockRemoveWorkflows.ts";

export const blockESLintPackageJson = base.createBlock({
	about: {
		name: "ESLint package.json Plugin",
	},
	produce() {
		return {
			addons: [
				blockESLint({
					extensions: [
						{
							extends: [
								"packageJson.configs.recommended",
								"packageJson.configs.stylistic",
							],
							files: ["package.json"],
						},
					],
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
