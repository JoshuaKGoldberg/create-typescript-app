import prettier from "prettier";

export async function formatJson(value: unknown) {
	return await prettier.format(JSON.stringify(value), {
		parser: "json",
	});
}
