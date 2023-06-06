import { execaCommand } from "execa";

const ignoreGlobs = [
	"./src/**/*.js",
	".eslintrc.j*",
	".npmignore",
	".prettierrc.*",
	"babel.*",
	"CODE_OF_CONDUCT.md",
	"CONTRIBUTING.md",
	"DEVELOPMENT.md",
	"dist",
	"jest.*",
	"lib",
	"package-lock.json",
	"yarn.lock",
];

export async function clearUnnecessaryFiles() {
	try {
		await execaCommand(
			`rm -rf ${ignoreGlobs.map((glob) => `"${glob}"`).join(" ")}`
		);
	} catch {
		// (we ignore failures if nothing matched)
	}
}
