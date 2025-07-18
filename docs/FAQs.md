# FAQs

## Do you have a guide to working with a `create-typescript-app` repository?

Yes!
See [Contributing to a create-typescript-app Repository](https://www.joshuakgoldberg.com/blog/contributing-to-a-create-typescript-app-repository).
It'll walk you through the common activities you'll need to contribute to a repository scaffolded with `create-typescript-app`.

## Can I use _(insert tool here)_ with this template?

Yes!
After you set up a repository, you can substitute in any tools you'd like.

If you think the tool would be broadly useful to most consumers of this template, feel free to [file a feature request](https://github.com/JoshuaKGoldberg/create-typescript-app/issues/new?assignees=&labels=type%3A+feature&projects=&template=03-feature.yml&title=%F0%9F%9A%80+Feature%3A+%3Cshort+description+of+the+feature%3E) to add it in.

## Can I create a GitHub action?

Yes! If you want to read the [GitHub Actions documentation](https://docs.github.com/en/actions/creating-actions) in detail.
Here we'll outline the steps required to migrate a CTA app to a GitHub Action:

1. GitHub Actions store built output on a GitHub branch rather than in a published package on npm.
   As a consequence we should:
   - delete `.github/workflows/release.yml` and `.github/workflows/post-release.yml`.
   - update `.github/workflows/build.yml` to ensure `dist` is up to date:

     <details>
         <summary><code>.github/workflows/build.yml</code></summary>

     ```yml
     jobs:
       build:
         runs-on: ubuntu-latest
         steps:
           - uses: actions/checkout@v4
           - uses: ./.github/actions/prepare
           - run: pnpm build

           - name: Compare dist/index.js
             run: |
               if [ "$(git diff --ignore-space-at-eol --text dist/index.js | wc -l)" -gt "0" ]; then
                 echo "Detected uncommitted changes after build."
                 echo "You may need to run 'pnpm run build' locally and commit the changes."
                 echo ""
                 echo "See diff below:"
                 echo ""
                 git diff --ignore-space-at-eol --text dist/index.js
                 echo ""
                 # say this again in case the diff is long
                 echo "You may need to run 'pnpm run build' locally and commit the changes."
                 echo ""
                 exit 1
               fi

     name: Build

     on:
       pull_request: ~
       push:
         branches:
           - main

     permissions:
       contents: read
     ```

      </details>

   - GitHub Actions run without installing package dependencies.
     Replace `tsdown` with [`ncc`](https://github.com/vercel/ncc) to build source files and dependencies into a single JS file.
     Delete `tsdown.config.ts` then execute the following commands:

   ```bash
   pnpm remove tsdown
   pnpm add @vercel/ncc -D
   ```
   - Now we need to update the `build` script in our `package.json`:

   ```diff
   -"build": "tsdown",
   +"build": "ncc build src/index.ts -o dist --license licenses.txt",
   ```
   - Our build now emits to the `dist` directory; so we'll want to avoid linting that directory by adding the following to `.eslintignore` and our `.prettierignore`:

   ```diff
   +dist
   ```
   - Rather than having to remember to compile each time, we'll update our pre-commit hook in `.husky/pre-commit` to build for us on each commit:

   ```diff
   +pnpm run build
   +git add dist
   npx lint-staged
   ```

2. Create an [`action.yml` metadata file](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action#creating-an-action-metadata-file).

It's worth reading the [GitHub Actions documentation](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action#writing-the-action-code).

## How can I add dual CommonJS / ECMAScript Modules emit?

First, I'd suggest reading [TypeScript Handbook > Modules - Introduction](https://www.typescriptlang.org/docs/handbook/modules/introduction.html) to understand how CommonJS (CJS) and ECMAScript (ESM) came to be.

Then:

1. In `tsdown.config.ts`, change the [tsdown `format` option](https://tsdown.dev/options/output-format) from `["esm"]` to `["cjs", "esm"]`
2. Add a [`package.json` `"exports"` entry](https://nodejs.org/api/packages.html#subpath-exports) like:

   <!-- eslint-disable jsonc/sort-keys -->

   ```json package.json
   {
   	"exports": {
   		".": {
   			"types": {
   				"import": "lib/index.d.ts",
   				"require": "lib/index.d.cts"
   			},
   			"import": "lib/index.js",
   			"require": "lib/index.cjs"
   		}
   	}
   }
   ```

   <!-- eslint-enable jsonc/sort-keys -->

That should be it!

To be safe, consider checking with [arethetypeswrong](https://arethetypeswrong.github.io):

1. Run `pnpm build`
2. Run `npm pack`
3. Upload that generated `.tgz` file to [arethetypeswrong.github.io](https://arethetypeswrong.github.io)

### Why doesn't `create-typescript-app` have an option to dual emit CJS and ESM?

Dual CJS/ESM emit is a stopgap solution while the JavaScript ecosystem migrates towards full ESM support in most-to-all popular user packages.
Most packages newly created with `create-typescript-app` should target just ESM by default.

Some packages published with `create-typescript` legitimately need dual CJS/ESM output because they're used by frameworks that don't yet fully support ESM.
That's reasonable.

Unless you know a package needs to support a CJS consumer, please strongly consider keeping it ESM-only (the `create-typescript-app` default).
ESM-only packages have a smaller footprint by virtue of including fewer files.

## What about `eslint-config-prettier`?

[`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier) is an ESLint plugin that serves only to turn off all rules that are unnecessary or might conflict with formatters such as Prettier.
None of the ESLint configs enabled by this repository's tooling leave any rules enabled that would need to be disabled.
Using `eslint-config-prettier` would be redundant.

## What determines which preset a tool goes into?

The four presets correspond to what have seemed to be the most common user needs of template consumers:

1. **Minimal**: Developers who just want the barest of starting templates.
   - They may be very new to TypeScript tooling, or they may have made an informed decision that the additional tooling isn't worth the complexity and/or time investment.
   - Tooling in this preset is only what would be essential for a small TypeScript package that can be built, formatted, linted, and released.
2. **Common**: The common case of users who want the minimal tooling along with common repository management.
   - Tooling added in this preset should be essential for a TypeScript repository that additionally automates useful GitHub tasks: contributor recognition, release management, and testing.
3. **Everything**: Power users (including this repository) who want as much of the latest and greatest safety checks and standardization as possible.

Note that you can always customize exactly which preset you use per [CLI](./CLI.md).

## Why does this package include so many tools?

This repository is meant to serve as a starter that includes all the general tooling a modern TypeScript/Node repository could possibly need.
Each of the included tools exists for a good reason and provides real value.

If you don't want to use any particular tool, you can always remove it manually.

## Why tabs?

This repository template configures `"useTabs": true` in the root-level `.prettierrc.json`.
It does so because tabs have been phrased by the community as generally better for accessibility:

- <https://github.com/11ty/eleventy/issues/3098>
- <https://github.com/prettier/prettier/issues/7475>

Note that those points on tabs over spaces have generally been made by accessibility-experienced _individuals_ rather than accessibility-focused _organizations_.
If you know of any accessibility organization that's published more formal recommendations or research, please do file an issue here for this FAQ entry to be updated.

You can adjust the tab size that GitHub uses to display files from your [account settings page](https://github.com/settings/appearance#tab-size-heading) (the default is 8 spaces).

If you really want spaces in your project you can always remove the `"useTabs": true`.

## How can I use `bin`?

The `--bin` option allows you to create a `package.json` bin value to include for npx-style running.
An example of this would be `"bin/index.js"`.
You'll need to create the folders and files that `bin` references.

If you'd like an example of what that looks like, take a look at the [CTA source code](https://github.com/JoshuaKGoldberg/create-typescript-app/blob/e7fafcb8968f8f6c551ab0917c9a6a849a3cba28/bin/index.js)!
