import { describe, expect, it } from "vitest";

import { readReadmeExplainer } from "./readReadmeExplainer.js";

describe(readReadmeExplainer, () => {
	it("defaults to undefined when it cannot be found", async () => {
		const actual = await readReadmeExplainer(() => Promise.resolve(`nothing.`));

		expect(actual).toBeUndefined();
	});

	it("parses a line after badges", async () => {
		const actual = await readReadmeExplainer(() =>
			Promise.resolve(`
</p>

This is my project.

## Usage
					.`),
		);

		expect(actual).toEqual("\n\nThis is my project.\n\n");
	});

	it("parses multiple lines after badges", async () => {
		const actual = await readReadmeExplainer(() =>
			Promise.resolve(`
</p>

This is my project.
It is good.

## Usage
					.`),
		);

		expect(actual).toEqual("\n\nThis is my project.\nIt is good.\n\n");
	});

	it("parses multiple lines after full badges and a logo", async () => {
		const actual = await readReadmeExplainer(() =>
			Promise.resolve(`
<p align="center">
	<!-- prettier-ignore-start -->
	<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
	<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 52" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-52-21bb42.svg" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
	<!-- prettier-ignore-end -->
	<a href="https://github.com/JoshuaKGoldberg/create-typescript-app/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
	<a href="https://codecov.io/gh/JoshuaKGoldberg/create-typescript-app" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/JoshuaKGoldberg/create-typescript-app?label=%F0%9F%A7%AA%20coverage" /></a>
	<a href="https://github.com/JoshuaKGoldberg/create-typescript-app/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
	<a href="http://npmjs.com/package/create-typescript-app"><img alt="📦 npm version" src="https://img.shields.io/npm/v/create-typescript-app?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
	<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
</p>

<img align="right" alt="Project logo: the TypeScript blue square with rounded corners, but a plus sign instead of 'TS'" height="128" src="./docs/create-typescript-app.png" width="128">

This is my project.
It is good.

## Usage
					.`),
		);

		expect(actual).toEqual("\n\nThis is my project.\nIt is good.\n\n");
	});

	it("parses a non-Usage h2 after full badges", async () => {
		const actual = await readReadmeExplainer(() =>
			Promise.resolve(`
<p align="center">
	<!-- prettier-ignore-start -->
	<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
	<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 52" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-52-21bb42.svg" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
	<!-- prettier-ignore-end -->
	<a href="https://github.com/JoshuaKGoldberg/create-typescript-app/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
	<a href="https://codecov.io/gh/JoshuaKGoldberg/create-typescript-app" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/JoshuaKGoldberg/create-typescript-app?label=%F0%9F%A7%AA%20coverage" /></a>
	<a href="https://github.com/JoshuaKGoldberg/create-typescript-app/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
	<a href="http://npmjs.com/package/create-typescript-app"><img alt="📦 npm version" src="https://img.shields.io/npm/v/create-typescript-app?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
	<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
</p>

## What?

This is my project.
It is good.

## Usage
					.`),
		);

		expect(actual).toEqual(
			"\n\n## What?\n\nThis is my project.\nIt is good.\n\n",
		);
	});

	it("parses a non-Usage h2 with a block quote after full badges", async () => {
		const actual = await readReadmeExplainer(() =>
			Promise.resolve(`
	<a href="http://npmjs.com/package/create-typescript-app"><img alt="📦 npm version" src="https://img.shields.io/npm/v/create-typescript-app?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
	<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
</p>

## What?

This is my project.
It is good.

> See here.

## Usage
					.`),
		);

		expect(actual).toEqual(
			"\n\n## What?\n\nThis is my project.\nIt is good.\n\n> See here.\n\n",
		);
	});

	it("parses a non-Usage h2 after full badges and a logo", async () => {
		const actual = await readReadmeExplainer(() =>
			Promise.resolve(`
	<a href="http://npmjs.com/package/create-typescript-app"><img alt="📦 npm version" src="https://img.shields.io/npm/v/create-typescript-app?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
	<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
</p>

<img align="right" alt="Project logo: the TypeScript blue square with rounded corners, but a plus sign instead of 'TS'" height="128" src="./docs/create-typescript-app.png" width="128">

## What?

This is my project.
It is good.

## Usage
					.`),
		);

		expect(actual).toEqual(
			"\n\n## What?\n\nThis is my project.\nIt is good.\n\n",
		);
	});

	it("parses a non-Usage h2 with a block quote after full badges and a logo", async () => {
		const actual = await readReadmeExplainer(() =>
			Promise.resolve(`
	<a href="http://npmjs.com/package/create-typescript-app"><img alt="📦 npm version" src="https://img.shields.io/npm/v/create-typescript-app?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
	<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
</p>

<img align="right" alt="Project logo: the TypeScript blue square with rounded corners, but a plus sign instead of 'TS'" height="128" src="./docs/create-typescript-app.png" width="128">

## What?

This is my project.
It is good.

> See here.

## Usage
					.`),
		);

		expect(actual).toEqual(
			"\n\n## What?\n\nThis is my project.\nIt is good.\n\n> See here.\n\n",
		);
	});
});
