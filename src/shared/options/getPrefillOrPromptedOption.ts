import * as prompts from "@clack/prompts";

import { filterPromptCancel } from "../prompts.js";

export async function getPrefillOrPromptedOption(
	existingValue: string | undefined,
	message: string,
	getPlaceholder?: () => Promise<string | undefined>,
) {
	if (existingValue) {
		return existingValue;
	}

	const value = filterPromptCancel(
		await prompts.text({
			message,
			placeholder: await getPlaceholder?.(),
			validate: (val) => {
				if (val.length === 0) {
					return "Please enter a value.";
				}
			},
		}),
	);

	return value;
}
