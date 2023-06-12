import jsYaml from "js-yaml";

const options: jsYaml.DumpOptions = {
	lineWidth: -1,
	noCompatMode: true,
	// https://github.com/nodeca/js-yaml/pull/515
	replacer(_, value: unknown) {
		if (typeof value !== "string" || !value.includes("\n\t\t")) {
			return value;
		}

		return value
			.replaceAll(": |-\n", ": |\n")
			.replaceAll("\n\t  \t\t\t", "")

			.replaceAll(/\n\t\t\t\t\t\t$/g, "");
	},
	sortKeys: true,
	styles: {
		"!!null": "canonical",
	},
};

export function formatYaml(value: unknown) {
	return jsYaml.dump(value, options).replaceAll(`\\"`, `"`);
}
