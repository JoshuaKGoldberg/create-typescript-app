import { parseArgs } from "node:util";

import { initializeWithInformation } from "../initialize/initializeWithInformation.js";
import {
	skipSpinnerBlock,
	successSpinnerBlock,
	withSpinner,
} from "../shared/cli/spinners.js";
import { runOrRestore } from "../shared/runOrRestore.js";
import { clearUnnecessaryFiles } from "./steps/clearUnnecessaryFiles.js";
import { detectExistingContributors } from "./steps/detectExistingContributors.js";
import { finalizeDependencies } from "./steps/finalizeDependencies.js";
import { runCommand } from "./steps/runCommand.js";
import { writeReadme } from "./steps/writeReadme.js";
import { writeStructure } from "./steps/writing/writeStructure.js";
import { getMigrationDefaults } from "./values/getMigrationDefaults.js";
import { augmentWithMigrationValues } from "./values/migrationInputValues.js";

export async function migrate(args: string[]) {
	const { values: migrationSkips } = parseArgs({
		args,
		options: {
			"skip-contributors": { type: "boolean" },
			"skip-github-api": { type: "boolean" },
			"skip-install": { type: "boolean" },
			"skip-setup": { type: "boolean" },
		},
		strict: false,
		tokens: true,
	});

	return await runOrRestore({
		args,
		defaults: await getMigrationDefaults(),
		label: "migration",
		run: async ({ octokit, values }) => {
			const migrationValues = await augmentWithMigrationValues(values);

			await withSpinner(clearUnnecessaryFiles, "clearing unnecessary files");

			await withSpinner(
				() => writeStructure(migrationValues),
				"writing new repository structure",
			);

			await withSpinner(
				() => writeReadme(migrationValues),
				"writing README.md",
			);

			if (
				migrationSkips["skip-github-api"] ??
				migrationSkips["skip-contributors"]
			) {
				skipSpinnerBlock(`Skipping detecting existing contributors.`);
			} else {
				await withSpinner(
					detectExistingContributors,
					"detecting existing contributors",
				);
			}

			if (migrationSkips["skip-github-api"] ?? migrationSkips["skip-install"]) {
				skipSpinnerBlock(`Skipping package installations.`);
			} else {
				await withSpinner(
					() => finalizeDependencies(migrationValues),
					"finalizing dependencies",
				);
			}

			await runCommand("pnpm lint --fix", "auto-fixing lint rules");
			await runCommand("pnpm format --write", "formatting files");

			if (migrationSkips["skip-initialize"]) {
				skipSpinnerBlock(`Done migrating, and skipping initialize command.`);
			} else {
				successSpinnerBlock("Done migrating. Starting initialize command...");

				await initializeWithInformation({
					octokit,
					values: {
						...migrationValues,
						skipUninstalls: true,
					},
				});
			}
		},
	});
}
