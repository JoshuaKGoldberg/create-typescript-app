import fs from "node:fs/promises";
import { describe, expect, it, test, vi } from "vitest";

import { readDocumentation } from "./readDocumentation.js";

describe("finalize", () => {
	it("returns undefined when no .github/DEVELOPMENT.md exists", async () => {
		const documentation = await readDocumentation(() =>
			Promise.resolve(undefined),
		);

		expect(documentation).toBeUndefined();
	});

	it("filters known headings when .github/DEVELOPMENT.md exists", async () => {
		const documentation = await readDocumentation(() =>
			Promise.resolve(`# Development\nremoved\n\n## Unknown\n\nKept.\n`),
		);

		expect(documentation).toMatchInlineSnapshot(`
			"## Unknown

			Kept.
			"
		`);
	});

	test("real world", async () => {
		const existing = (await fs.readFile(".github/DEVELOPMENT.md")).toString();

		const documentation = await readDocumentation(
			vi.fn().mockResolvedValueOnce(existing),
		);

		expect(documentation).toMatchInlineSnapshot(`
			"## Setup Scripts

			As described in the \`README.md\` file and \`docs/\`, this template repository comes with three scripts that can set up an existing or new repository.

			Each follows roughly the same general flow:

			1. \`bin/index.ts\` uses \`bin/mode.ts\` to determine which of the three setup scripts to run
			2. \`readOptions\` parses in options from local files, Git commands, npm APIs, and/or files on disk
			3. \`runOrRestore\` wraps the setup script's main logic in a friendly prompt wrapper
			4. The setup script wraps each portion of its main logic with \`withSpinner\`
			   - Each step of setup logic is generally imported from within \`src/steps\`
			5. A call to \`outro\` summarizes the results for the user

			> **Warning**
			> Each setup script overrides many files in the directory they're run in.
			> Make sure to save any changes you want to preserve before running them.

			### The Creation Script

			> 📝 See [\`docs/Creation.md\`](../docs/Creation.md) for user documentation on the creation script.

			This template's "creation" script is located in \`src/create/\`.
			You can run it locally with \`node bin/index.js --mode create\`.
			Note that files need to be built with \`pnpm run build\` beforehand.

			#### Testing the Creation Script

			You can run the end-to-end test for creation locally on the command-line.
			Note that the files need to be built with \`pnpm run build\` beforehand.

			\`\`\`shell
			pnpm run test:create
			\`\`\`

			That end-to-end test executes \`script/create-test-e2e.ts\`, which:

			1. Runs the creation script to create a new \`test-repository\` child directory and repository, capturing code coverage
			2. Asserts that commands such as \`build\` and \`lint\` each pass

			The \`pnpm run test:create\` script is run in CI to ensure that templating changes are in sync with the template's actual files.
			See \`.github/workflows/ci.yml\`'s \`test_creation_script\` job.

			### The Initialization Script

			> 📝 See [\`docs/Initialization.md\`](../docs/Initialization.md) for user documentation on the initialization script.

			This template's "initialization" script is located in \`src/initialize/\`.
			You can run it locally with \`pnpm run initialize\`.
			It uses [\`tsx\`](https://github.com/esbuild-kit/tsx) so you don't need to build files before running.

			\`\`\`shell
			pnpm run initialize
			\`\`\`

			#### Testing the Initialization Script

			You can run the end-to-end test for initializing locally on the command-line.
			Note that files need to be built with \`pnpm run build\` beforehand.

			\`\`\`shell
			pnpm run test:initialize
			\`\`\`

			That end-to-end test executes \`script/initialize-test-e2e.ts\`, which:

			1. Runs the initialization script using \`--skip-github-api\` and other skip flags
			2. Checks that the local repository's files were changed correctly (e.g. removed initialization-only files)
			3. Runs \`pnpm run lint:knip\` to make sure no excess dependencies or files were left over
			4. Resets everything
			5. Runs initialization a second time, capturing test coverage

			The \`pnpm run test:initialize\` script is run in CI to ensure that templating changes are in sync with the template's actual files.
			See \`.github/workflows/ci.yml\`'s \`test_initialization_script\` job.

			### The Migration Script

			> 📝 See [\`docs/Migration.md\`](../docs/Migration.md) for user documentation on the migration script.

			This template's "migration" script is located in \`src/migrate/\`.
			Note that files need to be built with \`pnpm run build\` beforehand.

			To test out the script locally, run it from a different repository's directory:

			\`\`\`shell
			cd ../other-repo
			node ../create-typescript-app/bin/migrate.js
			\`\`\`

			The migration script will work on any directory.
			You can try it out in a blank directory with scripts like:

			\`\`\`shell
			cd ..
			mkdir temp
			cd temp
			node ../create-typescript-app/bin/migrate.js
			\`\`\`

			#### Testing the Migration Script

			> 💡 Seeing \`Oh no! Running the migrate script unexpectedly modified:\` errors?
			> _[Unexpected File Modifications](#unexpected-file-modifications)_ covers that below.

			You can run the end-to-end test for migrating locally on the command-line:

			\`\`\`shell
			pnpm run test:migrate
			\`\`\`

			That end-to-end test executes \`script/migrate-test-e2e.ts\`, which:

			1. Runs the migration script using \`--skip-github-api\` and other skip flags, capturing code coverage
			2. Checks that only a small list of allowed files were changed
			3. Checks that the local repository's files were changed correctly (e.g. removed initialization-only files)

			The \`pnpm run test:migrate\` script is run in CI to ensure that templating changes are in sync with the template's actual files.
			See \`.github/workflows/ci.yml\`'s \`test_migration_script\` job.

			> Tip: if the migration test is failing in CI and you don't see any errors, try [downloading the full logs](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/using-workflow-run-logs#downloading-logs).

			##### Migration Snapshot Failures

			The migration test uses the [Vitest file snapshot](https://vitest.dev/guide/snapshot#file-snapshots) in \`script/__snapshots__/migrate-test-e2e.ts.snap\` to store expected differences to this repository after running the migration script.
			The end-to-end migration test will fail any changes that don't keep the same differences in that snapshot.

			You can update the snapshot file by:

			1. Committing any changes to your local repository
			2. Running \`pnpm i\` and \`pnpm build\` if any updates have been made to the \`package.json\` or \`src/\` files, respectively
			3. Running \`pnpm run test:migrate -u\` to update the snapshot

			At this point there will be some files changed:

			- \`script/__snapshots__/migrate-test-e2e.ts.snap\` will have updates if any files mismatched templates
			- The actual updated files on disk will be there too

			If the snapshot file changes are what you expected, then you can commit them.
			The rest of the file changes can be reverted.

			> [🚀 Feature: Add a way to apply known file changes after migration #1184](https://github.com/JoshuaKGoldberg/create-typescript-app/issues/1184) tracks turning the test snapshot into a feature.

			##### Unexpected File Modifications

			The migration test also asserts that no files were unexpectedly changed.
			If you see a failure like:

			\`\`\`plaintext
			Oh no! Running the migrate script unexpectedly modified:
			 - ...
			\`\`\`

			...then that means the file generated from templates differs from what's checked into the repository.
			This is most often caused by changes to templates not being applied to checked-in files too.

			Templates for files are generally stored in [\`src/steps/writing/creation\`] under a path roughly corresponding to the file they describe.
			For example, the template for \`tsup.config.ts\` is stored in [\`src/steps/writing/creation/createTsupConfig.ts\`](../src/steps/writing/creation/createTsupConfig.ts).
			If the \`createTsupConfig\` function were to be modified without an equivalent change to \`tsup.config.ts\` -or vice-versa- then the migration test would report:

			\`\`\`plaintext
			Oh no! Running the migrate script unexpectedly modified:
			 - tsup.config.ts
			\`\`\`
			"
		`);
	});
});
