import { outro } from "../shared/cli/outro.js";
import { ensureGitRepository } from "../shared/ensureGitRepository.js";
import { readOptions } from "../shared/options/readOptions.js";
import { runOrRestore } from "../shared/runOrRestore.js";
import { migrateWithOptions } from "./migrateWithOptions.js";

export async function migrate(args: string[]) {
	const inputs = await readOptions(args);

	await ensureGitRepository();

	return await runOrRestore({
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
	});
}
