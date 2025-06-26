import { defineConfig } from "tsdown";

export default defineConfig({
	dts: true,
	entry: ["src/**/*.ts", "!src/**/*.test.*"],
	format: "esm",
	outDir: "lib",
	unbundle: true,
});
