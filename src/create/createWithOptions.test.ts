import { describe, expect, it, vi } from "vitest";

import { createWithOptions } from "./createWithOptions.js";

// Define mock data and options
const github = { data: "mock data" };
const options = { createStructure: true };

describe("createWithOptions", () => {
	it("creates a repository structure for GitHub", async () => {
		// Mock the writeStructure function
		const mockWriteStructure = vi.fn();
		vi.mock("../steps/writing/writeStructure.js", () => ({
			writeStructure: mockWriteStructure,
		}));

		// Call createWithOptions with the mock data
		const result = await createWithOptions({ github, options });

		// Assert that writeStructure was called with the expected options
		expect(mockWriteStructure).toHaveBeenCalledWith(options);

		// Assert the expected outcome based on the behavior being tested
		expect(result).toEqual({
			outcome: "Repository structure created",
		});
	});

	it("creates a README file", async () => {
		// Mock the writeReadme function to track if it's called with the correct options
		const mockWriteReadme = vi.fn();
		vi.mock("../steps/writeReadme/index.js", () => ({
			writeReadme: mockWriteReadme,
		}));

		// Call createWithOptions with the test-specific data
		const result = await createWithOptions({ github, options });

		// Assert that writeReadme was called with the expected options
		expect(mockWriteReadme).toHaveBeenCalledWith(options);

		expect(result).toEqual({
			outcome: "README file created",
		});
	});

	it("adds contributors to the repository", async () => {
		expect(result).toEqual({
			outcome: "Contributors added",
		});
	});

	it("installs packages by calling finalizeDependecies", async () => {
		expect(result).toEqual({});
	});

	it("cleans up installation files", async () => {
		expect(result).toEqual({});
	});

	it("initializes the Github repository", async () => {
		expect(result).toEqual({});
	});

	it("returns a boolean to confirm the Github repository was initialized", async () => {
		expect(result).toEqual({});
	});
});
