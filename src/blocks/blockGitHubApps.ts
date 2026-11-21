import { z } from "zod";

import { base } from "../base.ts";
import { getInstallationSuggestions } from "./getInstallationSuggestions.ts";

export const blockGitHubApps = base.createBlock({
	about: {
		name: "GitHub Apps",
	},
	produce({ options, props }) {
		return {
			suggestions: getInstallationSuggestions(
				"enable the GitHub app",
				props.apps.map((app) => `${app.name} (${app.url})`),
				`https://github.com/${options.owner}/${options.repository}/settings/installations`,
			),
		};
	},
	props: {
		apps: z
			.array(
				z.object({
					name: z.string(),
					url: z.string(),
				}),
			)
			.default([]),
	},
});
