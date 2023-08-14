import * as prompts from "@clack/prompts";

export function handleCancel() {
	prompts.cancel("Operation cancelled. Exiting - maybe another time? 👋");
	throw new Error("GitHub authentication failed.");
}

export function handlePromptCancel(
	value: boolean | string | symbol,
): asserts value is boolean | string {
	if (prompts.isCancel(value)) {
		handleCancel();
	}
}
