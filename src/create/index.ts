import * as prompts from "@clack/prompts";
import chalk from "chalk";
import { $ } from "execa";
import fs from "node:fs/promises";

import { augmentValuesWithNpmInfo } from "../shared/augmentValuesWithNpmInfo.js";
import { outro } from "../shared/cli/outro.js";
import { getPrefillOrPromptedValue } from "../shared/getPrefillOrPromptedValue.js";
import { readInputs } from "../shared/inputs.js";
import { runOrRestore } from "../shared/runOrRestore.js";
import { createWithValues } from "./createWithValues.js";

export async function create(args: string[]) {
	const inputs = await readInputs({
		args,
		overrides: {
			repository: async () => {
				return await getPrefillOrPromptedValue(
					undefined,
					"What would you like the kebab-case directory and repository name to be?",
				);
			},
		},
	});

	if (!(await createAndEnterRepository(inputs.values.repository))) {
		prompts.outro(
			chalk.red(
				`The ${inputs.values.repository} directory already exists. Please remove the directory or try a different name.`,
			),
		);
		return;
	}

	return await runOrRestore({
		run: async () => {
			const { sentToGitHub } = await createWithValues({
				...inputs,
				values: await augmentValuesWithNpmInfo(inputs.values),
			});

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
									`cd ${inputs.values.repository}`,
									`gh repo create ${inputs.values.repository} --public --source=. --remote=origin`,
									`npx template-typescript-node-package --mode initialize`,
									`git add -A`,
									`git commit -m "chore: initial commit ✨"`,
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
		skipRestore: inputs.values.skipRestore ?? true,
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
