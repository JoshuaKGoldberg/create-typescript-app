import { outtro } from "../shared/cli/outtro.js";
import { getGitDefaultSettings } from "../shared/getDefaultSettings.js";
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

			outtro([
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
