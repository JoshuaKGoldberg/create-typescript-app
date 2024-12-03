# Tooling

`create-typescript-app` provides over two dozen pieces of tooling, ranging from code building and formatting to various forms of GitHub repository management.
Most can be individually turned off or on.

The `create-typescript-app` setup scripts -[creation](./Creation.md), [initialization](./Initialization.md), and [migration](./Migration.md)- will prompt you to choose a "base" template level to initialize from.
Those template levels provide common presets of which tooling pieces to enable.

```plaintext
◆  How much tooling would you like the template to set up for you?
│  ○ minimal     Just the bare starter tooling most repositories should ideally include.
│  ○ common      Important additions to the minimal starters such as releases and tests.
│  ○ everything  The most thorough tooling imaginable: sorting, spellchecking, and more!
│  ○ prompt      (allow me to customize)
└
```

This table summarizes each tooling piece and which base levels they're included in:

| Tooling Piece                                 | Exclusion Flag                 | Minimal | Common | Everything |
| --------------------------------------------- | ------------------------------ | ------- | ------ | ---------- |
| [Building](#building)                         |                                | ✔️      | ✅     | 💯         |
| [Compliance](#compliance)                     | `--exclude-compliance`         |         |        | 💯         |
| [Contributors](#contributors)                 | `--exclude-contributors`       |         | ✅     | 💯         |
| [Formatting](#formatting)                     |                                | ✔️      | ✅     | 💯         |
| [Lint ESLint](#lint-eslint)                   | `--exclude-lint-eslint`        |         |        | 💯         |
| [Lint JSDoc](#lint-jsdoc)                     | `--exclude-lint-jsdoc`         |         |        | 💯         |
| [Lint JSON](#lint-json)                       | `--exclude-lint-json`          |         |        | 💯         |
| [Lint Knip](#lint-knip)                       | `--exclude-lint-knip`          |         | ✅     | 💯         |
| [Lint MD](#lint-md)                           | `--exclude-lint-md`            |         |        | 💯         |
| [Lint Package JSON](#lint-package-json)       | `--exclude-lint-package-json`  |         |        | 💯         |
| [Lint Packages](#lint-packages)               | `--exclude-lint-packages`      |         |        | 💯         |
| [Lint Perfectionist](#lint-perfectionist)     | `--exclude-lint-perfectionist` |         |        | 💯         |
| [Lint Regex](#lint-regex)                     | `--exclude-lint-regex`         |         |        | 💯         |
| [Lint Spelling](#lint-spelling)               | `--exclude-lint-spelling`      |         |        | 💯         |
| [Lint Strict](#lint-strict)                   | `--exclude-lint-strict`        |         |        | 💯         |
| [Lint Stylistic](#lint-stylistic)             | `--exclude-lint-stylistic`     |         |        | 💯         |
| [Lint YML](#lint-yml)                         | `--exclude-lint-yml`           |         |        | 💯         |
| [Linting](#linting)                           |                                | ✔️      | ✅     | 💯         |
| [Package Management](#package-management)     |                                | ✔️      | ✅     | 💯         |
| [Releases](#releases)                         | `--exclude-releases`           |         | ✅     | 💯         |
| [Renovate](#renovate)                         | `--exclude-renovate`           |         | ✅     | 💯         |
| [Repository Templates](#repository-templates) |                                | ✔️      | ✅     | 💯         |
| [Testing](#testing)                           | `--exclude-tests`              |         | ✅     | 💯         |
| [Type Checking](#type-checking)               |                                | ✔️      | ✅     | 💯         |

See also [Options](./Options.md) for how to customize the way template is run.

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

[**tsup**](https://tsup.egoist.dev): Builds output definitions and JavaScript files using [esbuild](https://esbuild.github.io).
Each `*.ts` source file within `src/` is built into `.d.ts`, `.js`, and `.js.map` output files in `lib/`.

Building once:

```shell
pnpm run build
```

Building in watch mode:

```shell
pnpm run build --watch
```

### Formatting

[**Prettier**](https://prettier.io): Formats code for developers and enforces a consistent formatting style.
It's run on file save per [VS Code](https://code.visualstudio.com/docs/getstarted/settings) settings and as a Git commit hook via [husky](https://typicode.github.io/husky) and [lint-staged](https://github.com/okonet/lint-staged).
[prettier-plugin-curly](https://github.com/JoshuaKGoldberg/prettier-plugin-curly), [prettier-plugin-sh](https://github.com/un-ts/prettier/tree/master/packages/sh), and [prettier-plugin-packagejson](https://github.com/matzkoh/prettier-plugin-packagejson) add in more formatting as well.

Auto-formatting all files:

```shell
pnpm run format --write
```

### Linting

[**ESLint**](https://eslint.org): Static analysis for JavaScript code that detects likely logical issues and helps enforce consistent code style.
Uses [**typescript-eslint**](https://typescript-eslint.io) to understand TypeScript syntax and include TypeScript-specific rules.

Linting all files:

```shell
pnpm run lint
```

Linting all files, auto-fixing fixable rule reports:

```shell
pnpm run lint --fix
```

### Package Management

[**pnpm**](https://pnpm.io): Disk-efficient package manager alternative to npm.
It caches packages in a computer-wide registry and symlinks installed packages within that registry.

Installing packages:

```shell
pnpm run install
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
- [Repository settings](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features) such as [branch protections](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) and [squash merging PRs](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges)

### Type Checking

[**TypeScript**](https://typescriptlang.org): A typed superset of JavaScript that ensures runtime behavior matches the code's intent.
Configured with strict compiler options, including [`noImplicitAny`](https://aka.ms#noImplicitAny) and [`strict`](https://aka.ms#strict).

Type checking once:

```shell
pnpm run tsc
```

Type checking in watch mode:

```shell
pnpm run tsc --watch
```

## "Common" Base Level

These added tooling pieces are those that aren't quite essential for a repository, but are still very commonly useful.
This is recommended for most users of `create-typescript-app` to start with.

- [Contributors](#contributors)
- [Lint Knip](#lint-knip)
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
pnpm run lint:knip
```

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
pnpm run test
```

Running tests in watch mode and auto-updating [Vitest snapshots](https://vitest.dev/guide/snapshot.html):

```shell
pnpm run test -u
```

Running tests once with coverage tracking:

```shell
pnpm run test run --coverage
```

## "Everything" Base Level

This level is for developers who are eager to get the maximum tooling benefits in a repository.
Using the _"everything"_ level will gain you comprehensive, strict coverage of all sorts of repository issues, including auto-sorting of properties and strict ESLint configs.

- [Compliance](#compliance)
- [Lint ESLint](#lint-eslint)
- [Lint JSDoc](#lint-jsdoc)
- [Lint JSON](#lint-json)
- [Lint MD](#lint-md)
- [Lint Package JSON](#lint-package-json)
- [Lint Packages](#lint-packages)
- [Lint Perfectionist](#lint-perfectionist)
- [Lint Regex](#lint-regex)
- [Lint Spelling](#lint-spelling)
- [Lint Strict](#lint-strict)
- [Lint Stylistic](#lint-stylistic)
- [Lint YML](#lint-yml)

### Compliance

[**PR Compliance Action**](https://github.com/mtfoley/pr-compliance-action): Checks PRs for compliance such as addressing a linked issue and proper title formatting.

### Lint ESLint

[`@eslint-community/eslint-plugin-eslint-comments`](https://eslint-community.github.io/eslint-plugin-eslint-comments): Enforces proper usage of [ESLint configuration comments](https://eslint.org/docs/latest/use/configure/rules#using-configuration-comments).

### Lint JSDoc

[`eslint-plugin-jsdoc`](https://github.com/gajus/eslint-plugin-jsdoc): Enforces good practices around JSDoc comments.

### Lint JSON

[`eslint-plugin-jsonc`](https://github.com/ota-meshi/eslint-plugin-jsonc): Adds linting for `.json` and `.jsonc` files.

### Lint MD

[**Markdownlint**](https://github.com/DavidAnson/markdownlint): Linting for Markdown code.

```shell
pnpm lint:md
```

> This is a separate linter from ESLint, but will likely eventually be switched to an ESLint plugin ([#567](https://github.com/JoshuaKGoldberg/create-typescript-app/issues/567)).

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

### Lint Regex

[`eslint-plugin-regex`](https://github.com/gmullerb/eslint-plugin-regex): Detects issues with JavaScript regular expressions, such as potential exponential complexity.

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

[`eslint-plugin-yml`](https://ota-meshi.github.io/eslint-plugin-yml): Adds linting for `yaml` and `.yml` files, such as sorting keys.
