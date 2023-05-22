import { formatIgnoreFile } from "./formatters/formatIgnoreFile.js";
import { formatJson } from "./formatters/formatJson.js";

interface CreateRootFilesOptions {
	author: string;
	description: string;
	email: string;
	owner: string;
	releases: boolean;
	repository: string;
	unitTests: boolean;
}

export function createRootFiles({
	author,
	description,
	email,
	owner,
	releases,
	repository,
	unitTests,
}: CreateRootFilesOptions) {
	return {
		".all-contributorsrc": formatJson({
			badgeTemplate:
				'<img alt="All Contributors: <%= contributors.length %>" src="https://img.shields.io/badge/all_contributors-<%= contributors.length %>-21bb42.svg" />',
			commit: false,
			commitConvention: "angular",
			contributors: [],
			contributorsPerLine: 7,
			contributorsSortAlphabetically: true,
			files: ["README.md"],
			imageSize: 100,
			projectName: repository,
			projectOwner: owner,
			repoHost: "https://github.com",
			repoType: "github",
		}),
		".eslintignore": formatIgnoreFile([
			"!.*",
			...(unitTests ? ["coverage"] : []),
			"lib",
			"node_modules",
			"pnpm-lock.yaml",
		]),
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
		},${
			unitTests
				? `\n{
			files: "**/*.test.ts",
			rules: {
				// These on-by-default rules aren't useful in test files.
				"@typescript-eslint/no-unsafe-assignment": "off",
				"@typescript-eslint/no-unsafe-call": "off",
			},
		},`
				: ""
		}
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
		"jsdoc",${unitTests ? `\n"no-only-tests",` : ""}
		"regexp",
		"simple-import-sort",
		"typescript-sort-keys",${unitTests ? `\n"vitest",` : ""}
	],
	root: true,
	rules: {
		// These off/less-strict-by-default rules work well for this repo and we like them on.
		"@typescript-eslint/no-unused-vars": ["error", { caughtErrors: "all" }],
		"import/extensions": ["error", "ignorePackages"],${
			unitTests ? `\n"no-only-tests/no-only-tests": "error",` : ""
		}
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
		".gitignore": formatIgnoreFile([
			...(unitTests ? ["coverage/"] : []),
			"lib/",
			"node_modules/",
		]),
		".markdownlint.json": formatJson({
			extends: "markdownlint/style/prettier",
			"first-line-h1": false,
			"no-inline-html": false,
		}),
		".markdownlintignore": formatIgnoreFile([
			".github/CODE_OF_CONDUCT.md",
			"CHANGELOG.md",
			"lib/",
			"node_modules/",
		]),
		".npmpackagejsonlintrc.json": formatJson({
			extends: "npm-package-json-lint-config-default",
			rules: {
				"require-description": "error",
				"require-license": "error",
			},
		}),
		".nvmrc": `18.16.0\n`,
		".prettierignore": formatIgnoreFile([
			...(unitTests ? ["coverage/"] : []),
			"lib/",
			"pnpm-lock.yaml",
			"",
			"# See https://github.com/all-contributors/cli/issues/347",
			".all-contributorsrc",
		]),
		".prettierrc": formatJson({
			$schema: "http://json.schemastore.org/prettierrc",
			plugins: ["prettier-plugin-packagejson"],
			overrides: [
				{
					files: ".*rc",
					options: { parser: "json" },
				},
				{
					files: ".nvmrc",
					options: { parser: "yaml" },
				},
			],
			useTabs: true,
		}),
		".release-it.json": formatJson({
			git: {
				commitMessage: "chore: release v${version}",
				requireCommits: true,
			},
			github: {
				autoGenerate: true,
				release: true,
				releaseName: "v${version}",
			},
		}),
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
		"cspell.json": formatJson({
			dictionaries: ["typescript"],
			ignorePaths: [
				".github",
				"CHANGELOG.md",
				...(unitTests ? ["coverage"] : []),
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
		}),
		"knip.jsonc": formatJson({
			$schema: "https://unpkg.com/knip@next/schema.json",
			entry: ["src/index.ts!", "script/setup*.js"],
			ignoreBinaries: ["dedupe", "gh"],
			project: ["src/**/*.ts!", "script/**/*.js"],
		}),
		"package.json": formatJson({
			name: repository,
			description,
			repository: {
				type: "git",
				url: `https://github.com/${owner}/${repository}`,
			},
			license: "MIT",
			author: { email, name: author },
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
				...(releases && {
					"should-semantic-release": "should-semantic-release --verbose",
				}),
				...(unitTests && { test: "vitest" }),
			},
			"lint-staged": {
				"*": "prettier --ignore-unknown --write",
			},
			packageManager: "pnpm@8.5.0",
			engines: {
				node: ">=18",
			},
			publishConfig: {
				provenance: true,
			},
		}),
		"tsconfig.eslint.json": formatJson({
			extends: "./tsconfig.json",
			include: ["."],
		}),
		"tsconfig.json": formatJson({
			compilerOptions: {
				declaration: true,
				declarationMap: true,
				esModuleInterop: true,
				module: "esnext",
				moduleResolution: "node",
				outDir: "lib",
				skipLibCheck: true,
				sourceMap: true,
				strict: true,
				target: "ES2022",
			},
			include: ["src"],
		}),
		...(unitTests && {
			"vitest.config.ts": `import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		clearMocks: true,
		coverage: {
			all: true,
			exclude: ["lib"],
			include: ["src"],
			provider: "istanbul",
			reporter: ["html", "lcov"],
		},
		exclude: ["lib", "node_modules"],
		setupFiles: ["console-fail-test/setup"],
	},
});
`,
		}),
	};
}
