import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["src/**/*.ts", "!src/**/*.test.*"],
	unbundle: true,
});
