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

To manually reformat all files, you can run:

```shell
pnpm format:write
```

## Linting

This package includes several forms of linting to enforce consistent code quality and styling.
Each should be shown in VS Code, and can be run manually on the command-line:

- `pnpm lint:knip` ([knip](https://github.com/webpro/knip)): Detects unused files, dependencies, and code exports
- `pnpm lint:md` ([Markdownlint](https://github.com/DavidAnson/markdownlint)): Checks Markdown source files
- `pnpm lint:package` ([npm-package-json-lint](https://npmpackagejsonlint.org/)): Lints the `package.json` file
- `pnpm lint:packages` ([pnpm dedupe --check](https://pnpm.io/cli/dedupe)): Checks for unnecessarily duplicated packages in the `pnpm-lock.yml` file
- `pnpm lint:spelling` ([cspell](https://cspell.org)): Spell checks across all source files
- `pnpm lint` ([ESLint](https://eslint.org) with [typescript-eslint](https://typescript-eslint.io)): Lints JavaScript and TypeScript source files

## Testing

[Vitest](https://vitest.dev) is used for tests.
You can run it locally on the command-line:

```shell
pnpm run test
```

Add the `--coverage` flag to compute test coverage and place reports in the `coverage/` directory:

```shell
pnpm run test --coverage
```

Note that [console-fail-test](https://github.com/JoshuaKGoldberg/console-fail-test) is enabled for all test runs.
Calls to `console.log`, `console.warn`, and other console methods will cause a test to fail.

### Debugging Tests

This repository includes a [VS Code launch configuration](https://code.visualstudio.com/docs/editor/debugging) for debugging unit tests.
To launch it, open a test file, then run _Debug Current Test File_ from the VS Code Debug panel (or press F5).

## The Hydration Script

This template's "hydration" script is located in `src/hydrate/`.
It needs to be [built](#building) before it can be run.

Be warned that running the hydration script in a repository -including this one- will modify that repository.
To test out the script, you may want to create a new test repository to run on:

```shell
cd ..
mkdir temp
cd temp
echo node_modules > .gitignore
git init
npm init --yes
```

Then, in that directory, you can directly call the hydration script:

```shell
node ../template-typescript-node-package/lib/hydrate/index.js -- description "Hooray, trying things out locally."
```

Along with the hydration script itself, end-to-end tests are removed on package setup.

## The Setup Script

This template's "setup" script is located in `script/`.

### Testing the Setup Script

This template source includes an "end-to-end" test for `script/setup.js`.
You can run it locally on the command-line:

```shell
pnpm run setup:test
```

That end-to-end test executes `script/setup-test-e2e.js`, which:

1. Runs the setup script using `--skip-api`
2. Checks that the local repository's files were changed correctly (e.g. removed setup-only files)

Along with the setup script itself, end-to-end tests are removed on package setup.
