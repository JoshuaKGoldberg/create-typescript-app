import { describe, expect, it } from "vitest";

import { readFileSafeAsJson } from "../../../shared/readFileSafeAsJson.js";
import { Options, PartialPackageData } from "../../../shared/types.js";
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

describe("createStructure", () => {
	describe.each([
		// "common",
		"everything",
		// "minimal",
	])("base %s", () => {
		it("matches current and next", async () => {
			const packageData =
				((await readFileSafeAsJson(
					"./package.json",
				)) as null | PartialPackageData) ?? {};

			const optionsNext = {
				...optionsBaseline,
				node: { pinned: "20.12.2" },
				version: packageData.version,
			};

			const baseline = await createStructure(optionsBaseline, false);
			const next = await createStructure(optionsNext, true);

			// Test display cleaning: just don't show values that are the same
			deleteEqualValuesDeep(baseline, next);

			// Expected: eslint.config.js has different orders for now
			delete baseline["eslint.config.js"];
			delete next["eslint.config.js"];

			expect(next).toEqual(baseline);
		});
	});
});

/* eslint-disable @typescript-eslint/no-dynamic-delete */

function deleteEqualValues<T extends object>(a: T, b: T) {
	for (const i in a) {
		if (a[i] === b[i]) {
			delete b[i];
			delete a[i];
		}
	}
}

function deleteEqualValuesDeep<T extends object>(a: T, b: T) {
	deleteEqualValues(a, b);

	for (const i in a) {
		if (a[i] && typeof a[i] === "object" && b[i] && typeof b[i] === "object") {
			deleteEqualValuesDeep(a[i], b[i]);

			if (Object.keys(a[i]).length === 0 && Object.keys(b[i]).length === 0) {
				delete a[i];
				delete b[i];
			}
		}
	}
}

/* eslint-enable @typescript-eslint/no-dynamic-delete */
