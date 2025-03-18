import { createInput } from "bingo";
import { z } from "zod";

export const inputFromOctokit = createInput({
	args: {
		endpoint: z.string(),
		options: z.record(z.string(), z.unknown()).optional(),
	},
	// TODO: Strongly type this, then push it upstream to Bingo
	// https://github.com/JoshuaKGoldberg/bingo/issues/296
	async produce({ args, fetchers }): Promise<unknown> {
		try {
			const response = await fetchers.octokit.request(args.endpoint, {
				headers: {
					"X-GitHub-Api-Version": "2022-11-28",
				},
				request: { retries: 0 },
				...args.options,
			});

			return response.data;
		} catch {
			return undefined;
		}
	},
});
