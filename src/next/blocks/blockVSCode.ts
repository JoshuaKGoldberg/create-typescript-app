import { z } from "zod";

import { schema } from "../schema.js";
import { sortObject } from "../utils/sortObject.js";

export const blockVSCode = schema.createBlock({
	about: {
		name: "VS Code",
	},
	args: {
		debuggers: z
			.array(
				z.intersection(
					z.object({ name: z.string() }),
					z.record(z.string(), z.unknown()),
				),
			)
			.optional(),
		extensions: z.array(z.string()).optional(),
		settings: z.record(z.string(), z.unknown()).optional(),
		tasks: z
			.array(
				z.intersection(
					z.object({ detail: z.string() }),
					z.record(z.string(), z.unknown()),
				),
			)
			.optional(),
	},
	produce({ args }) {
		return {
			files: {
				".vscode": {
					"extensions.json":
						args.extensions &&
						JSON.stringify({
							recommendations: [...args.extensions].sort(),
						}),
					"launch.json":
						args.debuggers &&
						JSON.stringify({
							configurations: [...args.debuggers].sort((a, b) =>
								a.name.localeCompare(b.name),
							),
							version: "0.2.0",
						}),
					"settings.json": JSON.stringify(
						sortObject({
							"editor.formatOnSave": true,
							"editor.rulers": [80],
							...args.settings,
						}),
					),
					"tasks.json":
						args.tasks &&
						JSON.stringify({
							tasks: args.tasks.sort((a, b) =>
								a.detail.localeCompare(b.detail),
							),
							version: "2.0.0",
						}),
				},
			},
		};
	},
});
