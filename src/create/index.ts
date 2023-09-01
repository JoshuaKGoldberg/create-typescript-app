import * as prompts from "@clack/prompts";
import chalk from "chalk";

import { ModeResult } from "../bin/mode.js";
import { outro } from "../shared/cli/outro.js";
import { StatusCodes } from "../shared/codes.js";
import { readOptions } from "../shared/options/readOptions.js";
import { runOrRestore } from "../shared/runOrRestore.js";
import { createAndEnterRepository } from "./createAndEnterRepository.js";
import { createRerunSuggestion } from "./createRerunSuggestion.js";
import { createWithOptions } from "./createWithOptions.js";

export async function create(args: string[]): Promise<ModeResult> {
	const inputs = await readOptions(args);
	if (inputs.cancelled) {
		return {
			code: StatusCodes.Cancelled,
			options: inputs.options,
		};
	}

	const wat = await createAndEnterRepository(inputs.options.repository);
	if (!wat) {
		prompts.outro(
			chalk.red(
				`The ${inputs.options.repository} directory already exists. Please remove the directory or try a different name.`,
			),
		);
		return { code: StatusCodes.Failure, options: inputs.options };
	}

	return {
		code: await runOrRestore({
			run: async () => {
				const { sentToGitHub } = await createWithOptions(inputs);

				outro(
					sentToGitHub
						? [
								{
									label:
										"Now all you have to do is populate the repository's ACCESS_TOKEN and NPM_TOKEN secrets, and enable the Codecov and Renovate GitHub apps.",
								},
						  ]
						: [
								{
									label:
										"Consider creating a GitHub repository from the new directory:",
									lines: [
										`cd ${inputs.options.repository}`,
										createRerunSuggestion("initialize", {
											...inputs.options,
											skipGitHubApi: false,
											skipInstall: false,
										}),
										`git add -A`,
										`git commit -m "feat: initial commit ✨"`,
										`git push -u origin main`,
									],
								},
								{
									label:
										"If you do, be sure to populate its ACCESS_TOKEN and NPM_TOKEN secrets, and enable the Codecov and Renovate GitHub apps.",
								},
						  ],
				);
			},
			skipRestore: inputs.options.skipRestore,
		}),
		options: inputs.options,
	};
}
