<h1 align="center">Create TypeScript App</h1>

<p align="center">A quickstart-friendly TypeScript template with comprehensive formatting, linting, releases, testing, and other great tooling built-in. ✨</p>

<p align="center">
	<a href="#contributors" target="_blank">
<!-- prettier-ignore-start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<img alt="All Contributors: 22 🤝" src="https://img.shields.io/badge/all_contributors-22_🤝-21bb42.svg" />
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- prettier-ignore-end -->
	</a>
	<a href="https://codecov.io/gh/JoshuaKGoldberg/create-typescript-app" target="_blank">
		<img alt="Codecov Test Coverage" src="https://codecov.io/gh/JoshuaKGoldberg/create-typescript-app/branch/main/graph/badge.svg"/>
	</a>
	<a href="https://github.com/JoshuaKGoldberg/create-typescript-app/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank">
		<img alt="Code of Conduct: Enforced 🤝" src="https://img.shields.io/badge/code_of_conduct-enforced_🤝-21bb42" />
	</a>
	<a href="https://github.com/JoshuaKGoldberg/create-typescript-app/blob/main/LICENSE.md" target="_blank">
	    <img alt="License: MIT 📝" src="https://img.shields.io/badge/license-MIT_📝-21bb42.svg">
    </a>
	<a href="https://github.com/sponsors/JoshuaKGoldberg" target="_blank">
    	<img alt="Sponsor: On GitHub 💸" src="https://img.shields.io/badge/sponsor-on_github_💸-21bb42.svg" />
    </a>
	<img alt="Style: Prettier 🧹" src="https://img.shields.io/badge/style-prettier_🧹-21bb42.svg" />
    <img alt="TypeScript: Strict 💪" src="https://img.shields.io/badge/typescript-strict_💪-21bb42.svg" />
</p>

Note that this template is early stage, opinionated, and not endorsed by the TypeScript team.
It sets up a _lot_ of tooling out of the box.
Each of the included tools exists for a good reason and provides real value.

If you don't want to use any particular tool, you can always remove it manually.

## Getting Started

First make sure you have the following installed:

- [GitHub CLI](https://cli.github.com) _(you'll need to be logged in)_
- [Node.js](https://nodejs.org)
- [pnpm](https://pnpm.io)

This repository comes with three script forms to set up an existing or new repository with tooling.
Use the corresponding docs page to get started:

- [Creating from the terminal](./docs/Creation.md): creating a new repository locally on the command-line _(recommended)_
- [Initializing from the template](./docs/Initialization.md): creating a new repository with the [_Use this template_](https://github.com/JoshuaKGoldberg/create-typescript-app/generate) button on GitHub
- [Migrating an existing repository](./docs/Migrate.md): adding this template's tooling on top of an existing repository

## Explainer

This template is available for anybody who wants to set up a Node application using TypeScript.
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
- [**tsup**](https://tsup.egoist.dev): Builds output definitions and JavaScript files using [esbuild](https://esbuild.github.io).
- [**TypeScript**](https://typescriptlang.org): A typed superset of JavaScript, configured with strict compiler options.
- [**Vitest**](https://vitest.dev): Fast unit tests, configured with coverage tracking and [console-fail-test](https://github.com/JoshuaKGoldberg/console-fail-test).

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
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/garuna-m6"><img src="https://avatars.githubusercontent.com/u/23234342?v=4?s=100" width="100px;" alt="Anurag"/><br /><sub><b>Anurag</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=garuna-m6" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://roe.dev/"><img src="https://avatars.githubusercontent.com/u/28706372?v=4?s=100" width="100px;" alt="Daniel Roe"/><br /><sub><b>Daniel Roe</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=danielroe" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/nowyDEV"><img src="https://avatars.githubusercontent.com/u/12304307?v=4?s=100" width="100px;" alt="Dominik Nowik"/><br /><sub><b>Dominik Nowik</b></sub></a><br /><a href="#tool-nowyDEV" title="Tools">🔧</a> <a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=nowyDEV" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/emday4prez"><img src="https://avatars.githubusercontent.com/u/35363144?v=4?s=100" width="100px;" alt="Emerson"/><br /><sub><b>Emerson</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=emday4prez" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://sinchang.me"><img src="https://avatars.githubusercontent.com/u/3297859?v=4?s=100" width="100px;" alt="Jeff Wen"/><br /><sub><b>Jeff Wen</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=sinchang" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://typescriptcourse.com/tutorials"><img src="https://avatars.githubusercontent.com/u/3806031?v=4?s=100" width="100px;" alt="Joe Previte"/><br /><sub><b>Joe Previte</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/create-typescript-app/issues?q=author%3Ajsjoeio" title="Bug reports">🐛</a> <a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=jsjoeio" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://blog.johnnyreilly.com/"><img src="https://avatars.githubusercontent.com/u/1010525?v=4?s=100" width="100px;" alt="John Reilly"/><br /><sub><b>John Reilly</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=johnnyreilly" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://www.joshuakgoldberg.com"><img src="https://avatars.githubusercontent.com/u/3335181?v=4?s=100" width="100px;" alt="Josh Goldberg"/><br /><sub><b>Josh Goldberg</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/create-typescript-app/issues?q=author%3AJoshuaKGoldberg" title="Bug reports">🐛</a> <a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=JoshuaKGoldberg" title="Code">💻</a> <a href="#maintenance-JoshuaKGoldberg" title="Maintenance">🚧</a> <a href="https://github.com/JoshuaKGoldberg/create-typescript-app/pulls?q=is%3Apr+reviewed-by%3AJoshuaKGoldberg" title="Reviewed Pull Requests">👀</a> <a href="#tool-JoshuaKGoldberg" title="Tools">🔧</a> <a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=JoshuaKGoldberg" title="Documentation">📖</a> <a href="#infra-JoshuaKGoldberg" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=JoshuaKGoldberg" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://twitter.com/Jolg42"><img src="https://avatars.githubusercontent.com/u/1328733?v=4?s=100" width="100px;" alt="Joël Galeran"/><br /><sub><b>Joël Galeran</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=jolg42" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://kristo-baricevic.github.io/"><img src="https://avatars.githubusercontent.com/u/108290619?v=4?s=100" width="100px;" alt="Kristo Baricevic"/><br /><sub><b>Kristo Baricevic</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=kristo-baricevic" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://webpro.nl"><img src="https://avatars.githubusercontent.com/u/456426?v=4?s=100" width="100px;" alt="Lars Kappert"/><br /><sub><b>Lars Kappert</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=webpro" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://navinmoorthy.me/"><img src="https://avatars.githubusercontent.com/u/39694575?v=4?s=100" width="100px;" alt="Navin Moorthy"/><br /><sub><b>Navin Moorthy</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/create-typescript-app/issues?q=author%3Anavin-moorthy" title="Bug reports">🐛</a> <a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=navin-moorthy" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/NazCodeland"><img src="https://avatars.githubusercontent.com/u/113494366?v=4?s=100" width="100px;" alt="NazCodeland"/><br /><sub><b>NazCodeland</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=NazCodeland" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://orta.io"><img src="https://avatars.githubusercontent.com/u/49038?v=4?s=100" width="100px;" alt="Orta Therox"/><br /><sub><b>Orta Therox</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=orta" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://paulisaweso.me/"><img src="https://avatars.githubusercontent.com/u/6335792?v=4?s=100" width="100px;" alt="Paul Esch-Laurent"/><br /><sub><b>Paul Esch-Laurent</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=Pinjasaur" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/promise-dash"><img src="https://avatars.githubusercontent.com/u/86062880?v=4?s=100" width="100px;" alt="Promise Dash"/><br /><sub><b>Promise Dash</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=promise-dash" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/RebeccaStevens"><img src="https://avatars.githubusercontent.com/u/7224206?v=4?s=100" width="100px;" alt="Rebecca Stevens"/><br /><sub><b>Rebecca Stevens</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=RebeccaStevens" title="Code">💻</a> <a href="#infra-RebeccaStevens" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://linktr.ee/ronbraha"><img src="https://avatars.githubusercontent.com/u/45559220?v=4?s=100" width="100px;" alt="Ron Braha"/><br /><sub><b>Ron Braha</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=RNR1" title="Code">💻</a> <a href="#design-RNR1" title="Design">🎨</a> <a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=RNR1" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://ronjeanfrancois.com"><img src="https://avatars.githubusercontent.com/u/105710107?v=4?s=100" width="100px;" alt="Ron Jean-Francois"/><br /><sub><b>Ron Jean-Francois</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=ronthetech" title="Code">💻</a> <a href="#infra-ronthetech" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/the-lazy-learner"><img src="https://avatars.githubusercontent.com/u/13695177?v=4?s=100" width="100px;" alt="Sudhansu"/><br /><sub><b>Sudhansu</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=the-lazy-learner" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tungbq"><img src="https://avatars.githubusercontent.com/u/85242618?v=4?s=100" width="100px;" alt="Tung Bui (Leo)"/><br /><sub><b>Tung Bui (Leo)</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=tungbq" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/TAKANOME-DEV"><img src="https://avatars.githubusercontent.com/u/79809121?v=4?s=100" width="100px;" alt="takanomedev"/><br /><sub><b>takanomedev</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=TAKANOME-DEV" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- spellchecker: enable -->
