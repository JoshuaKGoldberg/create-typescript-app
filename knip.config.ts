import type { KnipConfig } from "knip";

export default {
	entry: ["src/**/*.test.*", "src/index.ts"],
	ignoreDependencies: [
		"all-contributors-cli",
		"cspell-populate-words",
		"remove-dependencies",
		"trash-cli",
	],
	ignoreExportsUsedInFile: { interface: true, type: true },
	project: ["src/**/*.ts"],
	treatConfigHintsAsErrors: true,
} satisfies KnipConfig;
