import { lowerFirst } from "./lowerFirst.js";
import { skipSpinnerBlock, withSpinner } from "./spinners.js";

export async function runOrSkip<Return>(
	label: string,
	skip: boolean | undefined,
	action: () => Promise<Return>,
) {
	if (skip) {
		skipSpinnerBlock(`Skipping ${lowerFirst(label)}.`);
	} else {
		return await withSpinner(label, action);
	}
}
