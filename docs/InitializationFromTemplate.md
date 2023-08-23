# Initializing from the Template

The [_Use this template_](https://github.com/JoshuaKGoldberg/template-typescript-node-package/generate) button on GitHub can be used to quickly create a new repository.
After creating the new repository, you can set it up locally by cloning it and installing packages:

```shell
git clone https://github.com/YourUsername/YourRepositoryName
cd YourRepositoryName
pnpm i
```

> 💡 If you don't want to `git clone` it locally, you can always [develop in a codespace](https://docs.github.com/en/codespaces/developing-in-codespaces/developing-in-a-codespace) instead.

## The Initialization Script

Once the repository's packages are installed, you can run `pnpm run initialize` to fill out your repository's details and install necessary packages.
It will then remove itself and uninstall dependencies only used for initialization.

```shell
pnpm run initialize
```

The initialization script will interactively prompt for values to be used in creating the new repository.
Each may provided as a CLI flag as well:

- `--description`: Sentence case description of the repository (e.g. `A quickstart-friendly TypeScript package with lots of great repository tooling. ✨`)
- `--owner`: GitHub organization or user the repository is underneath (e.g. `JoshuaKGoldberg`)
- `--repository`: The kebab-case name of the repository (e.g. `template-typescript-node-package`)
- `--title`: Title Case title for the repository to be used in documentation (e.g. `Template TypeScript Node Package`)

For example, pre-populating all values:

```shell
pnpm run initialize --repository "testing-repository" --title "Testing Title" --owner "TestingOwner" --description "Test Description"
```

Then, go through the following two steps to set up required repository tooling on GitHub:

1. Create two tokens in [repository secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets):
   - `ACCESS_TOKEN`: A [GitHub PAT](https://github.com/settings/tokens/new) with _repo_ and _workflow_ permissions
   - `NPM_TOKEN`: An [npm access token](https://docs.npmjs.com/creating-and-viewing-access-tokens/) with _Automation_ permissions
2. Install the [Codecov GitHub App](https://github.com/marketplace/codecov) and [Renovate GitHub App](https://github.com/marketplace/renovate)

At this point, your new repository should be ready for development! 🥳

### Skipping API Calls

The initialization script normally posts to GitHub APIs to set repository information such as repository description and branch protections on github.com.
You can skip those API calls by specifying `--skip-github-api`.

For example, pre-populating all values and skipping API calls:

```shell
pnpm run initialize --repository "testing-repository" --title "Testing Title" --owner "TestingOwner" --description "Test Description" --skip-github-api
```

> Tip: the `--skip-github-api` flag will cause all changes to be limited to your local repository.
> That means you can test out the script with `pnpm run initialize --skip-github-api`, then `git add -A; git reset --hard HEAD` to completely reset all changes.
