import { z } from "zod";

import { base } from "../base.ts";
import { getInstallationSuggestions } from "./getInstallationSuggestions.ts";

export const blockGitHubApps = base.createBlock({
	about: {
		name: "GitHub Apps",
	},
	addons: {
		apps: z
			.array(
				z.object({
					name: z.string(),
					url: z.string(),
				}),
			)
			.default([]),
	},
	produce({ addons, options }) {
		return {
			suggestions: getInstallationSuggestions(
				"enable the GitHub app",
				addons.apps.map((app) => `${app.name} (${app.url})`),
				`https://github.com/${options.owner}/${options.repository}/settings/installations`,
			),
		};
	},
});
