# Initializing from the Template

As an alternative to [creating with `npx create typescript-app@beta`](./Creation.md), the [_Use this template_](https://github.com/JoshuaKGoldberg/create-typescript-app/generate) button on GitHub can be used to quickly create a new repository from the template.
You can set up the new repository locally by cloning it and installing packages:

```shell
git clone https://github.com/YourUsername/YourRepositoryName
cd YourRepositoryName
npx create typescript-app@beta
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

You can customize which pieces of tooling are provided and the options they're created with.
See [Options.md](./Options.md).

For example, skipping the _"This package was templated with..."_ block:

```shell
npx create typescript-app@beta --exclude-templated-with
```

See [Blocks.md](./Blocks.md) for details on the tooling pieces and which presets they're included in.
