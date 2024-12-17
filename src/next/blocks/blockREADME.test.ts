import { testBlock } from "create-testers";
import { describe, expect, test } from "vitest";

import { blockREADME } from "./blockREADME.js";
import { optionsBase } from "./options.fakes.js";

describe("blockREADME", () => {
	test("options.logo", () => {
		const creation = testBlock(blockREADME, {
			options: {
				...optionsBase,
				logo: {
					alt: "My logo",
					src: "img.jpg",
				},
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "README.md": "<h1 align="center">Test Title</h1>

			<p align="center">Test description</p>

			<p align="center">
				<!-- prettier-ignore-start -->
				<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
			<!-- ALL-CONTRIBUTORS-BADGE:END -->
				<!-- prettier-ignore-end -->
				<a href="https://github.com/test-owner/test-repository/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
				<a href="https://codecov.io/gh/test-owner/test-repository" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/test-owner/test-repository?label=%F0%9F%A7%AA%20coverage" /></a>
				<a href="https://github.com/test-owner/test-repository/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
				<a href="http://npmjs.com/package/test-repository"><img alt="📦 npm version" src="https://img.shields.io/npm/v/test-repository?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
				<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
			</p>

			<img align="right" alt="My logo" src="img.jpg">

			## Usage

			\`\`\`shell
			npm i test-repository
			\`\`\`
			\`\`\`ts
			import { greet } from "test-repository";

			greet("Hello, world! 💖");
			\`\`\`

			## Development

			See [\`.github/CONTRIBUTING.md\`](./.github/CONTRIBUTING.md), then [\`.github/DEVELOPMENT.md\`](./.github/DEVELOPMENT.md).
			Thanks! 💖

			## Contributors

			<!-- spellchecker: disable -->
			<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
			<!-- ALL-CONTRIBUTORS-LIST:END -->
			<!-- spellchecker: enable -->
			",
			  },
			}
		`);
	});

	test("without addons", () => {
		const creation = testBlock(blockREADME, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "README.md": "<h1 align="center">Test Title</h1>

			<p align="center">Test description</p>

			<p align="center">
				<!-- prettier-ignore-start -->
				<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
			<!-- ALL-CONTRIBUTORS-BADGE:END -->
				<!-- prettier-ignore-end -->
				<a href="https://github.com/test-owner/test-repository/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
				<a href="https://codecov.io/gh/test-owner/test-repository" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/test-owner/test-repository?label=%F0%9F%A7%AA%20coverage" /></a>
				<a href="https://github.com/test-owner/test-repository/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
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

			## Development

			See [\`.github/CONTRIBUTING.md\`](./.github/CONTRIBUTING.md), then [\`.github/DEVELOPMENT.md\`](./.github/DEVELOPMENT.md).
			Thanks! 💖

			## Contributors

			<!-- spellchecker: disable -->
			<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
			<!-- ALL-CONTRIBUTORS-LIST:END -->
			<!-- spellchecker: enable -->
			",
			  },
			}
		`);
	});

	test("with addons", () => {
		const creation = testBlock(blockREADME, {
			addons: {
				notices: ["> Hello, world! 💖"],
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "README.md": "<h1 align="center">Test Title</h1>

			<p align="center">Test description</p>

			<p align="center">
				<!-- prettier-ignore-start -->
				<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
			<!-- ALL-CONTRIBUTORS-BADGE:END -->
				<!-- prettier-ignore-end -->
				<a href="https://github.com/test-owner/test-repository/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
				<a href="https://codecov.io/gh/test-owner/test-repository" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/test-owner/test-repository?label=%F0%9F%A7%AA%20coverage" /></a>
				<a href="https://github.com/test-owner/test-repository/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
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

			## Development

			See [\`.github/CONTRIBUTING.md\`](./.github/CONTRIBUTING.md), then [\`.github/DEVELOPMENT.md\`](./.github/DEVELOPMENT.md).
			Thanks! 💖

			## Contributors

			<!-- spellchecker: disable -->
			<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
			<!-- ALL-CONTRIBUTORS-LIST:END -->
			<!-- spellchecker: enable -->

			> Hello, world! 💖",
			  },
			}
		`);
	});
});
