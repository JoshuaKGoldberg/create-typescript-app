import { base } from "../base.js";
import { blockCSpell } from "./blockCSpell.js";
import { blockGitHubApps } from "./blockGitHubApps.js";

export const blockRenovate = base.createBlock({
	about: {
		name: "Renovate",
	},
	produce() {
		return {
			addons: [
				blockCSpell({
					words: ["automerge"],
				}),
				blockGitHubApps({
					apps: [
						{
							name: "Renovate",
							url: "https://github.com/apps/renovate",
						},
					],
				}),
			],
			files: {
				".github": {
					"renovate.json": JSON.stringify({
						$schema: "https://docs.renovatebot.com/renovate-schema.json",
						automerge: true,
						extends: ["config:best-practices", "replacements:all"],
						ignoreDeps: ["codecov/codecov-action"],
						labels: ["dependencies"],
						minimumReleaseAge: "7 days",
						patch: { enabled: false },
						postUpdateOptions: ["pnpmDedupe"],
					}),
				},
			},
		};
	},
});