import { readFileSafeAsJson } from "../../../shared/readFileSafeAsJson.js";
import { Options, PartialPackageData } from "../../../shared/types.js";
import { formatJson } from "./formatters/formatJson.js";

const devDependenciesToRemove = [
	"@babel/core",
	"@babel/preset-env",
	"@babel/preset-react",
	"@babel/preset-typescript",
	"@swc/jest",
	"@vitest/coverage-istanbul",
	"ava",
	"babel-jest",
	"commitlint",
	"cson-parser",
	"esbuild",
	"eslint-config-prettier",
	"eslint-plugin-import",
	"eslint-plugin-jest",
	"eslint-plugin-prettier",
	"eslint-plugin-simple-import-sort",
	"eslint-plugin-typescript-sort-keys",
	"jasmine",
	"jest",
	"mocha",
	"npm-run-all",
	"pnpm-deduplicate",
	"pretty-quick",
	"ts-jest",
];

export async function writePackageJson(options: Options) {
	const existingPackageJson =
		((await readFileSafeAsJson(
			"./package.json",
		)) as null | PartialPackageData) ?? {};

	return await formatJson({
		// If we didn't already have a version, set it to 0.0.0
		version: "0.0.0",

		// To start, copy over all existing package fields (e.g. "dependencies")
		...existingPackageJson,

		author: { email: options.email.npm, name: options.author },
		bin: options.bin,
		description: options.description,
		keywords: options.keywords?.length
			? options.keywords.flatMap((keyword) => keyword.split(/ /))
			: undefined,

		// We copy all existing dev dependencies except those we know are not used anymore
		devDependencies: copyDevDependencies(existingPackageJson),

		// Remove fields we know we don't want, such as old or redundant configs
		eslintConfig: undefined,
		husky: undefined,
		jest: undefined,
		mocha: undefined,
		prettierConfig: undefined,
		types: undefined,

		// The rest of the fields are ones we know from our template
		engines: {
			node: ">=18.3.0",
		},
		files: [
			options.bin?.replace(/^\.\//, ""),
			"lib/",
			"package.json",
			"LICENSE.md",
			"README.md",
		].filter(Boolean),
		license: "MIT",
		"lint-staged": {
			"*": "prettier --ignore-unknown --write",
		},
		main: "./lib/index.js",
		name: options.repository,
		publishConfig: {
			provenance: true,
		},
		repository: {
			type: "git",
			url: `https://github.com/${options.owner}/${options.repository}`,
		},
		scripts: {
			...existingPackageJson.scripts,
			...(!options.excludeBuild && {
				build: "tsup",
			}),
			format: "prettier .",
			lint: "eslint . --max-warnings 0",
			...(!options.excludeLintKnip && {
				"lint:knip": "knip",
			}),
			...(!options.excludeLintMd && {
				"lint:md":
					'markdownlint "**/*.md" ".github/**/*.md" --rules sentences-per-line',
			}),
			...(!options.excludeLintPackages && {
				"lint:packages": "pnpm dedupe --check",
			}),
			...(!options.excludeLintSpelling && {
				"lint:spelling": 'cspell "**" ".github/**/*"',
			}),
			prepare: "husky",
			...(!options.excludeReleases && { test: "vitest" }),
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
