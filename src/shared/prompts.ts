import * as prompts from "@clack/prompts";

export function filterPromptCancel<Value>(value: Value | symbol) {
	return prompts.isCancel(value) ? undefined : value;
}
