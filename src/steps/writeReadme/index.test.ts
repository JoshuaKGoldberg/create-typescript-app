import { describe, expect, it, vi } from "vitest";

import { Options } from "../../shared/types.js";
import { writeReadme } from "./index.js";

const mockWriteFile = vi.fn();

vi.mock("node:fs/promises", () => ({
	get writeFile() {
		return mockWriteFile;
	},
}));

const mockReadFileSafe = vi.fn();

vi.mock("../../shared/readFileSafe.js", () => ({
	get readFileSafe() {
		return mockReadFileSafe;
	},
}));

const options = {
	access: "public",
	author: "Test Author",
	base: "everything",
	description: "Test description.",
	directory: ".",
	email: {
		github: "github@email.com",
		npm: "npm@email.com",
	},
	funding: "TestFunding",
	mode: "create",
	owner: "TestOwner",
	repository: "test-repository",
	title: "Test Title",
} satisfies Options;

describe("writeReadme", () => {
	it("writes a new file when the README.md does not yet exist", async () => {
		mockReadFileSafe.mockResolvedValueOnce("");

		await writeReadme(options);

		expect(mockWriteFile.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "README.md",
			    "<h1 align="center">Test Title</h1>

			<p align="center">Test description.</p>

			<p align="center">
				<!-- prettier-ignore-start -->
				<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
				<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 1" src="https://img.shields.io/badge/👪_all_contributors-1-21bb42.svg" /></a>
				<!-- ALL-CONTRIBUTORS-BADGE:END -->
				<!-- prettier-ignore-end -->
				<a href="https://github.com/TestOwner/test-repository/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
				<a href="https://codecov.io/gh/TestOwner/test-repository" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/TestOwner/test-repository?label=%F0%9F%A7%AA%20coverage" /></a>
				<a href="https://github.com/TestOwner/test-repository/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
				<a href="http://npmjs.com/package/test-repository"><img alt="📦 npm version" src="https://img.shields.io/npm/v/test-repository?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
				<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
			</p>

			## Usage

			\`\`\`shell
			npm i test-repository
			\`\`\`
			\`\`\`ts
			import { greet } from "test-repository";

			greet("Hello, world! 💖");
			\`\`\`

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

			<!-- You can remove this notice if you don't want it 🙂 no worries! -->

			> 💙 This package was templated with [\`create-typescript-app\`](https://github.com/JoshuaKGoldberg/create-typescript-app).
			",
			  ],
			]
		`);
	});

	it("adds sections when the README.md already exists and is sparse", async () => {
		mockReadFileSafe.mockResolvedValueOnce(`# ${options.title}\n`);

		await writeReadme(options);

		expect(mockWriteFile.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "README.md",
			    "<h1 align="center">Test Title</h1>

			<p align="center">Test description.</p>

			<p align="center">
				<!-- prettier-ignore-start -->
				<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
				<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 1" src="https://img.shields.io/badge/👪_all_contributors-1-21bb42.svg" /></a>
				<!-- ALL-CONTRIBUTORS-BADGE:END -->
				<!-- prettier-ignore-end -->
				<a href="https://github.com/TestOwner/test-repository/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
				<a href="https://codecov.io/gh/TestOwner/test-repository" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/TestOwner/test-repository?label=%F0%9F%A7%AA%20coverage" /></a>
				<a href="https://github.com/TestOwner/test-repository/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
				<a href="http://npmjs.com/package/test-repository"><img alt="📦 npm version" src="https://img.shields.io/npm/v/test-repository?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
				<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
			</p>

			## Usage

			\`\`\`shell
			npm i test-repository
			\`\`\`
			\`\`\`ts
			import { greet } from "test-repository";

			greet("Hello, world! 💖");
			\`\`\`

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

			<!-- You can remove this notice if you don't want it 🙂 no worries! -->

			> 💙 This package was templated with [\`create-typescript-app\`](https://github.com/JoshuaKGoldberg/create-typescript-app).
			",
			  ],
			]
		`);
	});

	it("adds all-contributors content when directed to and the indicator does not yet exist", async () => {
		mockReadFileSafe.mockResolvedValueOnce(`# ${options.title}\n`);

		await writeReadme({
			...options,
			excludeAllContributors: false,
		});

		expect(mockWriteFile.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "README.md",
			    "<h1 align="center">Test Title</h1>

			<p align="center">Test description.</p>

			<p align="center">
				<!-- prettier-ignore-start -->
				<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
				<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 1" src="https://img.shields.io/badge/👪_all_contributors-1-21bb42.svg" /></a>
				<!-- ALL-CONTRIBUTORS-BADGE:END -->
				<!-- prettier-ignore-end -->
				<a href="https://github.com/TestOwner/test-repository/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
				<a href="https://codecov.io/gh/TestOwner/test-repository" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/TestOwner/test-repository?label=%F0%9F%A7%AA%20coverage" /></a>
				<a href="https://github.com/TestOwner/test-repository/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
				<a href="http://npmjs.com/package/test-repository"><img alt="📦 npm version" src="https://img.shields.io/npm/v/test-repository?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
				<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
			</p>

			## Usage

			\`\`\`shell
			npm i test-repository
			\`\`\`
			\`\`\`ts
			import { greet } from "test-repository";

			greet("Hello, world! 💖");
			\`\`\`

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

			<!-- You can remove this notice if you don't want it 🙂 no worries! -->

			> 💙 This package was templated with [\`create-typescript-app\`](https://github.com/JoshuaKGoldberg/create-typescript-app).
			",
			  ],
			]
		`);
	});

	it("does not duplicate sections when the README.md already exists and has them", async () => {
		mockReadFileSafe.mockResolvedValueOnce(`<h1 align="center">Test Title</h1>

<p align="center">Test description.</p>

<p align="center">
<!-- prettier-ignore-start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
	<a href="#contributors" target="_blank"><img alt="All Contributors: 2" src="https://img.shields.io/badge/all_contributors-17-21bb42.svg" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- prettier-ignore-end -->
				<a href="https://codecov.io/gh/TestOwner/test-repository" target="_blank"></a>
				<a href="https://github.com/TestOwner/test-repository/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="Contributor Covenant" src="https://img.shields.io/badge/code_of_conduct-enforced-21bb42" /></a>
				<a href="https://github.com/TestOwner/test-repository/blob/main/LICENSE.md" target="_blank"><img alt="License: MIT" src="https://img.shields.io/github/license/TestOwner/test-repository?color=21bb42"></a>
				<img alt="Style: Prettier" src="https://img.shields.io/badge/style-prettier-21bb42.svg" />
				<img alt="TypeScript: Strict" src="https://img.shields.io/badge/typescript-strict-21bb42.svg" />
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

<!-- You can remove this notice if you don't want it 🙂 no worries! -->

> 💙 This package is based on [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)'s [create-typescript-app](https://github.com/JoshuaKGoldberg/create-typescript-app).
`);

		await writeReadme(options);

		expect(mockWriteFile.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "README.md",
			    "<h1 align="center">Test Title</h1>

			<p align="center">Test description.</p>

			<p align="center">
				<!-- prettier-ignore-start -->
				<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
				<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 1" src="https://img.shields.io/badge/👪_all_contributors-1-21bb42.svg" /></a>
				<!-- ALL-CONTRIBUTORS-BADGE:END -->
				<!-- prettier-ignore-end -->
				<a href="https://github.com/TestOwner/test-repository/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
				<a href="https://codecov.io/gh/TestOwner/test-repository" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/TestOwner/test-repository?label=%F0%9F%A7%AA%20coverage" /></a>
				<a href="https://github.com/TestOwner/test-repository/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
				<a href="http://npmjs.com/package/test-repository"><img alt="📦 npm version" src="https://img.shields.io/npm/v/test-repository?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
				<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
				<img alt="Style: Prettier" src="https://img.shields.io/badge/style-prettier-21bb42.svg" />
			</p>

			## Usage

			\`\`\`shell
			npm i test-repository
			\`\`\`
			\`\`\`ts
			import { greet } from "test-repository";

			greet("Hello, world! 💖");
			\`\`\`

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

			<!-- You can remove this notice if you don't want it 🙂 no worries! -->

			> 💙 This package is based on [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)'s [create-typescript-app](https://github.com/JoshuaKGoldberg/create-typescript-app).
			",
			  ],
			]
		`);
	});
});
