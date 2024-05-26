import prettier from "prettier";

export async function formatJson(value: object) {
	return await prettier.format(
		JSON.stringify(
			Object.fromEntries(
				Object.entries(value).filter((entry) => entry[1] !== undefined),
			),
		),
		{
			parser: "json",
			useTabs: true,
		},
	);
}
