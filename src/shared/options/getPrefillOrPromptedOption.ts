import * as prompts from "@clack/prompts";

import { filterPromptCancel } from "../prompts.js";

export interface GetPrefillOrPromptedOptionOptions {
	auto: boolean;
	getDefaultValue?: () => Promise<string | undefined>;
	message: string;
	name: string;
}

export async function getPrefillOrPromptedOption({
	auto,
	getDefaultValue,
	message,
	name,
}: GetPrefillOrPromptedOptionOptions) {
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
