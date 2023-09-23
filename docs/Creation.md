# Creating from the Terminal

You can run `npx create-typescript-app` in your terminal to interactively create a new repository:

```shell
npx create-typescript-app
```

Then, go through the following two steps to set up required repository tooling on GitHub:

1. Create two tokens in [repository secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) _(unless you chose to opt out of releases)_:
   - `ACCESS_TOKEN`: A [GitHub PAT](https://github.com/settings/tokens/new) with _repo_ and _workflow_ permissions
   - `NPM_TOKEN`: An [npm access token](https://docs.npmjs.com/creating-and-viewing-access-tokens/) with _Automation_ permissions
2. Install two GitHub apps:
   - [Codecov](https://github.com/marketplace/codecov) _(unless you chose to opt out of tests)_
   - [Renovate](https://github.com/marketplace/renovate) _(unless you chose to opt out of renovate)_

Your new repository will then be ready for development!
Hooray! 🥳

## Options

You can explicitly provide some or all of the options the script would prompt for as command-line flags.
See [Options.md](./Options.md).

For example, running the creation script and skipping all APIs:

```shell
npx create-typescript-app --mode create --exclude-contributors --skip-github-api
```
