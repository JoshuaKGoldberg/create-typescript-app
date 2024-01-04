import { describe, expect, it } from "vitest";

import { createTsupConfig } from "./createTsupConfig.js";

describe("createTsupConfig", () => {
	it("creates an ignore file with test entries when excludeTests is false", async () => {
		const actual = await createTsupConfig({ excludeTests: false });

		expect(actual).toMatchInlineSnapshot(`
			"import { defineConfig } from "tsup";

			export default defineConfig({
			  bundle: false,
			  clean: true,
			  dts: true,
			  entry: ["src/**/*.ts", "!src/**/*.test.*"],
			  format: "esm",
			  outDir: "lib",
			  sourcemap: true,
			});
			"
		`);
	});

	it("creates an ignore file without test entries when excludeTests is true", async () => {
		const actual = await createTsupConfig({ excludeTests: true });

		expect(actual).toMatchInlineSnapshot(`
			"import { defineConfig } from "tsup";

			export default defineConfig({
			  bundle: false,
			  clean: true,
			  dts: true,
			  entry: ["src/**/*.ts"],
			  format: "esm",
			  outDir: "lib",
			  sourcemap: true,
			});
			"
		`);
	});
});
