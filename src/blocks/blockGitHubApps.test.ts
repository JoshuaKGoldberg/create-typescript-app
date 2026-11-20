import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockGitHubApps } from "./blockGitHubApps.ts";
import { optionsBase } from "./options.fakes.ts";

describe(blockGitHubApps, () => {
	test("without props", () => {
		const creation = testBlock(blockGitHubApps, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "suggestions": undefined,
			}
		`);
	});

	test("with props", () => {
		const creation = testBlock(blockGitHubApps, {
			options: optionsBase,
			props: {
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
