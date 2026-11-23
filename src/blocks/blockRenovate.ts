import { z } from "zod";

import { base } from "../base.ts";
import { formatFile } from "../utils/formatFile.ts";
import { blockGitHubApps } from "./blockGitHubApps.ts";
import { intakeFileAsJson } from "./intake/intakeFileAsJson.ts";

const zCustomManagers = z.array(z.record(z.string(), z.unknown())).default([]);
const zGitIgnoredAuthors = z.array(z.string()).default([]);
const zIgnoreDeps = z.array(z.string()).default([]);
const zPackageRules = z.array(z.record(z.string(), z.unknown())).default([]);

export const blockRenovate = base.createBlock({
	about: {
		name: "Renovate",
	},
	intake({ files }) {
		const raw = intakeFileAsJson(files, [".github", "renovate.json"]);

		return {
			customManagers: zCustomManagers.safeParse(raw?.customManagers).data,
			gitIgnoredAuthors: zGitIgnoredAuthors.safeParse(raw?.gitIgnoredAuthors)
				.data,
			ignoreDeps: zIgnoreDeps.safeParse(raw?.ignoreDeps).data,
			packageRules: zPackageRules.safeParse(raw?.packageRules).data,
		};
	},
	produce({ props }) {
		const { customManagers, gitIgnoredAuthors, ignoreDeps, packageRules } =
			props;

		return {
			extensions: [
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
					"renovate.json": formatFile(
						".github/renovate.json",
						JSON.stringify({
							$schema: "https://docs.renovatebot.com/renovate-schema.json",
							automerge: true,
							...(customManagers.length && { customManagers }),
							extends: [
								":preserveSemverRanges",
								"config:best-practices",
								"replacements:all",
							],
							...(gitIgnoredAuthors.length && { gitIgnoredAuthors }),
							ignoreDeps: Array.from(
								new Set(["codecov/codecov-action", ...ignoreDeps]),
							).sort(),
							labels: ["dependencies"],
							minimumReleaseAge: "7 days",
							...(packageRules.length && { packageRules }),
							patch: { enabled: false },
							postUpdateOptions: ["pnpmDedupe"],
						}),
					),
				},
			},
		};
	},
	props: {
		customManagers: zCustomManagers,
		gitIgnoredAuthors: zGitIgnoredAuthors,
		ignoreDeps: zIgnoreDeps,
		packageRules: zPackageRules,
	},
});
