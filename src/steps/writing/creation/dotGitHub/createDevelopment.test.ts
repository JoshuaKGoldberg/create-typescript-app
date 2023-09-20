import { describe, expect, it } from "vitest";

import { Options } from "../../../../shared/types.js";
import { createDevelopment } from "./createDevelopment.js";

const options = {
	author: "Test Author",
	base: "everything",
	createRepository: false,
	description: "Test description.",
	email: "test@test.test",
	excludeCompliance: undefined,
	excludeContributors: undefined,
	excludeLintJson: undefined,
	excludeLintKnip: undefined,
	excludeLintMd: undefined,
	excludeLintPackageJson: undefined,
	excludeLintPackages: undefined,
	excludeLintPerfectionist: undefined,
	excludeLintSpelling: undefined,
	excludeLintYml: undefined,
	excludeReleases: undefined,
	excludeRenovate: undefined,
	excludeTests: undefined,
	funding: undefined,
	owner: "TestOwner",
	repository: "test-repository",
	skipGitHubApi: false,
	skipInstall: true,
	skipRemoval: false,
	skipRestore: false,
	skipUninstall: false,
	title: "Test Title",
} satisfies Options;

describe("createDevelopment", () => {
	it("creates a file with no extra linters when options exclude them", () => {
		const actual = createDevelopment({
			...options,
			excludeLintKnip: false,
			excludeLintMd: false,
			excludeLintPackageJson: false,
			excludeLintPackages: false,
			excludeLintSpelling: false,
		});

		expect(actual).toMatchInlineSnapshot(`
			"# Development

			After [forking the repo from GitHub](https://help.github.com/articles/fork-a-repo) and [installing pnpm](https://pnpm.io/installation):

			\`\`\`shell
			git clone https://github.com/<your-name-here>/test-repository
			cd test-repository
			pnpm install
			\`\`\`

			> This repository includes a list of suggested VS Code extensions.
			> It's a good idea to use [VS Code](https://code.visualstudio.com) and accept its suggestion to install them, as they'll help with development.

			## Building

			Run [**tsup**](https://tsup.egoist.dev) locally to build source files from \`src/\` into output files in \`lib/\`:

			\`\`\`shell
			pnpm build
			\`\`\`

			Add \`--watch\` to run the builder in a watch mode that continuously cleans and recreates \`lib/\` as you save files:

			\`\`\`shell
			pnpm build --watch
			\`\`\`

			## Formatting

			[Prettier](https://prettier.io) is used to format code.
			It should be applied automatically when you save files in VS Code or make a Git commit.

			To manually reformat all files, you can run:

			\`\`\`shell
			pnpm format:write
			\`\`\`

			## Linting

			This package includes several forms of linting to enforce consistent code quality and styling.
			Each should be shown in VS Code, and can be run manually on the command-line:

			- \`pnpm lint\` ([ESLint](https://eslint.org) with [typescript-eslint](https://typescript-eslint.io)): Lints JavaScript and TypeScript source files
			- \`pnpm lint:knip\` ([knip](https://github.com/webpro/knip)): Detects unused files, dependencies, and code exports
			- \`pnpm lint:md\` ([Markdownlint](https://github.com/DavidAnson/markdownlint)): Checks Markdown source files
			- \`pnpm lint:package-json\` ([npm-package-json-lint](https://npmpackagejsonlint.org/)): Lints the \`package.json\` file
			- \`pnpm lint:packages\` ([pnpm dedupe --check](https://pnpm.io/cli/dedupe)): Checks for unnecessarily duplicated packages in the \`pnpm-lock.yml\` file
			- \`pnpm lint:spelling\` ([cspell](https://cspell.org)): Spell checks across all source files

			Read the individual documentation for each linter to understand how it can be configured and used best.

			For example, ESLint can be run with \`--fix\` to auto-fix some lint rule complaints:

			\`\`\`shell
			pnpm run lint --fix
			\`\`\`

			## Testing

			[Vitest](https://vitest.dev) is used for tests.
			You can run it locally on the command-line:

			\`\`\`shell
			pnpm run test
			\`\`\`

			Add the \`--coverage\` flag to compute test coverage and place reports in the \`coverage/\` directory:

			\`\`\`shell
			pnpm run test --coverage
			\`\`\`

			Note that [console-fail-test](https://github.com/JoshuaKGoldberg/console-fail-test) is enabled for all test runs.
			Calls to \`console.log\`, \`console.warn\`, and other console methods will cause a test to fail.

			### Debugging Tests

			This repository includes a [VS Code launch configuration](https://code.visualstudio.com/docs/editor/debugging) for debugging unit tests.
			To launch it, open a test file, then run _Debug Current Test File_ from the VS Code Debug panel (or press F5).

			## Type Checking

			You should be able to see suggestions from [TypeScript](https://typescriptlang.org) in your editor for all open files.

			However, it can be useful to run the TypeScript command-line (\`tsc\`) to type check all files in \`src/\`:

			\`\`\`shell
			pnpm tsc
			\`\`\`

			Add \`--watch\` to keep the type checker running in a watch mode that updates the display as you save files:

			\`\`\`shell
			pnpm tsc --watch
			\`\`\`
			"
		`);
	});

	it("creates a file with all extra linters when options include them", () => {
		const actual = createDevelopment({
			...options,
			excludeLintKnip: true,
			excludeLintMd: true,
			excludeLintPackageJson: true,
			excludeLintPackages: true,
			excludeLintSpelling: true,
		});

		expect(actual).toMatchInlineSnapshot(`
			"# Development

			After [forking the repo from GitHub](https://help.github.com/articles/fork-a-repo) and [installing pnpm](https://pnpm.io/installation):

			\`\`\`shell
			git clone https://github.com/<your-name-here>/test-repository
			cd test-repository
			pnpm install
			\`\`\`

			> This repository includes a list of suggested VS Code extensions.
			> It's a good idea to use [VS Code](https://code.visualstudio.com) and accept its suggestion to install them, as they'll help with development.

			## Building

			Run [**tsup**](https://tsup.egoist.dev) locally to build source files from \`src/\` into output files in \`lib/\`:

			\`\`\`shell
			pnpm build
			\`\`\`

			Add \`--watch\` to run the builder in a watch mode that continuously cleans and recreates \`lib/\` as you save files:

			\`\`\`shell
			pnpm build --watch
			\`\`\`

			## Formatting

			[Prettier](https://prettier.io) is used to format code.
			It should be applied automatically when you save files in VS Code or make a Git commit.

			To manually reformat all files, you can run:

			\`\`\`shell
			pnpm format:write
			\`\`\`

			## Linting

			[ESLint](https://eslint.org) is used with with [typescript-eslint](https://typescript-eslint.io)) to lint JavaScript and TypeScript source files.
			You can run it locally on the command-line:

			\`\`\`shell
			pnpm run lint
			\`\`\`

			ESLint can be run with \`--fix\` to auto-fix some lint rule complaints:

			\`\`\`shell
			pnpm run lint --fix
			\`\`\`

			## Testing

			[Vitest](https://vitest.dev) is used for tests.
			You can run it locally on the command-line:

			\`\`\`shell
			pnpm run test
			\`\`\`

			Add the \`--coverage\` flag to compute test coverage and place reports in the \`coverage/\` directory:

			\`\`\`shell
			pnpm run test --coverage
			\`\`\`

			Note that [console-fail-test](https://github.com/JoshuaKGoldberg/console-fail-test) is enabled for all test runs.
			Calls to \`console.log\`, \`console.warn\`, and other console methods will cause a test to fail.

			### Debugging Tests

			This repository includes a [VS Code launch configuration](https://code.visualstudio.com/docs/editor/debugging) for debugging unit tests.
			To launch it, open a test file, then run _Debug Current Test File_ from the VS Code Debug panel (or press F5).

			## Type Checking

			You should be able to see suggestions from [TypeScript](https://typescriptlang.org) in your editor for all open files.

			However, it can be useful to run the TypeScript command-line (\`tsc\`) to type check all files in \`src/\`:

			\`\`\`shell
			pnpm tsc
			\`\`\`

			Add \`--watch\` to keep the type checker running in a watch mode that updates the display as you save files:

			\`\`\`shell
			pnpm tsc --watch
			\`\`\`
			"
		`);
	});
});
