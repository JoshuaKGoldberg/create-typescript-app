import { createInput } from "create";
import { z } from "zod";

export const inputFromScript = createInput({
	args: {
		command: z.string(),
	},
	async produce({ args, runner }) {
		try {
			return await runner(args.command);
		} catch (error) {
			return error instanceof Error ? error : new Error(error as string);
		}
	},
});
