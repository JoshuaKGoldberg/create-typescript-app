import { outro } from "./lib/shared/cli/outro.js";
import { generateNextSteps } from "./lib/shared/generateNextSteps.js";

outro([
	{
		label: "You may consider committing these changes:",
		lines: [
			`git add -A`,
			`git commit -m "feat: initialized repo ✨`,
			`git push`,
		],
		variant: "code",
	},
	...generateNextSteps({}),
]);
