# Initializing from the Terminal

As a local alternative to [initialization from the template](./InitializationFromTemplate.md), you can run `npx template-typescript-node-package` in your terminal:

```shell
npx template-typescript-node-package
```

The prompt by default will ask you which mode you'd like to run in.
Pass `--mode create` to tell it to create a new repository in a child directory:

```shell
npx template-typescript-node-package --mode create
```

Then, go through the following two steps to set up required repository tooling on GitHub:

1. Create two tokens in [repository secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets):
   - `ACCESS_TOKEN`: A [GitHub PAT](https://github.com/settings/tokens/new) with _repo_ and _workflow_ permissions
   - `NPM_TOKEN`: An [npm access token](https://docs.npmjs.com/creating-and-viewing-access-tokens/) with _Automation_ permissions
2. Install the [Codecov GitHub App](https://github.com/marketplace/codecov) and [Renovate GitHub App](https://github.com/marketplace/renovate)

At this point, your new repository should be ready for development! 🥳

## The Creation Script

The creation script will interactively prompt for values to be used in creating the new repository.
Each may provided as a CLI flag as well:

- `--create-repository`: Whether to automatically create a repository on github.com with the given repository name under the owner
- `--description`: Sentence case description of the repository (e.g. `A quickstart-friendly TypeScript package with lots of great repository tooling. ✨`)
- `--owner`: GitHub organization or user the repository is underneath (e.g. `JoshuaKGoldberg`)
- `--repository`: The kebab-case name of the repository (e.g. `template-typescript-node-package`)
- `--title`: Title Case title for the repository to be used in documentation (e.g. `Template TypeScript Node Package`)

For example, pre-populating all values and creating a new repository:

```shell
npx template-typescript-node-package --create-repository --mode create --repository "testing-repository" --title "Testing Title" --owner "TestingOwner" --description "Test Description"
```

Then, go through the following two steps to set up required repository tooling on GitHub:

1. Create two tokens in [repository secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets):
   - `ACCESS_TOKEN`: A [GitHub PAT](https://github.com/settings/tokens/new) with _repo_ and _workflow_ permissions
   - `NPM_TOKEN`: An [npm access token](https://docs.npmjs.com/creating-and-viewing-access-tokens/) with _Automation_ permissions
2. Install the [Codecov GitHub App](https://github.com/marketplace/codecov) and [Renovate GitHub App](https://github.com/marketplace/renovate)

At this point, your new repository should be ready for development! 🥳
