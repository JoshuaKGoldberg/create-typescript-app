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
import { runCommand } from "./steps/runCommand.js";
import { writeReadme } from "./steps/writeReadme.js";
import { writeStructure } from "./steps/writing/writeStructure.js";
import { getHydrationDefaults } from "./values/getHydrationDefaults.js";
import { augmentWithHydrationValues } from "./values/hydrationInputValues.js";

export async function hydrate(args: string[]) {
	const { values: hydrationSkips } = parseArgs({
		args,
		options: {
			"skip-install": { type: "boolean" },
			"skip-setup": { type: "boolean" },
		},
		strict: false,
		tokens: true,
	});

	return await runOrRestore({
		args,
		defaults: await getHydrationDefaults(),
		label: "hydration",
		run: async ({ octokit, values }) => {
			const hydrationValues = await augmentWithHydrationValues(values);

			await withSpinner(clearUnnecessaryFiles, "clearing unnecessary files");

			await withSpinner(
				() => writeStructure(hydrationValues),
				"writing new repository structure"
			);

			await withSpinner(
				() => writeReadme(hydrationValues),
				"writing README.md"
			);

			if (hydrationSkips["skip-install"]) {
				skipSpinnerBlock(`Skipping package installations.`);
			} else {
				await withSpinner(
					() => finalizeDependencies(hydrationValues),
					"finalizing dependencies"
				);
			}

			await runCommand("pnpm lint --fix", "auto-fixing lint rules");
			await runCommand("pnpm format --write", "formatting files");

			if (hydrationSkips["skip-setup"]) {
				skipSpinnerBlock(`Done hydrating, and skipping setup command.`);
			} else {
				successSpinnerBlock("Done hydrating. Starting setup command...");

				await setupWithInformation({
					octokit,
					values: {
						...hydrationValues,
						skipUninstalls: true,
					},
				});
			}
		},
	});
}
