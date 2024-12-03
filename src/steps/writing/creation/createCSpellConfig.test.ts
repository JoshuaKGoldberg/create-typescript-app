import { describe, expect, it } from "vitest";

import { createCSpellConfig } from "./createCSpellConfig.js";

describe("createCSpellConfig", () => {
	it("creates an ignore file with words when exclusions are disabled", async () => {
		const actual = await createCSpellConfig({});

		expect(actual).toMatchInlineSnapshot(`
			"{
				"dictionaries": ["typescript"],
				"ignorePaths": [
					".all-contributorsrc",
					".github",
					"CHANGELOG.md",
					"coverage",
					"lib",
					"node_modules",
					"pnpm-lock.yaml"
				],
				"words": ["codecov", "joshuakgoldberg", "markdownlint", "vitest"]
			}
			"
		`);
	});

	it("creates an ignore file without words when exclusions are enabled", async () => {
		const actual = await createCSpellConfig({
			excludeAllContributors: true,
			excludeLintMd: true,
			excludeTemplatedBy: true,
			excludeTests: true,
		});

		expect(actual).toMatchInlineSnapshot(`
			"{
				"dictionaries": ["typescript"],
				"ignorePaths": [
					".github",
					"CHANGELOG.md",
					"lib",
					"node_modules",
					"pnpm-lock.yaml"
				]
			}
			"
		`);
	});
});
