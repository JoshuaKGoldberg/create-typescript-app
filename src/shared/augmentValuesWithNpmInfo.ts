import { getPrefillOrPromptedValue } from "./getPrefillOrPromptedValue.js";
import { InputValues } from "./inputs.js";

export interface ValuesWithNpmInfo extends InputValues {
	author: string;
	email: string;
}

export async function augmentValuesWithNpmInfo<Values extends InputValues>(
	values: Values,
): Promise<ValuesWithNpmInfo & Values> {
	return {
		...values,
		author: await getPrefillOrPromptedValue(
			values.author,
			"What author (username) will be used for the npm owner?",
			values.owner.toLowerCase(),
		),
		email: await getPrefillOrPromptedValue(
			values.email,
			"What email will be used for the npm owner?",
		),
	};
}
