import { Options } from "../../../shared/types.js";
import { formatTypeScript } from "./formatters/formatTypeScript.js";

export async function createTsupConfig(options: Pick<Options, "excludeTests">) {
	return await formatTypeScript(`import { defineConfig } from "tsup";

		export default defineConfig({
			bundle: false,
			clean: true,
			dts: true,
			entry: ["src/**/*.ts"${options.excludeTests ? "" : `, "!src/**/*.test.*"`}],
			format: "esm",
			outDir: "lib",
			sourcemap: true,
		});
	`);
}
