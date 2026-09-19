import { z } from "zod";
import { createInput } from "bingo";
//#region src/inputs/inputFromOctokit.ts
const inputFromOctokit = createInput({
	args: {
		endpoint: z.string(),
		options: z.record(z.string(), z.unknown()).optional()
	},
	async produce({ args, fetchers }) {
		if (!fetchers.octokit) return;
		try {
			return (await fetchers.octokit.request(args.endpoint, {
				headers: { "X-GitHub-Api-Version": "2022-11-28" },
				request: { retries: 0 },
				...args.options
			})).data;
		} catch {
			return;
		}
	}
});
//#endregion
export { inputFromOctokit };
