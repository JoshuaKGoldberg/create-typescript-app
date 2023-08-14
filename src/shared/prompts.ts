import * as prompts from "@clack/prompts";

export function handleCancel() {
	prompts.cancel("Operation cancelled. Exiting - maybe another time? 👋");
	// eslint-disable-next-line n/no-process-exit
	throw new Error("GitHub authentication failed.");
}

export function handlePromptCancel(
	value: boolean | string | symbol,
): asserts value is boolean | string {
	if (prompts.isCancel(value)) {
		handleCancel();
	}
}
