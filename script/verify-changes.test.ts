import fs from "fs/promises";
import { expect } from "vitest";
import { test } from "vitest";

test("knip.jsonc", async () => {
	const content = await fs.readFile("knip.jsonc");
	console.log(content);

	expect();
});
