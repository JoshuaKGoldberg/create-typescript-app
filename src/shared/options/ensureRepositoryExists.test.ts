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

const auth = "abc123";
const owner = "StubOwner";
const repository = "stub-repository";

const mockCreateRepositoryWithApi = vi.fn();

vi.mock("./createRepositoryWithApi.js", () => ({
	get createRepositoryWithApi() {
		return mockCreateRepositoryWithApi;
	},
}));

const createMockOctokit = () => ({}) as unknown as Octokit;

describe("ensureRepositoryExists", () => {
	it("returns the repository when octokit is undefined", async () => {
		const actual = await ensureRepositoryExists(undefined, {
			mode: "initialize",
			owner,
			repository,
		});

		expect(actual).toEqual({ octokit: undefined, repository });
	});

	it("returns the repository when octokit is defined and the repository exists", async () => {
		mockDoesRepositoryExist.mockResolvedValue(true);
		const octokit = createMockOctokit();
		const actual = await ensureRepositoryExists(
			{ auth, octokit },
			{
				mode: "initialize",
				owner,
				repository,
			},
		);

		expect(actual).toEqual({ github: { auth, octokit }, repository });
	});

	it("creates a new repository when the prompt is 'create' and the repository does not exist", async () => {
		const octokit = createMockOctokit();

		mockDoesRepositoryExist.mockResolvedValue(false);
		mockSelect.mockResolvedValue("create");

		const actual = await ensureRepositoryExists(
			{ auth, octokit },
			{ mode: "initialize", owner, repository },
		);

		expect(actual).toEqual({ github: { auth, octokit }, repository });
		expect(mockCreateRepositoryWithApi).toHaveBeenCalledWith(octokit, {
			owner,
			preserveGeneratedFrom: undefined,
			repository,
		});
	});

	it("defaults to creating a repository when mode is 'create'", async () => {
		const octokit = createMockOctokit();

		mockDoesRepositoryExist.mockResolvedValue(false);

		const actual = await ensureRepositoryExists(
			{ auth, octokit },
			{ mode: "create", owner, repository },
		);

		expect(actual).toEqual({ github: { auth, octokit }, repository });
		expect(mockCreateRepositoryWithApi).toHaveBeenCalledWith(octokit, {
			owner,
			preserveGeneratedFrom: undefined,
			repository,
		});
		expect(mockSelect).not.toHaveBeenCalled();
	});

	it("returns the second repository when the prompt is 'different', the first repository does not exist, and the second repository exists", async () => {
		const octokit = createMockOctokit();
		const newRepository = "new-repository";

		mockDoesRepositoryExist
			.mockResolvedValueOnce(false)
			.mockResolvedValueOnce(true);
		mockSelect.mockResolvedValueOnce("different");
		mockText.mockResolvedValue(newRepository);

		const actual = await ensureRepositoryExists(
			{ auth, octokit },
			{ mode: "initialize", owner, repository },
		);

		expect(actual).toEqual({
			github: { auth, octokit },
			repository: newRepository,
		});
		expect(mockCreateRepositoryWithApi).not.toHaveBeenCalled();
	});

	it("creates the second repository when the prompt is 'different', the first repository does not exist, and the second repository does not exist", async () => {
		const octokit = createMockOctokit();
		const newRepository = "new-repository";

		mockDoesRepositoryExist.mockResolvedValue(false);
		mockSelect
			.mockResolvedValueOnce("different")
			.mockResolvedValueOnce("create");
		mockText.mockResolvedValue(newRepository);

		const actual = await ensureRepositoryExists(
			{ auth, octokit },
			{ mode: "initialize", owner, repository },
		);

		expect(actual).toEqual({
			github: { auth, octokit },
			repository: newRepository,
		});
		expect(mockCreateRepositoryWithApi).toHaveBeenCalledWith(octokit, {
			owner,
			preserveGeneratedFrom: undefined,
			repository: newRepository,
		});
	});

	it("switches octokit to undefined when the prompt is 'local' and the repository does not exist", async () => {
		const octokit = createMockOctokit();

		mockDoesRepositoryExist.mockResolvedValue(false);
		mockSelect.mockResolvedValue("local");

		const actual = await ensureRepositoryExists(
			{ auth, octokit },
			{ mode: "initialize", owner, repository },
		);

		expect(actual).toEqual({ octokit: undefined, repository });
		expect(mockCreateRepositoryWithApi).not.toHaveBeenCalled();
	});
});
