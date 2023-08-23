import { InputValues } from "../../../shared/readInputs.js";
import { createESLintRC } from "./createESLintRC.js";
import { formatIgnoreFile } from "./formatters/formatIgnoreFile.js";
import { formatJson } from "./formatters/formatJson.js";
import { formatTypeScript } from "./formatters/formatTypeScript.js";
import { writeAllContributorsRC } from "./writeAllContributorsRC.js";
import { writePackageJson } from "./writePackageJson.js";

export async function createRootFiles(values: InputValues) {
	return {
		".all-contributorsrc": await writeAllContributorsRC(values),
		".eslintignore": formatIgnoreFile(
			[
				"!.*",
				...(values.excludeTests ? [] : ["coverage*"]),
				"lib",
				"node_modules",
				"pnpm-lock.yaml",
			].filter(Boolean),
		),
		".eslintrc.cjs": await createESLintRC(values),
		".gitignore": formatIgnoreFile([
			...(values.excludeTests ? [] : ["coverage*/"]),
			"lib/",
			"node_modules/",
		]),
		...(!values.excludeLintMd && {
			".markdownlint.json": await formatJson({
				extends: "markdownlint/style/prettier",
				"first-line-h1": false,
				"no-inline-html": false,
			}),
			".markdownlintignore": formatIgnoreFile([
				".github/CODE_OF_CONDUCT.md",
				"CHANGELOG.md",
				"lib/",
				"node_modules/",
			]),
		}),
		...(!values.excludeLintPackage && {
			".npmpackagejsonlintrc.json": await formatJson({
				extends: "npm-package-json-lint-config-default",
				rules: {
					"require-description": "error",
					"require-license": "error",
				},
			}),
		}),
		".nvmrc": `18.17.1\n`,
		".prettierignore": formatIgnoreFile([
			...(values.excludeTests ? [] : ["coverage*/"]),
			"lib/",
			"pnpm-lock.yaml",
			"",
			"# See https://github.com/all-contributors/cli/issues/347",
			".all-contributorsrc",
		]),
		".prettierrc": await formatJson({
			$schema: "http://json.schemastore.org/prettierrc",
			overrides: [
				{
					files: ".*rc",
					options: { parser: "json" },
				},
				{
					files: ".nvmrc",
					options: { parser: "yaml" },
				},
			],
			plugins: ["prettier-plugin-curly", "prettier-plugin-packagejson"],
			useTabs: true,
		}),
		...(!values.excludeReleases && {
			".release-it.json": await formatJson({
				git: {
					commitMessage: "chore: release v${version}",
					requireCommits: true,
				},
				github: {
					autoGenerate: true,
					release: true,
					releaseName: "v${version}",
				},
			}),
		}),
		"LICENSE.md": `# MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
`,
		...(!values.excludeLintSpelling && {
			"cspell.json": await formatJson({
				dictionaries: ["typescript"],
				ignorePaths: [
					".github",
					"CHANGELOG.md",
					...(values.excludeTests ? [] : ["coverage*"]),
					"lib",
					"node_modules",
					"pnpm-lock.yaml",
				],
				words: [
					"Codecov",
					"codespace",
					"commitlint",
					"contributorsrc",
					"conventionalcommits",
					...(values.excludeLintKnip ? [] : ["knip"]),
					"lcov",
					"markdownlintignore",
					"npmpackagejsonlintrc",
					"outro",
					"packagejson",
					"tsup",
					"quickstart",
					"wontfix",
				].sort(),
			}),
		}),
		...(!values.excludeLintKnip && {
			"knip.jsonc": await formatJson({
				$schema: "https://unpkg.com/knip@latest/schema.json",
				entry: ["src/index.ts!"],
				ignoreExportsUsedInFile: {
					interface: true,
					type: true,
				},
				project: ["src/**/*.ts!"],
			}),
		}),
		"package.json": await writePackageJson(values),
		"tsconfig.eslint.json": await formatJson({
			extends: "./tsconfig.json",
			include: ["."],
		}),
		"tsconfig.json": await formatJson({
			compilerOptions: {
				declaration: true,
				declarationMap: true,
				esModuleInterop: true,
				module: "ESNext",
				moduleResolution: "NodeNext",
				outDir: "lib",
				resolveJsonModule: true,
				skipLibCheck: true,
				sourceMap: true,
				strict: true,
				target: "ES2022",
			},
			include: ["src"],
		}),
		"tsup.config.ts":
			await formatTypeScript(`import { defineConfig } from "tsup";

		export default defineConfig({
			bundle: false,
			clean: true,
			dts: true,
			entry: ["src/**/*.ts"${values.excludeTests ? "" : `, "!src/**/*.test.*"`}],
			format: "esm",
			outDir: "lib",
			sourcemap: true,
		});
		`),
		...(!values.excludeTests && {
			"vitest.config.ts": `import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		clearMocks: true,
		coverage: {
			all: true,
			exclude: ["lib"],
			include: ["src"],
			reporter: ["html", "lcov"],
		},
		exclude: ["lib", "node_modules"],
		setupFiles: ["console-fail-test/setup"],
	},
});
`,
		}),
	};
}
