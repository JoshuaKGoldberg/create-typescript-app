import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockRepositorySecrets } from "./blockRepositorySecrets.js";
import { optionsBase } from "./options.fakes.js";

describe("blockRepositorySecrets", () => {
	test("without addons", () => {
		const creation = testBlock(blockRepositorySecrets, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "suggestions": undefined,
			}
		`);
	});

	test("with addons", () => {
		const creation = testBlock(blockRepositorySecrets, {
			addons: {
				secrets: [
					{
						description: "Secret description a.",
						name: "Secret Name A",
					},
					{
						description: "Secret description b.",
						name: "Secret Name B",
					},
				],
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "suggestions": [
			    "- populate the secrets on https://github.com/test-owner/test-repository/settings/secrets/actions:
			   - Secret Name A (Secret description a.)
			   - Secret Name B (Secret description b.)",
			  ],
			}
		`);
	});
});
