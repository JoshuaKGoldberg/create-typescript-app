export function createCleanupCommands(
	bin: string | undefined,
	...prependedCommands: string[]
) {
	return [
		...prependedCommands,
		// n/no-missing-import rightfully reports on a missing the bin .js file
		...(bin ? ["pnpm build"] : []),
		"pnpm lint --fix",
		"pnpm format --write",
	];
}
