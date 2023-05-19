import chalk from "chalk";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { hydrate } from "./hydrate.js";

const mockReadFileSafe = vi.fn();

vi.mock("./readFileSafe.js", () => ({
	get readFileSafe() {
		return mockReadFileSafe;
	},
}));

const mockClearUnnecessaryFiles = vi.fn();

vi.mock("./clearUnnecessaryFiles.js", () => ({
	get clearUnnecessaryFiles() {
		return mockClearUnnecessaryFiles;
	},
}));

const mockWriteStructure = vi.fn();

vi.mock("./writing.js", () => ({
	get writeStructure() {
		return mockWriteStructure;
	},
}));

const mockWriteReadme = vi.fn();

vi.mock("./writeReadme.js", () => ({
	get writeReadme() {
		return mockWriteReadme;
	},
}));

const mockFinalize = vi.fn();

vi.mock("./finalize.js", () => ({
	get finalize() {
		return mockFinalize;
	},
}));

const mockConsoleLog = vi.fn();

describe("hydrate", () => {
	beforeEach(() => {
		console.log = mockConsoleLog;
	});

	it("runs when all values are provided", async () => {
		const fakeFiles: Record<string, string> = {
			"./README.md": "",
			"./package.json": "{}",
		};
		mockReadFileSafe.mockImplementation(
			(fileName: string) => fakeFiles[fileName]
		);

		await hydrate([
			"--author",
			"Test Author",
			"--description",
			"test description",
			"--email",
			"test@email.com",
			"--funding",
			"TestFunding",
			"--owner",
			"TestOwner",
			"--releases",
			"--repository",
			"test-repository",
			"--title",
			"Test Title",
			"--unitTests",
		]);

		expect(console.log).toHaveBeenCalledWith(chalk.green("Done!"));
	});
});
