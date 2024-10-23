import { describe, expect, it } from "vitest";

import { Options } from "../../../shared/types.js";
import { createStructure } from "./index.js";

const options: Options = {
	access: "public",
	author: "Test Author",
	base: "everything",
	description: "Test Description",
	directory: "test-directory",
	email: { github: "github@example.com", npm: "npm@example.com" },
	funding: "Test Funding",
	keywords: ["test", "keywords"],
	logo: { alt: "Test Alt", src: "test.png" },
	mode: "create",
	owner: "Test Owner",
	repository: "test-repo",
	title: "Test Title",
};

describe("createStructure", () => {
	describe.each([
		// "common",
		"everything",
		// "minimal",
	])("base %s", () => {
		it("matches current and next", async () => {
			const current = await createStructure(options, false);
			const next = await createStructure(options, true);

			expect(next).toEqual(current);
		});
	});
});
