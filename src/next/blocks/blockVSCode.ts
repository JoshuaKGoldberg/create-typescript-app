import { BlockPhase } from "create";

import { schema } from "../schema.js";
import { sortObject } from "../utils/sortObject.js";

export const blockVSCode = schema.createBlock({
	about: {
		name: "VS Code",
	},
	phase: BlockPhase.Editor,
	produce({ created }) {
		return {
			files: {
				".vscode": {
					"extensions.json":
						created.editor.extensions &&
						JSON.stringify({
							recommendations: [...created.editor.extensions].sort(),
						}),
					"launch.json":
						created.editor.debuggers &&
						JSON.stringify({
							configurations: [...created.editor.debuggers].sort((a, b) =>
								a.name.localeCompare(b.name),
							),
							version: "0.2.0",
						}),
					"settings.json": JSON.stringify(
						sortObject({
							"editor.formatOnSave": true,
							"editor.rulers": [80],
							...created.editor.settings,
						}),
					),
					"tasks.json":
						created.editor.tasks &&
						JSON.stringify({
							tasks: created.editor.tasks.sort((a, b) =>
								a.detail.localeCompare(b.detail),
							),
							version: "2.0.0",
						}),
				},
			},
		};
	},
});
