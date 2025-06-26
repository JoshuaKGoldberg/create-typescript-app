import { base } from "../base.js";
import { blockCSpell } from "./blockCSpell.js";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.js";
import { blockESLint } from "./blockESLint.js";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.js";
import { blockPackageJson } from "./blockPackageJson.js";
import { blockREADME } from "./blockREADME.js";
import { blockVitest } from "./blockVitest.js";
import { blockESLintPluginIntake } from "./eslint/blockESLintPluginIntake.js";
import { zConfigEmoji } from "./eslint/schemas.js";
import { intakeFile } from "./intake/intakeFile.js";
import { CommandPhase } from "./phases.js";

export const blockESLintPlugin = base.createBlock({
	about: {
		name: "ESLint Plugin",
	},
	addons: {
		configEmoji: zConfigEmoji,
	},
	intake({ files }) {
		const docGeneratorConfigRaw = intakeFile(files, [
			[".eslint-doc-generatorrc.js", ".eslint-doc-generatorrc.mjs"],
		]);

		return docGeneratorConfigRaw
			? blockESLintPluginIntake(docGeneratorConfigRaw[0])
			: undefined;
	},
	produce({ addons, options }) {
		const { configEmoji } = addons;
		const configFileName = `.eslint-doc-generatorrc.${options.type === "commonjs" ? "mjs" : "js"}`;
		const pluginName = options.repository
			.replace(/^eslint-plugin-/, "")
			.replaceAll(/-\w/g, (matched) => matched[1].toUpperCase());

		return {
			addons: [
				blockCSpell({
					words: ["eslint-doc-generatorrc"],
				}),
				blockDevelopmentDocs({
					sections: {
						Building: {
							innerSections: [
								{
									contents: `
Run [\`eslint-doc-generator\`](https://github.com/bmish/eslint-doc-generator) to generate Markdown files documenting rules.

\`\`\`shell
pnpm build:docs
\`\`\`
		`,
									heading: "Building Docs",
								},
							],
						},
						Linting: {
							contents: {
								items: [
									`- \`pnpm lint:docs\` ([eslint-doc-generator](https://github.com/bmish/eslint-doc-generator)): Generates and validates documentation for ESLint rules`,
								],
							},
						},
					},
				}),
				blockESLint({
					extensions: ['eslintPlugin.configs["flat/recommended"]'],
					ignores: [configFileName, "docs/rules/*/*.ts"],
					imports: [
						{
							source: {
								packageName: "eslint-plugin-eslint-plugin",
								version: "6.4.0",
							},
							specifier: "eslintPlugin",
						},
					],
				}),
				blockGitHubActionsCI({
					jobs: [
						{
							name: "Lint Docs",
							steps: [
								{ run: "pnpm build || exit 0" },
								{ run: "pnpm lint:docs" },
							],
						},
					],
				}),
				blockREADME({
					defaultUsage: [
						`Add this plugin to the list of plugins in your [ESLint configuration file](https://eslint.org/docs/latest/use/configure/configuration-files):

\`\`\`shell
npm i ${options.repository} -D
\`\`\`

\`\`\`ts
import ${pluginName} from "${options.repository}";

export default [
	// (other plugins)
	${pluginName}.configs.recommended, // 👈
];
\`\`\`

### Rules

These are all set to \`"error"\` in the recommended config:

<!-- begin auto-generated rules list --><!-- end auto-generated rules list -->`,
					],
				}),
				blockPackageJson({
					properties: {
						dependencies: {
							"@typescript-eslint/utils": "^8.29.0",
						},
						devDependencies: {
							"@typescript-eslint/rule-tester": "8.29.1",
							"eslint-doc-generator": "2.1.0",
							"eslint-plugin-eslint-plugin": "6.4.0",
						},
						scripts: {
							"build:docs": "pnpm build --no-dts && eslint-doc-generator",
							"lint:docs": "eslint-doc-generator --check",
						},
					},
				}),
				blockVitest({
					coverage: {
						exclude: ["src/index.ts", "src/rules/index.ts"],
					},
				}),
			],
			files: {
				[configFileName]: `import prettier from "prettier";

/** @type {import('eslint-doc-generator').GenerateOptions} */
const config = {
	${configEmoji ? `configEmoji: ${JSON.stringify(configEmoji)},\n\t` : ""}postprocess: async (content, path) =>
		prettier.format(content, {
			...(await prettier.resolveConfig(path)),
			parser: "markdown",
		}),
	ruleDocTitleFormat: "name",
};

export default config;
`,
			},
			scripts: [
				{
					commands: ["pnpm build"],
					phase: CommandPhase.Build,
				},
				{
					commands: ["pnpm eslint-doc-generator --init-rule-docs"],
					phase: CommandPhase.Process,
				},
			],
		};
	},
	setup({ options }) {
		const pluginName = options.repository.replace("eslint-plugin-", "");

		return {
			files: {
				src: {
					"index.ts": `import Module from "node:module";

import { rules } from "./rules/index.js";

const require = Module.createRequire(import.meta.url);

const { name, version } =
	// \`import\`ing here would bypass the TSConfig's \`"rootDir": "src"\`
	require("../package.json") as typeof import("../package.json");

export const plugin = {
	configs: {
		get recommended() {
			return recommended;
		},
	},
	meta: { name, version },
	rules,
};

const recommended = {
	plugins: {
		"${pluginName}": plugin,
	},
	rules: Object.fromEntries(
		Object.keys(rules).map((rule) => [\`${pluginName}/\${rule}\`, "error"]),
	),
};

export { rules };

export default plugin;
`,
					rules: {
						"enums.test.ts": `import { rule } from "./enums.js";
import { ruleTester } from "./ruleTester.js";

ruleTester.run("enums", rule, {
	invalid: [
		{
			code: \`enum Values {}\`,
			errors: [
				{
					column: 1,
					endColumn: 15,
					endLine: 1,
					line: 1,
					messageId: "enum",
				},
			],
		},
	],
	valid: [\`const Values = {};\`, \`const Values = {} as const;\`],
});
`,
						"enums.ts": `import { createRule } from "../utils.js";

export const rule = createRule({
	create(context) {
		return {
			TSEnumDeclaration(node) {
				context.report({
					messageId: "enum",
					node,
				});
			},
		};
	},
	defaultOptions: [],
	meta: {
		docs: {
			description: "Avoid using TypeScript's enums.",
		},
		messages: {
			enum: "This enum will not be allowed under TypeScript's --erasableSyntaxOnly.",
		},
		schema: [],
		type: "problem",
	},
	name: "enums",
});
`,
						"index.ts": `import { rule as enums } from "./enums.js";

export const rules = {
	enums,
};
`,
						"ruleTester.ts": `import { RuleTester } from "@typescript-eslint/rule-tester";
import * as vitest from "vitest";

RuleTester.afterAll = vitest.afterAll;
RuleTester.it = vitest.it;
RuleTester.itOnly = vitest.it.only;
RuleTester.describe = vitest.describe;

export const ruleTester = new RuleTester();
`,
					},
					"utils.ts": `import { ESLintUtils } from "@typescript-eslint/utils";

export const createRule = ESLintUtils.RuleCreator(
	(name) =>
		\`https://github.com/${options.owner}/${options.repository}/blob/main/docs/rules/\${name}.md\`,
);
`,
				},
			},
		};
	},
});
