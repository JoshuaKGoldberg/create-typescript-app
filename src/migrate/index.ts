import { outro } from "../shared/cli/outro.js";
import { ensureGitRepository } from "../shared/ensureGitRepository.js";
import { readInputs } from "../shared/options/readOptions.js";
import { runOrRestore } from "../shared/runOrRestore.js";
import { migrateWithOptions } from "./migrateWithOptions.js";

export async function migrate(args: string[]) {
	const inputs = await readInputs(args);

	await ensureGitRepository();

	return await runOrRestore({
		run: async () => {
			await migrateWithOptions(inputs);

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
		skipRestore: inputs.options.skipRestore,
	});
}
