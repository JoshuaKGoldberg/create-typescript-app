import { createInput } from "create";
import { z } from "zod";

export const inputJSONFile = createInput({
	args: {
		filePath: z.string(),
	},
	async produce({ args, fs }) {
		try {
			return JSON.parse(await fs.readFile(args.filePath)) as unknown;
		} catch {
			return undefined;
		}
	},
});
