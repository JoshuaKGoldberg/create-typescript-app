import type { DumpOptions } from "js-yaml";

import { CORE_SCHEMA, dump, nullCoreTag, visit } from "js-yaml";

import { removeUsesQuotes } from "./removeUsesQuotes.js";

const options: DumpOptions = {
	lineWidth: -1,
	schema: CORE_SCHEMA.withTags({
		...nullCoreTag,
		represent: () => "~",
	}),
	sortKeys: true,
	// https://github.com/nodeca/js-yaml/pull/515
	transform(documents) {
		visit(documents, (node) => {
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
