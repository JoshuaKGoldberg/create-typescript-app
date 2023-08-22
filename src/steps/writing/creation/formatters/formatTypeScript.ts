import prettier from "prettier";

export async function formatTypeScript(value: string) {
	return await prettier.format(value, { parser: "typescript" });
}
