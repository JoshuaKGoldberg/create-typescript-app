import { isDeepStrictEqual } from "node:util";
import sortKeys from "sort-keys";
import { z } from "zod";
import { CompilerOptionsSchema } from "zod-tsconfig";

import { base } from "../base.ts";
import { getPackageDependencies } from "../data/packageData.ts";
import { formatFile } from "../utils/formatFile.ts";
import { isPlainObject } from "../utils/isPlainObject.ts";
import { zActionStep } from "./actions/steps.ts";
import { getPrimaryBin } from "./bin/getPrimaryBin.ts";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.ts";
import { blockExampleFiles } from "./blockExampleFiles.ts";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.ts";
import { blockKnip } from "./blockKnip.ts";
import { blockPackageJson } from "./blockPackageJson.ts";
import { blockRemoveWorkflows } from "./blockRemoveWorkflows.ts";
import { blockVitest } from "./blockVitest.ts";
import { blockVSCode } from "./blockVSCode.ts";
import { intakeFileAsJson } from "./intake/intakeFileAsJson.ts";

export const blockTypeScript = base.createBlock({
	about: {
		name: "TypeScript",
	},
	intake({ files }) {
		const raw = intakeFileAsJson(files, ["tsconfig.json"]);
		const compilerOptions = CompilerOptionsSchema.safeParse(
			raw?.compilerOptions,
		).data;
		const exclude = z.array(z.string()).safeParse(raw?.exclude).data;
		const include = z.array(z.string()).safeParse(raw?.include).data;
		if (!compilerOptions && !exclude && !include) {
			return undefined;
		}

		return {
			...(compilerOptions && { existingCompilerOptions: compilerOptions }),
			...(exclude && { exclude }),
			...(include && { include }),
		};
	},
	produce({ options, props }) {
		const {
			beforeTypeCheckSteps,
			compilerOptions,
			exclude,
			existingCompilerOptions,
			include,
			outDir,
		} = props;
		const primaryBin = getPrimaryBin(options.bin, options.repository);

		return {
			extensions: [
				blockDevelopmentDocs({
					sections: {
						"Type Checking": {
							contents: `
You should be able to see suggestions from [TypeScript](https://typescriptlang.org) in your editor for all open files.

However, it can be useful to run the TypeScript command-line (\`tsc\`) to type check all files in \`src/\`:

\`\`\`shell
pnpm tsc
\`\`\`

Add \`--watch\` to keep the type checker running in a watch mode that updates the display as you save files:

\`\`\`shell
pnpm tsc --watch
\`\`\`
`,
						},
					},
				}),
				blockExampleFiles({
					files: {
						"greet.ts": `import { GreetOptions } from "./types.ts";

	export function greet(options: GreetOptions | string) {
		const {
			logger = console.log.bind(console),
			message,
			times = 1,
		} = typeof options === "string" ? { message: options } : options;

		for (let i = 0; i < times; i += 1) {
			logger(message);
		}
	}
	`,
						"index.ts": `export * from "./greet.ts";
export * from "./types.ts";
`,
						"types.ts": `export interface GreetOptions {
		logger?: (message: string) => void;
		message: string;
		times?: number;
	}
	`,
					},
					usage: [
						`\`\`\`shell
npm i ${options.repository}
\`\`\`
\`\`\`ts
import { greet } from "${options.repository}";

greet("Hello, world! ${options.emoji}");
\`\`\``,
					],
				}),
				blockGitHubActionsCI({
					jobs: [
						{
							name: "Type Check",
							steps: [...beforeTypeCheckSteps, { run: "pnpm tsc" }],
						},
					],
				}),
				blockKnip({
					project: ["src/**/*.ts"],
				}),
				blockPackageJson({
					properties: {
						devDependencies: getPackageDependencies("typescript"),
					},
				}),
				blockVitest({ coverage: { include: ["src"] }, exclude: ["dist"] }),
				blockVSCode({
					debuggers: primaryBin
						? [
								{
									name: "Debug Program",
									preLaunchTask: "build",
									program: primaryBin,
									request: "launch",
									skipFiles: ["<node_internals>/**"],
									type: "node",
								},
							]
						: [],
					settings: {
						"js/ts.tsdk.path": "node_modules/typescript/lib",
					},
					tasks: [
						{
							detail: "Build the project",
							label: "build",
							script: "build",
							type: "npm",
						},
					],
				}),
			],
			files: {
				"tsconfig.json": formatFile(
					"tsconfig.json",
					JSON.stringify({
						compilerOptions: sortKeys({
							declaration: true,
							esModuleInterop: true,
							module: "nodenext",
							moduleResolution: "nodenext",
							noEmit: true,
							resolveJsonModule: true,
							rewriteRelativeImportExtensions: true,
							skipLibCheck: true,
							strict: true,
							target: "ES2023",
							...(outDir && { outDir, rootDir: "src" }),
							...mergeOptions(existingCompilerOptions, compilerOptions),
							...(outDir && { noEmit: undefined }),
						}),
						include: Array.from(new Set(["src", ...include])).sort(),
						...(exclude.length && {
							exclude: Array.from(new Set(exclude)).sort(),
						}),
					}),
				),
			},
		};
	},
	props: {
		beforeTypeCheckSteps: z.array(zActionStep).default([]),
		compilerOptions: CompilerOptionsSchema.optional(),
		exclude: z.array(z.string()).default([]),
		existingCompilerOptions: CompilerOptionsSchema.optional(),
		include: z.array(z.string()).default([]),
		outDir: z.string().optional(),
	},
	transition() {
		return {
			extensions: [
				blockRemoveWorkflows({
					workflows: ["tsc"],
				}),
			],
		};
	},
});

function mergeOptions(
	...sources: (Record<string, unknown> | undefined)[]
): Record<string, unknown> {
	const merged: Record<string, unknown> = {};

	for (const source of sources) {
		for (const [key, value] of Object.entries(source ?? {})) {
			const existing = merged[key];

			if (value === undefined) {
				continue;
			}

			if (Array.isArray(existing) && Array.isArray(value)) {
				merged[key] = [
					...(existing as unknown[]),
					...(value as unknown[]),
				].filter(
					(item, index, all) =>
						all.findIndex((other) => isDeepStrictEqual(item, other)) === index,
				);
			} else if (isPlainObject(existing) && isPlainObject(value)) {
				merged[key] = mergeOptions(existing, value);
			} else {
				merged[key] = value;
			}
		}
	}

	return merged;
}
