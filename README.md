<h1 align="center">Template TypeScript Node Package</h1>

<p align="center">Template TypeScript Node.js package with all the CI bells & whistles I commonly use. ✨</p>

<p align="center">
	<a href="#contributors" target="_blank">
<!-- prettier-ignore-start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<img alt="All Contributors: 4" src="https://img.shields.io/badge/all_contributors-4-21bb42.svg" />
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- prettier-ignore-end -->
	</a>
	<a href="https://codecov.io/gh/JoshuaKGoldberg/template-typescript-node-package" target="_blank">
		<img alt="Codecov Test Coverage" src="https://codecov.io/gh/JoshuaKGoldberg/template-typescript-node-package/branch/main/graph/badge.svg?token=eVIFY4MhfQ"/>
	</a>
	<a href="https://github.com/JoshuaKGoldberg/template-typescript-node-package/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank">
		<img alt="Contributor Covenant" src="https://img.shields.io/badge/code_of_conduct-enforced-21bb42" />
	</a>
	<a href="https://github.com/JoshuaKGoldberg/template-typescript-node-package/blob/main/LICENSE.md" target="_blank">
	    <img alt="License: MIT" src="https://img.shields.io/github/license/JoshuaKGoldberg/template-typescript-node-package?color=21bb42">
    </a>
	<a href="https://github.com/sponsors/JoshuaKGoldberg" target="_blank">
    	<img alt="Sponsor: On GitHub" src="https://img.shields.io/badge/sponsor-on_github-21bb42.svg" />
    </a>
	<img alt="Style: Prettier" src="https://img.shields.io/badge/style-prettier-21bb42.svg" />
    <img alt="TypeScript: Strict" src="https://img.shields.io/badge/typescript-strict-21bb42.svg" />
</p>

## Explainer

This template is available for anybody who wants to set up a basic Node application using TypeScript.
It sets up the following tooling for you:

- [**All Contributors**](https://allcontributors.org): Tracks various kinds of contributions and displays them in a nicely formatted table in the README.md.
- [**ESLint**](https://eslint.org): Static analysis for JavaScript code, configured with [typescript-eslint](https://typescript-eslint.io) for TypeScript code and other general-use plugins.
- [**Markdownlint**](https://github.com/DavidAnson/markdownlint): Static analysis for Markdown code.
- [**pnpm**](https://pnpm.io): Disk-efficient package manager alternative.
- [**PR Compliance Action**](https://github.com/mtfoley/pr-compliance-action): Checks PRs for compliance on chore such as addressing a linked issue and proper title formatting.
- [**Prettier**](https://prettier.io): Opinionated formatting for code, run on file save and as a Git commit hook via [husky](https://typicode.github.io/husky) and [lint-staged](https://github.com/okonet/lint-staged).
- [**release-it**](https://github.com/release-it/release-it): Generates changelogs, bumps the package version, and publishes to GitHub and npm based on [conventional commits](https://www.conventionalcommits.org).
- [**Renovate**](https://docs.renovatebot.com): Keeps dependencies up-to-date with PRs, configured to wait a few days after each update for safety.
- [**ts-prune**](https://github.com/nadeesha/ts-prune): Unused exports detection for TypeScript code.
- [**TypeScript**](https://typescriptlang.org): A typed superset of JavaScript, configured with strict compiler options.
- [**Vitest**](https://vitest.dev): Fast unit tests, configured with coverage tracking.

## Setup

First make sure you have the following installed:

- [GitHub CLI](https://cli.github.com) _(you'll need to be logged in)_
- [Node.js](https://nodejs.org)
- [pnpm](https://pnpm.io)

To use this template:

1. Click the [_Use this template_](https://github.com/JoshuaKGoldberg/template-typescript-node-package/generate) button to create a new repository with the same Git history
2. Open that repository, such as by [cloning it locally](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) or [developing in a codespace](https://docs.github.com/en/codespaces/developing-in-codespaces/developing-in-a-codespace)
3. Create two tokens in [repository secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets):
   - `ACCESS_TOKEN`: A [GitHub PAT](https://github.com/settings/tokens/new) with _repo_ permissions
   - `NPM_TOKEN`: An [npm access token](https://docs.npmjs.com/creating-and-viewing-access-tokens/) with _Automation_ permissions
4. `pnpm install`
5. `pnpm run setup`
6. Install the [Renovate GitHub App](https://github.com/marketplace/renovate)

> The setup script removes the `## Explainer` and `## Setup` from this README.md.

## Usage

```shell
npm i template-typescript-node-package
```

```ts
import { greet } from "template-typescript-node-package";

greet("Hello, world!");
```

## Development

See [`.github/CONTRIBUTING.md`](./.github/CONTRIBUTING.md).
Thanks! 💖

## Contributors

<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- spellchecker: disable -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="http://www.joshuakgoldberg.com"><img src="https://avatars.githubusercontent.com/u/3335181?v=4?s=100" width="100px;" alt="Josh Goldberg"/><br /><sub><b>Josh Goldberg</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/template-typescript-node-package/issues?q=author%3AJoshuaKGoldberg" title="Bug reports">🐛</a> <a href="https://github.com/JoshuaKGoldberg/template-typescript-node-package/commits?author=JoshuaKGoldberg" title="Code">💻</a> <a href="#content-JoshuaKGoldberg" title="Content">🖋</a> <a href="#example-JoshuaKGoldberg" title="Examples">💡</a> <a href="#ideas-JoshuaKGoldberg" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-JoshuaKGoldberg" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-JoshuaKGoldberg" title="Maintenance">🚧</a> <a href="#platform-JoshuaKGoldberg" title="Packaging/porting to new platform">📦</a> <a href="#projectManagement-JoshuaKGoldberg" title="Project Management">📆</a> <a href="https://github.com/JoshuaKGoldberg/template-typescript-node-package/pulls?q=is%3Apr+reviewed-by%3AJoshuaKGoldberg" title="Reviewed Pull Requests">👀</a> <a href="#security-JoshuaKGoldberg" title="Security">🛡️</a> <a href="#tool-JoshuaKGoldberg" title="Tools">🔧</a> <a href="https://github.com/JoshuaKGoldberg/template-typescript-node-package/commits?author=JoshuaKGoldberg" title="Tests">⚠️</a></td>
      <td align="center"><a href="https://sinchang.me"><img src="https://avatars.githubusercontent.com/u/3297859?v=4?s=100" width="100px;" alt="Jeff Wen"/><br /><sub><b>Jeff Wen</b></sub></a><br /><a href="#tool-sinchang" title="Tools">🔧</a></td>
      <td align="center"><a href="https://paulisaweso.me/"><img src="https://avatars.githubusercontent.com/u/6335792?v=4?s=100" width="100px;" alt="Paul Esch-Laurent"/><br /><sub><b>Paul Esch-Laurent</b></sub></a><br /><a href="#tool-Pinjasaur" title="Tools">🔧</a></td>
      <td align="center"><a href="https://github.com/NazCodeland"><img src="https://avatars.githubusercontent.com/u/113494366?v=4?s=100" width="100px;" alt="NazCodeland"/><br /><sub><b>NazCodeland</b></sub></a><br /><a href="#tool-NazCodeland" title="Tools">🔧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- spellchecker: enable -->
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- You can remove this notice if you don't want it 🙂 no worries! -->

> 💙 This package is based on [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)'s [template-typescript-node-package](https://github.com/JoshuaKGoldberg/template-typescript-node-package).
