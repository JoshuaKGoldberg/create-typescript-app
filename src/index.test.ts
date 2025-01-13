import { produceBase, producePreset } from "create";
import { describe, test } from "vitest";

import { base, BaseOptions, presets } from "./index.js";

describe("index", () => {
	test("end-to-end", async () => {
		const created = await producePreset(presets.everything, {
			options: (await produceBase(base)) as BaseOptions,
		});

		const actual = await readFilesForCreate(".");

		console.log(created);
	});
});
