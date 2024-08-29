import { describe, expect, it, vi } from "vitest";

import { StatusCodes } from "../shared/codes.js";
import { RunOrRestoreOptions } from "../shared/runOrRestore.js";
import { migrate } from "./index.js";

const mockOutro = vi.fn();

vi.mock("../shared/cli/outro.js", () => ({
	get outro() {
		return mockOutro;
	},
}));

const mockEnsureGitRepository = vi.fn();

vi.mock("../shared/ensureGitRepository.js", () => ({
	get ensureGitRepository() {
		return mockEnsureGitRepository;
	},
}));

const mockReadOptions = vi.fn();

vi.mock("../shared/options/readOptions.js", () => ({
	get readOptions() {
		return mockReadOptions;
	},
}));

vi.mock("../shared/runOrRestore.js", () => ({
	async runOrRestore({ run }: RunOrRestoreOptions) {
		await run();
		return StatusCodes.Success;
	},
}));

const mockMigrateWithOptions = vi.fn();

vi.mock("./migrateWithOptions.js", () => ({
	get migrateWithOptions() {
		return mockMigrateWithOptions;
	},
}));

const optionsBase = {
	repository: "TestRepository",
};

describe("migrate", () => {
	it("returns a cancellation code when readOptions cancels", async () => {
		mockReadOptions.mockResolvedValue({
			cancelled: true,
			options: optionsBase,
		});

		const result = await migrate([]);

		expect(result).toEqual({
			code: StatusCodes.Cancelled,
			options: optionsBase,
		});
	});

	it("runs migrateWithOptions when readOptions returns inputs", async () => {
		mockReadOptions.mockResolvedValue({
			cancelled: false,
			options: optionsBase,
		});

		const result = await migrate([]);

		expect(result).toEqual({
			code: StatusCodes.Success,
			options: optionsBase,
		});
		expect(mockEnsureGitRepository).toHaveBeenCalled();
		expect(mockOutro.mock.calls).toMatchInlineSnapshot(`
      [
        [
          [
            {
              "label": "You may consider committing these changes:",
              "lines": [
                "git add -A",
                "git commit -m "migrated repo to create-typescript-app ✨",
                "git push",
              ],
              "variant": "code",
            },
            {
              "label": "Be sure to:",
              "lines": [
                "- enable the GitHub apps: 
         - Codecov (https://github.com/apps/codecov)
         - Renovate (https://github.com/apps/renovate)",
                "- populate the secrets: 
         - ACCESS_TOKEN (a GitHub PAT with repo and workflow permissions)
         - NPM_TOKEN (an npm access token with automation permissions)",
              ],
            },
          ],
        ],
      ]
    `);
	});
});
