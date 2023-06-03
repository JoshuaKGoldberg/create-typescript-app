import * as prompts from "@clack/prompts";
import chalk from "chalk";

import { logLine } from "./cli/lines.js";
import { handlePromptCancel } from "./prompts.js";

export class PrefillPrompter {
	#shouldLogLineBeforePrefill = true;

	async getPrefillOrPromptedValue(
		key: string,
		existingValue: string | undefined,
		message: string,
		placeholder?: string
	) {
		if (existingValue) {
			if (this.#shouldLogLineBeforePrefill) {
				logLine();
				this.#shouldLogLineBeforePrefill = false;
			}

			logLine(chalk.gray(`Pre-filling ${key} to ${existingValue}.`));
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

	reset() {
		this.#shouldLogLineBeforePrefill = true;
	}
}
