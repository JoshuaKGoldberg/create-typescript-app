import { readFileSafeAsJson } from "../../../shared/readFileSafeAsJson.js";
import { InputValues } from "../../../shared/readInputs.js";
import { formatJson } from "./formatters/formatJson.js";

const devDependenciesToRemove = [
	"@babel/core",
	"@babel/preset-env",
	"@babel/preset-react",
	"@babel/preset-typescript",
	"@swc/jest",
	"ava",
	"babel-jest",
	"commitlint",
	"cson-parser",
	"esbuild",
	"eslint-config-prettier",
	"eslint-plugin-prettier",
	"eslint-plugin-simple-import-sort",
	"jasmine",
	"jest",
	"mocha",
	"npm-run-all",
	"pretty-quick",
];

export async function writePackageJson(values: InputValues) {
	const existingPackageJson =
		((await readFileSafeAsJson("./package.json")) as null | object) ?? {};

	return await formatJson({
		// If we didn't already have a version, set it to 0.0.0
		version: "0.0.0",

		// To start, copy over all existing package fields (e.g. "dependencies")
		...existingPackageJson,

		author: { email: values.email, name: values.author },
		description: values.description,

		// We copy all existing dev dependencies except those we know are not used anymore
		devDependencies: copyDevDependencies(existingPackageJson),

		engines: {
			node: ">=18",
		},

		// Remove fields we know we don't want, such as old or redundant configs
		eslintConfig: undefined,
		husky: undefined,
		prettierConfig: undefined,
		types: undefined,

		// The rest of the fields are ones we know from our template
		files: ["lib/", "package.json", "LICENSE.md", "README.md"],
		license: "MIT",
		"lint-staged": {
			"*": "prettier --ignore-unknown --write",
		},
		main: "./lib/index.js",
		name: values.repository,
		packageManager: "pnpm@8.5.0",
		publishConfig: {
			provenance: true,
		},
		repository: {
			type: "git",
			url: `https://github.com/${values.owner}/${values.repository}`,
		},
		scripts: {
			build: "tsup",
			format: 'prettier "**/*" --ignore-unknown',
			"format:write": "pnpm format --write",
			lint: "eslint . .*js --max-warnings 0 --report-unused-disable-directives",
			...(!values.excludeLintKnip && {
				"lint:knip": "knip",
			}),
			...(!values.excludeLintMd && {
				"lint:md":
					'markdownlint "**/*.md" ".github/**/*.md" --rules sentences-per-line',
			}),
			...(!values.excludeLintPackage && {
				"lint:package": "npmPkgJsonLint .",
			}),
			...(!values.excludeLintPackages && {
				"lint:packages": "pnpm dedupe --check",
			}),
			...(!values.excludeLintSpelling && {
				"lint:spelling": 'cspell "**" ".github/**/*"',
			}),
			prepare: "husky install",
			...(!values.excludeReleases && {
				"should-semantic-release": "should-semantic-release --verbose",
			}),
			...(!values.excludeReleases && { test: "vitest" }),
			tsc: "tsc",
		},
		type: "module",
	});
}

function copyDevDependencies(existingPackageJson: object) {
	const devDependencies =
		"devDependencies" in existingPackageJson
			? (existingPackageJson.devDependencies as Record<string, string>)
			: {};

	for (const devDependencyToRemove of devDependenciesToRemove) {
		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		delete devDependencies[devDependencyToRemove];
	}

	return devDependencies;
}
