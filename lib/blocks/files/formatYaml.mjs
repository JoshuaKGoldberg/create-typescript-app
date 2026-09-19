import { removeUsesQuotes } from "./removeUsesQuotes.mjs";
import { CORE_SCHEMA, dump, nullCoreTag, visit } from "js-yaml";
//#region src/blocks/files/formatYaml.ts
const options = {
	lineWidth: -1,
	schema: CORE_SCHEMA.withTags({
		...nullCoreTag,
		represent: () => "~"
	}),
	sortKeys: true,
	transform(documents) {
		visit(documents, (node) => {
			if (node.kind === "scalar" && node.value.includes("\n		")) node.value = node.value.replaceAll(": |-\n", ": |\n").replaceAll("\n	  			", "").replaceAll(/\n\t\t\t\t\t\t$/g, "");
		});
	}
};
function formatYaml(value) {
	return removeUsesQuotes(dump(value, options)).replaceAll(/\n(\S)/g, "\n\n$1");
}
//#endregion
export { formatYaml };
