import { MetadataFileType } from "create";

import { schema } from "../schema.js";

export const blockTypeScript = schema.createBlock({
	about: {
		name: "TypeScript",
	},
	produce({ options }) {
		return {
			documentation: {
				"Type Checking": `
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
			editor: {
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
			},
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
			jobs: [{ name: "Type Check", steps: [{ run: "pnpm tsc" }] }],
			metadata: [
				{
					glob: "lib/",
					type: MetadataFileType.Built,
				},
				{
					glob: "src/",
					type: MetadataFileType.Source,
				},
			],
			package: {
				devDependencies: { typescript: "latest" },
				main: "./lib/index.js",
				scripts: {
					tsc: "tsc",
				},
			},
		};
	},
});
