import { describe, expect, it } from "vitest";

import { createRerunDirectorySuggestion } from "./createRerunDirectorySuggestion.js";

const directory = "test-directory";
const repository = "test-repository";

describe("createRerunDirectorySuggestion", () => {
	it("returns undefined when mode is create and directory matches repository", () => {
		const suggestion = createRerunDirectorySuggestion({
			directory: repository,
			mode: "create",
			repository,
		});

		expect(suggestion).toBe(undefined);
	});

	it("returns directory when mode is create and directory doesn't match repository", () => {
		const suggestion = createRerunDirectorySuggestion({
			directory,
			mode: "create",
			repository,
		});

		expect(suggestion).toBe(directory);
	});

	it("returns undefined when mode is initialize and directory is .", () => {
		const suggestion = createRerunDirectorySuggestion({
			directory: ".",
			mode: "initialize",
			repository,
		});

		expect(suggestion).toBe(undefined);
	});

	it("returns directory when mode is initialize and directory is not .", () => {
		const suggestion = createRerunDirectorySuggestion({
			directory,
			mode: "initialize",
			repository,
		});

		expect(suggestion).toBe(directory);
	});
});
