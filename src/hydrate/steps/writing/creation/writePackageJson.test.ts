import { describe, expect, it, vi } from "vitest";

import { writePackageJson } from "./writePackageJson.js";

const mockReadFileAsJson = vi.fn();

vi.mock("../../../../shared/readFileAsJson.js", () => ({
	get readFileAsJson() {
		return mockReadFileAsJson;
	},
}));

const values = {
	author: "test-author",
	description: "test-description",
	email: "test-email",
	owner: "test-owner",
	releases: false,
	repository: "test-repository",
	unitTests: false,
};

describe("writePackageJson", () => {
	it("preserves existing dependencies when they exist", async () => {
		const dependencies = { abc: "1.2.3" };
		mockReadFileAsJson.mockResolvedValue({ dependencies });

		const packageJson = await writePackageJson(values);

		expect(JSON.parse(packageJson)).toEqual(
			expect.objectContaining({ dependencies })
		);
	});

	it("includes a release script when releases is true", async () => {
		mockReadFileAsJson.mockResolvedValue({});

		const packageJson = await writePackageJson({
			...values,
			releases: true,
		});

		expect(JSON.parse(packageJson)).toEqual(
			expect.objectContaining({
				scripts: expect.objectContaining({
					"should-semantic-release": "should-semantic-release --verbose",
				}),
			})
		);
	});

	it("includes a test script when unitTests is true", async () => {
		mockReadFileAsJson.mockResolvedValue({});

		const packageJson = await writePackageJson({
			...values,
			unitTests: true,
		});

		expect(JSON.parse(packageJson)).toEqual(
			expect.objectContaining({
				scripts: expect.objectContaining({
					test: "vitest",
				}),
			})
		);
	});
});
