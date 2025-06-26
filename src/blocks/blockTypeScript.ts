import sortKeys from "sort-keys";
import { CompilerOptionsSchema } from "zod-tsconfig";

import { base } from "../base.js";
import { getPackageDependencies } from "../data/packageData.js";
import { getPrimaryBin } from "./bin/getPrimaryBin.js";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.js";
import { blockExampleFiles } from "./blockExampleFiles.js";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.js";
import { blockGitignore } from "./blockGitignore.js";
import { blockKnip } from "./blockKnip.js";
import { blockMarkdownlint } from "./blockMarkdownlint.js";
import { blockPackageJson } from "./blockPackageJson.js";
import { blockRemoveWorkflows } from "./blockRemoveWorkflows.js";
import { blockVitest } from "./blockVitest.js";
import { blockVSCode } from "./blockVSCode.js";
import { intakeFileAsJson } from "./intake/intakeFileAsJson.js";

export const blockTypeScript = base.createBlock({
	about: {
		name: "TypeScript",
	},
	addons: {
		compilerOptions: CompilerOptionsSchema.optional(),
	},
	intake({ files }) {
		const raw = intakeFileAsJson(files, ["tsconfig.json"]);
		const { data } = CompilerOptionsSchema.safeParse(raw?.compilerOptions);
		if (!data) {
			return undefined;
		}

		return {
			compilerOptions: data,
		};
	},
	produce({ addons, options }) {
		const { compilerOptions } = addons;
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
						"greet.ts": `import { GreetOptions } from "./types.js";
	
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
						"index.ts": `export * from "./greet.js";
export * from "./types.js";
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
				blockGitignore({
					ignores: ["/lib"],
				}),
				blockGitHubActionsCI({
					jobs: [{ name: "Type Check", steps: [{ run: "pnpm tsc" }] }],
				}),
				blockKnip({
					project: ["src/**/*.ts"],
				}),
				blockMarkdownlint({
					ignores: ["lib/"],
				}),
				blockPackageJson({
					properties: {
						devDependencies: getPackageDependencies("typescript"),
						files: ["lib/"],
						scripts: {
							tsc: "tsc",
						},
					},
				}),
				blockVitest({ coverage: { include: ["src"] }, exclude: ["lib"] }),
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
						"typescript.tsdk": "node_modules/typescript/lib",
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
				"tsconfig.json": JSON.stringify({
					compilerOptions: sortKeys({
						declaration: true,
						declarationMap: true,
						esModuleInterop: true,
						module: "NodeNext",
						moduleResolution: "NodeNext",
						noEmit: true,
						resolveJsonModule: true,
						skipLibCheck: true,
						strict: true,
						target: "ES2022",
						...compilerOptions,
					}),
					include: ["src"],
				}),
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
