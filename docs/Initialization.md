# Initializing from the Template

As an alternative to [creating with `npx create-typescript-app`](./Creation.md), the [_Use this template_](https://github.com/JoshuaKGoldberg/create-typescript-app/generate) button on GitHub can be used to quickly create a new repository from the template.
You can set up the new repository locally by cloning it and installing packages:

```shell
git clone https://github.com/YourUsername/YourRepositoryName
cd YourRepositoryName
pnpm i
```

> 💡 If you don't want to clone it locally, you can always [develop in a codespace](https://docs.github.com/en/codespaces/developing-in-codespaces/developing-in-a-codespace) instead.

Once the repository's packages are installed, you can run `pnpm run initialize` to fill out your repository's details and install necessary packages.
It will then remove itself and uninstall dependencies only used for initialization.

```shell
pnpm run initialize
```

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

`pnpm run initialize` will set `--mode` to `initialize`.

For example, running the initialization script and skipping all GitHub-related APIs:

```shell
pnpm run initialize --skip-all-contributors-api --skip-github-api
```

See [Tooling.md](./Tooling.md) for details on the tooling pieces and which bases they're included in.
