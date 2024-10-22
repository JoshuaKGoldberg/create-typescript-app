import { schema } from "../schema.js";

export const blockKnip = schema.createBlock({
	about: {
		name: "CSpell",
	},
	produce() {
		return {
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
