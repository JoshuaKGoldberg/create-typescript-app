import fs from "node:fs/promises";

const globPaths = [
	...extensions(".babelrc", "cjs", "cts", "js", "json", "mjs"),
	...extensions(".eslintrc", "js", "json", "yml"),
	...extensions(".prettierrc", "json", "json5", "yaml", "yml"),
	...extensions("babel.config", "cjs", "cts", "js", "json", "mjs"),
	...extensions("jest.config", "cjs", "js", "json", "mjs", "ts"),
	"./src/**/*.js",
	".babelrc",
	".npmignore",
	"CODE_OF_CONDUCT.md",
	"CONTRIBUTING.md",
	"DEVELOPMENT.md",
	"dist",
	"lib",
	"package-lock.json",
	"yarn.lock",
];

function extensions(base: string, ...extensions: string[]) {
	return extensions.map((extension) => [base, extension].join("."));
}

export async function clearUnnecessaryFiles() {
	for (const globPath of globPaths) {
		await fs.rm(globPath, { force: true, recursive: true });
	}
}
