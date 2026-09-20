import { createInput } from "bingo";
import { z } from "zod";

export const inputFromFetchJson = createInput({
	args: {
		init: z.custom<RequestInit>().optional(),
		url: z.string(),
	},
	async produce({ args, fetchers, offline }): Promise<unknown> {
		if (offline) {
			return undefined;
		}

		try {
			const response = await fetchers.fetch(args.url, args.init);

			return response.ok ? await response.json() : undefined;
		} catch {
			return undefined;
		}
	},
});
