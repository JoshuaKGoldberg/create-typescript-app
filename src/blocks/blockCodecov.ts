import { z } from "zod";

import { base } from "../base.js";
import { resolveUses } from "./actions/resolveUses.js";
import { blockGitHubApps } from "./blockGitHubApps.js";
import { blockREADME } from "./blockREADME.js";
import { blockRemoveFiles } from "./blockRemoveFiles.js";
import { blockVitest } from "./blockVitest.js";

export const blockCodecov = base.createBlock({
	about: {
		name: "Codecov",
	},
	addons: { env: z.record(z.string(), z.string()).optional() },
	produce({ addons, options }) {
		const { env } = addons;
		return {
			addons: [
				blockGitHubApps({
					apps: [
						{
							name: "Codecov",
							url: "https://github.com/apps/codecov",
						},
					],
				}),
				blockREADME({
					badges: [
						{
							alt: "🧪 Coverage",
							href: `https://codecov.io/gh/${options.owner}/${options.repository}`,
							src: `https://img.shields.io/codecov/c/github/${options.owner}/${options.repository}?label=%F0%9F%A7%AA%20coverage`,
						},
					],
				}),
				blockVitest({
					actionSteps: [
						{
							...(env && { env }),
							if: "always()",
							uses: resolveUses(
								"codecov/codecov-action",
								"v3",
								options.workflowsVersions,
							),
						},
					],
				}),
			],
		};
	},
	transition() {
		return {
			addons: [
				blockRemoveFiles({ files: [".github/codecov.yml", "codecov.yml"] }),
			],
		};
	},
});
