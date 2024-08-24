import { Options } from "../../../shared/types.js";
import { createDotGitignore } from "./createDotGitignore.js";
import { createESLintConfig } from "./createESLintConfig.js";
import { createTsupConfig } from "./createTsupConfig.js";
import { formatIgnoreFile } from "./formatters/formatIgnoreFile.js";
import { formatJson } from "./formatters/formatJson.js";
import { writeAllContributorsRC } from "./writeAllContributorsRC.js";
import { writePackageJson } from "./writePackageJson.js";

export async function createRootFiles(options: Options) {
	return {
		".all-contributorsrc": await writeAllContributorsRC(options),
		".gitignore": createDotGitignore(options),
		"eslint.config.js": await createESLintConfig(options),
		...(!options.excludeLintMd && {
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
		".nvmrc": `20.12.2\n`,
		".prettierignore": formatIgnoreFile([
			...(options.excludeAllContributors ? [] : [".all-contributorsrc"]),
			".husky/",
			...(options.excludeTests ? [] : ["coverage/"]),
			"lib/",
			"pnpm-lock.yaml",
		]),
		".prettierrc.json": await formatJson({
			$schema: "http://json.schemastore.org/prettierrc",
			overrides: [
				{
					files: ".nvmrc",
					options: { parser: "yaml" },
				},
			],
			plugins: [
				"prettier-plugin-curly",
				"prettier-plugin-sh",
				"prettier-plugin-packagejson",
			],
			useTabs: true,
		}),
		...(!options.excludeReleases && {
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
				npm: {
					publishArgs: [`--access ${options.access}`, "--provenance"],
				},
				plugins: {
					"@release-it/conventional-changelog": {
						infile: "CHANGELOG.md",
						preset: "angular",
					},
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
		...(!options.excludeLintSpelling && {
			"cspell.json": await formatJson({
				dictionaries: ["typescript"],
				ignorePaths: [
					".github",
					"CHANGELOG.md",
					...(options.excludeTests ? [] : ["coverage"]),
					"lib",
					"node_modules",
					"pnpm-lock.yaml",
				],
			}),
		}),
		...(!options.excludeLintKnip && {
			"knip.json": await formatJson({
				$schema: "https://unpkg.com/knip@latest/schema.json",
				entry: ["src/index.ts!"],
				ignoreExportsUsedInFile: {
					interface: true,
					type: true,
				},
				project: ["src/**/*.ts!"],
			}),
		}),
		"package.json": await writePackageJson(options),
		"tsconfig.json": await formatJson({
			compilerOptions: {
				declaration: true,
				declarationMap: true,
				esModuleInterop: true,
				module: "NodeNext",
				moduleResolution: "NodeNext",
				noEmit: true,
				resolveJsonModule: true,
				skipLibCheck: true,
				sourceMap: true,
				strict: true,
				target: "ES2022",
			},
			include: ["src"],
		}),
		"tsup.config.ts": await createTsupConfig(options),
		...(!options.excludeTests && {
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
