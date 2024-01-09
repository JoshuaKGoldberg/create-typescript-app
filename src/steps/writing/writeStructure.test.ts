import { describe, expect, it, vi } from "vitest";

import { Options } from "../../shared/types.js";
import { writeStructure } from "./writeStructure.js";

const mock$ = vi.fn();

vi.mock("execa", () => ({
	get $() {
		return mock$;
	},
}));

vi.mock("./creation/index.js");
vi.mock("./writeStructureWorker.js");

const options = {
	access: "public",
	author: "TestAuthor",
	base: "everything",
	description: "Test description.",
	directory: ".",
	email: {
		github: "github@email.com",
		npm: "npm@email.com",
	},
	keywords: ["abc", "def ghi", "jkl mno pqr"],
	mode: "create",
	owner: "TestOwner",
	repository: "test-repository",
	title: "Test Title",
} satisfies Options;

describe("writeStructure", () => {
	it("resolves when chmod resolves", async () => {
		mock$.mockResolvedValue(undefined);

		await expect(writeStructure(options)).resolves.toBeUndefined();
	});

	it("resolves when chmod rejects", async () => {
		mock$.mockRejectedValue(new Error("Oh no!"));

		await expect(writeStructure(options)).resolves.toBeUndefined();
	});
});
