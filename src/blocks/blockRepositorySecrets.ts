import { z } from "zod";

import { base } from "../base.js";

const zSecret = z.object({
	description: z.string(),
	name: z.string(),
});
export const blockRepositorySecrets = base.createBlock({
	about: {
		name: "Repository Secrets",
	},
	addons: {
		secrets: z.array(zSecret).default([]),
	},
	produce({ addons }) {
		return {
			suggestions: addons.secrets.length
				? [
						[
							`- populate the secret`,
							addons.secrets.length === 1 ? "" : "s",
							`:\n`,
							addons.secrets.map(printSecret).join("\n"),
						].join(""),
					]
				: undefined,
		};
	},
});

function printSecret(app: z.infer<typeof zSecret>) {
	return `   - ${app.name} (${app.description})`;
}
