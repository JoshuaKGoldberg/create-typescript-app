import { readFileAsJson } from "../../../../shared/readFileAsJson.js";
import { HydrationInputValues } from "../../../values/types.js";
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

export async function writePackageJson({
	author,
	description,
	email,
	owner,
	releases,
	repository,
	unitTests,
}: Pick<
	HydrationInputValues,
	| "author"
	| "description"
	| "email"
	| "owner"
	| "releases"
	| "repository"
	| "unitTests"
>) {
	const existingPackageJson = (await readFileAsJson(
		"./package.json"
	)) as object;

	return formatJson({
		// To start, copy over all existing package fields (e.g. "dependencies")
		...existingPackageJson,

		author: { email, name: author },
		description,

		// We copy all existing dev dependencies except those we know are not used anymore
		devDependencies: copyDevDependencies(existingPackageJson),

		engines: {
			node: ">=18",
		},
		// Remove fields we know we don't want, such as old or redundant configs
		eslintConfig: undefined,

		files: ["lib/", "package.json", "LICENSE.md", "README.md"],
		husky: undefined,
		license: "MIT",
		"lint-staged": {
			"*": "prettier --ignore-unknown --write",
		},
		main: "./lib/index.js",
		// The rest of the fields are ones we know from our template
		name: repository,
		packageManager: "pnpm@8.5.0",
		prettierConfig: undefined,
		publishConfig: {
			provenance: true,
		},
		repository: {
			type: "git",
			url: `https://github.com/${owner}/${repository}`,
		},
		scripts: {
			build: "tsc",
			format: 'prettier "**/*" --ignore-unknown',
			"format:write": "pnpm format --write",
			lint: "eslint . .*js --max-warnings 0 --report-unused-disable-directives",
			"lint:knip": "knip",
			"lint:md":
				'markdownlint "**/*.md" ".github/**/*.md" --rules sentences-per-line',
			"lint:package": "npmPkgJsonLint .",
			"lint:packages": "pnpm dedupe --check",
			"lint:spelling": 'cspell "**" ".github/**/*"',
			prepare: "husky install",
			...(releases && {
				"should-semantic-release": "should-semantic-release --verbose",
			}),
			...(unitTests && { test: "vitest" }),
		},
		type: "module",
		types: undefined,
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
