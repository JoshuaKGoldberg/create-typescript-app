import * as fs from "node:fs/promises";

const globPaths = [
	"./bin",
	"./docs",
	"./script",
	"./src/bin",
	"./src/create",
	"./src/initialize",
	"./src/migrate",
	"./src/shared",
	"./src/steps",
	".github/workflows/test-initialize.yml",
	".github/workflows/test-migrate.yml",
];

export async function removeSetupScripts() {
	for (const globPath of globPaths) {
		await fs.rm(globPath, { force: true, recursive: true });
	}
}
