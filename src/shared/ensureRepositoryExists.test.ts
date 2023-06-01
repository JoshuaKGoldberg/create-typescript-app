import { Octokit } from "octokit";
import { beforeEach, describe, expect, it, SpyInstance, vi } from "vitest";

import { ensureRepositoryExists } from "./ensureRepositoryExists.js";

const mockSelect = vi.fn();
const mockText = vi.fn();

vi.mock("@clack/prompts", () => ({
	isCancel: vi.fn(),
	intro: vi.fn(),
	outro: vi.fn(),
	get select() {
		return mockSelect;
	},
	get text() {
		return mockText;
	},
}));

const owner = "StubOwner";
const repository = "stub-repository";

const createMockOctokit = (
	repos: Partial<Record<keyof Octokit["rest"]["repos"], SpyInstance>>
) =>
	({
		rest: {
			repos,
		},
	} as unknown as Octokit);

describe("ensureRepositoryExists", () => {
	beforeEach(() => {
		vi.spyOn(console, "clear").mockImplementation(() => undefined);
		vi.spyOn(console, "log").mockImplementation(() => undefined);
	});

	it("returns the repository when octokit is undefined", async () => {
		const actual = await ensureRepositoryExists(undefined, owner, repository);

		expect(actual).toEqual(repository);
	});

	it("returns the repository when the octokit GET resolves", async () => {
		const octokit = createMockOctokit({ get: vi.fn().mockResolvedValue({}) });

		const actual = await ensureRepositoryExists(octokit, owner, repository);

		expect(actual).toEqual(repository);
	});

	it("throws the error when awaiting the octokit GET throws a non-404 error", async () => {
		const error = new Error("Oh no!");
		const octokit = createMockOctokit({
			get: vi.fn().mockRejectedValue(error),
		});

		await expect(() =>
			ensureRepositoryExists(octokit, owner, repository)
		).rejects.toEqual(error);
	});

	it("creates the repository when the octokit GET rejects and the prompt resolves 'create'", async () => {
		const octokit = createMockOctokit({
			get: vi
				.fn()
				.mockRejectedValueOnce({ status: 404 })
				.mockResolvedValueOnce({}),
			createUsingTemplate: vi.fn().mockResolvedValue({}),
		});

		mockSelect.mockResolvedValue("create");

		const actual = await ensureRepositoryExists(octokit, owner, repository);

		expect(actual).toEqual(repository);
	});

	it("creates a different repository when the octokit GET rejects and the prompt resolves 'different'", async () => {
		const octokit = createMockOctokit({
			get: vi
				.fn()
				.mockRejectedValueOnce({ status: 404 })
				.mockResolvedValueOnce({}),
		});
		const newRepository = "new-repository";

		mockSelect.mockResolvedValue("different");
		mockText.mockResolvedValue(newRepository);

		const actual = await ensureRepositoryExists(octokit, owner, repository);

		expect(actual).toEqual(newRepository);
	});
});
