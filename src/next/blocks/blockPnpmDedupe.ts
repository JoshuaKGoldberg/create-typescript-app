import { schema } from "../schema.js";

export const blockPnpmDedupe = schema.createBlock({
	about: {
		name: "pnpm Dedupe",
	},
	produce() {
		return {
			commands: ["pnpm dedupe"],
			jobs: [
				{
					name: "Lint Packages",
					steps: [{ run: "pnpm lint:packages" }],
				},
			],
			package: {
				scripts: {
					"lint:packages": "pnpm dedupe --check",
				},
			},
		};
	},
});
