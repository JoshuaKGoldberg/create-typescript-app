import { outro } from "../shared/cli/outro.js";
import { StatusCodes } from "../shared/codes.js";
import { ensureGitRepository } from "../shared/ensureGitRepository.js";
import { generateNextSteps } from "../shared/generateNextSteps.js";
import { readOptions } from "../shared/options/readOptions.js";
import { runOrRestore } from "../shared/runOrRestore.js";
import { ModeRunner } from "../shared/types.js";
import { initializeWithOptions } from "./initializeWithOptions.js";

export const initialize: ModeRunner = async (args) => {
	const inputs = await readOptions(args, "initialize");
	if (inputs.cancelled) {
		return {
			code: StatusCodes.Cancelled,
			error: inputs.error,
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
						variant: "code",
					},
					...generateNextSteps(inputs.options),
				]);
			},
			skipRestore: inputs.options.skipRestore,
		}),
		options: inputs.options,
	};
};
