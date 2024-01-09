import * as fs from "node:fs/promises";
import prettier from "prettier";

export async function clearChangelog() {
	await fs.writeFile(
		"./CHANGELOG.md",
		await prettier.format(`# Changelog`, { parser: "markdown" }),
	);
}
