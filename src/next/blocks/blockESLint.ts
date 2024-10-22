import { MetadataFileType } from "create";
import { z } from "zod";

import { schema } from "../schema.js";

export const blockESLint = schema.createBlock({
	about: {
		name: "ESLint",
	},
	args: {
		extensions: z
			.record(
				z.string(),
				z.union([
					z.object({
						extends: z.array(z.string()).default([]),
						languageOptions: z.unknown().optional(),
						rules: z
							.array(
								z.object({
									comment: z.string().optional(),
									entries: z.record(
										z.string(),
										z.union([
											z.literal("error"),
											z.literal("off"),
											z.literal("warn"),
											z.tuple([
												z.union([z.literal("error"), z.literal("warn")]),
												z.unknown(),
											]),
										]),
									),
								}),
							)
							.optional(),
					}),
					z.undefined(),
				]),
			)
			.default({}),
		ignores: z.array(z.string()).default([]),
		imports: z.array(z.string()).default([]),
	},
	produce({ args, created, options }) {
		const imports = [
			`import eslint from "@eslint/js";`,
			`import tseslint from "typescript-eslint";`,
			...args.imports,
		];

		const ignores = [
			"lib",
			"node_modules",
			"pnpm-lock.yaml",
			...created.metadata
				.filter(
					(value) =>
						value.type === MetadataFileType.Ignored ||
						value.type === MetadataFileType.Snapshot,
				)
				.map((value) => value.glob),
			...args.ignores,
		].sort();

		const extensions = Object.entries(args.extensions).map(
			([files, settings]) =>
				`...tseslint.config(${JSON.stringify({
					...settings,
					files: [files],
					...(settings?.rules && {
						rules: settings.rules.map(
							({ comment, entries }) => `${comment ? `// ${comment}\n` : ""}
						${JSON.stringify(entries)}`,
						),
					}),
				})})`,
		);

		return {
			documentation: {
				Linting: `
[ESLint](https://eslint.org) is used with with [typescript-eslint](https://typescript-eslint.io)) to lint JavaScript and TypeScript source files.
You can run it locally on the command-line:

\`\`\`shell
pnpm run lint
\`\`\`

ESLint can be run with \`--fix\` to auto-fix some lint rule complaints:

\`\`\`shell
pnpm run lint --fix
\`\`\`

Note that you'll likely need to run \`pnpm build\` before \`pnpm lint\` so that lint rules which check the file system can pick up on any built files.
`,
			},
			editor: {
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
			},
			files: {
				"eslint.config.js": `${imports.join("\n")}

export default tseslint.config(
	{
		ignores: [${ignores.join(", ")}]
	},
	{
		linterOptions: {
			reportUnusedDisableDirectives: "error",
		}
	},
	${extensions.join(",		")}
);`,
			},
			jobs: [
				{
					name: "Lint",
					steps: [
						...(options.bin ? [{ run: "pnpm build" }] : []),
						{ run: "pnpm lint" },
					],
				},
			],
			package: {
				scripts: {
					lint: "eslint . --max-warnings 0",
				},
			},
		};
	},
});
