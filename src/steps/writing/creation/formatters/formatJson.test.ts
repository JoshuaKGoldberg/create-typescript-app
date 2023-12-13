import { describe, expect, it } from "vitest";

import { formatJson } from "./formatJson.js";

describe("formatJson", () => {
	it("removes undefined values", async () => {
		const actual = await formatJson({ empty: undefined, exists: true });

		expect(actual).toMatchInlineSnapshot(`
			"{ "exists": true }
			"
		`);
	});
});
