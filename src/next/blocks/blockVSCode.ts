import { z } from "zod";

import { base } from "../base.js";
import { sortObject } from "../utils/sortObject.js";

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
	produce({ addons }) {
		const { debuggers, extensions, settings, tasks } = addons;

		return {
			files: {
				".vscode": {
					"extensions.json":
						extensions &&
						JSON.stringify({
							recommendations: [...extensions].sort(),
						}),
					"launch.json":
						debuggers &&
						JSON.stringify({
							configurations: [...debuggers].sort((a, b) =>
								a.name.localeCompare(b.name),
							),
							version: "0.2.0",
						}),
					"settings.json": JSON.stringify(
						sortObject({
							"editor.formatOnSave": true,
							"editor.rulers": [80],
							...settings,
						}),
					),
					"tasks.json":
						tasks &&
						JSON.stringify({
							tasks: tasks.sort((a, b) => a.detail.localeCompare(b.detail)),
							version: "2.0.0",
						}),
				},
			},
		};
	},
});
