import { runOrSkip } from "../shared/cli/runOrSkip.js";
import { withSpinner } from "../shared/cli/spinners.js";
import { HelpersAndValues } from "../shared/inputs.js";
import { finalizeDependencies } from "../steps/finalizeDependencies.js";
import { runCommands } from "../steps/runCommands.js";
import { writeReadme } from "../steps/writeReadme.js";
import { writeStructure } from "../steps/writing/writeStructure.js";
import { addAllContributors } from "./addAllContributors.js";

export async function createWithValues(input: HelpersAndValues) {
	await withSpinner("Creating repository structure", async () => {
		await writeStructure(input.values);
		await writeReadme(input.values);
	});

	await runOrSkip(
		"Adding contributors to table",
		input.values.skipContributors,
		async () => {
			await addAllContributors(input.values.owner);
		},
	);

	await runOrSkip("Installing packages", input.values.skipInstall, async () =>
		finalizeDependencies(input.values),
	);

	await runCommands("Cleaning up files", [
		"pnpm lint --fix",
		"pnpm format --write",
	]);
}
