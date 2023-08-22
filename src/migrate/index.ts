import { augmentValuesWithNpmInfo } from "../shared/augmentValuesWithNpmInfo.js";
import { outro } from "../shared/cli/outro.js";
import { getGitDefaultSettings } from "../shared/getGitDefaultSettings.js";
import { readInputs } from "../shared/inputs.js";
import { runOrRestore } from "../shared/runOrRestore.js";
import { migrateWithValues } from "./migrateWithValues.js";
import { getMigrationDefaults } from "./values/getMigrationDefaults.js";

export async function migrate(args: string[]) {
	const gitDefaults = await getGitDefaultSettings();
	const inputs = await readInputs({
		args,
		defaults: await getMigrationDefaults(),
		overrides: {
			owner: () => gitDefaults.owner,
			repository: () => gitDefaults.repository,
		},
	});

	return await runOrRestore({
		run: async () => {
			await migrateWithValues({
				...inputs,
				values: await augmentValuesWithNpmInfo(inputs.values),
			});

			outro([
				{
					label: "You may consider committing these changes:",
					lines: [
						`git add -A`,
						`git commit -m "migrated repo to template-typescript-node-package ✨`,
						`git push`,
					],
				},
			]);
		},
		skipRestore: inputs.values.skipRestore,
	});
}
