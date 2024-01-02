import { Octokit } from "octokit";
import { describe, expect, it, vi } from "vitest";

import { SpinnerTask } from "../shared/cli/spinners.js";
import { doesRepositoryExist } from "../shared/doesRepositoryExist.js";
import { Options } from "../shared/types.js";
import { addToolAllContributors } from "../steps/addToolAllContributors.js";
import { finalizeDependencies } from "../steps/finalizeDependencies.js";
import { initializeGitHubRepository } from "../steps/initializeGitHubRepository/index.js";
import { runCommands } from "../steps/runCommands.js";
import { writeReadme } from "../steps/writeReadme/index.js";
import { writeStructure } from "../steps/writing/writeStructure.js";
import { createWithOptions } from "./createWithOptions.js";

const optionsBase: Options = {
	access: "public",
	author: "Test Author",
	base: "common",
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

const mock$ = vi.fn();

vi.mock("execa", () => ({
	get $() {
		return mock$;
	},
}));

const mockOctokit = new Octokit();
const github = {
	auth: "auth-token",
	octokit: mockOctokit,
};

vi.mock("../shared/cli/spinners.js", () => ({
	withSpinner: async <Return>(label: string, task: SpinnerTask<Return>) => {
		return await task();
	},
	withSpinners: async (
		label: string,
		tasks: [string, SpinnerTask<unknown>][],
	) => {
		for (const [, task] of tasks) {
			await task();
		}
	},
}));

vi.mock("../steps/writing/writeStructure.js");

vi.mock("../steps/writeReadme/index.js");

vi.mock("../steps/finalizeDependencies.js");

vi.mock("../steps/runCommands.js");

vi.mock("../shared/doesRepositoryExist.js", () => ({
	doesRepositoryExist: vi.fn().mockResolvedValue(true),
}));

vi.mock("../steps/initializeGitHubRepository/index.js", () => ({
	initializeGitHubRepository: vi.fn().mockResolvedValue(true),
}));

vi.mock("../shared/getGitHubUserAsAllContributor.js", () => ({
	getGitHubUserAsAllContributor: vi.fn().mockResolvedValue({
		contributions: ["code", "doc"],
		name: "Test User",
	}),
}));

vi.mock("../steps/addToolAllContributors.js");

describe("createWithOptions", () => {
	it("calls addToolAllContributors with options when excludeAllContributors is false", async () => {
		const options = {
			...optionsBase,
			excludeAllContributors: false,
			skipAllContributorsApi: false,
		};

		await createWithOptions({ github, options });
		expect(addToolAllContributors).toHaveBeenCalledWith(options);
	});

	it("does not call addToolAllContributors when excludeAllContributors is true", async () => {
		const options = {
			...optionsBase,
			excludeAllContributors: true,
		};

		await createWithOptions({ github, options });
		expect(addToolAllContributors).not.toHaveBeenCalled();
	});

	it("does not call addToolAllContributors when skipAllContributorsApi is true", async () => {
		const options = {
			...optionsBase,
			skipAllContributorsApi: true,
		};

		await createWithOptions({ github, options });
		expect(addToolAllContributors).not.toHaveBeenCalled();
	});

	it("does not call finalizeDependencies or runCommands when skipInstall is true", async () => {
		const options = {
			...optionsBase,
			skipInstall: true,
		};

		await createWithOptions({ github, options });
		expect(finalizeDependencies).not.toHaveBeenCalled();
		expect(runCommands).not.toHaveBeenCalled();
	});

	it("calls finalizeDependencies and runCommands when skipInstall is false", async () => {
		const options = {
			...optionsBase,
			skipInstall: false,
		};

		await createWithOptions({ github, options });

		expect(finalizeDependencies).toHaveBeenCalledWith(options);
		expect(runCommands).toHaveBeenCalled();
	});

	it("does not initialize GitHub repository if repository does not exist", async () => {
		const options = optionsBase;
		vi.mocked(doesRepositoryExist).mockResolvedValueOnce(false);
		await createWithOptions({ github, options });
		expect(initializeGitHubRepository).not.toHaveBeenCalled();
		expect(mock$).not.toHaveBeenCalled();
	});

	it("executes git commands when initializing GitHub repository", async () => {
		const options = optionsBase;
		vi.mocked(doesRepositoryExist).mockResolvedValueOnce(true);
		await createWithOptions({ github, options });

		expect(mock$.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    [
			      "git remote add origin https://github.com/",
			      "/",
			      "",
			    ],
			    "Test Owner",
			    "test-repo",
			  ],
			  [
			    [
			      "git add -A",
			    ],
			  ],
			  [
			    [
			      "git commit --message ",
			      "",
			    ],
			    "feat: initialized repo ✨",
			  ],
			  [
			    [
			      "git push -u origin main --force",
			    ],
			  ],
			]
		`);
	});

	it("handles GitHub repository initialization", async () => {
		const options = optionsBase;
		await createWithOptions({ github, options });

		expect(doesRepositoryExist).toHaveBeenCalledWith(github.octokit, options);
		expect(initializeGitHubRepository).toHaveBeenCalledWith(
			github.octokit,
			options,
		);
	});
});
