import { TakeInput } from "bingo";
import { inputFromFile } from "input-from-file";

import { swallowError } from "../utils/swallowError.ts";

export async function readFunding(take: TakeInput) {
	for (const filePath of [".github/FUNDING.yaml", ".github/FUNDING.yml"]) {
		const funding = swallowError(await take(inputFromFile, { filePath }))
			?.split(":")[1]
			?.trim();

		if (funding) {
			return funding;
		}
	}

	return undefined;
}
