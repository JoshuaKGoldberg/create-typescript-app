import { defineConfig } from "tsdown";

export default defineConfig({
	dts: true,
	entry: ["src/**/*.ts", "!src/**/*.test.*"],
	fixedExtension: false,
	outDir: "lib",
	unbundle: true,
});
