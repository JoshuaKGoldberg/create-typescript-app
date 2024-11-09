import { createInput } from "create";
import { z } from "zod";

export const inputTextFile = createInput({
	args: {
		filePath: z.string(),
	},
	async produce({ args, fs }) {
		try {
			return await fs.readFile(args.filePath);
		} catch {
			return undefined;
		}
	},
});
