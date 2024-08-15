import { describe, expect, it } from "vitest";

import { createCleanupCommands } from "./createCleanupCommands.js";

describe("createCleanupCommands", () => {
	it("only lints and formats when bin is not enabled and there are no prepended commands", () => {
		const actual = createCleanupCommands(undefined);

		expect(actual).toEqual(["pnpm lint --fix", "pnpm format --write"]);
	});

	it("runs prepended commands before it lints and formats when bin is not enabled", () => {
		const actual = createCleanupCommands(undefined, "prepended");

		expect(actual).toEqual([
			"prepended",
			"pnpm lint --fix",
			"pnpm format --write",
		]);
	});

	it("runs prepended commands before it builds, lints, and formats when bin is not enabled", () => {
		const actual = createCleanupCommands("bin/index.js", "prepended");

		expect(actual).toEqual([
			"prepended",
			"pnpm build",
			"pnpm lint --fix",
			"pnpm format --write",
		]);
	});
});
