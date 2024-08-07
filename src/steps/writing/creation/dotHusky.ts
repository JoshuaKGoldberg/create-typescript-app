import { formatIgnoreFile } from "./formatters/formatIgnoreFile.js";

export function createDotHusky() {
	return {
		".gitignore": formatIgnoreFile(["_"]),
		"pre-commit": formatIgnoreFile(["npx lint-staged"]),
	};
}
