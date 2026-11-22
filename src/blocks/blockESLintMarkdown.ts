import { base } from "../base.ts";
import { blockESLint } from "./blockESLint.ts";
import { blockPackageJson } from "./blockPackageJson.ts";
import { blockRemoveDependencies } from "./blockRemoveDependencies.ts";
import { blockRemoveFiles } from "./blockRemoveFiles.ts";
import { blockRemoveWorkflows } from "./blockRemoveWorkflows.ts";

export const blockESLintMarkdown = base.createBlock({
	about: {
		name: "ESLint Markdown Plugin",
	},
	produce() {
		return {
			extensions: [
				blockESLint({
					extensions: [
						{
							extends: ["markdown.configs.recommended"],
							files: ["**/*.md"],
							rules: [
								{
									comment: "https://github.com/eslint/markdown/issues/294",
									entries: {
										"markdown/no-missing-label-refs": "off",
									},
								},
							],
						},
					],
					imports: [
						{
							source: "@eslint/markdown",
							specifier: "markdown",
						},
					],
				}),
				blockRemoveDependencies({
					dependencies: [
						"@types/eslint-plugin-markdown",
						"eslint-plugin-markdown",
						"markdownlint",
						"markdownlint-cli",
						"markdownlint-sentences-per-line",
						"sentences-per-line",
					],
				}),
				blockRemoveFiles({
					files: [".markdownlint*", ".markdownlintignore"],
				}),
				blockRemoveWorkflows({
					workflows: ["lint_markdown", "lint_md"],
				}),
			],
		};
	},
	transition({ options }) {
		// Older versions of this template ran Markdownlint in a lint:md script
		if (
			!options.packageData?.scripts?.["lint:md"]?.startsWith("markdownlint")
		) {
			return {};
		}

		return {
			extensions: [
				blockPackageJson({
					properties: {
						scripts: {
							"lint:md": undefined,
						},
					},
				}),
			],
		};
	},
});
