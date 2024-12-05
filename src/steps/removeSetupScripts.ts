import * as fs from "node:fs/promises";

import { formatTypeScript } from "./writing/creation/formatters/formatTypeScript.js";

const globPaths = [
	"./bin",
	"./docs",
	"./script",
	"./src/bin",
	"./src/create",
	"./src/initialize",
	"./src/migrate",
	"./src/next",
	"./src/shared",
	"./src/steps",
];

export async function removeSetupScripts() {
	for (const globPath of globPaths) {
		await fs.rm(globPath, { force: true, recursive: true });
	}

	await fs.writeFile(
		"./src/index.ts",
		await formatTypeScript(
			[`export * from "./greet.js";`, `export * from "./types.js";`].join("\n"),
		),
	);
}
