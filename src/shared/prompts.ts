import * as prompts from "@clack/prompts";

export function filterPromptCancel<Value>(value: symbol | Value) {
	return prompts.isCancel(value) ? undefined : value;
}
