# Migrating an Existing Repository

If you have an existing repository that you'd like to give the files from this repository, you can run `npx create-typescript-app` in it to "migrate" its tooling to this template's.

```shell
npx create-typescript-app
```

The migration script will:

- Uninstall any known old packages that conflict with this template's tooling
- Delete configuration files used with those old packages
- Install any packages needed for this template's tooling
- Create or rewrite configuration files for the new tooling
- Run ESLint and Prettier auto-fixers to align formatting and style to the new settings

For example, if the repository previously using Jest for testing:

- `eslint-plugin-jest`, `jest`, and other Jest-related packages will be uninstalled
- Any Jest config file like `jest.config.js` will be deleted
- `@vitest/eslint-plugin`, `vitest`, and other Vitest-related packages will be installed
- A `vitest.config.ts` file will be created

You'll then need to manually go through the following two steps to set up tooling on GitHub:

1. Create two tokens in [repository secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) _(unless you chose to opt out of releases)_:
   - `ACCESS_TOKEN`: A [GitHub PAT](https://github.com/settings/tokens/new) with _repo_ and _workflow_ permissions
   - `NPM_TOKEN`: An [npm access token](https://docs.npmjs.com/creating-and-viewing-access-tokens/) with _Automation_ permissions
2. Install two GitHub apps:
   - [Codecov](https://github.com/marketplace/codecov) _(unless you chose to opt out of tests)_
   - [Renovate](https://github.com/marketplace/renovate) _(unless you chose to opt out of renovate)_

Your repository will then have an approximate copy of this template's tooling ready for you to review!
Hooray! 🥳

> [!WARNING]
> Migration will override many files in your repository.
> You'll want to review each of the changes.
> There will almost certainly be some incorrect changes you'll need to fix.

## Options

`create-typescript-app` will detect whether it's being run in an existing repository.
It also allows specifying `--mode migrate` if that detection misinterprets the current directory:

```shell
npx create-typescript-app --mode migrate
```

You can explicitly provide some or all of the options the script would prompt for as command-line flags.
See [Options.md](./Options.md).

For example, running the migration script and skipping all GitHub-related APIs:

```shell
npx create-typescript-app --skip-all-contributors-api --skip-github-api
```

See [Tooling.md](./Tooling.md) for details on the tooling pieces and which bases they're included in.
