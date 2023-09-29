# Tooling

When running `create-typescript-app`, it will prompt for what "base" template level to initialize from.
You can alternately granularly choose with tools should be enabled or omitted.

```plaintext
◆  How much tooling would you like the template to set up for you?
│  ○ minimum     Just the bare starters most repositories should include for approachable development.
│  ○ common      Important additions to the starters such as a contributors table, releases, and testing.
│  ○ everything  The most comprehensive tooling imaginable: sorting, spellchecking, strictness, and more!
│  ○ prompt      (allow me to customize)
└
```

This table summarizes each tooling piece and which base levels they're included in:

| Tooling Piece                                 | Exclusion Flag                 | Minimum | Common | Everything |
| --------------------------------------------- | ------------------------------ | ------- | ------ | ---------- |
| [Building](#building)                         |                                | ✔️      | ☑️     | ✅         |
| [Compliance](#compliance)                     | `--exclude-compliance`         |         |        | ✅         |
| [Contributors](#contributors)                 | `--exclude-contributors`       |         | ☑️     | ✅         |
| [Formatting](#formatting)                     |                                | ✔️      | ☑️     | ✅         |
| [Lint Deprecation](#lint-deprecation)         | `--exclude-lint-deprecation`   |         |        | ✅         |
| [Lint ESLint](#lint-eslint)                   | `--exclude-lint-eslint`        |         |        | ✅         |
| [Lint JSDoc](#lint-jsdoc)                     | `--exclude-lint-jsdoc`         |         |        | ✅         |
| [Lint JSON](#lint-json)                       | `--exclude-lint-json`          |         |        | ✅         |
| [Lint Knip](#lint-knip)                       | `--exclude-lint-knip`          |         | ☑️     | ✅         |
| [Lint MD](#lint-md)                           | `--exclude-lint-md`            |         |        | ✅         |
| [Lint Package JSON](#lint-package-json)       | `--exclude-lint-package-json`  |         |        | ✅         |
| [Lint Packages](#lint-packages)               | `--exclude-lint-packages`      |         |        | ✅         |
| [Lint Perfectionist](#lint-perfectionist)     | `--exclude-lint-perfectionist` |         |        | ✅         |
| [Lint Regex](#lint-regex)                     | `--exclude-lint-regex`         |         |        | ✅         |
| [Lint Spelling](#lint-spelling)               | `--exclude-lint-spelling`      |         |        | ✅         |
| [Lint Strict](#lint-strict)                   | `--exclude-lint-strict`        |         |        | ✅         |
| [Lint Stylistic](#lint-stylistic)             | `--exclude-lint-stylistic`     |         |        | ✅         |
| [Lint YML](#lint-yml)                         | `--exclude-lint-yml`           |         |        | ✅         |
| [Linting](#linting)                           |                                | ✔️      | ☑️     | ✅         |
| [Package Management](#package-management)     |                                | ✔️      | ☑️     | ✅         |
| [Releases](#releases)                         | `--exclude-releases`           |         | ☑️     | ✅         |
| [Renovate](#renovate)                         | `--exclude-renovate`           |         | ☑️     | ✅         |
| [Repository Templates](#repository-templates) |                                | ✔️      | ☑️     | ✅         |
| [Testing](#testing)                           | `--exclude-tests`              |         | ☑️     | ✅         |
| [Type Checking](#type-checking)               |                                | ✔️      | ☑️     | ✅         |

## Pieces

### "Minimum" Base Level

These tooling pieces are the ones that most repositories should generally always have enabled.
Other pieces of tooling are likely to not work as well (or at all) if these are removed.

The _"minimum"_ base is best suited for projects that are very small and not likely to change very frequently.
However, they'll be missing out on many of the great tooling pieces enabled in more comprehensive bases.
We strongly recommend using at least the _"common"_ template instead for most repositories.

#### Building

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

#### Formatting

[**Prettier**](https://prettier.io): Formats code for developers and enforces a consistent formatting style.
It's run on file save per [VS Code](TODO) settings and as a Git commit hook via [husky](https://typicode.github.io/husky) and [lint-staged](https://github.com/okonet/lint-staged).

Auto-formatting all files:

```shell
pnpm run format --write
```

#### Linting

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

#### Package Management

[**pnpm**](https://pnpm.io): Disk-efficient package manager alternative to npm.
It caches packages in a computer-wide registry and symlinks installed packages within that registry.

Installing packages:

```shell
pnpm run install
```

#### Repository Templates

In code, assorted repository documentation files for GitHub are created:

- [Code of conduct](TODO)
- [Contributing guide](TODO)
- [Issue templates](TODO)
- [PR template](TODO)
- [Security policy](TODO)

[GitHub Actions workflows](TODO) are added for each of the enabled tooling pieces to run them in CI.

On the GitHub repository, metadata will be populated:

- [Issue labels](TODO) for issue areas, statuses, and types.
- [Repository settings](TODO) such as [branch protections](TODO) and [squash merging PRs](TODO)

#### Type Checking

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

### "Common" Base Level

These added tooling pieces are those that aren't quite essential for a repository, but are still very commonly useful.
This is recommended for most users of `create-typescript-app` to start with.

#### Contributors

[**All Contributors**](https://allcontributors.org): Tracks various kinds of contributions and displays them in a nicely formatted table in the README.md.
Contributions will be auto-detected when possible using [all-contributors-auto-action](https://github.com/JoshuaKGoldberg/all-contributors-auto-action).

#### Lint Knip

[**Knip**](https://github.com/webpro/knip): Detects unused files, dependencies, and code exports.

Running Knip:

```shell
pnpm run lint:knip
```

#### Releases

[**release-it**](https://github.com/release-it/release-it): Generates changelogs, bumps the package version, and publishes to GitHub and npm based on [conventional commits](https://www.conventionalcommits.org).

#### Renovate

[**Renovate**](https://docs.renovatebot.com): Keeps dependencies up-to-date with PRs, configured to wait a few days after each update for safety.

#### Testing

[**Vitest**](https://vitest.dev): Fast unit tests, configured with coverage tracking.

Additionally:

- [`console-fail-test`](https://github.com/JoshuaKGoldberg/console-fail-test) will also be added to ensure tests don't accidentally log to the console.
- [`eslint-plugin-no-only-tests`](TODO) will be added to the ESLint config to ensure calls to `it.only` or similar are not checked in
- [`eslint-plugin-vitest`](TODO) will be added to the ESLint config to lint for Vitest-specific issues

Running tests in watch mode:

```shell
pnpm run test
```

Running tests in watch mode and auto-updating [Vitest snapshots](TODO):

```shell
pnpm run test -u
```

Running tests once with coverage tracking:

```shell
pnpm run test run --coverage
```

### "Everything" Base Level

This level is for experienced developers who are eager to get the maximum tooling benefits in a repository.
Using the _"everything"_ level will gain you comprehensive, strict coverage of all sorts of repository issues, including strict ESLint configs and auto-sorting of properties.

#### Compliance

[**PR Compliance Action**](https://github.com/mtfoley/pr-compliance-action): Checks PRs for compliance such as addressing a linked issue and proper title formatting.

#### Lint Deprecation

#### Lint ESLint

#### Lint JSDoc

#### Lint JSON

#### Lint MD

[**Markdownlint**](https://github.com/DavidAnson/markdownlint): Static analysis for Markdown code.

#### Lint Package JSON

#### Lint Packages

#### Lint Perfectionist

#### Lint Regex

#### Lint Spelling

#### Lint Strict

#### Lint Stylistic

#### Lint YML
