import sortKeys from "sort-keys";
import { z } from "zod";

import { base } from "../base.js";
import { getPrimaryBin } from "./bin/getPrimaryBin.js";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.js";

export const blockVSCode = base.createBlock({
	about: {
		name: "VS Code",
	},
	addons: {
		debuggers: z
			.array(
				z.intersection(
					z.record(z.string(), z.unknown()),
					z.object({ name: z.string() }),
				),
			)
			.optional(),
		extensions: z.array(z.string()).optional(),
		settings: z.record(z.string(), z.unknown()).default({}),
		tasks: z
			.array(
				z.intersection(
					z.object({ detail: z.string() }),
					z.record(z.string(), z.unknown()),
				),
			)
			.optional(),
	},
	produce({ addons, options }) {
		const { debuggers, extensions, settings, tasks } = addons;
		const primaryBin = getPrimaryBin(options.bin, options.repository);

		return {
			addons: [
				blockDevelopmentDocs({
					hints: [
						`> This repository includes a list of suggested VS Code extensions.`,
						`> It's a good idea to use [VS Code](https://code.visualstudio.com) and accept its suggestion to install them, as they'll help with development.`,
					],
					sections: {
						Building: {
							innerSections: primaryBin
								? [
										{
											contents: `
This repository includes a [VS Code launch configuration](https://code.visualstudio.com/docs/editor/debugging) for debugging.
To debug a \`bin\` app, add a breakpoint to your code, then run _Debug Program_ from the VS Code Debug panel (or press F5).
VS Code will automatically run the \`build\` task in the background before running \`${primaryBin}\`.
`,
											heading: "Built App Debugging",
										},
									]
								: [],
						},
						Testing: {
							innerSections: [
								{
									contents: `
This repository includes a [VS Code launch configuration](https://code.visualstudio.com/docs/editor/debugging) for debugging unit tests.
To launch it, open a test file, then run _Debug Current Test File_ from the VS Code Debug panel (or press F5).
`,
									heading: "Debugging Tests",
								},
							],
						},
					},
				}),
			],
			files: {
				".vscode": {
					"extensions.json": extensions?.length
						? JSON.stringify({
								recommendations: [...extensions].sort(),
							})
						: undefined,
					"launch.json": debuggers?.length
						? JSON.stringify({
								configurations: [...debuggers].sort((a, b) =>
									a.name.localeCompare(b.name),
								),
								version: "0.2.0",
							})
						: undefined,
					"settings.json": JSON.stringify(
						sortKeys({
							"editor.formatOnSave": true,
							"editor.rulers": [80],
							...settings,
						}),
					),
					"tasks.json": tasks?.length
						? JSON.stringify({
								tasks: tasks.sort((a, b) => a.detail.localeCompare(b.detail)),
								version: "2.0.0",
							})
						: undefined,
				},
			},
		};
	},
});
