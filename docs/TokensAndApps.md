# Tokens and Apps

Some tooling needs a token, GitHub apps, and npm settings that `create-typescript-app` can't set up for you.
Set them up after [creating](./Setup.md), [transitioning](./Transition.md), or [templating](./UseThisTemplate.md) a repository.

## `ACCESS_TOKEN`

The _Contributors_, _CTA_, and _Release_ workflows use a GitHub personal access token stored as an `ACCESS_TOKEN` repository secret.
You only need it if you have a `contributors.yaml`, `cta.yaml`, or `release.yaml` in `.github/workflows/`.

1. Create a [fine-grained personal access token](https://github.com/settings/personal-access-tokens/new) with:
   - **Resource owner**: the user or organization that owns the repository
   - **Repository access**: _Only select repositories_, then pick the repository
   - **Repository permissions**:
     - **Contents**: Read and write, to push commits and tags and create GitHub releases
     - **Issues**: Read and write, for All Contributors to comment on issues
     - **Pull requests**: Read and write, for All Contributors and CTA to comment on PRs, and for CTA to mark them as drafts
     - **Workflows**: Read and write, only if you have a `cta.yaml`, to push updated workflow files
2. Add it as a repository secret named `ACCESS_TOKEN`, either:
   - On your repository's _Settings_ > _Secrets and variables_ > _Actions_ page
   - Or by running `gh secret set ACCESS_TOKEN`

A classic token with the `repo` and `workflow` scopes also works.

If an organization owns the repository and you're not an owner, an organization owner may need to approve the token.

The token's user must be able to push directly to `main`.
The ruleset `create-typescript-app` adds lets repository admins do that.

When the token expires, those workflows will fail until you replace it.

## GitHub Apps

Install these apps on the repository:

- [All Contributors](https://github.com/apps/allcontributors), if you have a `contributors.yaml`: sends PRs to add contributors when the _Contributors_ workflow asks
- [Codecov](https://github.com/apps/codecov), if your `ci.yaml` uses `codecov/codecov-action`: reports test coverage
- [Renovate](https://github.com/apps/renovate), if you have a `.github/renovate.json`: sends PRs to update dependencies

Private repositories need `--codecovToken` and a `CODECOV_TOKEN` repository secret from Codecov's repository settings.

## npm

The _Release_ workflow publishes to npm with [trusted publishing](https://docs.npmjs.com/trusted-publishers).
npm only lets existing packages add trusted publishers.
If your package isn't on npm yet, run `pnpm build` and then `npm publish` to publish its first version by hand.
Then, on the package's npm settings page, add a GitHub Actions trusted publisher for your repository with the `release.yaml` workflow, and allow it to `npm publish`.
