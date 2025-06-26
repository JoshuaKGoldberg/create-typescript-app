import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test, vi } from "vitest";

import { blockTemplatedWith } from "./blockTemplatedWith.js";
import { optionsBase } from "./options.fakes.js";

vi.mock("../utils/resolveBin.js", () => ({
	resolveBin: (bin: string) => `path/to/${bin}`,
}));

describe("blockTemplatedWith", () => {
	test("production with unknown owner", () => {
		const creation = testBlock(blockTemplatedWith, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "notices": [
			          "
			<!-- You can remove this notice if you don't want it 🙂 no worries! -->",
			          "> 💝 This package was templated with [\`create-typescript-app\`](https://github.com/JoshuaKGoldberg/create-typescript-app) using the [Bingo framework](https://create.bingo).
			",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			}
		`);
	});

	test("production with JoshuaKGoldberg as owner", () => {
		const creation = testBlock(blockTemplatedWith, {
			options: {
				...optionsBase,
				owner: "JoshuaKGoldberg",
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "notices": [
			          "> 💝 This package was templated with [\`create-typescript-app\`](https://github.com/JoshuaKGoldberg/create-typescript-app) using the [Bingo framework](https://create.bingo).
			",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			}
		`);
	});
});
