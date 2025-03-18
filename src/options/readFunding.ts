import { TakeInput } from "bingo";
import { inputFromFile } from "input-from-file";

import { swallowError } from "../utils/swallowError.js";

export async function readFunding(take: TakeInput) {
	return swallowError(
		await take(inputFromFile, { filePath: ".github/FUNDING.yml" }),
	)
		?.split(":")[1]
		?.trim();
}
