export interface CleanUpFilesOptions {
	bin?: boolean;
	dedupe?: boolean;
}

export function createCleanUpFilesCommands({
	bin,
	dedupe,
}: CleanUpFilesOptions) {
	return [
		// There's no need to dedupe when initializing from the fixed template
		...(dedupe ? ["pnpm dedupe"] : []),
		// n/no-missing-import rightfully reports on a missing the bin .js file
		...(bin ? ["pnpm build"] : []),
		"pnpm lint --fix",
		"pnpm format --write",
	];
}
