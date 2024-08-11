import { describe, expect, it, vi } from "vitest";

import { readDefaultsFromReadme } from "./readDefaultsFromReadme.js";

const mockReadFileSafe = vi.fn();

vi.mock("../../readFileSafe.js", () => ({
	get readFileSafe() {
		return mockReadFileSafe;
	},
}));

describe("readDefaultsFromReadme", () => {
	describe("logo", () => {
		it("defaults to undefined when it cannot be found", async () => {
			mockReadFileSafe.mockResolvedValue(`
nothing.
`);

			const logo = await readDefaultsFromReadme().logo();

			expect(logo).toBeUndefined();
		});

		it("parses when found in an unquoted string", async () => {
			mockReadFileSafe.mockResolvedValue(`
<img src=abc/def.jpg/>
`);

			const logo = await readDefaultsFromReadme().logo();

			expect(logo).toEqual({
				alt: "Project logo",
				src: "abc/def.jpg",
			});
		});

		it("parses when found in a single quoted string", async () => {
			mockReadFileSafe.mockResolvedValue(`
<img src='abc/def.jpg'/>
`);

			const logo = await readDefaultsFromReadme().logo();

			expect(logo).toEqual({
				alt: "Project logo",
				src: "abc/def.jpg",
			});
		});

		it("parses when found in a double quoted string", async () => {
			mockReadFileSafe.mockResolvedValue(`
<img src="abc/def.jpg"/>
`);

			const logo = await readDefaultsFromReadme().logo();

			expect(logo).toEqual({
				alt: "Project logo",
				src: "abc/def.jpg",
			});
		});

		it("includes alt text when it exists in double quotes", async () => {
			mockReadFileSafe.mockResolvedValue(`
<img alt="Project logo: a fancy circle" src="abc/def.jpg"/>
`);

			const logo = await readDefaultsFromReadme().logo();

			expect(logo).toEqual({
				alt: "Project logo: a fancy circle",
				src: "abc/def.jpg",
			});
		});

		it("includes alt text when it exists in single quotes", async () => {
			mockReadFileSafe.mockResolvedValue(`
<img alt='Project logo: a fancy circle' src='abc/def.jpg'/>,
`);

			const logo = await readDefaultsFromReadme().logo();

			expect(logo).toEqual({
				alt: "Project logo: a fancy circle",
				src: "abc/def.jpg",
			});
		});

		it("parses when found after a badge image", async () => {
			mockReadFileSafe.mockResolvedValue(`
		<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 48" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-48-21bb42.svg" /></a>
<img src=abc/def.jpg/>
`);

			const logo = await readDefaultsFromReadme().logo();

			expect(logo).toEqual({
				alt: "Project logo",
				src: "abc/def.jpg",
			});
		});

		it("parses when found after an h1 and many badge images", async () => {
			mockReadFileSafe.mockResolvedValue(`<h1 align="center">Create TypeScript App</h1>

<p align="center">Quickstart-friendly TypeScript template with comprehensive, configurable, opinionated tooling. 💝</p>

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
`);

			const logo = await readDefaultsFromReadme().logo();

			expect(logo).toEqual({
				alt: "Project logo: the TypeScript blue square with rounded corners, but a plus sign instead of 'TS'",
				src: "./docs/create-typescript-app.png",
			});
		});
	});

	describe("title", () => {
		it("defaults to undefined when it cannot be found", async () => {
			mockReadFileSafe.mockResolvedValue(`
nothing.
`);

			const title = await readDefaultsFromReadme().title();

			expect(title).toBeUndefined();
		});

		it('reads title as markdown from "README.md" when it exists', async () => {
			mockReadFileSafe.mockResolvedValue(`# My Awesome Package`);

			const title = await readDefaultsFromReadme().title();

			expect(title).toBe("My Awesome Package");
		});

		it('reads title as HTML from "README.md" when it exists', async () => {
			mockReadFileSafe.mockResolvedValue(
				'<h1 align="center">My Awesome Package</h1>',
			);

			const title = await readDefaultsFromReadme().title();

			expect(title).toBe("My Awesome Package");
		});

		it("returns undefined when title does not exist", async () => {
			mockReadFileSafe.mockResolvedValue(`Other text.`);

			const title = await readDefaultsFromReadme().title();

			expect(title).toBeUndefined();
		});
	});
});
