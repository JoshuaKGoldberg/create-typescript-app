import sortKeys from "sort-keys";
import { z } from "zod";
import { CompilerOptionsSchema } from "zod-tsconfig";

import { base } from "../base.ts";
import { getPackageDependencies } from "../data/packageData.ts";
import { formatFile } from "../utils/formatFile.ts";
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

// zod-tsconfig doesn't yet describe language service plugins,
// and describes paths values as strings rather than arrays of strings
const zCompilerOptions = CompilerOptionsSchema.extend({
	paths: z.record(z.string(), z.array(z.string())).optional(),
	plugins: z.array(z.looseObject({ name: z.string().optional() })).optional(),
});

export const blockTypeScript = base.createBlock({
	about: {
		name: "TypeScript",
	},
	addons: {
		beforeTypeCheckSteps: z.array(zActionStep).default([]),
		compilerOptions: zCompilerOptions.optional(),
		exclude: z.array(z.string()).optional(),
		existingCompilerOptions: zCompilerOptions.optional(),
		include: z.array(z.string()).default([]),
		outDir: z.string().optional(),
	},
	intake({ files }) {
		const raw = intakeFileAsJson(files, ["tsconfig.json"]);
		const { data } = zCompilerOptions.safeParse(raw?.compilerOptions);
		if (!data) {
			return undefined;
		}

		return {
			existingCompilerOptions: data,
		};
	},
	produce({ addons, options }) {
		const {
			beforeTypeCheckSteps,
			compilerOptions,
			exclude,
			existingCompilerOptions,
			include,
			outDir,
		} = addons;
		const primaryBin = getPrimaryBin(options.bin, options.repository);

		return {
			addons: [
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
							...existingCompilerOptions,
							...compilerOptions,
							...(outDir && { noEmit: undefined }),
						}),
						include: ["src", ...include],
						...(exclude && { exclude }),
					}),
				),
			},
		};
	},
	transition() {
		return {
			addons: [
				blockRemoveWorkflows({
					workflows: ["tsc"],
				}),
			],
		};
	},
});
