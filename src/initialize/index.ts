import { outro } from "../shared/cli/outro.js";
import { ensureGitRepository } from "../shared/ensureGitRepository.js";
import { readOptions } from "../shared/options/readOptions.js";
import { runOrRestore } from "../shared/runOrRestore.js";
import { initializeWithOptions } from "./initializeWithOptions.js";

export async function initialize(args: string[]) {
	const inputs = await readOptions(args);

	await ensureGitRepository();

	return await runOrRestore({
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
	});
}
