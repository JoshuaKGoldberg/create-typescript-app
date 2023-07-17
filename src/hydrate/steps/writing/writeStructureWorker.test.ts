import { describe, expect, it, vi } from "vitest";

import { writeStructureWorker } from "./writeStructureWorker.js";

const mockMkdir = vi.fn();
const mockWriteFile = vi.fn();

vi.mock("node:fs/promises", () => ({
	get mkdir() {
		return mockMkdir;
	},
	get writeFile() {
		return mockWriteFile;
	},
}));

describe("writeStructureWorker", () => {
	it("writes an unformatted file when structure has a file", async () => {
		await writeStructureWorker(
			{
				file: "content",
			},
			".",
		);

		expect(mockMkdir).toHaveBeenCalledWith(".", { recursive: true });
		expect(mockWriteFile).toHaveBeenCalledWith("file", "content");
	});

	it.each([
		["implicit json", ".rc", '{  "value": true }', '{ "value": true }\n'],
		["cjs", "file.cjs", " module.exports = { };", "module.exports = {};\n"],
		["js", "file.js", " export default { }", "export default {};\n"],
		["explicit json", "file.json", "{ }", "{}\n"],
		["md", "file.md", " # h1 ", "# h1\n"],
		["yml", "file.yml", " on: true ", "on: true\n"],
	])("writes a formatted %s file", async (_, file, input, output) => {
		await writeStructureWorker({ [file]: input }, ".");
		expect(mockWriteFile).toHaveBeenCalledWith(file, output);
	});

	it("writes a nested file when structure has a file inside a directory", async () => {
		await writeStructureWorker(
			{
				directory: {
					file: "content",
				},
			},
			".",
		);

		expect(mockMkdir).toHaveBeenCalledWith(".", { recursive: true });
		expect(mockMkdir).toHaveBeenCalledWith("directory", { recursive: true });
	});
});
