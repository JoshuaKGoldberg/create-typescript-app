import { Options } from "./types.js";

export function createCleanupCommands({
	bin,
	mode,
}: Pick<Options, "bin" | "mode">) {
	return [
		// There's no need to dedupe when initializing from the fixed template
		...(mode === "initialize" ? [] : ["pnpm dedupe"]),
		// n/no-missing-import rightfully reports on a missing the bin .js file
		...(bin ? ["pnpm build"] : []),
		"pnpm lint --fix",
		"pnpm format --write",
	];
}
