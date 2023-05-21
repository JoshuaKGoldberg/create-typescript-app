<h1 align="center">Template TypeScript Node Package</h1>

<p align="center">A quickstart-friendly TypeScript template with comprehensive formatting, linting, releases, testing, and other great tooling built-in. ✨</p>

<p align="center">
	<a href="#contributors" target="_blank">
<!-- prettier-ignore-start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<img alt="All Contributors: 20" src="https://img.shields.io/badge/all_contributors-20-21bb42.svg" />
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
- [**Knip**](https://github.com/webpro/knip): Detects unused files, dependencies, and code exports.
- [**Markdownlint**](https://github.com/DavidAnson/markdownlint): Static analysis for Markdown code.
- [**pnpm**](https://pnpm.io): Disk-efficient package manager alternative.
- [**PR Compliance Action**](https://github.com/mtfoley/pr-compliance-action): Checks PRs for compliance such as addressing a linked issue and proper title formatting.
- [**Prettier**](https://prettier.io): Opinionated formatting for code, run on file save and as a Git commit hook via [husky](https://typicode.github.io/husky) and [lint-staged](https://github.com/okonet/lint-staged).
- [**release-it**](https://github.com/release-it/release-it): Generates changelogs, bumps the package version, and publishes to GitHub and npm based on [conventional commits](https://www.conventionalcommits.org).
- [**Renovate**](https://docs.renovatebot.com): Keeps dependencies up-to-date with PRs, configured to wait a few days after each update for safety.
- [**TypeScript**](https://typescriptlang.org): A typed superset of JavaScript, configured with strict compiler options.
- [**Vitest**](https://vitest.dev): Fast unit tests, configured with coverage tracking and [console-fail-test](https://github.com/JoshuaKGoldberg/console-fail-test).

## Setup

This package comes with a bootstrap/initialization setup script that fills out your repository's details, installs necessary packages, then removes itself and uninstalls setup dependencies.

First make sure you have the following installed:

- [GitHub CLI](https://cli.github.com) _(you'll need to be logged in)_
- [Node.js](https://nodejs.org)
- [pnpm](https://pnpm.io)

To use this template:

1. Click the [_Use this template_](https://github.com/JoshuaKGoldberg/template-typescript-node-package/generate) button to create a new repository with the same Git history
2. Open that repository, such as by [cloning it locally](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) or [developing in a codespace](https://docs.github.com/en/codespaces/developing-in-codespaces/developing-in-a-codespace)
3. Create two tokens in [repository secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets):
   - `ACCESS_TOKEN`: A [GitHub PAT](https://github.com/settings/tokens/new) with _repo_ and _workflow_ permissions
   - `NPM_TOKEN`: An [npm access token](https://docs.npmjs.com/creating-and-viewing-access-tokens/) with _Automation_ permissions
4. `pnpm install`
5. `pnpm run setup` to run the setup script
6. Install the [Codecov GitHub App](https://github.com/marketplace/codecov) and [Renovate GitHub App](https://github.com/marketplace/renovate)

> The setup script removes the `## Explainer` and `## Setup` from this README.md.

### Setup Options

The setup script requires four options to fill out repository details.
It will interactively prompt for any that are not provided as a string CLI flag:

1. `repository`: The kebab-case name of the repository (e.g. `template-typescript-node-package`)
2. `title`: Title Case title for the repository to be used in documentation (e.g. `Template TypeScript Node Package`)
3. `owner`: GitHub organization or user the repository is underneath (e.g. `JoshuaKGoldberg`)
4. `description`: Sentence case description of the repository (e.g. `A quickstart-friendly TypeScript package with lots of great repository tooling. ✨`)

Additionally, a `--skip-api` boolean CLI flag may be specified to prevent the setup script from calling to GitHub APIs for repository hydration.
The script normally posts to GitHub APIs to set information such as repository description and branch protections on github.com.
Specifying `--skip-api` prevents those API calls, effectively limiting setup changes to local files in Git.
Doing so can be useful to preview what running setup does.

For example, pre-populating all values and skipping API calls:

```shell
pnpm run setup --repository "testing-repository" --title "Testing Title" --owner "TestingOwner" --description "Test Description" --skip-api
```

> Tip: after running `pnpm run setup` with `--skip-api`, you can always `git add -A; git reset --hard HEAD` to completely reset all changes.

## Repository Hydration

Alternately, if you have an existing repository that you'd like to give the files from this repository, you can run `template-typescript-node-package` in a repository to "hydrate" it.

```shell
npx template-typescript-node-package
```

Repository settings will be auto-filled from the repository's files if possible, but can be provided manually as well:

- `author` _(`string`)_: e.g. `"Josh Goldberg"`
- `description` _(`string`)_: e.g. `"A quickstart-friendly TypeScript template with comprehensive formatting, linting, releases, testing, and other great tooling built-in. ✨"`
- `email` _(`string`)_: e.g. `"git@joshuakgoldberg.com"`
- `funding` _(`string`, optional)_: e.g. `"JoshuaKGoldberg"`
- `owner` _(`string`)_: e.g. `"JoshuaKGoldberg"`
- `repository` _(`string`)_: e.g. `"template-typescript-node-package"`
- `title` _(`string`)_: e.g. `"Template TypeScript Node Package"`

For example, providing a `funding` value different from the `author`:

```shell
npx template-typescript-node-package --funding MyOrganization
```

The hydration script by default will include all the features in this template.
You can disable some of them on the command-line:

- `releases` _(`boolean`)_: Whether to include automated package publishing
- `unitTests` _(`boolean`)_: Whether to include unit tests with code coverage tracking

```shell
npx template-typescript-node-package --releases false --unitTests false
```

> **Warning**
> This will override many files in your repository.
> You'll want to review each of the changes and make sure nothing important is removed.

## Usage

```shell
npm i template-typescript-node-package
```

```ts
import { greet } from "template-typescript-node-package";

greet("Hello, world!");
```

## Development

See [`.github/CONTRIBUTING.md`](./.github/CONTRIBUTING.md), then [`.github/DEVELOPMENT.md`](./.github/DEVELOPMENT.md).
Thanks! 💖

## Contributors

<!-- spellchecker: disable -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/garuna-m6"><img src="https://avatars.githubusercontent.com/u/23234342?v=4?s=100" width="100px;" alt="Anurag"/><br /><sub><b>Anurag</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/template-typescript-node-package/commits?author=garuna-m6" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://roe.dev/"><img src="https://avatars.githubusercontent.com/u/28706372?v=4?s=100" width="100px;" alt="Daniel Roe"/><br /><sub><b>Daniel Roe</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/template-typescript-node-package/commits?author=danielroe" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/nowyDEV"><img src="https://avatars.githubusercontent.com/u/12304307?v=4?s=100" width="100px;" alt="Dominik Nowik"/><br /><sub><b>Dominik Nowik</b></sub></a><br /><a href="#tool-nowyDEV" title="Tools">🔧</a> <a href="https://github.com/JoshuaKGoldberg/template-typescript-node-package/commits?author=nowyDEV" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/emday4prez"><img src="https://avatars.githubusercontent.com/u/35363144?v=4?s=100" width="100px;" alt="Emerson"/><br /><sub><b>Emerson</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/template-typescript-node-package/commits?author=emday4prez" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://sinchang.me"><img src="https://avatars.githubusercontent.com/u/3297859?v=4?s=100" width="100px;" alt="Jeff Wen"/><br /><sub><b>Jeff Wen</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/template-typescript-node-package/commits?author=sinchang" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://typescriptcourse.com/tutorials"><img src="https://avatars.githubusercontent.com/u/3806031?v=4?s=100" width="100px;" alt="Joe Previte"/><br /><sub><b>Joe Previte</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/template-typescript-node-package/issues?q=author%3Ajsjoeio" title="Bug reports">🐛</a> <a href="https://github.com/JoshuaKGoldberg/template-typescript-node-package/commits?author=jsjoeio" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://blog.johnnyreilly.com/"><img src="https://avatars.githubusercontent.com/u/1010525?v=4?s=100" width="100px;" alt="John Reilly"/><br /><sub><b>John Reilly</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/template-typescript-node-package/commits?author=johnnyreilly" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://www.joshuakgoldberg.com"><img src="https://avatars.githubusercontent.com/u/3335181?v=4?s=100" width="100px;" alt="Josh Goldberg"/><br /><sub><b>Josh Goldberg</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/template-typescript-node-package/issues?q=author%3AJoshuaKGoldberg" title="Bug reports">🐛</a> <a href="https://github.com/JoshuaKGoldberg/template-typescript-node-package/commits?author=JoshuaKGoldberg" title="Code">💻</a> <a href="#maintenance-JoshuaKGoldberg" title="Maintenance">🚧</a> <a href="https://github.com/JoshuaKGoldberg/template-typescript-node-package/pulls?q=is%3Apr+reviewed-by%3AJoshuaKGoldberg" title="Reviewed Pull Requests">👀</a> <a href="#tool-JoshuaKGoldberg" title="Tools">🔧</a> <a href="https://github.com/JoshuaKGoldberg/template-typescript-node-package/commits?author=JoshuaKGoldberg" title="Documentation">📖</a> <a href="#infra-JoshuaKGoldberg" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://webpro.nl"><img src="https://avatars.githubusercontent.com/u/456426?v=4?s=100" width="100px;" alt="Lars Kappert"/><br /><sub><b>Lars Kappert</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/template-typescript-node-package/commits?author=webpro" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://navinmoorthy.me/"><img src="https://avatars.githubusercontent.com/u/39694575?v=4?s=100" width="100px;" alt="Navin Moorthy"/><br /><sub><b>Navin Moorthy</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/template-typescript-node-package/issues?q=author%3Anavin-moorthy" title="Bug reports">🐛</a> <a href="https://github.com/JoshuaKGoldberg/template-typescript-node-package/commits?author=navin-moorthy" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/NazCodeland"><img src="https://avatars.githubusercontent.com/u/113494366?v=4?s=100" width="100px;" alt="NazCodeland"/><br /><sub><b>NazCodeland</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/template-typescript-node-package/commits?author=NazCodeland" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://orta.io"><img src="https://avatars.githubusercontent.com/u/49038?v=4?s=100" width="100px;" alt="Orta Therox"/><br /><sub><b>Orta Therox</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/template-typescript-node-package/commits?author=orta" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://paulisaweso.me/"><img src="https://avatars.githubusercontent.com/u/6335792?v=4?s=100" width="100px;" alt="Paul Esch-Laurent"/><br /><sub><b>Paul Esch-Laurent</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/template-typescript-node-package/commits?author=Pinjasaur" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/promise-dash"><img src="https://avatars.githubusercontent.com/u/86062880?v=4?s=100" width="100px;" alt="Promise Dash"/><br /><sub><b>Promise Dash</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/template-typescript-node-package/commits?author=promise-dash" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/RebeccaStevens"><img src="https://avatars.githubusercontent.com/u/7224206?v=4?s=100" width="100px;" alt="Rebecca Stevens"/><br /><sub><b>Rebecca Stevens</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/template-typescript-node-package/commits?author=RebeccaStevens" title="Code">💻</a> <a href="#infra-RebeccaStevens" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://linktr.ee/ronbraha"><img src="https://avatars.githubusercontent.com/u/45559220?v=4?s=100" width="100px;" alt="Ron Braha"/><br /><sub><b>Ron Braha</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/template-typescript-node-package/commits?author=RNR1" title="Code">💻</a> <a href="#design-RNR1" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://ronjeanfrancois.com"><img src="https://avatars.githubusercontent.com/u/105710107?v=4?s=100" width="100px;" alt="Ron Jean-Francois"/><br /><sub><b>Ron Jean-Francois</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/template-typescript-node-package/commits?author=ronthetech" title="Code">💻</a> <a href="#infra-ronthetech" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/the-lazy-learner"><img src="https://avatars.githubusercontent.com/u/13695177?v=4?s=100" width="100px;" alt="Sudhansu"/><br /><sub><b>Sudhansu</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/template-typescript-node-package/commits?author=the-lazy-learner" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tungbq"><img src="https://avatars.githubusercontent.com/u/85242618?v=4?s=100" width="100px;" alt="Tung Bui (Leo)"/><br /><sub><b>Tung Bui (Leo)</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/template-typescript-node-package/commits?author=tungbq" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/TAKANOME-DEV"><img src="https://avatars.githubusercontent.com/u/79809121?v=4?s=100" width="100px;" alt="takanomedev"/><br /><sub><b>takanomedev</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/template-typescript-node-package/commits?author=TAKANOME-DEV" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- spellchecker: enable -->
