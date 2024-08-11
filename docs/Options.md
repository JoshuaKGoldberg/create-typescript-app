# Options

All three of `create-typescript-app`'s setup scripts -[creation](./Creation.md), [initialization](./Initialization.md), and [migration](./Migration.md)- support a shared set of input options.

> This page uses `npx create-typescript-app` in its code examples, but initialization's `pnpm run initialize` works the same.

## Required Options

The following required options will be prompted for interactively if not provided as CLI flags.

### Base and Mode

These required options determine how the creation script will set up and scaffold the repository:

- `--base`: Whether to scaffold the repository with:
  - `minimal`: Just the bare starter tooling most repositories should ideally include
  - `common`: Important additions to the minimal starters such as releases and tests
  - `everything`: The most thorough tooling imaginable: sorting, spellchecking, and more!
  - `prompt`: Fine-grained control over which tooling pieces to use
- `--mode`: Whether to:
  - `create` a new repository in a child directory
  - `initialize` a freshly repository in the current directory
  - `migrate` an existing repository in the current directory

For example, scaffolding a full new repository under the current directory and also linking it to a new repository on github.com:

```shell
npx create-typescript-app --base everything --mode create
```

See [Tooling.md](./Tooling.md) for details on the tooling pieces and which bases they're included in.

### Core Options

These required options determine the options that will be substituted into the template's files:

- `--description` _(`string`)_: Sentence case description of the repository (e.g. `Quickstart-friendly TypeScript package with lots of great repository tooling. ✨`)
- `--owner` _(`string`)_: GitHub organization or user the repository is underneath (e.g. `JoshuaKGoldberg`)
- `--repository` _(`string`)_: The kebab-case name of the repository (e.g. `create-typescript-app`)
- `--title` _(`string`)_: Title Case title for the repository to be used in documentation (e.g. `Create TypeScript App`)

For example, pre-populating all core required options and also creating a new repository:

```shell
npx create-typescript-app --base everything --mode create --repository testing-repository --title "Testing Title" --owner TestingOwner --description "Test Description"
```

That script will run completely autonomously, no prompted inputs required. ✨

## Optional Options

The setup scripts also allow for optional overrides of the following inputs whose defaults are based on other options:

- `--access` _(`"public" | "restricted"`)_: Which [`npm publish --access`](https://docs.npmjs.com/cli/commands/npm-publish#access) to release npm packages with (by default, `"public"`)
- `--author` _(`string`)_: Username on npm to publish packages under (by default, an existing npm author, or the currently logged in npm user, or `owner.toLowerCase()`)
- `--bin` _(`string`)_: `package.json` bin value to include for npx-style running.
- `--directory` _(`string`)_: Directory to create the repository in (by default, the same name as the repository)
- `--email` _(`string`)_: Email address to be listed as the point of contact in docs and packages (e.g. `example@joshuakgoldberg.com`)
  - Optionally, `--email-github` _(`string`)_ and/or `--email-npm` _(`string`)_ may be provided to use different emails in `.md` files and `package.json`, respectively
- `--funding` _(`string`)_: GitHub organization or username to mention in `funding.yml` (by default, `owner`)
- `--guide` _(`string`)_: Link to a contribution guide to place at the top of the development docs
  - `--guide-title` _(`string`)_: If `--guide` is provided or detected from an existing DEVELOPMENT.md, the text title to place in the guide link
- `--keywords` _(`string[]`)_: Any number of keywords to include in `package.json` (by default, none)
  - This can be specified any number of times, like `--keywords apple --keywords "banana cherry"`
- `--logo` _(`string`)_: Local image file in the repository to display near the top of the README.md as a logo
  - `--logo-alt` _(`string`)_: If `--logo` is provided or detected from an existing README.md, alt text that describes the image (will be prompted for if not provided)
- `--preserve-generated-from` _(`boolean`)_: Whether to keep the GitHub repository _generated from_ notice (by default, `false`)

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

- `--exclude-all-contributors`: Don't add all-contributors to track contributions and display them in a README.md table.
- `--exclude-build`: Don't add a build task to generate built `.js`, `.d.ts`, and related output.
- `--exclude-compliance`: Don't add a GitHub Actions workflow to verify that PRs match an expected format.
- `--exclude-lint-json`: Don't apply linting and sorting to `*.json` and `*.jsonc` files.
- `--exclude-lint-knip`: Don't add Knip to detect unused files, dependencies, and code exports.
- `--exclude-lint-md`: Don't apply linting to `*.md` files.
- `--exclude-lint-package-json`: Don't add eslint-plugin-package-json to lint for package.json correctness.
- `--exclude-lint-eslint`: Don't use eslint-plugin-eslint-comment to enforce good practices around ESLint comment directives.
- `--exclude-lint-jsdoc`: Don't use eslint-plugin-jsdoc to enforce good practices around JSDoc comments.
- `--exclude-lint-packages`: Don't add a pnpm dedupe workflow to ensure packages aren't duplicated unnecessarily.
- `--exclude-lint-perfectionist`: Don't apply eslint-plugin-perfectionist to ensure imports, keys, and so on are in sorted order.
- `--exclude-lint-regex`: Don't add eslint-plugin-regex to enforce good practices around regular expressions.
- `--exclude-lint-strict`: Don't augment the recommended logical lint rules with typescript-eslint's strict config.
- `--exclude-lint-stylistic`: Don't add stylistic rules such as typescript-eslint's stylistic config.
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

See [Tooling.md](./Tooling.md) for details on the tooling pieces and which bases they're included in.

### Skipping API Calls

> Alternately, see [Offline Mode](#offline-mode) to skip API calls without disabling features

You can prevent the migration script from making some network-based changes using any or all of the following CLI flags:

- `--skip-all-contributors-api` _(`boolean`)_: Skips network calls that fetch all-contributors data from GitHub
  - This flag does nothing if `--exclude-all-contributors` was specified.
- `--skip-github-api` _(`boolean`)_: Skips calling to GitHub APIs.
- `--skip-install` _(`boolean`)_: Skips installing all the new template packages with `pnpm`.

For example, providing all three flags will completely skip all network requests:

```shell
npx create-typescript-app --skip-all-contributors-api --skip-github-api --skip-install
```

> 💡 Tip: To temporarily preview what the script would apply without making changes on GitHub, you can run with all `--skip-*-api` flags, then `git add -A; git reset --hard HEAD` to completely reset all changes.

### Skipping Local Changes

You can prevent the migration script from making some changes on disk using any or all of the following CLI flags:

- `--skip-removal` _(`boolean`)_: Skips removing setup docs and scripts, including this `docs/` directory
- `--skip-restore` _(`boolean`)_: Skips the prompt offering to restore the repository if an error occurs during setup
- `--skip-uninstall` _(`boolean`)_: Skips uninstalling packages only used for setup scripts

For example, providing all local change skip flags:

```shell
npx create-typescript-app --skip-removal --skip-restore --skip-uninstall
```

## Offline Mode

You can run `create-typescript-app` in an "offline" mode with `--offline`.
Doing so will:

- Enable `--exclude-all-contributors-api` and `--skip-github-api`
- Skip network calls when setting up contributors
- Run pnpm commands with pnpm's `--offline` mode

```shell
npx create-typescript-app --offline
```
