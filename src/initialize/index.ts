import { outro } from "../shared/cli/outro.js";
import { getGitDefaultSettings } from "../shared/getGitDefaultSettings.js";
import { readInputs } from "../shared/inputs.js";
import { runOrRestore } from "../shared/runOrRestore.js";
import { initializeWithValues } from "./initializeWithValues.js";

export async function initialize(args: string[]) {
	const inputs = await readInputs({
		args,
		defaults: await getGitDefaultSettings(),
	});

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
