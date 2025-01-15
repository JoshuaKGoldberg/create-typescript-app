import { describe, expect, it, vi } from "vitest";

import { readDefaultsFromReadme } from "./readDefaultsFromReadme.js";

const mockReadLogoSizing = vi.fn().mockResolvedValue({});

vi.mock("./readLogoSizing.js", () => ({
	get readLogoSizing() {
		return mockReadLogoSizing;
	},
}));

const mockGetUsageFromReadme = vi.fn().mockResolvedValue({});

vi.mock("./getUsageFromReadme.js", () => ({
	get getUsageFromReadme() {
		return mockGetUsageFromReadme;
	},
}));

describe("readDefaultsFromReadme", () => {
	describe("explainer", () => {
		it("defaults to undefined when it cannot be found", async () => {
			const explainer = await readDefaultsFromReadme(
				() => Promise.resolve(`nothing.`),
				() => Promise.resolve(undefined),
			).explainer();

			expect(explainer).toBeUndefined();
		});

		it("parses a line after badges", async () => {
			const explainer = await readDefaultsFromReadme(
				() =>
					Promise.resolve(`
</p>

This is my project.

## Usage
					.`),
				() => Promise.resolve(undefined),
			).explainer();

			expect(explainer).toEqual(["This is my project."]);
		});

		it("parses multiple lines after badges", async () => {
			const explainer = await readDefaultsFromReadme(
				() =>
					Promise.resolve(`
</p>

This is my project.
It is good.

## Usage
					.`),
				() => Promise.resolve(undefined),
			).explainer();

			expect(explainer).toEqual(["This is my project.", "It is good."]);
		});

		it("parses multiple lines after badges and a logo", async () => {
			const explainer = await readDefaultsFromReadme(
				() =>
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
				() => Promise.resolve(undefined),
			).explainer();

			expect(explainer).toEqual(["This is my project.", "It is good."]);
		});
	});

	describe("logo", () => {
		it("defaults to undefined when it cannot be found", async () => {
			const logo = await readDefaultsFromReadme(
				() => Promise.resolve(`nothing.`),
				() => Promise.resolve(undefined),
			).logo();

			expect(logo).toBeUndefined();
		});

		it("parses when found in an unquoted string", async () => {
			const logo = await readDefaultsFromReadme(
				() =>
					Promise.resolve(`
<img src=abc/def.jpg/>`),
				() => Promise.resolve(undefined),
			).logo();

			expect(logo).toEqual({
				alt: "Project logo",
				src: "abc/def.jpg",
			});
		});

		it("parses when found in a single quoted string", async () => {
			const logo = await readDefaultsFromReadme(
				() =>
					Promise.resolve(`
<img src='abc/def.jpg'/>`),
				() => Promise.resolve(undefined),
			).logo();

			expect(logo).toEqual({
				alt: "Project logo",
				src: "abc/def.jpg",
			});
		});

		it("parses when found in a double quoted string", async () => {
			const logo = await readDefaultsFromReadme(
				() =>
					Promise.resolve(`
<img src="abc/def.jpg"/>`),
				() => Promise.resolve(undefined),
			).logo();

			expect(logo).toEqual({
				alt: "Project logo",
				src: "abc/def.jpg",
			});
		});

		it("includes alt text when it exists in double quotes", async () => {
			const logo = await readDefaultsFromReadme(
				() =>
					Promise.resolve(`
<img alt="Project logo: a fancy circle" src="abc/def.jpg"/>`),
				() => Promise.resolve(undefined),
			).logo();

			expect(logo).toEqual({
				alt: "Project logo: a fancy circle",
				src: "abc/def.jpg",
			});
		});

		it("includes alt text when it exists in single quotes", async () => {
			const logo = await readDefaultsFromReadme(
				() =>
					Promise.resolve(`
<img alt='Project logo: a fancy circle' src='abc/def.jpg'/>`),
				() => Promise.resolve(undefined),
			).logo();

			expect(logo).toEqual({
				alt: "Project logo: a fancy circle",
				src: "abc/def.jpg",
			});
		});

		it("includes sizing when readLogoSizing returns sizing", async () => {
			const sizing = { height: 117, width: 128 };

			mockReadLogoSizing.mockReturnValueOnce(sizing);

			const logo = await readDefaultsFromReadme(
				() =>
					Promise.resolve(`
<img alt='Project logo: a fancy circle' height='117px' src='abc/def.jpg' width=' 117px'/>`),
				() => Promise.resolve(undefined),
			).logo();

			expect(logo).toEqual({
				alt: "Project logo: a fancy circle",
				src: "abc/def.jpg",
				...sizing,
			});
		});

		it("parses when found after a badge image", async () => {
			const logo = await readDefaultsFromReadme(
				() =>
					Promise.resolve(`
		<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 48" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-48-21bb42.svg" /></a>
<img src=abc/def.jpg/>
`),
				() => Promise.resolve(undefined),
			).logo();

			expect(logo).toEqual({
				alt: "Project logo",
				src: "abc/def.jpg",
			});
		});

		it("parses when found after an h1 and many badge images", async () => {
			const logo = await readDefaultsFromReadme(
				() =>
					Promise.resolve(`
<h1 align="center">Create TypeScript App</h1>

<p align="center">Quickstart-friendly TypeScript template with comprehensive, configurable, opinionated tooling. 🎁</p>

<p align="center">
	<!-- prettier-ignore-start -->
	<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
	<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 48" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-48-21bb42.svg" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
	<!-- prettier-ignore-end -->
	<a href="https://github.com/JoshuaKGoldberg/create-typescript-app/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
	<a href="https://codecov.io/gh/JoshuaKGoldberg/create-typescript-app" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/JoshuaKGoldberg/create-typescript-app?label=%F0%9F%A7%AA%20coverage" /></a>
	<a href="https://github.com/JoshuaKGoldberg/create-typescript-app/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
	<a href="http://npmjs.com/package/create-typescript-app"><img alt="📦 npm version" src="https://img.shields.io/npm/v/create-typescript-app?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
	<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
</p>

<img align="right" alt="Project logo: the TypeScript blue square with rounded corners, but a plus sign instead of 'TS'" src="./docs/create-typescript-app.png">
`),
				() => Promise.resolve(undefined),
			).logo();

			expect(logo).toEqual({
				alt: "Project logo: the TypeScript blue square with rounded corners, but a plus sign instead of 'TS'",
				src: "./docs/create-typescript-app.png",
			});
		});
	});

	describe("title", () => {
		it("defaults to undefined when it cannot be found", async () => {
			const title = await readDefaultsFromReadme(
				() => Promise.resolve(`nothing`),
				() => Promise.resolve(undefined),
			).title();

			expect(title).toBeUndefined();
		});

		it('reads title as markdown from "README.md" when it exists', async () => {
			const title = await readDefaultsFromReadme(
				() => Promise.resolve(`# My Awesome Package`),
				() => Promise.resolve(undefined),
			).title();

			expect(title).toBe("My Awesome Package");
		});

		it('reads title as HTML from "README.md" when it exists', async () => {
			const title = await readDefaultsFromReadme(
				() => Promise.resolve('<h1 align="center">My Awesome Package</h1>'),
				() => Promise.resolve(undefined),
			).title();

			expect(title).toBe("My Awesome Package");
		});

		it("returns undefined when title does not exist", async () => {
			const title = await readDefaultsFromReadme(
				() => Promise.resolve(`Other text.`),
				() => Promise.resolve(undefined),
			).title();

			expect(title).toBeUndefined();
		});
	});

	describe("usage", () => {
		it("returns the existing usage when getUsageFromReadme provides one", async () => {
			const existing = "Use it.";

			mockGetUsageFromReadme.mockReturnValueOnce(existing);

			const usage = await readDefaultsFromReadme(
				() => Promise.resolve(""),
				() => Promise.resolve(undefined),
			).usage();

			expect(usage).toBe(existing);
		});

		it("returns sample usage when getUsageFromReadme doesn't provide usage", async () => {
			mockGetUsageFromReadme.mockReturnValueOnce(undefined);

			const usage = await readDefaultsFromReadme(
				() => Promise.resolve(""),
				() => Promise.resolve("test-repository"),
			).usage();

			expect(usage).toBe(`\`\`\`shell
npm i test-repository
\`\`\`
\`\`\`ts
import { greet } from "test-repository";

greet("Hello, world! 💖");
\`\`\``);
		});
	});
});
