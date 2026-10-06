# Setup Mode

You can run `npx create-typescript-app` in your terminal to interactively create a new repository:

```shell
npx create-typescript-app
```

The setup script will by default:

1. Prompt you for a directory, which template preset to run with, and some starting information
2. Initialize new directory as a local Git repository
3. Copy the template's files to that directory
4. Create a new repository on GitHub and set it as the local repository's upstream
5. Configure relevant settings on the GitHub repository

You'll then need to do some [manual setup](#app-and-token-permissions) for a token, GitHub apps, and npm publishing.
Your new repository will then be ready for development!
Hooray! 🥳

## App and Token Permissions

Some tooling needs a token, GitHub apps, and npm settings that `create-typescript-app` can't set up for you.

### `ACCESS_TOKEN`

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

Alternately, a classic token with the `repo` and `workflow` scopes also works in place of the PAT.

### GitHub Apps

Install these apps on the repository:

- [All Contributors](https://github.com/apps/allcontributors), if you have a `contributors.yaml`: sends PRs to add contributors when the _Contributors_ workflow asks
- [Codecov](https://github.com/apps/codecov), if your `ci.yaml` uses `codecov/codecov-action`: reports test coverage
- [Renovate](https://github.com/apps/renovate), if you have a `.github/renovate.json`: sends PRs to update dependencies

Private repositories need `--codecovToken` and a `CODECOV_TOKEN` repository secret from Codecov's repository settings.

### npm

The _Release_ workflow publishes to npm with [trusted publishing](https://docs.npmjs.com/trusted-publishers).
npm only lets existing packages add trusted publishers.
If your package isn't on npm yet, run `pnpm build` and then `npm publish` to publish its first version by hand.
Then, on the package's npm settings page, add a GitHub Actions trusted publisher for your repository with the `release.yaml` workflow, and allow it to `npm publish`.

## Options

You can customize which pieces of tooling are provided and the options they're created with.
See [CLI.md](./CLI.md).

For example, skipping the _"This package was templated with..."_ block:

```shell
npx create-typescript-app --mode create --exclude-templated-with
```

See [Blocks.md](./Blocks.md) for details on the tooling pieces and which presets they're included in.
