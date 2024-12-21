import { z } from "zod";

import { base } from "../base.js";

const zApp = z.object({
	name: z.string(),
	url: z.string(),
});
export const blockGitHubApps = base.createBlock({
	about: {
		name: "GitHub Apps",
	},
	addons: {
		apps: z.array(zApp).default([]),
	},
	produce({ addons }) {
		return {
			suggestions: addons.apps.length
				? [
						[
							`- enable the GitHub app`,
							addons.apps.length === 1 ? "" : "s",
							`:\n`,
							addons.apps.map(printApp).join("\n"),
						].join(""),
					]
				: undefined,
		};
	},
});

function printApp(app: z.infer<typeof zApp>) {
	return `   - ${app.name} (${app.url})`;
}
