import { createInput } from "bingo";
import { z } from "zod";

export const inputFromDirectory = createInput({
	args: {
		directoryPath: z.string(),
	},
	async produce({ args, fs }) {
		return await fs.readDirectory(args.directoryPath);
	},
});
