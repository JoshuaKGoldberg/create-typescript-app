import jsYaml from "js-yaml";

import { removeUsesQuotes } from "./removeUsesQuotes.js";

export function formatYamlAction(value: object) {
	return removeUsesQuotes(jsYaml.dump(value).replaceAll(/\n(\S)/g, "\n\n$1"));
}
