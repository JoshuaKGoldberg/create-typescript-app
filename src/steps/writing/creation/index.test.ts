import { describe, expect, it } from "vitest";

import { Options } from "../../../shared/types.js";
import { createStructure } from "./index.js";

const optionsBaseline: Options = {
	access: "public",
	author: "Test Author",
	base: "everything",
	bin: "bin/test.js",
	description: "Test Description",
	directory: "test-directory",
	email: { github: "github@example.com", npm: "npm@example.com" },
	funding: "Test Funding",
	guide: {
		href: "https://www.joshuakgoldberg.com/blog/contributing-to-a-create-typescript-app-repository",
		title: "Contributing to a create-typescript-app Repository",
	},
	keywords: ["test", "keywords"],
	logo: { alt: "Test Alt", src: "test.png" },
	mode: "create",
	owner: "Test Owner",
	repository: "test-repo",
	title: "Test Title",
};

const optionsNext = {
	...optionsBaseline,
	node: { pinned: "20.12.2" },
};

describe("createStructure", () => {
	describe.each([
		// "common",
		"everything",
		// "minimal",
	])("base %s", () => {
		it("matches current and next", async () => {
			const baseline = await createStructure(optionsBaseline, false);
			const next = await createStructure(optionsNext, true);

			// TODO: What to do about pre-seeding files?
			delete baseline.src;

			// TODO: How should package.json be written?
			delete baseline["package.json"];

			// TODO: Baseline doesn't modify README.md, that's a migration step
			delete next["README.md"];

			expect(next).toEqual(baseline);
		});
	});
});
