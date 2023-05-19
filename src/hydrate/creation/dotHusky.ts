import { formatIgnoreFile } from "./formatters/formatIgnoreFile.js";

export function createDotHusky() {
	return {
		".gitignore": formatIgnoreFile(["_"]),
		"pre-commit": formatIgnoreFile([
			`#!/bin/sh`,
			`. "$(dirname "$0")/_/husky.sh"`,
			"npx lint-staged",
		]),
	};
}
