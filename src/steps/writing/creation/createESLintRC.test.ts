import { describe, expect, it } from "vitest";

import { Options } from "../../../shared/types.js";
import { createESLintRC } from "./createESLintRC.js";

function fakeOptions(getExcludeValue: (exclusionName: string) => boolean) {
	return {
		access: "public",
		author: "TestAuthor",
		base: "everything",
		description: "Test description.",
		directory: ".",
		email: {
			github: "github@email.com",
			npm: "npm@email.com",
		},
		...Object.fromEntries(
			[
				"excludeCompliance",
				"excludeAllContributors",
				"excludeLintDeprecation",
				"excludeLintESLint",
				"excludeLintJSDoc",
				"excludeLintJson",
				"excludeLintKnip",
				"excludeLintMd",
				"excludeLintPackageJson",
				"excludeLintPackages",
				"excludeLintPerfectionist",
				"excludeLintRegex",
				"excludeLintSpelling",
				"excludeLintStrict",
				"excludeLintStylistic",
				"excludeLintYml",
				"excludeReleases",
				"excludeRenovate",
				"excludeTests",
			].map((key) => [key, getExcludeValue(key)]),
		),
		logo: undefined,
		mode: "create",
		owner: "TestOwner",
		repository: "test-repository",
		skipGitHubApi: true,
		skipInstall: true,
		skipRemoval: true,
		title: "Test Title",
	} satisfies Options;
}

describe("createESLintRC", () => {
	it("creates a minimal config when all exclusions are enabled", async () => {
		expect(await createESLintRC(fakeOptions(() => true)))
			.toMatchInlineSnapshot(`
				"/** @type {import(\\"@types/eslint\\").Linter.Config} */
				module.exports = {
				  env: {
				    es2022: true,
				    node: true,
				  },
				  extends: [\\"eslint:recommended\\", \\"plugin:n/recommended\\"],
				  overrides: [
				    {
				      extends: [\\"plugin:@typescript-eslint/recommended\\"],
				      files: [\\"**/*.ts\\"],
				      parser: \\"@typescript-eslint/parser\\",
				      rules: {
				        // These off-by-default rules work well for this repo and we like them on.
				        \\"logical-assignment-operators\\": [
				          \\"error\\",
				          \\"always\\",
				          { enforceForIfStatements: true },
				        ],
				        \\"operator-assignment\\": \\"error\\",
				      },
				    },
				    {
				      files: \\"**/*.md/*.ts\\",
				      rules: {
				        \\"n/no-missing-import\\": [\\"error\\", { allowModules: [\\"test-repository\\"] }],
				      },
				    },
				    {
				      extends: [\\"plugin:@typescript-eslint/recommended-type-checked\\"],
				      files: [\\"**/*.ts\\"],
				      parser: \\"@typescript-eslint/parser\\",
				      parserOptions: {
				        project: \\"./tsconfig.eslint.json\\",
				      },
				    },
				  ],
				  parser: \\"@typescript-eslint/parser\\",
				  plugins: [\\"@typescript-eslint\\"],
				  reportUnusedDisableDirectives: true,
				  root: true,
				  rules: {
				    // These off/less-strict-by-default rules work well for this repo and we like them on.
				    \\"@typescript-eslint/no-unused-vars\\": [\\"error\\", { caughtErrors: \\"all\\" }],

				    // These on-by-default rules don't work well for this repo and we like them off.
				    \\"no-case-declarations\\": \\"off\\",
				    \\"no-constant-condition\\": \\"off\\",
				    \\"no-inner-declarations\\": \\"off\\",
				    \\"no-mixed-spaces-and-tabs\\": \\"off\\",
				  },
				};
				"
			`);
	});

	it("creates a full config when all exclusions are disabled", async () => {
		expect(await createESLintRC(fakeOptions(() => false)))
			.toMatchInlineSnapshot(`
				"/** @type {import(\\"@types/eslint\\").Linter.Config} */
				module.exports = {
				  env: {
				    es2022: true,
				    node: true,
				  },
				  extends: [
				    \\"eslint:recommended\\",
				    \\"plugin:eslint-comments/recommended\\",
				    \\"plugin:n/recommended\\",
				    \\"plugin:perfectionist/recommended-natural\\",
				    \\"plugin:regexp/recommended\\",
				    \\"plugin:vitest/recommended\\",
				  ],
				  overrides: [
				    {
				      extends: [\\"plugin:markdown/recommended\\"],
				      files: [\\"**/*.md\\"],
				      processor: \\"markdown/markdown\\",
				    },
				    {
				      extends: [
				        \\"plugin:jsdoc/recommended-typescript-error\\",
				        \\"plugin:@typescript-eslint/strict\\",
				        \\"plugin:@typescript-eslint/stylistic\\",
				      ],
				      files: [\\"**/*.ts\\"],
				      parser: \\"@typescript-eslint/parser\\",
				      rules: {
				        // These off-by-default rules work well for this repo and we like them on.
				        \\"jsdoc/informative-docs\\": \\"error\\",
				        \\"logical-assignment-operators\\": [
				          \\"error\\",
				          \\"always\\",
				          { enforceForIfStatements: true },
				        ],
				        \\"operator-assignment\\": \\"error\\",

				        // These on-by-default rules don't work well for this repo and we like them off.
				        \\"jsdoc/require-jsdoc\\": \\"off\\",
				        \\"jsdoc/require-param\\": \\"off\\",
				        \\"jsdoc/require-property\\": \\"off\\",
				        \\"jsdoc/require-returns\\": \\"off\\",
				      },
				    },
				    {
				      files: \\"**/*.md/*.ts\\",
				      rules: {
				        \\"n/no-missing-import\\": [\\"error\\", { allowModules: [\\"test-repository\\"] }],
				      },
				    },
				    {
				      excludedFiles: [\\"**/*.md/*.ts\\"],
				      extends: [
				        \\"plugin:@typescript-eslint/strict-type-checked\\",
				        \\"plugin:@typescript-eslint/stylistic-type-checked\\",
				      ],
				      files: [\\"**/*.ts\\"],
				      parser: \\"@typescript-eslint/parser\\",
				      parserOptions: {
				        project: \\"./tsconfig.eslint.json\\",
				      },
				      rules: {
				        // These off-by-default rules work well for this repo and we like them on.
				        \\"deprecation/deprecation\\": \\"error\\",
				      },
				    },
				    {
				      excludedFiles: [\\"package.json\\"],
				      extends: [\\"plugin:jsonc/recommended-with-json\\"],
				      files: [\\"*.json\\", \\"*.jsonc\\"],
				      parser: \\"jsonc-eslint-parser\\",
				      rules: {
				        \\"jsonc/sort-keys\\": \\"error\\",
				      },
				    },
				    {
				      files: [\\"*.jsonc\\"],
				      rules: {
				        \\"jsonc/no-comments\\": \\"off\\",
				      },
				    },
				    {
				      files: \\"**/*.test.ts\\",
				      rules: {
				        // These on-by-default rules aren't useful in test files.
				        \\"@typescript-eslint/no-unsafe-assignment\\": \\"off\\",
				        \\"@typescript-eslint/no-unsafe-call\\": \\"off\\",
				      },
				    },
				    {
				      extends: [\\"plugin:yml/standard\\", \\"plugin:yml/prettier\\"],
				      files: [\\"**/*.{yml,yaml}\\"],
				      parser: \\"yaml-eslint-parser\\",
				      rules: {
				        \\"yml/file-extension\\": [\\"error\\", { extension: \\"yml\\" }],
				        \\"yml/sort-keys\\": [
				          \\"error\\",
				          {
				            order: { type: \\"asc\\" },
				            pathPattern: \\"^.*$\\",
				          },
				        ],
				        \\"yml/sort-sequence-values\\": [
				          \\"error\\",
				          {
				            order: { type: \\"asc\\" },
				            pathPattern: \\"^.*$\\",
				          },
				        ],
				      },
				    },
				  ],
				  parser: \\"@typescript-eslint/parser\\",
				  plugins: [
				    \\"@typescript-eslint\\",
				    \\"deprecation\\",
				    \\"jsdoc\\",
				    \\"no-only-tests\\",
				    \\"perfectionist\\",
				    \\"regexp\\",
				    \\"vitest\\",
				  ],
				  reportUnusedDisableDirectives: true,
				  root: true,
				  rules: {
				    // These off/less-strict-by-default rules work well for this repo and we like them on.
				    \\"@typescript-eslint/no-unused-vars\\": [\\"error\\", { caughtErrors: \\"all\\" }],
				    \\"no-only-tests/no-only-tests\\": \\"error\\",

				    // These on-by-default rules don't work well for this repo and we like them off.
				    \\"no-case-declarations\\": \\"off\\",
				    \\"no-constant-condition\\": \\"off\\",
				    \\"no-inner-declarations\\": \\"off\\",
				    \\"no-mixed-spaces-and-tabs\\": \\"off\\",

				    // Stylistic concerns that don't interfere with Prettier
				    \\"@typescript-eslint/padding-line-between-statements\\": [
				      \\"error\\",
				      { blankLine: \\"always\\", next: \\"*\\", prev: \\"block-like\\" },
				    ],
				    \\"perfectionist/sort-objects\\": [
				      \\"error\\",
				      {
				        order: \\"asc\\",
				        \\"partition-by-comment\\": true,
				        type: \\"natural\\",
				      },
				    ],
				  },
				};
				"
			`);
	});
});
