import { parseArgs } from "node:util";

import { setupWithInformation } from "../setup/setupWithInformation.js";
import {
	skipSpinnerBlock,
	successSpinnerBlock,
	withSpinner,
} from "../shared/cli/spinners.js";
import { runOrRestore } from "../shared/runOrRestore.js";
import { clearUnnecessaryFiles } from "./steps/clearUnnecessaryFiles.js";
import { finalizeDependencies as finalizeDependencies } from "./steps/finalizeDependencies.js";
import { writeReadme } from "./steps/writeReadme.js";
import { writeStructure } from "./steps/writing/writeStructure.js";
import { getHydrationDefaults } from "./values/getHydrationDefaults.js";
import { ensureHydrationInputValues } from "./values/hydrationInputValues.js";

export async function hydrate(args: string[]) {
	const { values: hydrationValues } = parseArgs({
		args,
		options: {
			"skip-install": { type: "boolean" },
			"skip-setup": { type: "boolean" },
		},
		tokens: true,
		strict: false,
	});

	return await runOrRestore({
		args,
		defaults: await getHydrationDefaults(),
		label: "hydration",
		run: async ({ octokit, values }) => {
			ensureHydrationInputValues(values);

			await withSpinner(clearUnnecessaryFiles, "clearing unnecessary files");

			await withSpinner(
				() => writeStructure(values),
				"writing new repository structure"
			);

			await withSpinner(() => writeReadme(values), "writing README.md");

			if (hydrationValues["skip-install"]) {
				skipSpinnerBlock(`Skipping package installations.`);
			} else {
				await withSpinner(
					() => finalizeDependencies(values),
					"finalizing dependencies"
				);
			}

			if (hydrationValues["skip-setup"]) {
				skipSpinnerBlock(`Done hydrating, and skipping setup command.`);
			} else {
				successSpinnerBlock("Done hydrating. Starting setup command...");

				await setupWithInformation({
					octokit,
					values: {
						...values,
						skipUninstalls: true,
					},
				});
			}
		},
	});
}
