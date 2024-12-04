import { describe, expect, it } from "vitest";

import { createCSpellConfig } from "./createCSpellConfig.js";

describe("createCSpellConfig", () => {
	it("creates an ignore file with all words when exclusions are disabled", async () => {
		const actual = await createCSpellConfig({});

		expect(actual).toMatchInlineSnapshot(`
			"{
				"dictionaries": ["npm", "node", "typescript"],
				"ignorePaths": [
					".all-contributorsrc",
					".github",
					"CHANGELOG.md",
					"coverage",
					"lib",
					"node_modules",
					"pnpm-lock.yaml"
				],
				"words": [
					"apexskier",
					"automerge",
					"joshuakgoldberg",
					"markdownlintignore",
					"tseslint"
				]
			}
			"
		`);
	});

	it("creates an ignore file with minimal words when exclusions are enabled", async () => {
		const actual = await createCSpellConfig({
			excludeAllContributors: true,
			excludeLintMd: true,
			excludeReleases: true,
			excludeRenovate: true,
			excludeTemplatedBy: true,
			excludeTests: true,
		});

		expect(actual).toMatchInlineSnapshot(`
			"{
				"dictionaries": ["npm", "node", "typescript"],
				"ignorePaths": [
					".github",
					"CHANGELOG.md",
					"lib",
					"node_modules",
					"pnpm-lock.yaml"
				],
				"words": ["tseslint"]
			}
			"
		`);
	});
});
