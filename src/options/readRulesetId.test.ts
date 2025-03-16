import { describe, expect, it } from "vitest";

import { readRulesetId } from "./readRulesetId.js";

const getOwner = () => Promise.resolve("test-owner");
const getRepository = () => Promise.resolve("test-repository");

describe(readRulesetId, () => {
	it("returns undefined when the GET request does not retrieve rulesets", async () => {
		const take = () => Promise.resolve(undefined);

		const actual = await readRulesetId(take, getOwner, getRepository);

		expect(actual).toBeUndefined();
	});

	it("returns undefined when no rulesets match the main title", async () => {
		const take = () => Promise.resolve([{ id: "1", name: "Not main ruleset" }]);

		const actual = await readRulesetId(take, getOwner, getRepository);

		expect(actual).toBeUndefined();
	});

	it("returns the main ruleset ID when one existing ruleset matches the main title", async () => {
		const ruleset = { id: "2", name: "Branch protection for main" };
		const take = () =>
			Promise.resolve([
				{ id: "1", name: "Not main ruleset" },
				ruleset,
				{ id: "3", name: "Not main ruleset" },
			]);

		const actual = await readRulesetId(take, getOwner, getRepository);

		expect(actual).toBe(ruleset.id);
	});
});
