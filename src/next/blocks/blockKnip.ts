import { schema } from "../schema.js";

export const blockKnip = schema.createBlock({
	about: {
		name: "CSpell",
	},
	produce() {
		return {
			documentation: {
				"Linting With Knip": {
					level: 3,
					text: `[knip](https://github.com/webpro/knip) is used to detect unused files, dependencies, and code exports.
You can run it with \`pnpm lint:knip\`:

\`\`\`shell
pnpm lint:knip
\`\`\`
`,
				},
			},
			files: {
				"knip.json": JSON.stringify({
					$schema: "https://unpkg.com/knip@latest/schema.json",
					entry: ["src/index.ts!"],
					ignoreExportsUsedInFile: {
						interface: true,
						type: true,
					},
					project: ["src/**/*.ts!"],
				}),
			},
			jobs: [
				{
					name: "Lint Knip",
					steps: [{ run: "pnpm lint:knip" }],
				},
			],
			package: {
				devDependencies: {
					knip: "5.27.2",
				},
				scripts: {
					"lint:knip": "knip",
				},
			},
		};
	},
});
