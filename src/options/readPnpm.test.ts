import { describe, expect, it } from "vitest";

import { readPnpm } from "./readPnpm.js";

describe(readPnpm, () => {
	it("returns 10.4.0 when there is no existing packageManager", async () => {
		const actual = await readPnpm(() => Promise.resolve({}));

		expect(actual).toEqual("10.4.0");
	});

	it("returns 10.4.0 when an existing packageManager is not pnpm", async () => {
		const actual = await readPnpm(() =>
			Promise.resolve({
				packageManager: "yarn@1.2.3",
			}),
		);

		expect(actual).toEqual("10.4.0");
	});

	it("returns the existing pnpm version when an existing packageManager is pnpm", async () => {
		const actual = await readPnpm(() =>
			Promise.resolve({
				packageManager: "pnpm@10.11.12",
			}),
		);

		expect(actual).toEqual("10.11.12");
	});
});
