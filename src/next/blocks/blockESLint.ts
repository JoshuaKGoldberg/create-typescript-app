// @ts-expect-error -- https://github.com/egoist/parse-package-name/issues/30
import { parse as parsePackageName } from "parse-package-name";
import { z } from "zod";

import { schema } from "../schema.js";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.js";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.js";
import { blockPackageJson } from "./blockPackageJson.js";
import { blockVSCode } from "./blockVSCode.js";
import { MetadataFileType } from "./metadata.js";

const zRuleOptions = z.union([
	z.literal("error"),
	z.literal("off"),
	z.literal("warn"),
	z.union([
		z.tuple([z.union([z.literal("error"), z.literal("warn")]), z.unknown()]),
		z.tuple([
			z.union([z.literal("error"), z.literal("warn")]),
			z.unknown(),
			z.unknown(),
		]),
	]),
]);

const zExtensionRules = z.union([
	z.record(z.string(), zRuleOptions),
	z.array(
		z.object({
			comment: z.string().optional(),
			entries: z.record(z.string(), zRuleOptions),
		}),
	),
]);

const zExtension = z.object({
	extends: z.array(z.string()).optional(),
	files: z.array(z.string()).optional(),
	languageOptions: z.unknown().optional(),
	plugins: z.record(z.string(), z.string()).optional(),
	rules: zExtensionRules.optional(),
});

const zPackageImport = z.object({
	source: z.string(),
	specifier: z.string(),
	types: z.boolean().optional(),
});

export const blockESLint = schema.createBlock({
	about: {
		name: "ESLint",
	},
	args: {
		extensions: z.array(z.union([z.string(), zExtension])).optional(),
		imports: z.array(zPackageImport).optional(),
		rules: zExtensionRules.optional(),
	},
	produce({ args, created, options }) {
		const { extensions = [], imports = [], rules } = args;

		const importLines = [
			'import eslint from "@eslint/js";',
			'import tseslint from "typescript-eslint";',
			...imports.map(
				(packageImport) =>
					`import ${packageImport.specifier} from "${packageImport.source}"`,
			),
		].sort((a, b) =>
			a.replace(/.+from/, "").localeCompare(b.replace(/.+from/, "")),
		);

		const ignoreLines = [
			"lib",
			"node_modules",
			"pnpm-lock.yaml",
			...created.metadata.files
				.filter(
					(value) =>
						!value.glob.endsWith("rc") &&
						(value.type === MetadataFileType.Ignored ||
							value.type === MetadataFileType.Snapshot),
				)
				.map((value) => value.glob),
		].sort();

		const extensionLines = [
			"eslint.configs.recommended",
			printExtension({
				extends: [
					"...tseslint.configs.strictTypeChecked",
					"...tseslint.configs.stylisticTypeChecked",
				],
				files: ["**/*.js", "**/*.ts"],
				languageOptions: {
					parserOptions: {
						projectService: {
							allowDefaultProject: ["*.config.*s"],
						},
						tsconfigRootDir: "import.meta.dirname",
					},
				},
				...(rules && { rules }),
			}),
			...extensions.map((extension) =>
				typeof extension === "string" ? extension : printExtension(extension),
			),
		];

		return {
			addons: [
				blockDevelopmentDocs({
					sections: {
						Linting: `
[ESLint](https://eslint.org) is used with [typescript-eslint](https://typescript-eslint.io)) to lint JavaScript and TypeScript source files.
You can run it locally on the command-line:

\`\`\`shell
pnpm run lint
\`\`\`

ESLint can be run with \`--fix\` to auto-fix some lint rule complaints:

\`\`\`shell
pnpm run lint --fix
\`\`\`

Note that you'll need to run \`pnpm build\` before \`pnpm lint\` so that lint rules which check the file system can pick up on any built files.
`,
					},
				}),
				blockGitHubActionsCI({
					jobs: [
						{
							name: "Lint",
							steps: [
								...(options.bin ? [{ run: "pnpm build" }] : []),
								{ run: "pnpm lint" },
							],
						},
					],
				}),
				blockPackageJson({
					properties: {
						devDependencies: {
							"@eslint/js": "latest",
							"@types/node": "latest",
							eslint: "latest",
							"typescript-eslint": "latest",
							...Object.fromEntries(
								imports.flatMap(({ source, types }): [string, string][] => {
									// eslint-disable-next-line @typescript-eslint/no-unsafe-call -- https://github.com/egoist/parse-package-name/issues/30
									const { name } = parsePackageName(source) as { name: string };
									return types
										? [
												[name, "latest"],
												[`@types/${name}`, "latest"],
											]
										: [[name, "latest"]];
								}),
							),
						},
						scripts: {
							lint: "eslint . --max-warnings 0",
						},
					},
				}),
				blockVSCode({
					extensions: ["dbaeumer.vscode-eslint"],
					settings: {
						"editor.codeActionsOnSave": {
							"source.fixAll.eslint": "explicit",
						},
						"eslint.probe": [
							"javascript",
							"javascriptreact",
							"json",
							"jsonc",
							"markdown",
							"typescript",
							"typescriptreact",
							"yaml",
						],
						"eslint.rules.customizations": [{ rule: "*", severity: "warn" }],
					},
				}),
			],
			files: {
				"eslint.config.js": `${importLines.join("\n")}

export default tseslint.config(
	{
		ignores: [${ignoreLines.map((ignore) => JSON.stringify(ignore)).join(", ")}]
	},
	{
		linterOptions: {
			reportUnusedDisableDirectives: "error",
		}
	},
	${extensionLines.join(",		")}
);`,
			},
		};
	},
});

function printExtension(extension: z.infer<typeof zExtension>) {
	return [
		"\t\t{",
		extension.extends && `\t\textends: [${extension.extends.join(", ")}],`,
		extension.files &&
			`\t\tfiles: [${extension.files.map((glob) => JSON.stringify(glob)).join(", ")}],`,
		extension.languageOptions &&
			`\t\tlanguageOptions: ${JSON.stringify(extension.languageOptions).replace('"import.meta.dirname"', "import.meta.dirname")},`,
		extension.rules && `\t\trules: ${printExtensionRules(extension.rules)},`,
		"\t\t}",
	]
		.filter(Boolean)
		.join("\n");
}

function printExtensionRules(rules: z.infer<typeof zExtensionRules>) {
	if (!Array.isArray(rules)) {
		return JSON.stringify(rules);
	}

	return [
		"{\n",
		...rules.flatMap((group, i) => [
			`${i === 0 ? "" : "\n"}\t\t\t// ${group.comment}\n`,
			...Object.entries(group.entries).map(
				([ruleName, options]) =>
					`\t\t\t"${ruleName}": ${JSON.stringify(options, null, 4)},\n`,
			),
		]),
		"\t\t}\n",
	].join("");
}
