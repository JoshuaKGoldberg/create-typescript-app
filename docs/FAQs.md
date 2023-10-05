# FAQs

## Can I use _(insert tool here)_ with this template?

Yes!
After you set up a repository, you can substitute in any tools you'd like.

If you think the tool would be broadly useful to most consumers of this template, feel free to [file a feature request](https://github.com/JoshuaKGoldberg/create-typescript-app/issues/new?assignees=&labels=type%3A+feature&projects=&template=03-feature.yml&title=%F0%9F%9A%80+Feature%3A+%3Cshort+description+of+the+feature%3E) to add it in.

## Is there a way to pull in template updates to previously created repositories?

Not directly.
You can always copy & paste them in manually, and/or re-run `npx create-typescript-app --mode migrate`.

See [🚀 Feature: Add a script to sync the tooling updates from forked template repo #498](https://github.com/JoshuaKGoldberg/create-typescript-app/issues/498): it will likely eventually be possible.

### What about `eslint-config-prettier`?

[`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier) is an ESLint plugin that serves only to turn off all rules that are unnecessary or might conflict with formatters such as Prettier.
None of the ESLint configs enabled by this repository's tooling leave any rules enabled that would need to be disabled.
Using `eslint-config-prettier` would be redundant.

### What determines which "base" a tool goes into?

The four bases correspond to what have seemed to be the most common user needs of template consumers:

1. **Minimum**: Developers who just want the barest of starting templates.
   - They may be very new to TypeScript tooling, or they may have made an informed decision that the additional tooling isn't worth the complexity and/or time investment.
   - Tooling in this base is only what would be essential for a small TypeScript package that can be built, formatted, linted, and released.
2. **Common**: The common case of users who want the minimum tooling along with common repository management.
   - Tooling added in this base should be essential for a TypeScript repository that additionally automates useful GitHub tasks: contributor recognition, release management, and testing.
3. **Everything**: Power users (including this repository) who want as much of the latest and greatest safety checks and standardization as possible.

Note that users can always customize exactly with portions are kept in with `--base` **`prompt`**.

### Which tools can't I remove?

The following pieces of this template's tooling don't have options to be removed:

- Linting with ESLint and `pnpm run lint`
- GitHub repository metadata such as the code of conduct and issue templates
- Prettier and `pnpm run format`
- tsup and `pnpm run build`
- TypeScript and `pnpm run tsc`

If you have a strong desire to add an `--exclude-*` flag for any of them, please do [file a feature request](https://github.com/JoshuaKGoldberg/create-typescript-app/issues/new?assignees=&labels=type%3A+feature&projects=&template=03-feature.yml&title=%F0%9F%9A%80+Feature%3A+%3Cshort+description+of+the+feature%3E).

## Why does this package include so many tools?

This repository is meant to serve as a starter that includes all the general tooling a modern TypeScript/Node repository could possibly need.
Each of the included tools exists for a good reason and provides real value.

If you don't want to use any particular tool, you can always remove it manually.

### What tooling does this package use that isn't part of created repositories?

Glad you asked!
These are the projects used across many parts of `create-typescript-app`:

- [Chalk](https://github.com/chalk/chalk): Makes it easier to print colored characters in the terminal.
- [Clack](https://www.clack.cc): Provides interactive terminal prompts and loading spinners.
- [execa](https://github.com/sindresorhus/execa): Makes it easier to run child processes.
- [Octokit](https://github.com/octokit/octokit.js#octokitjs):
- [tsx](https://github.com/esbuild-kit/tsx): Quickly runs TypeScript files with ESBuild.
- [Zod](https://zod.dev): TypeScript-first schema validation with static type inference.
