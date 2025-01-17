# Options

`create-typescript-app` is built on top of [`create`](https://create.bingo).
`npx create typescript-app@beta` supports all the flags defined by the [`create` CLI](https://www.create.bingo/cli).
It provides three Presets:

1. **Minimal**: Just bare starter tooling: building, formatting, linting, and type checking.
2. **Common**: Bare starters plus testing and automation for all-contributors and releases.
3. **Everything**: The most comprehensive tooling imaginable: sorting, spellchecking, and more!

For example, to create a new repository on the _everything_ preset:

```shell
npx create typescript-app@beta --preset everything
```

`create-typescript-app` itself adds in two sections of flags:

- [Base Options](#base-options)
- [Block Exclusions](#block-exclusions)

## Base Options

Per [`create` > CLI > Template Options](https://www.create.bingo/cli#template-options), options defined by `create-typescript-app` may be provided on the CLI.

### Required Base Options

These options can only be inferred when running on an existing repository.
Each will be prompted for when creating a new repository if not explicitly provided:

- `--description` _(`string`)_: 'Sentence case.' description of the repository
- `--title` _(`string`)_: 'Title Case' title for the repository

For example, pre-populating both required base options:

```shell
npx create typescript-app@beta --description "My awesome TypeScript app! 💖" --title "My TypeScript App"
```

That script will run completely autonomously, no prompted inputs required. ✨

### Optional Base Options

These optional options do not need to be provided explicitly.
They will be inferred from the running user, and if migrating an existing repository, its files on disk.

- `--access` _(`"public" | "restricted"`)_: Which [`npm publish --access`](https://docs.npmjs.com/cli/commands/npm-publish#access) to release npm packages with (by default, `"public"`)
- `--author` _(`string`)_: Username on npm to publish packages under (by default, an existing npm author, or the currently logged in npm user, or `owner.toLowerCase()`)
- `--bin` _(`string`)_: Value to set in `package.json`'s `"bin"` property, per [FAQs > How can I use `bin`?](./FAQs.md#how-can-i-use-bin)
- `--directory` _(`string`)_: Directory to create the repository in (by default, the same name as the repository)
- `--email` _(`string`)_: Email address to be listed as the point of contact in docs and packages (e.g. `example@joshuakgoldberg.com`)
- `--funding` _(`string`)_: GitHub organization or username to mention in `funding.yml` (by default, `owner`)
- `--keywords` _(`string[]`)_: Any number of keywords to include in `package.json` (by default, none)
  - This can be specified any number of times, like `--keywords apple --keywords "banana cherry"`

For example, customizing the npm author and funding source:

```shell
npx create typescript-app@beta --author my-npm-username --funding MyGitHubOrganization
```

## Block Exclusions

Per [`create` > CLI > Template Options > Block Exclusions](https://www.create.bingo/cli#block-exclusions), individual Blocks may be excluded from running.
For example, initializing with all tooling except for Renovate:

```shell
npx create typescript-app@beta --exclude-renovate
```

See [Blocks.md](./Blocks.md) for the list of blocks and their corresponding presets.
