import * as prompts from "@clack/prompts";

import { filterPromptCancel } from "../prompts.js";

export async function getPrefillOrPromptedOption(
	name: string,
	auto: boolean,
	message: string,
	getDefaultValue?: () => Promise<string | undefined>,
) {
	const defaultValue = await getDefaultValue?.();

	if (auto || defaultValue) {
		return {
			error: defaultValue
				? undefined
				: `Could not infer a default value for ${name}.`,
			value: defaultValue,
		};
	}

	return {
		value: filterPromptCancel(
			await prompts.text({
				message,
				placeholder: defaultValue,
				validate: (val) => {
					if (val.length === 0) {
						return "Please enter a value.";
					}
				},
			}),
		),
	};
}
