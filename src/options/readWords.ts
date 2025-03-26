import { TakeInput } from "bingo";
import { inputFromFileJSON } from "input-from-file-json";

import { swallowErrorAsync } from "../utils/swallowErrorAsync.js";

export async function readWords(take: TakeInput) {
	const cspell =
		(await swallowErrorAsync(
			take(inputFromFileJSON, {
				filePath: "./cspell.json",
			}),
		)) || {};

	return (cspell as { words?: string[] }).words;
}
