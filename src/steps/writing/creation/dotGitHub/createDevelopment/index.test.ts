import { describe, expect, it, vi } from "vitest";

import { Options } from "../../../../../shared/types.js";
import { createDevelopment } from "./index.js";

const mockReadFileSafe = vi.fn();

vi.mock("../../../../../shared/readFileSafe.js", () => ({
	get readFileSafe() {
		return mockReadFileSafe;
	},
}));

const options = {
	access: "public",
	author: "Test Author",
	base: "everything",
	description: "Test description.",
	directory: ".",
	email: {
		github: "github@email.com",
		npm: "npm@email.com",
	},
	mode: "create",
	owner: "TestOwner",
	repository: "test-repository",
	skipInstall: true,
	title: "Test Title",
} satisfies Options;

describe("createDevelopment", () => {
	it("creates a file with extra options turned on when options disable them", async () => {
		mockReadFileSafe.mockResolvedValue("");

		const actual = await createDevelopment({
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
			pnpm format --write
			\`\`\`

			## Linting

			[ESLint](https://eslint.org) is used with [typescript-eslint](https://typescript-eslint.io)) to lint JavaScript and TypeScript source files.
			You can run it locally on the command-line:

			\`\`\`shell
			pnpm run lint
			\`\`\`

			ESLint can be run with \`--fix\` to auto-fix some lint rule complaints:

			\`\`\`shell
			pnpm run lint --fix
			\`\`\`

			Note that you'll need to run \`pnpm build\` before \`pnpm lint\` so that lint rules which check the file system can pick up on any built files.

			### Linting Duplicate Packages

			[pnpm dedupe --check](https://pnpm.io/cli/dedupe) is used to check for unnecessarily duplicated packages in the \`pnpm-lock.yml\` file.
			You can run it with \`pnpm lint:packages\`:

			\`\`\`shell
			pnpm lint:packages
			\`\`\`

			### Linting With CSpell

			[cspell](https://cspell.org) is used to spell check across all source files.
			You can run it with \`pnpm lint:spelling\`:

			\`\`\`shell
			pnpm lint:spelling
			\`\`\`

			### Linting With Knip

			[knip](https://github.com/webpro/knip) is used to detect unused files, dependencies, and code exports.
			You can run it with \`pnpm lint:knip\`:

			\`\`\`shell
			pnpm lint:knip
			\`\`\`

			### Linting With Markdownlint

			[Markdownlint](https://github.com/DavidAnson/markdownlint) is used to run linting on Markdown source files.
			You can run it with \`pnpm lint:md\`:

			\`\`\`shell
			pnpm lint:md
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

	it("creates a file with extra options turned off when options enable them", async () => {
		mockReadFileSafe.mockResolvedValue("");

		const actual = await createDevelopment({
			...options,
			excludeLintKnip: true,
			excludeLintMd: true,
			excludeLintPackageJson: true,
			excludeLintPackages: true,
			excludeLintSpelling: true,
			guide: {
				href: "https://example.com",
				title: "Example Guide",
			},
		});

		expect(actual).toMatchInlineSnapshot(`
			"# Development

			> If you'd like a more guided walkthrough, see [Example Guide](https://example.com).
			> It'll walk you through the common activities you'll need to contribute.

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
			pnpm format --write
			\`\`\`

			## Linting

			[ESLint](https://eslint.org) is used with [typescript-eslint](https://typescript-eslint.io)) to lint JavaScript and TypeScript source files.
			You can run it locally on the command-line:

			\`\`\`shell
			pnpm run lint
			\`\`\`

			ESLint can be run with \`--fix\` to auto-fix some lint rule complaints:

			\`\`\`shell
			pnpm run lint --fix
			\`\`\`

			Note that you'll need to run \`pnpm build\` before \`pnpm lint\` so that lint rules which check the file system can pick up on any built files.

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

	it("preserves existing sections when they don't match the new sections", async () => {
		mockReadFileSafe.mockResolvedValue(`## Existing One

Abc 123.

## Building

Will be removed.

## Tests

Will be removed.

## Existing Two

Def 456.
`);

		const actual = await createDevelopment({
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
			pnpm format --write
			\`\`\`

			## Linting

			[ESLint](https://eslint.org) is used with [typescript-eslint](https://typescript-eslint.io)) to lint JavaScript and TypeScript source files.
			You can run it locally on the command-line:

			\`\`\`shell
			pnpm run lint
			\`\`\`

			ESLint can be run with \`--fix\` to auto-fix some lint rule complaints:

			\`\`\`shell
			pnpm run lint --fix
			\`\`\`

			Note that you'll need to run \`pnpm build\` before \`pnpm lint\` so that lint rules which check the file system can pick up on any built files.

			### Linting Duplicate Packages

			[pnpm dedupe --check](https://pnpm.io/cli/dedupe) is used to check for unnecessarily duplicated packages in the \`pnpm-lock.yml\` file.
			You can run it with \`pnpm lint:packages\`:

			\`\`\`shell
			pnpm lint:packages
			\`\`\`

			### Linting With CSpell

			[cspell](https://cspell.org) is used to spell check across all source files.
			You can run it with \`pnpm lint:spelling\`:

			\`\`\`shell
			pnpm lint:spelling
			\`\`\`

			### Linting With Knip

			[knip](https://github.com/webpro/knip) is used to detect unused files, dependencies, and code exports.
			You can run it with \`pnpm lint:knip\`:

			\`\`\`shell
			pnpm lint:knip
			\`\`\`

			### Linting With Markdownlint

			[Markdownlint](https://github.com/DavidAnson/markdownlint) is used to run linting on Markdown source files.
			You can run it with \`pnpm lint:md\`:

			\`\`\`shell
			pnpm lint:md
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

			## Existing One

			Abc 123.

			## Existing Two

			Def 456.
			"
		`);
	});
});
