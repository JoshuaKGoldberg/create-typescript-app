# Options

All three of `create-typescript-app`'s setup scripts -[creation](./Creation.md), [initialization](./Initialization.md), and [migration](./Migration.md)- support a shared set of input options.

> This page uses `npx create-typescript-app` in its code examples, but `pnpm run initialize` works the same.

## Required Options

The following required options will be prompted for interactively if not provided as CLI flags.

### Base and Mode

These required options determine how the creation script will set up and scaffold the repository:

- `--base`: Whether to scaffold the repository with:
  - `everything` that comes with the template _(recommended)_
  - `minimum` amounts of tooling, essentially opting out of everything
  - `prompt` for which portions to exclude
- `--create-repository` _(boolean)_: Whether to create a corresponding repository on github.com (if it doesn't yet exist)
- `--mode`: Whether to:
  - `create` a new repository in a child directory
  - `initialize` a freshly repository in the current directory
  - `migrate` an existing repository in the current directory

For example, scaffolding a full new repository in the current directory and also linking it to a new repository on github.com:

```shell
npx create-typescript-app --base everything --create-repository --mode create
```

### Core Options

These required options determine the options that will be substituted into the template's files:

- `--description` _(`string`)_: Sentence case description of the repository (e.g. `A quickstart-friendly TypeScript package with lots of great repository tooling. ✨`)
- `--owner` _(`string`)_: GitHub organization or user the repository is underneath (e.g. `JoshuaKGoldberg`)
- `--repository` _(`string`)_: The kebab-case name of the repository (e.g. `create-typescript-app`)
- `--title` _(`string`)_: Title Case title for the repository to be used in documentation (e.g. `Create TypeScript App`)

For example, pre-populating all core required options and also creating a new repository:

```shell
npx create-typescript-app --create-repository --base everything --mode create --repository testing-repository --title "Testing Title" --owner TestingOwner --description "Test Description"
```

That script will run completely autonomously, no prompted inputs required. ✨

## Optional Options

The setup scripts also allow for optional overrides of the following inputs whose defaults are based on other options:

- `--author` _(`string`)_: Username on npm to publish packages under (by default, an existing npm author, or the currently logged in npm user, or `owner.toLowerCase()`)
- `--email` _(`string`)_: Email address to be listed as the point of contact in docs and packages (e.g. `example@joshuakgoldberg.com`)
- `--funding` _(`string`)_: GitHub organization or username to mention in `funding.yml` (by default, `owner`)

For example, customizing the ownership and users associated with a new repository:

```shell
npx create-typescript-app --author my-npm-username --email example@joshuakgoldberg.com --funding MyGitHubOrganization
```

> 💡 You can always manually edit files such as `package.json` after running a setup script.

## Opt-Outs

The setup scripts can be directed with CLI flags to opt out tooling portions and/or using API calls.

### Excluding Tooling Portions

The setup scripts normally will prompt you to select how much of the tooling you'd like to enable in a new repository.
Alternately, you can bypass that prompt by providing any number of the following CLI flags:

- `--exclude-compliance`: Don't add a GitHub Actions workflow to verify that PRs match an expected format.
- `--exclude-contributors`: Don't add all-contributors to track contributions and display them in a README.md table.
- `--exclude-lint-json`: Don't apply linting and sorting to `*.json` and `*.jsonc` files.
- `--exclude-lint-knip`: Don't add Knip to detect unused files, dependencies, and code exports.
- `--exclude-lint-md`: Don't apply linting to `*.md` files.
- `--exclude-lint-package-json`: Don't add npm-package-json-lint to lint for package.json correctness.
- `--exclude-lint-packages`: Don't add a pnpm dedupe workflow to ensure packages aren't duplicated unnecessarily.
- `--exclude-lint-perfectionist`: Don't apply eslint-plugin-perfectionist to ensure imports, keys, and so on are in sorted order.
- `--exclude-lint-spelling`: Don't add cspell to spell check against dictionaries of known words.
- `--exclude-lint-yml`: Don't apply linting and sorting to `*.yaml` and `*.yml` files.
- `--exclude-releases`: Don't add release-it to generate changelogs, package bumps, and publishes based on conventional commits.
- `--exclude-renovate`: Don't add a Renovate config to dependencies up-to-date with PRs.
- `--exclude-tests`: Don't add Vitest tooling for fast unit tests, configured with coverage tracking.

For example, initializing with all tooling except for `package.json` checks and Renovate:

```shell
npx create-typescript-app --exclude-lint-package-json --exclude-lint-packages --exclude-renovate
```

> **Warning**
> Specifying any `--exclude-*` flag on the command-line will cause the setup script to skip prompting for more excludes.

### Skipping API Calls

You can prevent the migration script from making some network-based changes using any or all of the following CLI flags:

- `--exclude-contributors` _(`boolean`)_: Skips network calls that fetch all-contributors data from GitHub
  - This flag does nothing if `--exclude-contributors` was specified.
- `--skip-github-api` _(`boolean`)_: Skips calling to GitHub APIs.
- `--skip-install` _(`boolean`)_: Skips installing all the new template packages with `pnpm`.

For example, providing all three flags will completely skip all network requests:

```shell
npx create-typescript-app --exclude-contributors --skip-github-api --skip-install
```

> 💡 Tip: To temporarily preview what the script would apply, you can run with all `--skip-*` flags, then `git add -A; git reset --hard HEAD` to completely reset all changes.

### Skipping Local Changes

You can prevent the migration script from making some changes on disk using any or all of the following CLI flags:

- `--skip-removal` _(`boolean`)_: Skips removing setup docs and scripts, including this `docs/` directory
- `--skip-restore` _(`boolean`)_: Skips the prompt offering to restore the repository if an error occurs during setup
- `--skip-uninstall` _(`boolean`)_: Skips uninstalling packages only used for setup scripts

For example, providing all local change skip flags:

```shell
npx create-typescript-app --skip-removal --skip-restore --skip-uninstall
```
