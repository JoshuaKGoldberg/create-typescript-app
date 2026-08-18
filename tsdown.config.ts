import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["src/**/*.ts", "!src/**/*.test.*"],
	fixedExtension: false,
	outDir: "lib",
	unbundle: true,
});
