import { TakeInput } from "bingo";
import { inputFromFileJSON } from "input-from-file-json";

import { PartialPackageData } from "../types.js";

export async function readPackageDataFull(
	take: TakeInput,
): Promise<PartialPackageData> {
	return (
		(await take(inputFromFileJSON, {
			filePath: "./package.json",
		})) ?? {}
	);
}
