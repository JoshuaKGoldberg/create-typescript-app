import { PrefillPrompter } from "../../shared/PrefillPrompter.js";
import { InputValues } from "../../shared/inputs.js";

export async function augmentWithHydrationValues(values: InputValues) {
	const prompter = new PrefillPrompter();

	return {
		...values,
		author: await prompter.getPrefillOrPromptedValue(
			"author",
			values.author,
			"What author will be used for the owner?"
		),
		email: await prompter.getPrefillOrPromptedValue(
			"email",
			values.email,
			"What email will be used for the owner?"
		),
	};
}
