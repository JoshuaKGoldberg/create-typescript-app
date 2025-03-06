import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockGitHubApps } from "./blockGitHubApps.js";
import { optionsBase } from "./options.fakes.js";

describe("blockGitHubApps", () => {
	test("without addons", () => {
		const creation = testBlock(blockGitHubApps, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "suggestions": undefined,
			}
		`);
	});

	test("with addons", () => {
		const creation = testBlock(blockGitHubApps, {
			addons: {
				apps: [
					{
						name: "Secret A.",
						url: "https://example.com?a",
					},
					{
						name: "Secret B.",
						url: "https://example.com?b",
					},
				],
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "suggestions": [
			    "- enable the GitHub apps on https://github.com/test-owner/test-repository/settings/installations:
			   - Secret A. (https://example.com?a)
			   - Secret B. (https://example.com?b)",
			  ],
			}
		`);
	});
});
