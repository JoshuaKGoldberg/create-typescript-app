import { Octokit } from "octokit";
import { describe, expect, it, vi } from "vitest";

import { ensureRepositoryExists } from "./ensureRepositoryExists.js";

const mockSelect = vi.fn();
const mockText = vi.fn();

vi.mock("@clack/prompts", () => ({
	intro: vi.fn(),
	isCancel: vi.fn(),
	outro: vi.fn(),
	get select() {
		return mockSelect;
	},
	get text() {
		return mockText;
	},
}));

const mockDoesRepositoryExist = vi.fn();

vi.mock("../doesRepositoryExist.js", () => ({
	get doesRepositoryExist() {
		return mockDoesRepositoryExist;
	},
}));

const owner = "StubOwner";
const repository = "stub-repository";

const createUsingTemplate = vi.fn();

const createMockOctokit = () =>
	({ rest: { repos: { createUsingTemplate } } }) as unknown as Octokit;

describe("ensureRepositoryExists", () => {
	it("returns the repository when octokit is undefined", async () => {
		const actual = await ensureRepositoryExists(undefined, {
			createRepository: false,
			owner,
			repository,
		});

		expect(actual).toEqual({ octokit: undefined, repository });
	});

	it("returns the repository when octokit is defined and the repository exists", async () => {
		mockDoesRepositoryExist.mockResolvedValue(true);
		const octokit = createMockOctokit();
		const actual = await ensureRepositoryExists(octokit, {
			createRepository: false,
			owner,
			repository,
		});

		expect(actual).toEqual({ octokit, repository });
	});

	it("creates a new repository when createRepository is true and the repository does not exist", async () => {
		const octokit = createMockOctokit();

		mockDoesRepositoryExist.mockResolvedValue(false);

		const actual = await ensureRepositoryExists(octokit, {
			createRepository: true,
			owner,
			repository,
		});

		expect(actual).toEqual({ octokit, repository });
		expect(octokit.rest.repos.createUsingTemplate).toHaveBeenCalledWith({
			name: repository,
			owner,
			template_owner: "JoshuaKGoldberg",
			template_repo: "create-typescript-app",
		});
	});

	it("creates a new repository when the prompt is 'create' and the repository does not exist", async () => {
		const octokit = createMockOctokit();

		mockDoesRepositoryExist.mockResolvedValue(false);
		mockSelect.mockResolvedValue("create");

		const actual = await ensureRepositoryExists(octokit, {
			createRepository: false,
			owner,
			repository,
		});

		expect(actual).toEqual({ octokit, repository });
		expect(octokit.rest.repos.createUsingTemplate).toHaveBeenCalledWith({
			name: repository,
			owner,
			template_owner: "JoshuaKGoldberg",
			template_repo: "create-typescript-app",
		});
	});

	it("returns the second repository when the prompt is 'different', the first repository does not exist, and the second repository exists", async () => {
		const octokit = createMockOctokit();
		const newRepository = "new-repository";

		mockDoesRepositoryExist
			.mockResolvedValueOnce(false)
			.mockResolvedValueOnce(true);
		mockSelect.mockResolvedValueOnce("different");
		mockText.mockResolvedValue(newRepository);

		const actual = await ensureRepositoryExists(octokit, {
			createRepository: false,
			owner,
			repository,
		});

		expect(actual).toEqual({ octokit, repository: newRepository });
		expect(octokit.rest.repos.createUsingTemplate).not.toHaveBeenCalled();
	});

	it("creates the second repository when the prompt is 'different', the first repository does not exist, and the second repository does not exist", async () => {
		const octokit = createMockOctokit();
		const newRepository = "new-repository";

		mockDoesRepositoryExist.mockResolvedValue(false);
		mockSelect
			.mockResolvedValueOnce("different")
			.mockResolvedValueOnce("create");
		mockText.mockResolvedValue(newRepository);

		const actual = await ensureRepositoryExists(octokit, {
			createRepository: false,
			owner,
			repository,
		});

		expect(actual).toEqual({ octokit, repository: newRepository });
		expect(octokit.rest.repos.createUsingTemplate).toHaveBeenCalledWith({
			name: newRepository,
			owner,
			template_owner: "JoshuaKGoldberg",
			template_repo: "create-typescript-app",
		});
	});

	it("switches octokit to undefined when the prompt is 'local' and the repository does not exist", async () => {
		const octokit = createMockOctokit();

		mockDoesRepositoryExist.mockResolvedValue(false);
		mockSelect.mockResolvedValue("local");

		const actual = await ensureRepositoryExists(octokit, {
			createRepository: false,
			owner,
			repository,
		});

		expect(actual).toEqual({ octokit: undefined, repository });
		expect(octokit.rest.repos.createUsingTemplate).not.toHaveBeenCalled();
	});
});
