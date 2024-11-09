import { blockAllContributors } from "./blocks/blockAllContributors.js";
import { blockContributingDocs } from "./blocks/blockContributingDocs.js";
import { blockContributorCovenant } from "./blocks/blockContributorCovenant.js";
import { blockCSpell } from "./blocks/blockCSpell.js";
import { blockDevelopmentDocs } from "./blocks/blockDevelopmentDocs.js";
import { blockESLint } from "./blocks/blockESLint.js";
import { blockFunding } from "./blocks/blockFunding.js";
import { blockGitHubActions } from "./blocks/blockGitHubActions.js";
import { blockGitHubIssueTemplates } from "./blocks/blockGitHubIssueTemplates.js";
import { blockGitHubPRTemplate } from "./blocks/blockGitHubPRTemplate.js";
import { blockGitignore } from "./blocks/blockGitignore.js";
import { blockKnip } from "./blocks/blockKnip.js";
import { blockMarkdownlint } from "./blocks/blockMarkdownlint.js";
import { blockMITLicense } from "./blocks/blockMITLicense.js";
import { blockNvmrc } from "./blocks/blockNvmrc.js";
import { blockPackageJson } from "./blocks/blockPackageJson.js";
import { blockPnpmDedupe } from "./blocks/blockPnpmDedupe.js";
import { blockPRCompliance } from "./blocks/blockPRCompliance.js";
import { blockPrettier } from "./blocks/blockPrettier.js";
import { blockREADME } from "./blocks/blockREADME.js";
import { blockReleaseIt } from "./blocks/blockReleaseIt.js";
import { blockRenovate } from "./blocks/blockRenovate.js";
import { blockSecurityDocs } from "./blocks/blockSecurityDocs.js";
import { blockTSup } from "./blocks/blockTSup.js";
import { blockTypeScript } from "./blocks/blockTypeScript.js";
import { blockVitest } from "./blocks/blockVitest.js";
import { blockVSCode } from "./blocks/blockVSCode.js";
import { schema } from "./schema.js";

export const presetEverything = schema.createPreset({
	about: {
		description:
			"The most comprehensive tooling imaginable: sorting, spellchecking, and more!",
		name: "Everything",
	},
	blocks: [
		blockAllContributors(),
		blockContributingDocs(),
		blockContributorCovenant(),
		blockCSpell(),
		blockDevelopmentDocs(),
		blockESLint({
			extensions: [
				`eslint.configs.recommended`,
				`...jsonc.configs["flat/recommended-with-json"]`,
				`...markdown.configs.recommended`,
				`...yml.configs["flat/recommended"]`,
				`...yml.configs["flat/prettier"]`,
				`comments.recommended`,
				`jsdoc.configs["flat/contents-typescript-error"]`,
				`jsdoc.configs["flat/logical-typescript-error"]`,
				`jsdoc.configs["flat/stylistic-typescript-error"]`,
				`n.configs["flat/recommended"]`,
				`packageJson`,
				`perfectionist.configs["recommended-natural"]`,
				`regexp.configs["flat/recommended"]`,
				{
					extends: [
						"...tseslint.configs.strictTypeChecked",
						"...tseslint.configs.stylisticTypeChecked",
					],
					files: ["**/*.js", "**/*.ts"],
					languageOptions: {
						parserOptions: {
							projectService: {
								allowDefaultProject: ["*.*s", "eslint.config.js"],
							},
						},
					},
					rules: [
						{
							comment:
								"These off-by-default rules work well for this repo and we like them on.",
							entries: {
								"logical-assignment-operators": [
									"error",
									"always",
									{ enforceForIfStatements: true },
								],
								"operator-assignment": "error",
							},
						},
						{
							comment:
								"These on-by-default rules don't work well for this repo and we like them off.",
							entries: {
								"jsdoc/lines-before-block": "off",
								"no-constant-condition": "off",
							},
						},
						{
							comment:
								"These on-by-default rules work well for this repo if configured.",
							entries: {
								"perfectionist/sort-objects": [
									"error",
									{
										order: "asc",
										partitionByComment: true,
										type: "natural",
									},
								],
							},
						},
						{
							comment: "Stylistic concerns that don't interfere with Prettier",
							entries: {
								"no-useless-rename": "error",
								"object-shorthand": "error",
							},
						},
					],
				},
				{
					files: ["*.jsonc"],
					rules: {
						"jsonc/comma-dangle": "off",
						"jsonc/no-comments": "off",
						"jsonc/sort-keys": "error",
					},
				},
				{
					extends: ["tseslint.configs.disableTypeChecked"],
					files: ["**/*.md/*.ts"],
				},
				{
					extends: ["vitest.configs.recommended"],
					files: ["**/*.test.*"],
					rules: {
						"@typescript-eslint/no-unsafe-assignment": "off",
						"@typescript-eslint/no-unsafe-call": "off",
					},
				},
				{
					files: ["**/*.{yml,yaml}"],
					rules: {
						"yml/file-extension": ["error", { extension: "yml" }],
						"yml/sort-keys": [
							"error",
							{
								order: { type: "asc" },
								pathPattern: "^.*$",
							},
						],
						"yml/sort-sequence-values": [
							"error",
							{
								order: { type: "asc" },
								pathPattern: "^.*$",
							},
						],
					},
				},
			],
			imports: [
				'import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";',
				'import vitest from "@vitest/eslint-plugin";',
				'import jsdoc from "eslint-plugin-jsdoc";',
				'import jsonc from "eslint-plugin-jsonc";',
				'import markdown from "eslint-plugin-markdown";',
				'import n from "eslint-plugin-n";',
				'import packageJson from "eslint-plugin-package-json/configs/recommended";',
				'import perfectionist from "eslint-plugin-perfectionist";',
				'import * as regexp from "eslint-plugin-regexp";',
				'import yml from "eslint-plugin-yml";',
			],
		}),
		blockFunding(),
		blockGitHubActions(),
		blockGitHubIssueTemplates(),
		blockGitHubPRTemplate(),
		blockGitignore(),
		blockKnip(),
		blockMarkdownlint(),
		blockMITLicense(),
		blockNvmrc(),
		blockPackageJson(),
		blockPnpmDedupe(),
		blockPRCompliance(),
		blockPrettier({
			plugins: [
				"prettier-plugin-curly",
				"prettier-plugin-sh",
				"prettier-plugin-packagejson",
			],
		}),
		blockREADME(),
		blockReleaseIt(),
		blockRenovate(),
		blockSecurityDocs(),
		blockTSup(),
		blockTypeScript(),
		blockVSCode(),
		blockVitest(),
	],
});
