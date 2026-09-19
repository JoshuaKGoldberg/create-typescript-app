import { z } from "zod";
import { createInput } from "bingo";
//#region src/inputs/inputFromDirectory.ts
const inputFromDirectory = createInput({
	args: { directoryPath: z.string() },
	async produce({ args, fs }) {
		return await fs.readDirectory(args.directoryPath);
	}
});
//#endregion
export { inputFromDirectory };
