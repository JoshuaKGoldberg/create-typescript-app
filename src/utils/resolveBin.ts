// TODO: try to see if we can avoid this altogether...
// ...or failing that, create a package
export function resolveBin(bin: string) {
	// This can't be tested yet in Vitest :(
	// https://github.com/vitest-dev/vitest/issues/6953
	return import.meta.resolve(bin).replace(/^file:\/\//gu, "");
}
