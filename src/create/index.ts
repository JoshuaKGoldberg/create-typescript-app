import * as prompts from "@clack/prompts";
import chalk from "chalk";

import { outro } from "../shared/cli/outro.js";
import { StatusCodes } from "../shared/codes.js";
import { generateNextSteps } from "../shared/generateNextSteps.js";
import { readOptions } from "../shared/options/readOptions.js";
import { runOrRestore } from "../shared/runOrRestore.js";
import { ModeRunner } from "../shared/types.js";
import { createAndEnterGitDirectory } from "./createAndEnterGitDirectory.js";
import { createRerunSuggestion } from "./createRerunSuggestion.js";
import { createWithOptions } from "./createWithOptions.js";

export const create: ModeRunner = async (args, promptedOptions) => {
	const inputs = await readOptions(args, "create", promptedOptions);
	if (inputs.cancelled) {
		return {
			code: StatusCodes.Cancelled,
			error: inputs.error,
			options: inputs.options,
		};
	}

	if (!(await createAndEnterGitDirectory(inputs.options.directory))) {
		prompts.outro(
			chalk.red(
				`The ${inputs.options.directory} directory already exists and is not empty. Please clear the directory, run with --mode initialize, or try a different directory.`,
			),
		);
		return { code: StatusCodes.Failure, options: inputs.options };
	}

	return {
		code: await runOrRestore({
			run: async () => {
				const { sentToGitHub } = await createWithOptions(inputs);
				const nextSteps = generateNextSteps(inputs.options);

				outro(
					sentToGitHub
						? nextSteps
						: [
								{
									label:
										"Consider creating a GitHub repository from the new directory:",
									lines: [
										`cd ${inputs.options.repository}`,
										createRerunSuggestion({
											...inputs.options,
											mode: "initialize",
											skipGitHubApi: false,
											skipInstall: false,
										}),
										`git add -A`,
										`git commit -m "feat: initial commit ✨"`,
										`git push -u origin main`,
									],
									variant: "code",
								},
								...nextSteps,
							],
				);
			},
			skipRestore: inputs.options.skipRestore,
		}),
		options: inputs.options,
	};
};
