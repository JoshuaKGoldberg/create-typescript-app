import fs from "node:fs/promises";

const globPaths = [
	"./script",
	"./src/hydrate",
	"./src/setup",
	"./src/shared",
	".github/workflows/hydrate.yml",
	".github/workflows/setup.yml",
];

export async function removeSetupScripts() {
	for (const globPath of globPaths) {
		await fs.rm(globPath, { force: true, recursive: true });
	}
}
