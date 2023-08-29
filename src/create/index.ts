import * as prompts from "@clack/prompts";
import chalk from "chalk";
import { $ } from "execa";
import fs from "node:fs/promises";

import { outro } from "../shared/cli/outro.js";
import { readOptions } from "../shared/options/readOptions.js";
import { runOrRestore } from "../shared/runOrRestore.js";
import { createRerunSuggestion } from "./createRerunSuggestion.js";
import { createWithOptions } from "./createWithOptions.js";

export async function create(args: string[]) {
	const inputs = await readOptions(args);

	if (!(await createAndEnterRepository(inputs.options.repository))) {
		prompts.outro(
			chalk.red(
				`The ${inputs.options.repository} directory already exists. Please remove the directory or try a different name.`,
			),
		);
		return;
	}

	return await runOrRestore({
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
	});
}

async function createAndEnterRepository(repository: string) {
	if ((await fs.readdir(".")).includes(repository)) {
		return false;
	}

	await fs.mkdir(repository);
	process.chdir(repository);
	await $`git init`;

	return true;
}
