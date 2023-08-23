# Initializing from the Template

As an alternative to [creating with `npx template-typescript-node-package`](./Creation.md), the [_Use this template_](https://github.com/JoshuaKGoldberg/template-typescript-node-package/generate) button on GitHub can be used to quickly create a new repository from the template.
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

Initializing a new repository behaves the same as [`npx template-typescript-node-package`](./Creation.md), but with `--mode` set to `initialize`.
It accepts the same [CLI options](./Creation.md#options) and [CLI opt-outs](./OptOuts.md).

For example, running the initialize script and skipping all APIs:

```shell
pnpm run initialize --skip-contributors-data --skip-github-api --skip-install
```
