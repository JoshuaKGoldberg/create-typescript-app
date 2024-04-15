import { describe, expect, it } from "vitest";

import { createCleanupCommands } from "./createCleanupCommands.js";

describe("createCleanupCommands", () => {
	it("only lints and formats when bin is not enabled and mode is initialize", () => {
		const actual = createCleanupCommands({
			bin: undefined,
			mode: "initialize",
		});

		expect(actual).toEqual(["pnpm lint --fix", "pnpm format --write"]);
	});

	it("runs dedupe and build before it lints and formats when bin is enabled and mode is create", () => {
		const actual = createCleanupCommands({
			bin: "bin/index.js",
			mode: "create",
		});

		expect(actual).toEqual([
			"pnpm dedupe",
			"pnpm build",
			"pnpm lint --fix",
			"pnpm format --write",
		]);
	});
});
