import * as prompts from "@clack/prompts";

export function handleCancel(): never {
	prompts.cancel("Operation cancelled. Exiting - maybe another time? 👋");
	// eslint-disable-next-line n/no-process-exit
	process.exit(1);
}

export function handlePromptCancel<Value>(value: Value) {
	if (prompts.isCancel(value)) {
		handleCancel();
	}

	return value as Exclude<Value, symbol>;
}
