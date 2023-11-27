import fs from "fs/promises";
import { expect } from "vitest";
import { test } from "vitest";

test("knip.jsonc", async () => {
	const content = await fs.readFile("knip.jsonc", "utf-8");
	const knipJSONC: Record<string, unknown> = JSON.parse(content);

	expect(Array.isArray(knipJSONC.project)).toBeTruthy();
	expect(Array.isArray(knipJSONC.entry)).toBeTruthy();

	expect(knipJSONC.$schema).toMatchInlineSnapshot(
		'"https://unpkg.com/knip@latest/schema.json"',
	);
	expect(knipJSONC.ignoreExportsUsedInFile).toMatchInlineSnapshot();
});
