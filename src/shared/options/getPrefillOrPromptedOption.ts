import * as prompts from "@clack/prompts";

import { handlePromptCancel } from "../prompts.js";

export async function getPrefillOrPromptedOption(
	existingValue: string | undefined,
	message: string,
	placeholder?: string,
) {
	if (existingValue) {
		return existingValue;
	}

	const value = handlePromptCancel(
		await prompts.text({
			message,
			placeholder,
			validate: (val) => {
				if (val.length === 0) {
					return "Please enter a value.";
				}
			},
		}),
	);

	return value;
}
