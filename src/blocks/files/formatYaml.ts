import type { DumpOptions } from "js-yaml";

import { CORE_SCHEMA, dump, nullCoreTag, visit } from "js-yaml";

import { removeUsesQuotes } from "./removeUsesQuotes.ts";

const options: DumpOptions = {
	lineWidth: -1,
	schema: CORE_SCHEMA.withTags({
		...nullCoreTag,
		represent: () => "~",
	}),
	transform(documents) {
		visit(documents, (node) => {
			if (node.kind === "mapping") {
				node.items.sort((a, b) => {
					const x = a.key.kind === "scalar" ? a.key.value : "";
					const y = b.key.kind === "scalar" ? b.key.value : "";
					return x < y ? -1 : x > y ? 1 : 0;
				});
			}

			// https://github.com/nodeca/js-yaml/pull/515
			if (node.kind === "scalar" && node.value.includes("\n\t\t")) {
				node.value = node.value
					.replaceAll(": |-\n", ": |\n")
					.replaceAll("\n\t  \t\t\t", "")
					.replaceAll(/\n\t\t\t\t\t\t$/g, "");
			}
		});
	},
};

export function formatYaml(value: unknown) {
	return removeUsesQuotes(dump(value, options)).replaceAll(/\n(\S)/g, "\n\n$1");
}
