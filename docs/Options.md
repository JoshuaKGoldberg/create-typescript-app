# Options

`create-typescript-app` is built on top of [Bingo](https://create.bingo).
It supports all the flags supported by [Bingo CLIs](https://www.create.bingo/cli).

`npx create-typescript-app` provides three `--preset` options:

1. **Minimal**: Just bare starter tooling: building, formatting, linting, and type checking.
2. **Common**: Bare starters plus testing and automation for all-contributors and releases.
3. **Everything**: The most comprehensive tooling imaginable: sorting, spellchecking, and more!

For example, to create a new repository with the _Everything_ preset:

```shell
npx create-typescript-app --preset everything
```

`create-typescript-app` itself adds in two sections of flags:

- [Base Options](#base-options)
- [Block Exclusions](#block-exclusions)

## Base Options

Per [Bingo > CLI > Template Options](https://www.create.bingo/cli#template-options), options defined by `create-typescript-app` may be provided on the CLI.

### Required Base Options

These options can only be inferred when running on an existing repository.
Each will be prompted for when creating a new repository if not explicitly provided:

- `--description` _(`string`)_: 'Sentence case.' description of the repository
- `--directory` _(`string`)_: which directory and repository name to use

For example, pre-populating all required base options:

```shell
npx create-typescript-app --directory my-typescript-app --description "My awesome TypeScript app! 💖" --preset everything
```

That script will run completely autonomously, no prompted inputs required. ✨

### Optional Base Options

These optional options do not need to be provided explicitly.
They will be inferred from the running user, and if migrating an existing repository, its files on disk.

- `--access` _(`"public" | "restricted"`)_: Which [`npm publish --access`](https://docs.npmjs.com/cli/commands/npm-publish#access) to release npm packages with (by default, `"public"`)
- `--author` _(`string`)_: Username on npm to publish packages under (by default, an existing npm author, or the currently logged in npm user, or `owner.toLowerCase()`)
- `--bin` _(`string`)_: Value to set in `package.json`'s `"bin"` property, per [FAQs > How can I use `bin`?](./FAQs.md#how-can-i-use-bin)
- `--repository` _(`string`)_: Name for the new repository (by default, the same as `--directory`)
- `--email` _(`string`)_: Email address to be listed as the point of contact in docs and packages (e.g. `example@joshuakgoldberg.com`)
- `--funding` _(`string`)_: GitHub organization or username to mention in `funding.yml` (by default, `owner`)
- `--keywords` _(`string[]`)_: Any number of keywords to include in `package.json` (by default, none)
  - This can be specified any number of times, like `--keywords apple --keywords "banana cherry"`
- `--title` _(`string`)_: 'Title Case' title for the repository (by default, based on the repository name)

For example, customizing the npm author and funding source:

```shell
npx create-typescript-app --author my-npm-username --funding MyGitHubOrganization
```

## Block Exclusions

Per [Bingo > Stratum > Configurations > `blocks`](https://www.create.bingo/engines/stratum/details/configurations#blocks), individual Blocks may be excluded from running.
For example, initializing with all tooling except for Renovate:

```shell
npx create-typescript-app --exclude-renovate
```

See [Blocks.md](./Blocks.md) for the list of blocks and their corresponding presets.
