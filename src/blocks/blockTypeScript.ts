import { base } from "../base.js";
import { getPackageDependencies } from "../data/packageData.js";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.js";
import { blockExampleFiles } from "./blockExampleFiles.js";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.js";
import { blockGitignore } from "./blockGitignore.js";
import { blockMarkdownlint } from "./blockMarkdownlint.js";
import { blockPackageJson } from "./blockPackageJson.js";
import { blockVitest } from "./blockVitest.js";
import { blockVSCode } from "./blockVSCode.js";

export const blockTypeScript = base.createBlock({
	about: {
		name: "TypeScript",
	},
	produce({ options }) {
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
				}),
				blockGitignore({
					ignores: ["/lib"],
				}),
				blockGitHubActionsCI({
					jobs: [{ name: "Type Check", steps: [{ run: "pnpm tsc" }] }],
				}),
				blockMarkdownlint({
					ignores: ["lib/"],
				}),
				blockPackageJson({
					properties: {
						devDependencies: getPackageDependencies("typescript"),
						files: ["lib/"],
						main: "lib/index.js",
						scripts: {
							tsc: "tsc",
						},
					},
				}),
				blockVitest({ coverage: { include: ["src"] }, exclude: ["lib"] }),
				blockVSCode({
					debuggers: options.bin
						? [
								{
									name: "Debug Program",
									preLaunchTask: "build",
									program: options.bin,
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
			},
		};
	},
});
