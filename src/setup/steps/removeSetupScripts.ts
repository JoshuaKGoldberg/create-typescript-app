import fs from "node:fs/promises";

export async function removeSetupScripts() {
	await fs.rm("./script", { force: true, recursive: true });
	await fs.rm("./src/hydrate", { force: true, recursive: true });
	await fs.rm("./src/setup", { force: true, recursive: true });
	await fs.rm(".github/workflows/hydrate.yml");
	await fs.rm(".github/workflows/setup.yml");
}
