import { defineConfig } from "tsdown";

export default defineConfig({
	dts: true,
	entry: ["src/**/*.ts", "!src/**/*.test.*"],
	outDir: "lib",
	unbundle: true,
});
