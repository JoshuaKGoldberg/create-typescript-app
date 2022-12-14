# Development

After [forking the repo from GitHub](https://help.github.com/articles/fork-a-repo) and [installing pnpm](https://pnpm.io/installation):

```shell
git clone https://github.com/<your-name-here>/template-typescript-node-package
cd template-typescript-node-package
pnpm install
```

> This repository includes a list of suggested VS Code extensions.
> It's a good idea to use [VS Code](https://code.visualstudio.com) and accept its suggestion to install them, as they'll help with development.

## Building

Run [TypeScript](https://typescriptlang.org) locally to type check and build source files from `src/` into output files in `lib/`:

```shell
pnpm build --watch
```

You should also see suggestions from TypeScript in your editor.

## Formatting

[Prettier](https://prettier.io) is used to format code.
It should be applied automatically when you save files in VS Code or make a Git commit.

## Linting

This package includes several forms of linting to enforce consistent code quality and styling.
Each should be shown in VS Code, and can be run manually on the command-line:

- `pnpm lint` ([ESLint](https://eslint.org) with [typescript-eslint](https://typescript-eslint.io)): Lints JavaScript and TypeScript source files
- `pnpm lint:md` ([Markdownlint](https://github.com/DavidAnson/markdownlint)): Checks Markdown source files
- `pnpm lint:package` ([npm-package-json-lint](https://npmpackagejsonlint.org/)): Lints the `package.json` file
- `pnpm lint:packages` ([pnpm-deduplicate](https://github.com/ocavue/pnpm-deduplicate)): Deduplicates packages in the `pnpm-lock.yml` file
- `pnpm lint:prune` ([ts-prune](https://github.com/nadeesha/ts-prune)): Detects unused exports in TypeScript source files
- `pnpm lint:spelling` ([cspell](https://cspell.org)): Spell checks across all source files

## Testing

[Vitest](https://vitest.dev) is used for tests.
You can run it locally on the command-line:

```shell
pnpm run test
```

Add the `--coverage` flat to compute test coverage and place reports in the `coverage/` directory:

```shell
pnpm run test --coverage
```
