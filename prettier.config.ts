import type { Config } from "prettier";

export default {
	overrides: [{ files: ".nvmrc", options: { parser: "yaml" } }],
	plugins: [
		"prettier-plugin-curly",
		"prettier-plugin-packagejson",
		"prettier-plugin-padding-lines",
		"prettier-plugin-sentences-per-line",
		"prettier-plugin-sh",
	],
	useTabs: true,
} satisfies Config;
