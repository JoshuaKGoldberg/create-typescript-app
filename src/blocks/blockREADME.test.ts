import { testBlock } from "create-testers";
import { describe, expect, test } from "vitest";

import { blockREADME } from "./blockREADME.js";
import { optionsBase } from "./options.fakes.js";

const options = {
	...optionsBase,
	usage: "Use it.",
};

describe("blockREADME", () => {
	test("description with one sentence", () => {
		const creation = testBlock(blockREADME, {
			options: {
				...options,
				description: "One sentence.",
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "README.md": "<h1 align="center">Test Title</h1>

			<p align="center">One sentence.</p>

			<p align="center">
				<a href="https://github.com/test-owner/test-repository/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
				<a href="https://codecov.io/gh/test-owner/test-repository" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/test-owner/test-repository?label=%F0%9F%A7%AA%20coverage" /></a>
				<a href="https://github.com/test-owner/test-repository/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
				<a href="http://npmjs.com/package/test-repository"><img alt="📦 npm version" src="https://img.shields.io/npm/v/test-repository?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
				<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
			</p>

			## Usage

			Use it.

			## Development

			See [\`.github/CONTRIBUTING.md\`](./.github/CONTRIBUTING.md), then [\`.github/DEVELOPMENT.md\`](./.github/DEVELOPMENT.md).
			Thanks! 💖

			",
			  },
			}
		`);
	});

	test("description with two sentences", () => {
		const creation = testBlock(blockREADME, {
			options: {
				...options,
				description: "First sentence. Second sentence.",
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "README.md": "<h1 align="center">Test Title</h1>

			<p align="center">
				First sentence.
				Second sentence.
			</p>

			<p align="center">
				<a href="https://github.com/test-owner/test-repository/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
				<a href="https://codecov.io/gh/test-owner/test-repository" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/test-owner/test-repository?label=%F0%9F%A7%AA%20coverage" /></a>
				<a href="https://github.com/test-owner/test-repository/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
				<a href="http://npmjs.com/package/test-repository"><img alt="📦 npm version" src="https://img.shields.io/npm/v/test-repository?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
				<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
			</p>

			## Usage

			Use it.

			## Development

			See [\`.github/CONTRIBUTING.md\`](./.github/CONTRIBUTING.md), then [\`.github/DEVELOPMENT.md\`](./.github/DEVELOPMENT.md).
			Thanks! 💖

			",
			  },
			}
		`);
	});

	test("options.explainer", () => {
		const creation = testBlock(blockREADME, {
			options: {
				...options,
				explainer: ["And a one.", "And a two."],
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "README.md": "<h1 align="center">Test Title</h1>

			<p align="center">Test description</p>

			<p align="center">
				<a href="https://github.com/test-owner/test-repository/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
				<a href="https://codecov.io/gh/test-owner/test-repository" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/test-owner/test-repository?label=%F0%9F%A7%AA%20coverage" /></a>
				<a href="https://github.com/test-owner/test-repository/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
				<a href="http://npmjs.com/package/test-repository"><img alt="📦 npm version" src="https://img.shields.io/npm/v/test-repository?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
				<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
			</p>

			And a one.
			And a two.

			## Usage

			Use it.

			## Development

			See [\`.github/CONTRIBUTING.md\`](./.github/CONTRIBUTING.md), then [\`.github/DEVELOPMENT.md\`](./.github/DEVELOPMENT.md).
			Thanks! 💖

			",
			  },
			}
		`);
	});

	test("options.logo without sizing", () => {
		const creation = testBlock(blockREADME, {
			options: {
				...options,
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
				<a href="https://github.com/test-owner/test-repository/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
				<a href="https://codecov.io/gh/test-owner/test-repository" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/test-owner/test-repository?label=%F0%9F%A7%AA%20coverage" /></a>
				<a href="https://github.com/test-owner/test-repository/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
				<a href="http://npmjs.com/package/test-repository"><img alt="📦 npm version" src="https://img.shields.io/npm/v/test-repository?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
				<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
			</p>

			<img align="right" alt="My logo" src="img.jpg">

			## Usage

			Use it.

			## Development

			See [\`.github/CONTRIBUTING.md\`](./.github/CONTRIBUTING.md), then [\`.github/DEVELOPMENT.md\`](./.github/DEVELOPMENT.md).
			Thanks! 💖

			",
			  },
			}
		`);
	});

	test("options.logo with sizing", () => {
		const creation = testBlock(blockREADME, {
			options: {
				...options,
				logo: {
					alt: "My logo",
					height: 100,
					src: "img.jpg",
					width: 128,
				},
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "README.md": "<h1 align="center">Test Title</h1>

			<p align="center">Test description</p>

			<p align="center">
				<a href="https://github.com/test-owner/test-repository/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
				<a href="https://codecov.io/gh/test-owner/test-repository" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/test-owner/test-repository?label=%F0%9F%A7%AA%20coverage" /></a>
				<a href="https://github.com/test-owner/test-repository/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
				<a href="http://npmjs.com/package/test-repository"><img alt="📦 npm version" src="https://img.shields.io/npm/v/test-repository?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
				<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
			</p>

			<img align="right" alt="My logo" height="100" src="img.jpg" width="128">

			## Usage

			Use it.

			## Development

			See [\`.github/CONTRIBUTING.md\`](./.github/CONTRIBUTING.md), then [\`.github/DEVELOPMENT.md\`](./.github/DEVELOPMENT.md).
			Thanks! 💖

			",
			  },
			}
		`);
	});

	test("options.explainer and options.logo", () => {
		const creation = testBlock(blockREADME, {
			options: {
				...options,
				explainer: ["And a one.", "And a two."],
				logo: {
					alt: "My logo",
					height: 100,
					src: "img.jpg",
					width: 128,
				},
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "README.md": "<h1 align="center">Test Title</h1>

			<p align="center">Test description</p>

			<p align="center">
				<a href="https://github.com/test-owner/test-repository/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
				<a href="https://codecov.io/gh/test-owner/test-repository" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/test-owner/test-repository?label=%F0%9F%A7%AA%20coverage" /></a>
				<a href="https://github.com/test-owner/test-repository/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
				<a href="http://npmjs.com/package/test-repository"><img alt="📦 npm version" src="https://img.shields.io/npm/v/test-repository?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
				<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
			</p>

			<img align="right" alt="My logo" height="100" src="img.jpg" width="128">

			And a one.
			And a two.

			## Usage

			Use it.

			## Development

			See [\`.github/CONTRIBUTING.md\`](./.github/CONTRIBUTING.md), then [\`.github/DEVELOPMENT.md\`](./.github/DEVELOPMENT.md).
			Thanks! 💖

			",
			  },
			}
		`);
	});

	test("without addons", () => {
		const creation = testBlock(blockREADME, {
			options,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "README.md": "<h1 align="center">Test Title</h1>

			<p align="center">Test description</p>

			<p align="center">
				<a href="https://github.com/test-owner/test-repository/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
				<a href="https://codecov.io/gh/test-owner/test-repository" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/test-owner/test-repository?label=%F0%9F%A7%AA%20coverage" /></a>
				<a href="https://github.com/test-owner/test-repository/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
				<a href="http://npmjs.com/package/test-repository"><img alt="📦 npm version" src="https://img.shields.io/npm/v/test-repository?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
				<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
			</p>

			## Usage

			Use it.

			## Development

			See [\`.github/CONTRIBUTING.md\`](./.github/CONTRIBUTING.md), then [\`.github/DEVELOPMENT.md\`](./.github/DEVELOPMENT.md).
			Thanks! 💖

			",
			  },
			}
		`);
	});

	test("with addons", () => {
		const creation = testBlock(blockREADME, {
			addons: {
				badges: ["<!-- badge! -->"],
				notices: ["> Hello, world! 💖"],
				sections: [`## Other\n\nHello!`],
			},
			options,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "README.md": "<h1 align="center">Test Title</h1>

			<p align="center">Test description</p>

			<p align="center">
				<!-- badge! -->
				<a href="https://github.com/test-owner/test-repository/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
				<a href="https://codecov.io/gh/test-owner/test-repository" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/test-owner/test-repository?label=%F0%9F%A7%AA%20coverage" /></a>
				<a href="https://github.com/test-owner/test-repository/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
				<a href="http://npmjs.com/package/test-repository"><img alt="📦 npm version" src="https://img.shields.io/npm/v/test-repository?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
				<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
			</p>

			## Usage

			Use it.

			## Development

			See [\`.github/CONTRIBUTING.md\`](./.github/CONTRIBUTING.md), then [\`.github/DEVELOPMENT.md\`](./.github/DEVELOPMENT.md).
			Thanks! 💖

			## Other

			Hello!

			> Hello, world! 💖",
			  },
			}
		`);
	});
});
