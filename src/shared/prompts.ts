import * as prompts from "@clack/prompts";

export function handleCancel() {
	prompts.cancel("Operation cancelled. Exiting - maybe another time? 👋");
	// eslint-disable-next-line n/no-process-exit
	process.exit(1);
}

export function handlePromptCancel(
	value: boolean | string | symbol
): asserts value is boolean | string {
	if (prompts.isCancel(value)) {
		handleCancel();
	}
}
