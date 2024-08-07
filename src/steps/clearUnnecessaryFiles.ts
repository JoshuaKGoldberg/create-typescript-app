import * as fs from "node:fs/promises";

const globPaths = [
	...extensions(".babelrc", "cjs", "cts", "js", "json", "mjs"),
	...extensions(".eslintrc", "js", "json", "yml"),
	...extensions(".mocha", "cjs", "js", "json", "jsonc", "yaml", "yml"),
	...extensions(".prettierrc", "json", "json5", "yaml", "yml"),
	...extensions("prettier.config", "js", "mjs", "cjs"),
	...extensions("babel.config", "cjs", "cts", "js", "json", "mjs"),
	...extensions("jest.config", "cjs", "js", "json", "mjs", "ts"),
	"./src/**/*.js",
	".circleci/config.yml",
	".github/codecov.yml",
	".babelrc",
	".npmignore",
	".eslintignore",
	".eslintrc",
	"CODE_OF_CONDUCT.md",
	"CONTRIBUTING.md",
	".npmpackagejsonlintrc.json",
	"codecov.yml",
	"DEVELOPMENT.md",
	"dist",
	"lib",
	"package-lock.json",
	"travis.yml",
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
