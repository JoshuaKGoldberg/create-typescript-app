import { describe, expect, it, vi } from "vitest";

import { writeReadme } from "./writeReadme.js";

const mockWriteFile = vi.fn();

vi.mock("node:fs/promises", () => ({
	get default() {
		return {
			get writeFile() {
				return mockWriteFile;
			},
		};
	},
}));

const mockReadFileSafe = vi.fn();

vi.mock("../readFileSafe.js", () => ({
	get readFileSafe() {
		return mockReadFileSafe;
	},
}));

const stubValues = {
	author: "Test Author",
	description: "Test description.",
	email: "test@test.test",
	funding: undefined,
	owner: "TestOwner",
	releases: undefined,
	repository: "test-repository",
	skipApi: false,
	skipRemoval: false,
	skipRestore: false,
	skipUninstalls: false,
	title: "Test Title",
	unitTests: undefined,
};

describe("writeReadme", () => {
	it("writes a new file when README.md does not yet exist", async () => {
		mockReadFileSafe.mockResolvedValue(undefined);

		await writeReadme(stubValues);

		expect(mockWriteFile.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "README.md",
			    "<h1 align=\\"center\\">Test Title</h1>

			<p align=\\"center\\">Test description.</p>

			<p align=\\"center\\">
				<a href=\\"#contributors\\" target=\\"_blank\\">
			<!-- prettier-ignore-start -->
			<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
			<img alt=\\"All Contributors: 17\\" src=\\"https://img.shields.io/badge/all_contributors-17-21bb42.svg\\" />
			<!-- ALL-CONTRIBUTORS-BADGE:END -->
			<!-- prettier-ignore-end -->
				</a>
				<a href=\\"https://codecov.io/gh/TestOwner/test-repository\\" target=\\"_blank\\">
				</a>
				<a href=\\"https://github.com/TestOwner/test-repository/blob/main/.github/CODE_OF_CONDUCT.md\\" target=\\"_blank\\">
					<img alt=\\"Contributor Covenant\\" src=\\"https://img.shields.io/badge/code_of_conduct-enforced-21bb42\\" />
				</a>
				<a href=\\"https://github.com/TestOwner/test-repository/blob/main/LICENSE.md\\" target=\\"_blank\\">
					<img alt=\\"License: MIT\\" src=\\"https://img.shields.io/github/license/TestOwner/test-repository?color=21bb42\\">
				</a>
				<img alt=\\"Style: Prettier\\" src=\\"https://img.shields.io/badge/style-prettier-21bb42.svg\\" />
				<img alt=\\"TypeScript: Strict\\" src=\\"https://img.shields.io/badge/typescript-strict-21bb42.svg\\" />
			</p>


			## Contributors

			<!-- spellchecker: disable -->
			<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
			<!-- prettier-ignore-start -->
			<!-- markdownlint-disable -->
			<table>
			<!-- (this will be filled in by all-contributors) -->
			</table>

			<!-- markdownlint-restore -->
			<!-- prettier-ignore-end -->

			<!-- ALL-CONTRIBUTORS-LIST:END -->
			<!-- spellchecker: enable -->
			",
			  ],
			]
		`);
	});
});
