# Examples

`create-typescript-app` can be used to create common kinds of single-repository TypeScript projects.
Most need only the default blocks, while some benefit from adding or excluding a few blocks.

This page lists common kinds of projects, example repositories of each, and what's unique to setting each one up.
A project can be more than one kind: for example, [tidelift-me-up](https://github.com/JoshuaKGoldberg/tidelift-me-up) is both a CLI and a library.

> [!TIP]
> Adding and excluding blocks is done in a `create-typescript-app.config.js` file.
> See [Configuration Files](./Configuration%20Files.md) for how to set one up.

## Browser Extension

Examples:

- [refined-saved-replies](https://github.com/JoshuaKGoldberg/refined-saved-replies)

Browser extensions are built with [esbuild](https://esbuild.github.io) and packaged with [`web-ext`](https://github.com/mozilla/web-ext) rather than published to npm.
To create one:

- Add the [Web-ext block](./Blocks.md), which sets up `pnpm dev`, `pnpm build`, and `pnpm lint:web-ext` scripts
- Exclude the Release It and TSDown blocks, since the extension's `.zip` is uploaded to browser stores instead
- Add a [`manifest.json`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json) describing the extension

```js
import {
	blockReleaseIt,
	blockTSDown,
	blockWebExt,
	createConfig,
} from "create-typescript-app";

export default createConfig({
	refinements: {
		blocks: {
			add: [blockWebExt],
			exclude: [blockReleaseIt, blockTSDown],
		},
	},
});
```

If your extension's tests touch the DOM, consider also setting [Vitest's `environment`](https://vitest.dev/config/#environment) to `"happy-dom"` with a `blockVitest({ environment: "happy-dom" })` addon.

## CLI

Examples:

- [github-username-to-emails](https://github.com/JoshuaKGoldberg/github-username-to-emails)
- [tidelift-me-up](https://github.com/JoshuaKGoldberg/tidelift-me-up)

CLIs are published to npm like libraries, with an added [`"bin"` in `package.json`](https://docs.npmjs.com/cli/configuring-npm/package-json#bin) so they can be run with `npx`.
To create one, pass a [`--bin`](./CLI.md) value:

```shell
npx create-typescript-app --bin bin/index.js
```

See [FAQs > How can I use `bin`?](./FAQs.md#how-can-i-use-bin) for more details.

## Framework Plugin

Examples:

- [eslint-plugin-expect-type](https://github.com/JoshuaKGoldberg/eslint-plugin-expect-type)
- [prettier-plugin-curly](https://github.com/JoshuaKGoldberg/prettier-plugin-curly)

Framework plugins are libraries that a specific tool such as ESLint or Prettier loads.

- ESLint plugins can add the [ESLint Plugin block](./Blocks.md), which sets up [`eslint-doc-generator`](https://github.com/bmish/eslint-doc-generator) to generate rule docs
- Some frameworks still load plugins with CommonJS `require`, in which case you may want to [add dual CommonJS / ECMAScript Modules emit](./FAQs.md#how-can-i-add-dual-commonjs--ecmascript-modules-emit)
- If the repository uses its own plugin on itself, its build needs to run before that tool; for example, prettier-plugin-curly adds a `blockPrettier({ runBefore: ["pnpm build --no-dts"] })` addon

## GitHub Action

Examples:

- [all-contributors-auto-action](https://github.com/JoshuaKGoldberg/all-contributors-auto-action)
- [schemar](https://github.com/johnnyreilly/schemar)

GitHub Actions are run from a bundled `dist/` committed to the repository rather than published to npm.
To create one:

- Add the [ncc block](./Blocks.md), which bundles with [`@vercel/ncc`](https://github.com/vercel/ncc) and verifies in CI that the committed `dist/` is up to date
- Exclude the TSDown block, since ncc builds the output instead
- Add an [`action.yml` metadata file](https://docs.github.com/en/actions/sharing-automations/creating-actions/metadata-syntax-for-github-actions) describing the action's inputs and outputs

```js
import { blockNcc, blockTSDown, createConfig } from "create-typescript-app";

export default createConfig({
	refinements: {
		blocks: {
			add: [blockNcc],
			exclude: [blockTSDown],
		},
	},
});
```

See [FAQs > Can I create a GitHub action?](./FAQs.md#can-i-create-a-github-action) for more details.

## Library

Examples:

- [are-docs-informative](https://github.com/JoshuaKGoldberg/are-docs-informative)
- [tidelift-me-up](https://github.com/JoshuaKGoldberg/tidelift-me-up)

Libraries are what `create-typescript-app` sets up by default: a package built with [tsdown](https://tsdown.dev) and published to npm with [release-it](https://github.com/release-it/release-it).
No extra configuration is needed.

See [FAQs > How do I publish a new package for the first time?](./FAQs.md#how-do-i-publish-a-new-package-for-the-first-time) for getting the first release out.

## Website

Examples:

- [github-username-to-emails-site](https://github.com/JoshuaKGoldberg/github-username-to-emails-site)
- [tidelift-me-up-site](https://github.com/JoshuaKGoldberg/tidelift-me-up-site)

Websites are built and served by a web framework such as [Next.js](https://nextjs.org) or [Remix](https://remix.run), and deployed to a hosting provider rather than published to npm.
`create-typescript-app` doesn't have blocks specific to any web framework, so:

- Exclude the Release It and TSDown blocks, since the framework builds the site and there's no package to publish
- Use the framework's own `build` and `dev` scripts, along with any framework-recommended configuration such as ESLint plugins
