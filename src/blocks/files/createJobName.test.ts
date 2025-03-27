import { describe, expect, test } from "vitest";

import { createJobName } from "./createJobName.js";

describe(createJobName, () => {
	test.each([
		["Build", "build"],
		["Build?", "build"],
		["Build with Spaces", "build_with_spaces"],
		["Build (Release)", "build_release"],
	])("%s becomes %s", (input, expected) => {
		expect(createJobName(input)).toBe(expected);
	});
});
