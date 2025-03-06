import { z } from "zod";

import { base } from "../base.js";
import { getInstallationSuggestions } from "./getInstallationSuggestions.js";

export const blockRepositorySecrets = base.createBlock({
	about: {
		name: "Repository Secrets",
	},
	addons: {
		secrets: z
			.array(
				z.object({
					description: z.string(),
					name: z.string(),
				}),
			)
			.default([]),
	},
	produce({ addons, options }) {
		return {
			suggestions: getInstallationSuggestions(
				"populate the secret",
				addons.secrets.map(
					(secret) => `${secret.name} (${secret.description})`,
				),
				`https://github.com/${options.owner}/${options.repository}/settings/secrets/actions`,
			),
		};
	},
});
