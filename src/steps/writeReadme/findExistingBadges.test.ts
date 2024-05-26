import { describe, expect, it, test } from "vitest";

import { findExistingBadges } from "./findExistingBadges.js";

describe("findExistingBadges", () => {
	describe("no result cases", () => {
		test.each([
			"",
			"abc123",
			"# Test Title",
			"[]",
			"[][]",
			"[]()",
			"[][]()()",
			`<img />`,
		])("%j", (input) => {
			expect(findExistingBadges(input)).toEqual([]);
		});
	});

	describe("single result cases", () => {
		test.each([
			`[![GitHub CI](https://github.com/ExampleOwner/console-fail-test/actions/workflows/compile.yml/badge.svg)](https://github.com/ExampleOwner/console-fail-test/actions/workflows/compile.yml)`,
			`[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)`,
			`![TypeScript: Strict](https://img.shields.io/badge/typescript-strict-brightgreen.svg)`,
			`[![NPM version](https://badge.fury.io/js/console-fail-test.svg)](http://badge.fury.io/js/console-fail-test)`,
			`[![Downloads](http://img.shields.io/npm/dm/console-fail-test.svg)](https://npmjs.org/package/console-fail-test)`,
			"<a>badge</a>",
			"<a >badge</a>",
			"<a \t>badge</a>",
			"<a href='abc'>badge</a>",
			`	<a href="#contributors" target="_blank">
				<!-- prettier-ignore-start -->
				<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
				<img alt="All Contributors: 1" src="https://img.shields.io/badge/all_contributors-1-21bb42.svg" />
				<!-- ALL-CONTRIBUTORS-BADGE:END -->
				<!-- prettier-ignore-end -->
					</a>`,
			` <a href="https://codecov.io/gh/ExampleOwner/example-repository" target="_blank"><img alt="Codecov Test Coverage" src="https://codecov.io/gh/ExampleOwner/example-repository/branch/main/graph/badge.svg"/></a>`,
			` <a href="https://github.com/ExampleOwner/example-repository/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="Contributor Covenant" src="https://img.shields.io/badge/code_of_conduct-enforced-21bb42" /></a>`,
			`<a href="http://npmjs.com/package/example-repository"><img alt="📦 npm version" src="https://img.shields.io/npm/v/example-repository?color=21bb42&label=📦%20npm" /></a>`,
			`<a href="https://codecov.io/gh/ExampleOwner/example-repository" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/ExampleOwner/example-repository?label=🧪%20coverage"/></a>`,
			`<a href="https://github.com/ExampleOwner/example-repository/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: kept" src="https://img.shields.io/badge/kept-21bb42?label=🤝%20code%20of%20conduct" /></a>`,
			`<a href="https://github.com/ExampleOwner/example-repository/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/📝_license-MIT-21bb42.svg"></a>`,
			`<a href="https://github.com/ExampleOwner/example-repository/blob/main/LICENSE.md" target="_blank"><img alt="License: MIT" src="https://img.shields.io/github/license/ExampleOwner/example-repository?color=21bb42"></a>`,
			`
				<a href="https://github.com/ExampleOwner/example-repository/blob/main/LICENSE.md" target="_blank"><img alt="License: MIT" src="https://img.shields.io/github/license/ExampleOwner/example-repository?color=21bb42"></a>
			`,
			`<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/💪_typescript-strict-21bb42.svg" />`,
			`<img alt="Style: Prettier" src="https://img.shields.io/badge/style-prettier-21bb42.svg" />`,
			`<img alt="TypeScript: Strict" src="https://img.shields.io/badge/typescript-strict-21bb42.svg" />`,
			`
				<img alt="TypeScript: Strict" src="https://img.shields.io/badge/typescript-strict-21bb42.svg" />
			`,
		])("%s", (contents) => {
			expect(findExistingBadges(contents)).toEqual([contents.trim()]);
		});
	});

	it("doesn't collect badges after a ##", () => {
		expect(
			findExistingBadges(`
			<img alt="test badge a" src="test-a.jpg" />
			
			## Usage

			<img alt="test badge b" src="test-b.jpg" />
		`),
		).toEqual([`<img alt="test badge a" src="test-a.jpg" />`]);
	});

	it("doesn't collect badges after an h2", () => {
		expect(
			findExistingBadges(`
			<img alt="test badge a" src="test-a.jpg" />
			
			<h2 align="left">Usage</h2>

			<img alt="test badge b" src="test-b.jpg" />
		`),
		).toEqual([`<img alt="test badge a" src="test-a.jpg" />`]);
	});

	test("real-world usage", () => {
		expect(
			findExistingBadges(`
<p align="center">
<!-- prettier-ignore-start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
	<a href="#contributors" target="_blank"><img alt="All Contributors: 1" src="https://img.shields.io/badge/all_contributors-1-21bb42.svg" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- prettier-ignore-end -->
	<a href="https://codecov.io/gh/ExampleOwner/example-repository" target="_blank"><img alt="Codecov Test Coverage" src="https://codecov.io/gh/ExampleOwner/example-repository/branch/main/graph/badge.svg?token=eVIFY4MhfQ"/></a>
	<a href="https://github.com/ExampleOwner/example-repository/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="Contributor Covenant" src="https://img.shields.io/badge/code_of_conduct-enforced-21bb42" /></a>
	<a href="https://github.com/ExampleOwner/example-repository/blob/main/LICENSE.md" target="_blank"><img alt="License: MIT" src="https://img.shields.io/github/license/ExampleOwner/example-repository?color=21bb42"></a>
	<img alt="Style: Prettier" src="https://img.shields.io/badge/style-prettier-21bb42.svg" />
  <img alt="TypeScript: Strict" src="https://img.shields.io/badge/typescript-strict-21bb42.svg" />
</p>
			`),
		).toMatchInlineSnapshot(`
			[
			  "<a href="#contributors" target="_blank"><img alt="All Contributors: 1" src="https://img.shields.io/badge/all_contributors-1-21bb42.svg" /></a>",
			  "<a href="https://codecov.io/gh/ExampleOwner/example-repository" target="_blank"><img alt="Codecov Test Coverage" src="https://codecov.io/gh/ExampleOwner/example-repository/branch/main/graph/badge.svg?token=eVIFY4MhfQ"/></a>",
			  "<a href="https://github.com/ExampleOwner/example-repository/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="Contributor Covenant" src="https://img.shields.io/badge/code_of_conduct-enforced-21bb42" /></a>",
			  "<a href="https://github.com/ExampleOwner/example-repository/blob/main/LICENSE.md" target="_blank"><img alt="License: MIT" src="https://img.shields.io/github/license/ExampleOwner/example-repository?color=21bb42"></a>",
			  "<img alt="Style: Prettier" src="https://img.shields.io/badge/style-prettier-21bb42.svg" />",
			  "<img alt="TypeScript: Strict" src="https://img.shields.io/badge/typescript-strict-21bb42.svg" />",
			]
		`);
	});
});
