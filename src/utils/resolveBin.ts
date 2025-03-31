import { fileURLToPath } from "node:url";

// TODO: try to see if we can avoid this altogether...
// https://github.com/JoshuaKGoldberg/create-typescript-app/issues/1992
export function resolveBin(bin: string) {
	// This can't be tested yet in Vitest :(
	// https://github.com/vitest-dev/vitest/issues/6953
	return fileURLToPath(import.meta.resolve(bin));
}
