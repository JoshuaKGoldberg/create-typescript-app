# Blocks

`create-typescript-app` provides several dozen pieces of tooling, ranging from code building and formatting to various forms of GitHub repository management.
Each can be individually turned off or on.

This table summarizes each block and which base levels they're included in:

| Block                              | Flags                                                                                      | Minimal | Common | Everything |
| ---------------------------------- | ------------------------------------------------------------------------------------------ | ------- | ------ | ---------- |
| AllContributors                    | `--add-allcontributors`, `--exclude-allcontributors`                                       |         | ✅     | 💯         |
| Are The Types Wrong                | `--add-are-the-types-wrong`, `--exclude-are-the-types-wrong`                               |         |        |            |
| Contributing Docs                  | `--add-contributing-docs`, `--exclude-contributing-docs`                                   | ✔️      | ✅     | 💯         |
| Contributor Covenant               | `--add-contributor-covenant`, `--exclude-contributor-covenant`                             | ✔️      | ✅     | 💯         |
| CSpell                             | `--add-cspell`, `--exclude-cspell`                                                         |         |        | 💯         |
| Codecov                            | `--add-codecov`, `--exclude-codecov`                                                       |         | ✅     | 💯         |
| Development Docs                   | `--add-development-docs`, `--exclude-development-docs`                                     | ✔️      | ✅     | 💯         |
| ESLint                             | `--add-eslint`, `--exclude-eslint`                                                         | ✔️      | ✅     | 💯         |
| ESLint Comments Plugin             | `--add-eslint-comments-plugin`, `--exclude-eslint-comments-plugin`                         |         |        | 💯         |
| ESLint JSDoc Plugin                | `--add-eslint-jsdoc-plugin`, `--exclude-eslint-jsdoc-plugin`                               |         |        | 💯         |
| ESLint JSONC Plugin                | `--add-eslint-jsonc-plugin`, `--exclude-eslint-jsonc-plugin`                               |         |        | 💯         |
| ESLint Markdown Plugin             | `--add-eslint-markdown-plugin`, `--exclude-eslint-markdown-plugin`                         |         |        | 💯         |
| ESLint Markdown Links Plugin       | `--add-eslint-markdown-links-plugin`, `--exclude-eslint-markdown-links-plugin`             |         |        | 💯         |
| ESLint More Styling                | `--add-eslint-more-styling`, `--exclude-eslint-more-styling`                               |         |        | 💯         |
| ESLint Node Plugin                 | `--add-eslint-node-plugin`, `--exclude-eslint-node-plugin`                                 |         |        | 💯         |
| ESLint package.json Plugin         | `--add-eslint-package-json-plugin`, `--exclude-eslint-package-json-plugin`                 |         |        | 💯         |
| ESLint Perfectionist Plugin        | `--add-eslint-perfectionist-plugin`, `--exclude-eslint-perfectionist-plugin`               |         |        | 💯         |
| ESLint Plugin                      | `--add-eslint-plugin`, `--exclude-eslint-plugin`                                           |         |        |            |
| ESLint Regexp Plugin               | `--add-eslint-regexp-plugin`, `--exclude-eslint-regexp-plugin`                             |         |        | 💯         |
| ESLint YML Plugin                  | `--add-eslint-yml-plugin`, `--exclude-eslint-yml-plugin`                                   |         |        | 💯         |
| Exports                            | `--add-exports`, `--exclude-exports`                                                       | ✔️      | ✅     | 💯         |
| Funding                            | `--add-funding`, `--exclude-funding`                                                       |         | ✅     | 💯         |
| GitHub Actions CI                  | `--add-github-actions-ci`, `--exclude-github-actions-ci`                                   | ✔️      | ✅     | 💯         |
| GitHub Issue Templates             | `--add-github-issue-templates`, `--exclude-github-issue-templates`                         | ✔️      | ✅     | 💯         |
| GitHub PR Template                 | `--add-github-pr-template`, `--exclude-github-pr-template`                                 | ✔️      | ✅     | 💯         |
| Gitignore                          | `--add-gitignore`, `--exclude-gitignore`                                                   | ✔️      | ✅     | 💯         |
| Knip                               | `--add-knip`, `--exclude-knip`                                                             |         |        | 💯         |
| MIT License                        | `--add-mit-license`, `--exclude-mit-license`                                               | ✔️      | ✅     | 💯         |
| ncc                                | `--add-ncc`, `--exclude-ncc`                                                               |         |        |            |
| nvmrc                              | `--add-nvmrc`, `--exclude-nvmrc`                                                           |         |        | 💯         |
| OctoGuide                          | `--add-octoguide`, `--exclude-octoguide`                                                   |         | ✅     | 💯         |
| OctoGuide Strict                   | `--add-octoguide-strict`, `--exclude-octoguide-strict`                                     |         |        | 💯         |
| Package JSON                       | `--add-package-json`, `--exclude-package-json`                                             | ✔️      | ✅     | 💯         |
| pnpm Dedupe                        | `--add-pnpm-dedupe`, `--exclude-pnpm-dedupe`                                               |         |        | 💯         |
| Prettier                           | `--add-prettier`, `--exclude-prettier`                                                     | ✔️      | ✅     | 💯         |
| Prettier Plugin Curly              | `--add-prettier-plugin-curly`, `--exclude-prettier-plugin-curly`                           |         |        | 💯         |
| Prettier Plugin Package JSON       | `--add-prettier-plugin-package-json`, `--exclude-prettier-plugin-package-json`             |         |        | 💯         |
| Prettier Plugin Padding Lines      | `--add-prettier-plugin-padding-lines`, `--exclude-prettier-plugin-padding-lines`           |         |        | 💯         |
| Prettier Plugin Sentences Per Line | `--add-prettier-plugin-sentences-per-line`, `--exclude-prettier-plugin-sentences-per-line` |         |        | 💯         |
| Prettier Plugin Sh                 | `--add-prettier-plugin-sh`, `--exclude-prettier-plugin-sh`                                 |         |        | 💯         |
| README.md                          | `--add-readme-md`, `--exclude-readme-md`                                                   | ✔️      | ✅     | 💯         |
| release-it                         | `--add-release-it`, `--exclude-release-it`                                                 |         | ✅     | 💯         |
| Renovate                           | `--add-renovate`, `--exclude-renovate`                                                     |         |        | 💯         |
| Security Docs                      | `--add-security-docs`, `--exclude-security-docs`                                           | ✔️      | ✅     | 💯         |
| Side Effects                       | `--add-side-effects`, `--exclude-side-effects`                                             | ✔️      | ✅     | 💯         |
| Templated With                     | `--add-templated-with`, `--exclude-templated-with`                                         | ✔️      | ✅     | 💯         |
| TSDown                             | `--add-tsdown`, `--exclude-tsdown`                                                         | ✔️      | ✅     | 💯         |
| TypeScript                         | `--add-typescript`, `--exclude-typescript`                                                 | ✔️      | ✅     | 💯         |
| Vitest                             | `--add-vitest`, `--exclude-vitest`                                                         |         | ✅     | 💯         |
| VS Code                            | `--add-vs-code`, `--exclude-vs-code`                                                       |         |        | 💯         |
| Web-ext                            | `--add-web-ext`, `--exclude-web-ext`                                                       |         |        |            |

For example, this uses ncc instead of the default tsdown builder:

```shell
npx create-typescript-app --add-ncc --exclude-tsdown
```

See also [CLI](./CLI.md) for customizing templated repositories when running `npx create-typescript-app`.

## "Minimal" Base Level

These tooling pieces are the ones that most repositories should generally always have enabled.
Other pieces of tooling are likely to not work as well (or at all) if these are removed.

The _"minimal"_ base is best suited for projects that are very small and not likely to change very frequently.
However, they'll be missing out on many of the great tooling pieces enabled in more comprehensive bases.
We strongly recommend using at least the [_"common"_ base level](#common-base-level) instead for most repositories.

- [Building](#building)
- [Formatting](#formatting)
- [Linting](#linting)
- [Package Management](#package-management)
- [Repository Templates](#repository-templates)
- [Type Checking](#type-checking)

### Building

[**tsdown**](https://tsdown.dev): Builds output definitions and JavaScript files.
Each `*.ts` source file within `src/` is built into `.d.ts` and `.js` output files in `lib/`.

Building once:

```shell
pnpm build
```

Building in watch mode:

```shell
pnpm build --watch
```

### Formatting

[**Prettier**](https://prettier.io): Formats code for developers and enforces a consistent formatting style.
It's run on file save per [VS Code](https://code.visualstudio.com/docs/getstarted/settings) settings and as a Git commit hook via [husky](https://typicode.github.io/husky) and [lint-staged](https://github.com/okonet/lint-staged).
Additional formatting can be provided by the following plugins:

- [prettier-plugin-curly](https://github.com/JoshuaKGoldberg/prettier-plugin-curly)
- [prettier-plugin-padding-lines](https://github.com/JoshuaKGoldberg/prettier-plugin-padding-lines)
- [prettier-plugin-sentences-per-line](https://github.com/JoshuaKGoldberg/sentences-per-line/tree/main/packages/prettier-plugin-sentences-per-line)
- [prettier-plugin-sh](https://github.com/un-ts/prettier/tree/master/packages/sh)
- [prettier-plugin-packagejson](https://github.com/matzkoh/prettier-plugin-packagejson)

Auto-formatting all files:

```shell
pnpm format --write
```

### Linting

[**ESLint**](https://eslint.org): Static analysis for JavaScript code that detects likely logical issues and helps enforce consistent code style.
Uses [**typescript-eslint**](https://typescript-eslint.io) to understand TypeScript syntax and include TypeScript-specific rules.

Linting all files:

```shell
pnpm lint
```

Linting all files, auto-fixing fixable rule reports:

```shell
pnpm lint --fix
```

### Package Management

[**pnpm**](https://pnpm.io): Disk-efficient package manager alternative to npm.
It caches packages in a computer-wide registry and symlinks installed packages within that registry.

Installing packages:

```shell
pnpm install
```

### Repository Templates

In code, assorted repository documentation files for GitHub are created:

- [Code of conduct](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/adding-a-code-of-conduct-to-your-project)
- [Contributing guide](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/setting-guidelines-for-repository-contributors)
- [Issue and PR templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/about-issue-and-pull-request-templates)
- [Security policy](https://docs.github.com/en/code-security/getting-started/adding-a-security-policy-to-your-repository)

[GitHub Actions workflows](https://github.com/features/actions) are added for each of the enabled tooling pieces to run them in CI.

On the GitHub repository, metadata will be populated:

- [Issue labels](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels) for issue areas, statuses, and types.
- [Repository settings](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features) such as [branch rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/creating-rulesets-for-a-repository) and [squash merging PRs](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges)

### Type Checking

[**TypeScript**](https://typescriptlang.org): A typed superset of JavaScript that ensures runtime behavior matches the code's intent.
Configured with strict compiler options, including [`noImplicitAny`](https://aka.ms#noImplicitAny) and [`strict`](https://aka.ms#strict).

Type checking once:

```shell
pnpm tsc
```

Type checking in watch mode:

```shell
pnpm tsc --watch
```

## "Common" Base Level

These added tooling pieces are those that aren't quite essential for a repository, but are still very commonly useful.
This is recommended for most users of `create-typescript-app` to start with.

- [Contributors](#contributors)
- [Lint Knip](#lint-knip)
- [OctoGuide](#octoguide)
- [Releases](#releases)
- [Renovate](#renovate)
- [Testing](#testing)

### Contributors

[**All Contributors**](https://allcontributors.org): Tracks various kinds of contributions and displays them in a nicely formatted table in the README.md.
Contributions will be auto-detected when possible using [all-contributors-auto-action](https://github.com/JoshuaKGoldberg/all-contributors-auto-action).

### Lint Knip

[**Knip**](https://github.com/webpro/knip): Detects unused files, dependencies, and code exports.

Running Knip:

```shell
pnpm lint:knip
```

### OctoGuide

[**OctoGuide**](https://octo.guide): checks that contributor activity on your GitHub repository aligns with common expectations of smoothly-running projects.
It will automatically post friendly comments when contributors take actions you don’t want them to.

### Releases

[**release-it**](https://github.com/release-it/release-it): Generates changelogs, bumps the package version, and publishes to GitHub and npm based on [conventional commits](https://www.conventionalcommits.org).

### Renovate

[**Renovate**](https://docs.renovatebot.com): Keeps dependencies up-to-date with PRs, configured to wait a week after each update for safety.

### Testing

[**Vitest**](https://vitest.dev): Fast unit tests, configured with coverage tracking.

Additionally:

- [`@vitest/eslint-plugin`](https://github.com/vitest-dev/eslint-plugin-vitest) will be added to the ESLint config to lint for Vitest-specific issues
- [`console-fail-test`](https://github.com/JoshuaKGoldberg/console-fail-test) will also be added to ensure tests don't accidentally log to the console.

Running tests in watch mode:

```shell
pnpm test
```

Running tests in watch mode and auto-updating [Vitest snapshots](https://vitest.dev/guide/snapshot.html):

```shell
pnpm test -u
```

Running tests once with coverage tracking:

```shell
pnpm test run --coverage
```

## "Everything" Base Level

This level is for developers who are eager to get the maximum tooling benefits in a repository.
Using the _"everything"_ level will gain you comprehensive, strict coverage of all sorts of repository issues, including auto-sorting of properties and strict ESLint configs.

- [Blocks](#blocks)
  - ["Minimal" Base Level](#minimal-base-level)
    - [Building](#building)
    - [Formatting](#formatting)
    - [Linting](#linting)
    - [Package Management](#package-management)
    - [Repository Templates](#repository-templates)
    - [Type Checking](#type-checking)
  - ["Common" Base Level](#common-base-level)
    - [Contributors](#contributors)
    - [Lint Knip](#lint-knip)
    - [OctoGuide](#octoguide)
    - [Releases](#releases)
    - [Renovate](#renovate)
    - [Testing](#testing)
  - ["Everything" Base Level](#everything-base-level)
    - [Lint ESLint](#lint-eslint)
    - [Lint JSDoc](#lint-jsdoc)
    - [Lint JSON](#lint-json)
    - [Lint Package JSON](#lint-package-json)
    - [Lint Packages](#lint-packages)
    - [Lint Perfectionist](#lint-perfectionist)
    - [Lint Regexp](#lint-regexp)
    - [Lint Spelling](#lint-spelling)
    - [Lint Strict](#lint-strict)
    - [Lint Stylistic](#lint-stylistic)
    - [Lint YML](#lint-yml)
    - [OctoGuide Strict](#octoguide-strict)

### Lint ESLint

[`@eslint-community/eslint-plugin-eslint-comments`](https://eslint-community.github.io/eslint-plugin-eslint-comments): Enforces proper usage of [ESLint configuration comments](https://eslint.org/docs/latest/use/configure/rules#using-configuration-comments).

### Lint JSDoc

[`eslint-plugin-jsdoc`](https://github.com/gajus/eslint-plugin-jsdoc): Enforces good practices around JSDoc comments.

### Lint JSON

[`eslint-plugin-jsonc`](https://github.com/ota-meshi/eslint-plugin-jsonc): Adds linting for `.json` and `.jsonc` files.

### Lint Package JSON

[`eslint-plugin-package-json`](https://github.com/JoshuaKGoldberg/eslint-plugin-package-json): Linting for `package.json` files.

### Lint Packages

Uses [`pnpm dedupe`](https://pnpm.io/cli/dedupe) to deduplicate package dependencies.

```shell
pnpm lint:packages
```

> This is grouped with _"Lint"_ tooling pieces, but will likely eventually be renamed ([#896](https://github.com/JoshuaKGoldberg/create-typescript-app/issues/896)).

### Lint Perfectionist

[`eslint-plugin-perfectionist`](https://eslint-plugin-perfectionist.azat.io): Lints for sorting properties, imports, etc.
This plugin is quite particular -perfectionist, even- but all its rules include auto-fixers that can correct complaints for you.

### Lint Regexp

[`eslint-plugin-regexp`](https://github.com/ota-meshi/eslint-plugin-regexp): Detects issues with JavaScript regular expressions, such as potential exponential complexity.

### Lint Spelling

[**CSpell**](https://cspell.org): Spell checking for code.
Helps detect typos based on a configurable user dictionary (`cspell.json`).

```shell
pnpm lint:spelling
```

> This is a separate linter from ESLint, but will likely eventually be switched to an ESLint plugin ([#897](https://github.com/JoshuaKGoldberg/create-typescript-app/issues/897)).

### Lint Strict

Enables [typescript-eslint's strict configs](https://typescript-eslint.io/linting/configs/#strict) for increased scrutiny around code logic.

### Lint Stylistic

Enables [typescript-eslint's stylistic configs](https://typescript-eslint.io/linting/configs/#stylistic) for increased scrutiny around consistent code style.

### Lint YML

[`eslint-plugin-yml`](https://ota-meshi.github.io/eslint-plugin-yml): Adds linting for `yaml` and `.yaml` files, such as sorting keys.

### OctoGuide Strict

[**OctoGuide's Strict Config**](https://octo.guide/configs#rules-table): additionally enforces enforcing semantic pull request conventions.
