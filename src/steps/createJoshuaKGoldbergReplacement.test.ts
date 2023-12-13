import { describe, expect, test } from "vitest";

import { createJoshuaKGoldbergReplacement } from "./createJoshuaKGoldbergReplacement.js";

const options = {
	owner: "NewOwner",
	repository: "new-repository",
};

describe("createJoshuaKGoldbergReplacement", () => {
	test.each([
		[`JoshuaKGoldberg`, options.owner],
		[
			`JoshuaKGoldberg/${options.repository}`,
			`${options.owner}/${options.repository}`,
		],
		[`JoshuaKGoldberg/other-repository`, `JoshuaKGoldberg/other-repository`],
	])("%s", (before, expected) => {
		const [matcher, replacer] = createJoshuaKGoldbergReplacement(options);

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const actual = replacer(before, matcher.exec(before)![1]);

		expect(actual).toBe(expected);
	});
});
