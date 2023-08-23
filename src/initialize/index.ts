import { outro } from "../shared/cli/outro.js";
import { ensureGitRepository } from "../shared/ensureGitRepository.js";
import { readInputs } from "../shared/readInputs.js";
import { runOrRestore } from "../shared/runOrRestore.js";
import { initializeWithValues } from "./initializeWithValues.js";

export async function initialize(args: string[]) {
	const inputs = await readInputs(args);

	await ensureGitRepository();

	return await runOrRestore({
		run: async () => {
			await initializeWithValues(inputs);

			outro([
				{
					label: "You may consider committing these changes:",
					lines: [
						`git add -A`,
						`git commit -m "chore: initialized repo ✨`,
						`git push`,
					],
				},
			]);
		},
		skipRestore: inputs.values.skipRestore,
	});
}
