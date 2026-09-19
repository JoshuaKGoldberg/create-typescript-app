import { base } from "../base.mjs";
import { getInstallationSuggestions } from "./getInstallationSuggestions.mjs";
import { z } from "zod";
//#region src/blocks/blockRepositorySecrets.ts
const blockRepositorySecrets = base.createBlock({
	about: { name: "Repository Secrets" },
	addons: { secrets: z.array(z.object({
		description: z.string(),
		name: z.string()
	})).default([]) },
	produce({ addons, options }) {
		return { suggestions: getInstallationSuggestions("populate the secret", addons.secrets.map((secret) => `${secret.name} (${secret.description})`), `https://github.com/${options.owner}/${options.repository}/settings/secrets/actions`) };
	}
});
//#endregion
export { blockRepositorySecrets };
