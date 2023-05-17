import { describe, expect, it } from "vitest";

import { createRootFiles } from "./rootFiles.js";

describe("createRootFiles", () => {
	it("creates the root files when all settings are disabled", () => {
		const actual = createRootFiles({
			author: "Test Author",
			description: "test description",
			email: "test@email.com",
			owner: "TestOwner",
			releases: false,
			repository: "test-repository",
			unitTests: false,
		});

		expect(actual).toEqual({
			".all-contributorsrc": JSON.stringify(
				{
					badgeTemplate:
						'<img alt="All Contributors: <%= contributors.length %>" src="https://img.shields.io/badge/all_contributors-<%= contributors.length %>-21bb42.svg" />',
					commit: false,
					commitConvention: "angular",
					contributors: [
						{
							avatar_url: "https://avatars.githubusercontent.com/u/3335181?v=4",
							contributions: ["tool"],
							login: "JoshuaKGoldberg",
							name: "Josh Goldberg",
							profile: "http://www.joshuakgoldberg.com",
						},
					],
					contributorsPerLine: 7,
					contributorsSortAlphabetically: true,
					files: ["README.md"],
					imageSize: 100,
					projectName: "template-typescript-node-package",
					projectOwner: "JoshuaKGoldberg",
					repoHost: "https://github.com",
					repoType: "github",
				},
				null,
				"\t"
			),
			".eslintignore": `!.*
lib
node_modules
pnpm-lock.yaml`,
			".eslintrc.cjs": `/*
👋 Hi! This ESLint configuration contains a lot more stuff than many repos'!
You can read from it to see all sorts of linting goodness, but don't worry -
it's not something you need to exhaustively understand immediately. 💙

If you're interested in learning more, see the 'getting started' docs on:
- ESLint: https://eslint.org
- typescript-eslint: https://typescript-eslint.io
*/

/** @type {import("@types/eslint").Linter.Config} */
module.exports = {
	env: {
		es2022: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:eslint-comments/recommended",
		"plugin:regexp/recommended",
		"prettier",
	],
	overrides: [
		{
			extends: ["plugin:markdown/recommended"],
			files: ["**/*.md"],
			processor: "markdown/markdown",
		},
		{
			extends: [
				"plugin:jsdoc/recommended-typescript-error",
				"plugin:@typescript-eslint/recommended",
				"plugin:typescript-sort-keys/recommended",
			],
			files: ["**/*.ts"],
			parser: "@typescript-eslint/parser",
			rules: {
				// These off-by-default rules work well for this repo and we like them on.
				"jsdoc/informative-docs": "error",

				// These on-by-default rules don't work well for this repo and we like them off.
				"jsdoc/require-jsdoc": "off",
				"jsdoc/require-param": "off",
				"jsdoc/require-property": "off",
				"jsdoc/require-returns": "off",
			},
		},
		{
			extends: [
				"plugin:@typescript-eslint/recommended-requiring-type-checking",
				"plugin:@typescript-eslint/strict",
			],
			excludedFiles: ["**/*.md/*.ts"],
			files: ["**/*.ts"],
			parser: "@typescript-eslint/parser",
			parserOptions: {
				project: "./tsconfig.eslint.json",
			},
			rules: {
				// These off-by-default rules work well for this repo and we like them on.
				"deprecation/deprecation": "error",
			},
		},
		{
			files: ["*.json", "*.jsonc"],
			excludedFiles: ["package.json"],
			parser: "jsonc-eslint-parser",
			rules: {
				"jsonc/sort-keys": "error",
			},
			extends: ["plugin:jsonc/recommended-with-json"],
		},
		{
			extends: ["plugin:yml/standard", "plugin:yml/prettier"],
			files: ["**/*.{yml,yaml}"],
			parser: "yaml-eslint-parser",
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
	parser: "@typescript-eslint/parser",
	plugins: [
			"@typescript-eslint",
			"deprecation",
			"import",
			"jsdoc",
			"no-only-tests",
			"regexp",
			"simple-import-sort",
			"typescript-sort-keys",
			"vitest",
	],
	root: true,
	rules: {
		// These off/less-strict-by-default rules work well for this repo and we like them on.
		"@typescript-eslint/no-unused-vars": ["error", { caughtErrors: "all" }],
		"import/extensions": ["error", "ignorePackages"],
		"no-only-tests/no-only-tests": "error",
		"simple-import-sort/exports": "error",
		"simple-import-sort/imports": "error",

		// These on-by-default rules don't work well for this repo and we like them off.
		"no-constant-condition": "off",
		"no-inner-declarations": "off",

		// Stylistic concerns that don't interfere with Prettier
		curly: ["error", "all"],
		"padding-line-between-statements": "off",
		"@typescript-eslint/padding-line-between-statements": [
			"error",
			{ blankLine: "always", next: "*", prev: "block-like" },
		],
	},
};
`,
			".gitignore": `lib/
node_modules/`,
			".markdownlint.json": `{
	"extends": "markdownlint/style/prettier",
	"first-line-h1": false,
	"no-inline-html": false
}`,
			".markdownlintignore": `.github/CODE_OF_CONDUCT.md
CHANGELOG.md
lib/
node_modules/`,
			".npmpackagejsonlintrc.json": JSON.stringify(
				{
					extends: "npm-package-json-lint-config-default",
					rules: {
						"require-description": "error",
						"require-license": "error",
					},
				},
				null,
				"\t"
			),
			".nvmrc": "18.16.0",
			".prettierignore": `lib/
pnpm-lock.yaml

# See https://github.com/all-contributors/cli/issues/347
.all-contributorsrc`,
			".prettierrc": JSON.stringify(
				{
					$schema: "http://json.schemastore.org/prettierrc",
					plugins: ["prettier-plugin-packagejson"],
					overrides: [
						{
							files: ".*rc",
							options: {
								parser: "json",
							},
						},
						{
							files: ".nvmrc",
							options: {
								parser: "yaml",
							},
						},
					],
					useTabs: true,
				},
				null,
				"\t"
			),
			".release-it.json": JSON.stringify(
				{
					git: {
						commitMessage: "chore: release v${version}",
						requireCommits: true,
					},
					github: {
						autoGenerate: true,
						release: true,
						releaseName: "v${version}",
					},
				},
				null,
				"\t"
			),
			"LICENSE.md": `# MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
`,
			"cspell.json": JSON.stringify(
				{
					dictionaries: ["typescript"],
					ignorePaths: [
						".github",
						"CHANGELOG.md",
						"lib",
						"node_modules",
						"pnpm-lock.yaml",
						"script/*.json",
					],
					words: [
						"Codecov",
						"codespace",
						"commitlint",
						"contributorsrc",
						"conventionalcommits",
						"execa",
						"knip",
						"lcov",
						"markdownlintignore",
						"npmpackagejsonlintrc",
						"outro",
						"packagejson",
						"quickstart",
						"wontfix",
					],
				},
				null,
				"\t"
			),
			"knip.jsonc": JSON.stringify(
				{
					$schema: "https://unpkg.com/knip@next/schema.json",
					entry: ["src/index.ts!", "script/setup*.js"],
					ignoreBinaries: ["dedupe", "gh"],
					project: ["src/**/*.ts!", "script/**/*.js"],
				},
				null,
				"\t"
			),
			"package.json": JSON.stringify(
				{
					name: "test-repository",
					description: "test description",
					repository: {
						type: "git",
						url: "https://github.com/TestOwner/test-repository",
					},
					license: "MIT",
					author: {
						email: "test@email.com",
						name: "Test Author",
					},
					type: "module",
					main: "./lib/index.js",
					files: ["lib/", "package.json", "LICENSE.md", "README.md"],
					scripts: {
						build: "tsc",
						format: 'prettier "**/*" --ignore-unknown',
						"format:write": "pnpm format --write",
						lint: "eslint . --max-warnings 0 --report-unused-disable-directives",
						"lint:knip": "knip",
						"lint:md":
							'markdownlint "**/*.md" ".github/**/*.md" --rules sentences-per-line',
						"lint:package": "npmPkgJsonLint .",
						"lint:packages": "pnpm dedupe --check",
						"lint:spelling": 'cspell "**" ".github/**/*"',
						prepare: "husky install",
					},
					"lint-staged": {
						"*": "prettier --ignore-unknown --write",
					},
					packageManager: "pnpm@8.5.0",
					engines: {
						node: ">=18",
					},
				},
				null,
				"\t"
			),
			"tsconfig.eslint.json": JSON.stringify(
				{
					extends: "./tsconfig.json",
					include: ["."],
				},
				null,
				"\t"
			),
			"tsconfig.json": JSON.stringify(
				{
					compilerOptions: {
						declaration: true,
						declarationMap: true,
						esModuleInterop: true,
						moduleResolution: "node",
						outDir: "lib",
						skipLibCheck: true,
						sourceMap: true,
						strict: true,
						target: "ES2021",
					},
					include: ["src"],
				},
				null,
				"\t"
			),
		});
	});
});
