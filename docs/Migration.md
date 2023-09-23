# Migrating an Existing Repository

If you have an existing repository that you'd like to give the files from this repository, you can run `npx create-typescript-app` in it to "migrate" its tooling to this template's.

```shell
npx create-typescript-app
```

> **Warning**
> Migration will override many files in your repository.
> You'll want to review each of the changes.
> There will almost certainly be some incorrect changes you'll need to fix.

## Options

You can explicitly provide some or all of the options the script would prompt for as command-line flags.
See [Options.md](./Options.md).

For example, running the migration script and skipping all APIs:

```shell
npx create-typescript-app --mode migrate --exclude-contributors --skip-github-api
```
