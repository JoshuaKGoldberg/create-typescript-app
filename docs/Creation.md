# Creating from the Terminal

You can run `npx create typescript-app@beta` in your terminal to interactively create a new repository:

```shell
npx create typescript-app@beta
```

The creation script will by default:

1. Prompt you for a directory, which template preset to run with, and some starting information
2. Initialize new directory as a local Git repository
3. Copy the template's files to that directory
4. Create a new repository on GitHub and set it as the local repository's upstream
5. Configure relevant settings on the GitHub repository

You'll then need to manually go through the following two steps to set up tooling on GitHub:

1. Create two tokens in [repository secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) _(unless you chose to opt out of releases)_:
   - `ACCESS_TOKEN`: A [GitHub PAT](https://github.com/settings/tokens/new) with _repo_ and _workflow_ permissions
   - `NPM_TOKEN`: An [npm access token](https://docs.npmjs.com/creating-and-viewing-access-tokens/) with _Automation_ permissions
2. Install two GitHub apps:
   - [Codecov](https://github.com/marketplace/codecov) _(unless you chose to opt out of tests)_
   - [Renovate](https://github.com/marketplace/renovate) _(unless you chose to opt out of renovate)_

Your new repository will then be ready for development!
Hooray! 🥳

## Options

You can customize which pieces of tooling are provided and the options they're created with.
See [Options.md](./Options.md).

For example, skipping the _"This package was templated with..."_ block:

```shell
npx create typescript-app@beta --mode create --exclude-templated-with
```

See [Blocks.md](./Blocks.md) for details on the tooling pieces and which presets they're included in.
