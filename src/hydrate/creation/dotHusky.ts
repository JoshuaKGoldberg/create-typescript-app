export function createDotHusky() {
	return {
		".gitignore": "_",
		"pre-commit": [
			`#!/bin/sh`,
			`. "$(dirname "$0")/_/husky.sh"`,
			"npx lint-staged",
		].join("\n"),
	};
}
