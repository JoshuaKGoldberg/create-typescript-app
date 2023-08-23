# Migrating an Existing Repository

If you have an existing repository that you'd like to give the files from this repository, you can run `npx template-typescript-node-package` in it to "migrate" its tooling to this template's.

```shell
npx template-typescript-node-package
```

> **Warning**
> Migration will override many files in your repository.
> You'll want to review each of the changes.
> There will almost certainly be some incorrect changes you'll need to fix.

Migrating an existing repository behaves the same as [`npx template-typescript-node-package`](./Creation.md)'s creation mode.
The migration mode accepts the same [CLI options](./Creation.md#options) and [CLI opt-outs](./OptOuts.md).

For example, running the migration script and skipping all APIs:

```shell
npx template-typescript-node-package --mode migrate --skip-contributors-data --skip-github-api --skip-install
```
