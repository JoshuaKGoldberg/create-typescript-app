# Creating from the Terminal

You can run `npx create-typescript-app` in your terminal to interactively create a new repository in a child directory:

```shell
npx create-typescript-app
```

The creation script will by default:

1. Create a new directory with the given repository name
2. Initialize that new directory as a local Git repository
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

You can explicitly provide some or all of the options the script would prompt for as command-line flags.
See [Options.md](./Options.md).

For example, running the creation script and skipping all GitHub-related APIs:

```shell
npx create-typescript-app --mode create --skip-all-contributors-api --skip-github-api
```

See [Tooling.md](./Tooling.md) for details on the tooling pieces and which bases they're included in.
