import { describe, expect, it } from "vitest";

import { generateTopContent } from "./generateTopContent.js";

const optionsBase = {
	author: undefined,
	base: undefined,
	createRepository: undefined,
	description: "",
	email: undefined,
	excludeCompliance: undefined,
	excludeContributors: undefined,
	excludeLintJson: undefined,
	excludeLintKnip: undefined,
	excludeLintMd: undefined,
	excludeLintPackageJson: undefined,
	excludeLintPackages: undefined,
	excludeLintPerfectionist: undefined,
	excludeLintSpelling: undefined,
	excludeLintYml: undefined,
	excludeReleases: undefined,
	excludeRenovate: undefined,
	excludeTests: undefined,
	funding: undefined,
	owner: "",
	repository: "",
	skipGitHubApi: false,
	skipInstall: undefined,
	skipRemoval: undefined,
	skipRestore: undefined,
	skipUninstall: undefined,
	title: "",
};

describe("findExistingBadges", () => {
	it("generates full contents when there are no existing badges", () => {
		expect(generateTopContent(optionsBase, [])).toMatchInlineSnapshot(`
			"<h1 align=\\"center\\"></h1>

			<p align=\\"center\\"></p>

			<p align=\\"center\\">
				<a href=\\"#contributors\\" target=\\"_blank\\">
			<!-- prettier-ignore-start -->
			<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
			<img alt=\\"All Contributors: 2\\" src=\\"https://img.shields.io/badge/all_contributors-17-21bb42.svg\\" />
			<!-- ALL-CONTRIBUTORS-BADGE:END -->
			<!-- prettier-ignore-end -->
			</a>
				<a href=\\"https://codecov.io/gh//\\" target=\\"_blank\\">
					<img alt=\\"Codecov Test Coverage\\" src=\\"https://codecov.io/gh///branch/main/graph/badge.svg\\"/>
				</a>
				<a href=\\"https://github.com///blob/main/.github/CODE_OF_CONDUCT.md\\" target=\\"_blank\\">
					<img alt=\\"Contributor Covenant\\" src=\\"https://img.shields.io/badge/code_of_conduct-enforced-21bb42\\" />
				</a>
				<a href=\\"https://github.com///blob/main/LICENSE.md\\" target=\\"_blank\\">
					<img alt=\\"License: MIT\\" src=\\"https://img.shields.io/github/license//?color=21bb42\\">
				</a>
				<img alt=\\"Style: Prettier\\" src=\\"https://img.shields.io/badge/style-prettier-21bb42.svg\\" />
				<img alt=\\"TypeScript: Strict\\" src=\\"https://img.shields.io/badge/typescript-strict-21bb42.svg\\" />
			</p>"
		`);
	});

	it("replaces existing contents when there is an existing known badge", () => {
		expect(
			generateTopContent(optionsBase, [
				`<img alt="TypeScript: Strict" src="invalid svg" />`,
			]),
		).toMatchInlineSnapshot(`
			"<h1 align=\\"center\\"></h1>

			<p align=\\"center\\"></p>

			<p align=\\"center\\">
				<a href=\\"#contributors\\" target=\\"_blank\\">
			<!-- prettier-ignore-start -->
			<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
			<img alt=\\"All Contributors: 2\\" src=\\"https://img.shields.io/badge/all_contributors-17-21bb42.svg\\" />
			<!-- ALL-CONTRIBUTORS-BADGE:END -->
			<!-- prettier-ignore-end -->
			</a>
				<a href=\\"https://codecov.io/gh//\\" target=\\"_blank\\">
					<img alt=\\"Codecov Test Coverage\\" src=\\"https://codecov.io/gh///branch/main/graph/badge.svg\\"/>
				</a>
				<a href=\\"https://github.com///blob/main/.github/CODE_OF_CONDUCT.md\\" target=\\"_blank\\">
					<img alt=\\"Contributor Covenant\\" src=\\"https://img.shields.io/badge/code_of_conduct-enforced-21bb42\\" />
				</a>
				<a href=\\"https://github.com///blob/main/LICENSE.md\\" target=\\"_blank\\">
					<img alt=\\"License: MIT\\" src=\\"https://img.shields.io/github/license//?color=21bb42\\">
				</a>
				<img alt=\\"Style: Prettier\\" src=\\"https://img.shields.io/badge/style-prettier-21bb42.svg\\" />
				<img alt=\\"TypeScript: Strict\\" src=\\"https://img.shields.io/badge/typescript-strict-21bb42.svg\\" />
			</p>"
		`);
	});

	it("push existing badges to the end when there is an existing unknown badge", () => {
		expect(
			generateTopContent(optionsBase, [
				`<img alt="Unknown Badge" src="unknown.svg" />`,
			]),
		).toMatchInlineSnapshot(`
			"<h1 align=\\"center\\"></h1>

			<p align=\\"center\\"></p>

			<p align=\\"center\\">
				<a href=\\"#contributors\\" target=\\"_blank\\">
			<!-- prettier-ignore-start -->
			<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
			<img alt=\\"All Contributors: 2\\" src=\\"https://img.shields.io/badge/all_contributors-17-21bb42.svg\\" />
			<!-- ALL-CONTRIBUTORS-BADGE:END -->
			<!-- prettier-ignore-end -->
			</a>
				<a href=\\"https://codecov.io/gh//\\" target=\\"_blank\\">
					<img alt=\\"Codecov Test Coverage\\" src=\\"https://codecov.io/gh///branch/main/graph/badge.svg\\"/>
				</a>
				<a href=\\"https://github.com///blob/main/.github/CODE_OF_CONDUCT.md\\" target=\\"_blank\\">
					<img alt=\\"Contributor Covenant\\" src=\\"https://img.shields.io/badge/code_of_conduct-enforced-21bb42\\" />
				</a>
				<a href=\\"https://github.com///blob/main/LICENSE.md\\" target=\\"_blank\\">
					<img alt=\\"License: MIT\\" src=\\"https://img.shields.io/github/license//?color=21bb42\\">
				</a>
				<img alt=\\"Style: Prettier\\" src=\\"https://img.shields.io/badge/style-prettier-21bb42.svg\\" />
				<img alt=\\"TypeScript: Strict\\" src=\\"https://img.shields.io/badge/typescript-strict-21bb42.svg\\" />
				<img alt=\\"Unknown Badge\\" src=\\"unknown.svg\\" />
			</p>"
		`);
	});
});
