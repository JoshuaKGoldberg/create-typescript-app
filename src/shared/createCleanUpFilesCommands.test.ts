import { describe, expect, it } from "vitest";

import { createCleanUpFilesCommands } from "./createCleanUpFilesCommands.js";

describe("createCleanUpFilesCommands", () => {
	it("only lints and formats when no options are specified", () => {
		const actual = createCleanUpFilesCommands({});

		expect(actual).toEqual(["pnpm lint --fix", "pnpm format --write"]);
	});

	it("runs dedupe and build before it lints and formats when both options are specified", () => {
		const actual = createCleanUpFilesCommands({
			bin: true,
			dedupe: true,
		});

		expect(actual).toEqual([
			"pnpm dedupe",
			"pnpm build",
			"pnpm lint --fix",
			"pnpm format --write",
		]);
	});
});
