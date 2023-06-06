import { describe, expect, it, vi } from "vitest";

import { clearUnnecessaryFiles } from "./clearUnnecessaryFiles.js";

const mockExecaCommand = vi.fn().mockRejectedValue("Oh no!");

vi.mock("execa", () => ({
	get execaCommand() {
		return mockExecaCommand;
	},
}));

describe("clearUnnecessaryFiles", () => {
	it("removes all globs, quoted", async () => {
		await clearUnnecessaryFiles();

		expect(mockExecaCommand).toHaveBeenCalledWith(
			`rm -rf "./src/**/*.js" ".eslintrc.j*" ".npmignore" ".prettierrc.*" "babel.*" "CODE_OF_CONDUCT.md" "CONTRIBUTING.md" "DEVELOPMENT.md" "dist" "jest.*" "lib" "package-lock.json" "yarn.lock"`
		);
	});
});
