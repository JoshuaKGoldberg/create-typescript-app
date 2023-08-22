# Migrating an Existing Repository

If you have an existing repository that you'd like to give the files from this repository, you can run `npx template-typescript-node-package` in it to "hydrate" its tooling with this template's.

```shell
npx template-typescript-node-package
```

> **Warning**
> Migration will override many files in your repository.
> You'll want to review each of the changes.
> There will almost certainly be some incorrect changes you'll need to fix.

## Values

Repository settings will be auto-filled from the repository's files if possible, but can be provided manually as well:

- `--author` _(`string`)_: e.g. `"Josh Goldberg"`
- `--description` _(`string`)_: e.g. `"A quickstart-friendly TypeScript template with comprehensive formatting, linting, releases, testing, and other great tooling built-in. ✨"`
- `--email` _(`string`)_: e.g. `"git@joshuakgoldberg.com"`
- `--funding` _(`string`, optional)_: e.g. `"JoshuaKGoldberg"`
- `--owner` _(`string`)_: e.g. `"JoshuaKGoldberg"`
- `--repository` _(`string`)_: e.g. `"template-typescript-node-package"`
- `--title` _(`string`)_: e.g. `"Template TypeScript Node Package"`

For example, providing a `funding` value different from the `author`:

```shell
npx template-typescript-node-package --funding MyOrganization
```

The migration script by default will include all the features in this template.
You can disable some of them on the command-line:

- `releases` _(`boolean`)_: Whether to include automated package publishing
- `unitTests` _(`boolean`)_: Whether to include unit tests with code coverage tracking

```shell
npx template-typescript-node-package --releases false --unitTests false
```

After the migration script finishes aligning your repository's contents to the templates, it will call the [Initialization](./Initialization.md) script as well.
It will forward any values you provided or it inferred from the repository.

### Skipping API Calls

You can prevent the migration script from making some network-based changes using any or all of the following CLI flags:

- `--skip-contributors` _(`boolean`)_: Skips detecting existing contributors with [`all-contributors-for-repository`](https://github.com/JoshuaKGoldberg/all-contributors-for-repository)
- `--skip-github-api` _(`boolean`)_: Skips calling to GitHub APIs
- `--skip-install` _(`boolean`)_: Skips installing all the new template packages with `pnpm`

```shell
npx template-typescript-node-package --skip-github-api --skip-install
```

> Tip: the `--skip-github-api` flag will cause all changes to be limited to your local repository.
> That means you can test out the script with `npx template-typescript-node-package --skip-github-api`, then `git add -A; git reset --hard HEAD` to completely reset all changes.
