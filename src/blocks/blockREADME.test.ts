import { testBlock } from "bingo-stratum-testers";
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
				badges: [
					{
						alt: "Badge Z",
						src: "https://img.shields.io/badge/my_badge-000000",
					},
					{
						alt: "Badge A",
						src: "https://img.shields.io/badge/my_badge-000000",
					},
					{
						alt: "Badge With Link",
						href: "https://create.bingo",
						src: "https://img.shields.io/badge/my_badge-000000",
					},
				],
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
				<img alt="Badge A" src="https://img.shields.io/badge/my_badge-000000" />
				<a href="https://create.bingo" target="_blank"><img alt="Badge With Link" src="https://img.shields.io/badge/my_badge-000000" /></a>
				<img alt="Badge Z" src="https://img.shields.io/badge/my_badge-000000" />
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
