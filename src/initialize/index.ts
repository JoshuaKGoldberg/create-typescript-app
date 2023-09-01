import { ModeRunner } from "../bin/mode.js";
import { outro } from "../shared/cli/outro.js";
import { StatusCodes } from "../shared/codes.js";
import { ensureGitRepository } from "../shared/ensureGitRepository.js";
import { readOptions } from "../shared/options/readOptions.js";
import { runOrRestore } from "../shared/runOrRestore.js";
import { initializeWithOptions } from "./initializeWithOptions.js";

export const initialize: ModeRunner = async (args) => {
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
				await initializeWithOptions(inputs);

				outro([
					{
						label: "You may consider committing these changes:",
						lines: [
							`git add -A`,
							`git commit -m "feat: initialized repo ✨`,
							`git push`,
						],
					},
					{
						label:
							"Otherwise, all you have to do is populate the repository's ACCESS_TOKEN and NPM_TOKEN secrets, and enable the Codecov and Renovate GitHub apps.",
					},
				]);
			},
			skipRestore: inputs.options.skipRestore,
		}),
		options: inputs.options,
	};
};
