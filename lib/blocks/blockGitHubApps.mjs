import { base } from "../base.mjs";
import { getInstallationSuggestions } from "./getInstallationSuggestions.mjs";
import { z } from "zod";
//#region src/blocks/blockGitHubApps.ts
const blockGitHubApps = base.createBlock({
	about: { name: "GitHub Apps" },
	addons: { apps: z.array(z.object({
		name: z.string(),
		url: z.string()
	})).default([]) },
	produce({ addons, options }) {
		return { suggestions: getInstallationSuggestions("enable the GitHub app", addons.apps.map((app) => `${app.name} (${app.url})`), `https://github.com/${options.owner}/${options.repository}/settings/installations`) };
	}
});
//#endregion
export { blockGitHubApps };
