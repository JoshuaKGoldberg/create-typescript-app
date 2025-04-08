import { z } from "zod";

import { base } from "../base.js";
import { blockGitHubApps } from "./blockGitHubApps.js";
import { intakeFileAsJson } from "./intake/intakeFileAsJson.js";

const zIgnoreDeps = z.array(z.string()).default([]);

export const blockRenovate = base.createBlock({
	about: {
		name: "Renovate",
	},
	addons: {
		ignoreDeps: zIgnoreDeps,
	},
	intake({ files }) {
		const raw = intakeFileAsJson(files, [".github", "renovate.json"]);

		return {
			ignoreDeps: zIgnoreDeps.safeParse(raw?.ignoreDeps).data,
		};
	},
	produce({ addons }) {
		const { ignoreDeps } = addons;

		return {
			addons: [
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
						extends: [
							":preserveSemverRanges",
							"config:best-practices",
							"replacements:all",
						],
						ignoreDeps: Array.from(
							new Set(["codecov/codecov-action", ...ignoreDeps]),
						).sort(),
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
