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

Upon completion, the prompt will suggest commands to get started working in the repository and create a corresponding GitHub repository.
Those commands will roughly run the [The Initialization Script](./InitializationFromTemplate.md#the-initialization-script), but with `npm template-typescript-node-package --mode initialize` instead of `pnpm run initialize`:

```shell
cd repository-name
gh repo create repository-name --public --source=. --remote=origin
npx template-typescript-node-package --mode initialize
git add -A
git commit -m "chore: initial commit ✨"
git push -u origin main
```

## The Creation Script

The creation script will interactively prompt for values to be used in creating the new repository.
Each may provided as a string CLI flag as well:

- `--description`: Sentence case description of the repository (e.g. `A quickstart-friendly TypeScript package with lots of great repository tooling. ✨`)
- `--owner`: GitHub organization or user the repository is underneath (e.g. `JoshuaKGoldberg`)
- `--repository`: The kebab-case name of the repository (e.g. `template-typescript-node-package`)
- `--title`: Title Case title for the repository to be used in documentation (e.g. `Template TypeScript Node Package`)

For example, pre-populating all values:

```shell
npx template-typescript-node-package --mode create --repository "testing-repository" --title "Testing Title" --owner "TestingOwner" --description "Test Description"
```

Then, go through the following two steps to set up required repository tooling on GitHub:

1. Create two tokens in [repository secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets):
   - `ACCESS_TOKEN`: A [GitHub PAT](https://github.com/settings/tokens/new) with _repo_ and _workflow_ permissions
   - `NPM_TOKEN`: An [npm access token](https://docs.npmjs.com/creating-and-viewing-access-tokens/) with _Automation_ permissions
2. Install the [Codecov GitHub App](https://github.com/marketplace/codecov) and [Renovate GitHub App](https://github.com/marketplace/renovate)

At this point, your new repository should be ready for development! 🥳
