import { execaCommand } from "execa";

export async function clearUnnecessaryFiles() {
	for (const glob of [
		"dist lib package-lock.json yarn.lock",
		".eslint*",
		".prettier*",
		"jest.*",
		"./src/**/*.js",
	]) {
		try {
			await execaCommand(`rm -rf ${glob}`);
		} catch {
			// (we ignore failures if nothing matched)
		}
	}
}
