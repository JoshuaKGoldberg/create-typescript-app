import { ModeRunner } from "../bin/mode.js";
import { outro } from "../shared/cli/outro.js";
import { StatusCodes } from "../shared/codes.js";
import { ensureGitRepository } from "../shared/ensureGitRepository.js";
import { readOptions } from "../shared/options/readOptions.js";
import { runOrRestore } from "../shared/runOrRestore.js";
import { migrateWithOptions } from "./migrateWithOptions.js";

export const migrate: ModeRunner = async (args) => {
	const inputs = await readOptions(args);
	if (inputs.cancelled) {
		return {
			code: StatusCodes.Cancelled,
			options: inputs.options,
		};
	}

	await ensureGitRepository();

	return {
		code: await runOrRestore({
			run: async () => {
				await migrateWithOptions(inputs);

				outro([
					{
						label: "You may consider committing these changes:",
						lines: [
							`git add -A`,
							`git commit -m "migrated repo to create-typescript-app ✨`,
							`git push`,
						],
					},
				]);
			},
			skipRestore: inputs.options.skipRestore,
		}),
		options: inputs.options,
	};
};
