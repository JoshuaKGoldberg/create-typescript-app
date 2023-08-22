import * as prompts from "@clack/prompts";

import { handlePromptCancel } from "./prompts.js";

export async function getPrefillOrPromptedValue(
	existingValue: string | undefined,
	message: string,
	placeholder?: string,
) {
	if (existingValue) {
		return existingValue;
	}

	const value = await prompts.text({
		message,
		placeholder,
		validate: (val) => {
			if (val.length === 0) {
				return "Please enter a value.";
			}
		},
	});

	handlePromptCancel(value);

	return value;
}
