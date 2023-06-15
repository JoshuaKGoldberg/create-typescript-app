import { readFileAsJson } from "../../../../shared/readFileAsJson.js";
import { HydrationInputValues } from "../../../values/types.js";
import { formatJson } from "./formatters/formatJson.js";

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
	return formatJson({
		// To start, copy over all existing package fields (e.g. "dependencies")
		...((await readFileAsJson("./package.json")) as object),

		author: { email, name: author },
		description,
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
			lint: "eslint . --max-warnings 0 --report-unused-disable-directives",
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
