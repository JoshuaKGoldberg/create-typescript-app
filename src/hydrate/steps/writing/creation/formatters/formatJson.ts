import prettier from "prettier";

export function formatJson(value: unknown) {
	return prettier.format(JSON.stringify(value), { parser: "json" });
}
