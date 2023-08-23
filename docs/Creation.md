# Creating from the Terminal

You can run `npx template-typescript-node-package` in your terminal to interactively create a new repository:

```shell
npx template-typescript-node-package
```

Then, go through the following two steps to set up required repository tooling on GitHub:

1. Create two tokens in [repository secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets):
   - `ACCESS_TOKEN`: A [GitHub PAT](https://github.com/settings/tokens/new) with _repo_ and _workflow_ permissions
   - `NPM_TOKEN`: An [npm access token](https://docs.npmjs.com/creating-and-viewing-access-tokens/) with _Automation_ permissions
2. Install the [Codecov GitHub App](https://github.com/marketplace/codecov) and [Renovate GitHub App](https://github.com/marketplace/renovate)

Your new repository will then be ready for development!
Hooray! 🥳

## Options

You can explicitly provide some or all of the values the script would prompt for as command-line flags.

### Repository Behavior

These two flags determine how the creation script will create a new repository:

- `--create-repository` _(boolean)_: Whether to automatically create a corresponding repository on github.com if it doesn't yet exist
- `--mode`: whether to:
  - `create` a new repository in a child directory
  - `initialize` a freshly repository in the current directory
  - `migrate` an existing repository in the current directory

For example, creating a new repository in the current directory and also linking it to a new repository on github.com:

```shell
npx template-typescript-node-package --create-repository --mode create
```

### Template Values

These flags determine the values that will be substituted into the template's files:

- `--description`: Sentence case description of the repository (e.g. `A quickstart-friendly TypeScript package with lots of great repository tooling. ✨`)
- `--owner`: GitHub organization or user the repository is underneath (e.g. `JoshuaKGoldberg`)
- `--repository`: The kebab-case name of the repository (e.g. `template-typescript-node-package`)
- `--title`: Title Case title for the repository to be used in documentation (e.g. `Template TypeScript Node Package`)

```shell
npx template-typescript-node-package --repository "testing-repository" --title "Testing Title" --owner "TestingOwner" --description "Test Description"
```

For example, pre-populating all values and also creating a new repository:

```shell
npx template-typescript-node-package --create-repository --mode create --repository "testing-repository" --title "Testing Title" --owner "TestingOwner" --description "Test Description"
```

That script will run completely autonomously: no prompted inputs required.

## Opt-Outs

`npx template-typescript-node-package` supports `--exclude-*` and `--skip-*` CLI flags to opt out of tooling portions and/or using API calls.
See [Tooling Exclusions](./ToolingExclusions.md) for more information.
