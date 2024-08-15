import { formatYaml } from "../formatters/formatYaml.js";

export function formatWorkflowYaml(value: unknown) {
	return (
		formatYaml(value)
			.replaceAll(/\n(\S)/g, "\n\n$1")
			// https://github.com/nodeca/js-yaml/pull/515
			.replaceAll(/: "\\n(.+)"/g, ": |\n$1")
			.replaceAll("\\n", "\n")
			.replaceAll("\\t", "  ")
	);
}
