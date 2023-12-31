import { describe, expect, it } from "vitest";

import { Options } from "../../shared/types.js";
import { generateTopContent } from "./generateTopContent.js";

const optionsBase = {
	access: "public",
	description: "Test description",
	directory: ".",
	email: {
		github: "github@email.com",
		npm: "npm@email.com",
	},
	mode: "create",
	owner: "test-owner",
	repository: "test-repository",
	title: "Test Title",
} satisfies Options;

describe("findExistingBadges", () => {
	it("generates full contents when there are no existing badges", () => {
		expect(generateTopContent(optionsBase, [])).toMatchInlineSnapshot(`
			"<h1 align="center">Test Title</h1>

			<p align="center">Test description</p>

			<p align="center">
				<!-- prettier-ignore-start -->
				<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
				<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 1" src="https://img.shields.io/badge/👪_all_contributors-1-21bb42.svg" /></a>
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
			\`\`\`"
		`);
	});

	it("replaces existing contents when there is an existing known badge", () => {
		expect(
			generateTopContent(optionsBase, [
				`<img alt="TypeScript: Strict" src="invalid svg" />`,
			]),
		).toMatchInlineSnapshot(`
			"<h1 align="center">Test Title</h1>

			<p align="center">Test description</p>

			<p align="center">
				<!-- prettier-ignore-start -->
				<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
				<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 1" src="https://img.shields.io/badge/👪_all_contributors-1-21bb42.svg" /></a>
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
			\`\`\`"
		`);
	});

	it("push existing badges to the end when there is an existing unknown badge", () => {
		expect(
			generateTopContent(optionsBase, [
				`<img alt="Unknown Badge" src="unknown.svg" />`,
			]),
		).toMatchInlineSnapshot(`
			"<h1 align="center">Test Title</h1>

			<p align="center">Test description</p>

			<p align="center">
				<!-- prettier-ignore-start -->
				<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
				<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 1" src="https://img.shields.io/badge/👪_all_contributors-1-21bb42.svg" /></a>
				<!-- ALL-CONTRIBUTORS-BADGE:END -->
				<!-- prettier-ignore-end -->
				<a href="https://github.com/test-owner/test-repository/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
				<a href="https://codecov.io/gh/test-owner/test-repository" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/test-owner/test-repository?label=%F0%9F%A7%AA%20coverage" /></a>
				<a href="https://github.com/test-owner/test-repository/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
				<a href="http://npmjs.com/package/test-repository"><img alt="📦 npm version" src="https://img.shields.io/npm/v/test-repository?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
				<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
				<img alt="Unknown Badge" src="unknown.svg" />
			</p>

			## Usage

			\`\`\`shell
			npm i test-repository
			\`\`\`
			\`\`\`ts
			import { greet } from "test-repository";

			greet("Hello, world! 💖");
			\`\`\`"
		`);
	});

	it("does not include a greet section when the mode is migrate", () => {
		expect(generateTopContent({ ...optionsBase, mode: "migrate" }, []))
			.toMatchInlineSnapshot(`
				"<h1 align="center">Test Title</h1>

				<p align="center">Test description</p>

				<p align="center">
					<!-- prettier-ignore-start -->
					<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
					<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 1" src="https://img.shields.io/badge/👪_all_contributors-1-21bb42.svg" /></a>
					<!-- ALL-CONTRIBUTORS-BADGE:END -->
					<!-- prettier-ignore-end -->
					<a href="https://github.com/test-owner/test-repository/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
					<a href="https://codecov.io/gh/test-owner/test-repository" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/test-owner/test-repository?label=%F0%9F%A7%AA%20coverage" /></a>
					<a href="https://github.com/test-owner/test-repository/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
					<a href="http://npmjs.com/package/test-repository"><img alt="📦 npm version" src="https://img.shields.io/npm/v/test-repository?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
					<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
				</p>"
			`);
	});
});
