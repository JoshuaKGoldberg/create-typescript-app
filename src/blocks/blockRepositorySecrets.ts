import { z } from "zod";

import { base } from "../base.ts";
import { getInstallationSuggestions } from "./getInstallationSuggestions.ts";

export const blockRepositorySecrets = base.createBlock({
	about: {
		name: "Repository Secrets",
	},
	produce({ options, props }) {
		return {
			suggestions: getInstallationSuggestions(
				"populate the secret",
				props.secrets.map((secret) => `${secret.name} (${secret.description})`),
				`https://github.com/${options.owner}/${options.repository}/settings/secrets/actions`,
			),
		};
	},
	props: {
		secrets: z
			.array(
				z.object({
					description: z.string(),
					name: z.string(),
				}),
			)
			.default([]),
	},
});
