import { TakeInput } from "bingo";
import { inputFromFile } from "input-from-file";

import { parseDefineConfig } from "../utils/parseDefineConfig.ts";
import { swallowError } from "../utils/swallowError.ts";

export async function readBundle(take: TakeInput) {
	const contents = swallowError(
		await take(inputFromFile, { filePath: "tsdown.config.ts" }),
	);
	if (!contents) {
		return undefined;
	}

	const data = parseDefineConfig(contents);

	// tsdown bundles by default, so only an explicit unbundle: true opts out
	return data && data.unbundle !== true;
}
