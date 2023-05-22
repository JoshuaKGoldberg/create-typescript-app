import * as prompts from "@clack/prompts";

export function handleCancel(): never {
	prompts.cancel("Operation cancelled. Exiting setup - maybe another time? 👋");
	process.exit(0);
}

export function handlePromptCancel(
	value: boolean | string | symbol
): asserts value is boolean | string {
	if (prompts.isCancel(value)) {
		handleCancel();
	}
}
