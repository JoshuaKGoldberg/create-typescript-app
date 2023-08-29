# FAQs

## Can I use _(insert tool here)_ with this template?

Yes!
After you set up a repository, you can substitute in any tools you'd like.

If you think the tool would be broadly useful to most consumers of this template, feel free to [file a feature request](https://github.com/JoshuaKGoldberg/create-typescript-app/issues/new?assignees=&labels=type%3A+feature&projects=&template=03-feature.yml&title=%F0%9F%9A%80+Feature%3A+%3Cshort+description+of+the+feature%3E) to add it in.

## Is there a way to pull in template updates to previously created repositories?

Not yet.
You can always copy & paste them in manually.

See [🚀 Feature: Add a script to sync the tooling updates from forked template repo #498](https://github.com/JoshuaKGoldberg/create-typescript-app/issues/498): it will likely eventually be possible.

## Why does this package include so many tools?

This repository is meant to serve as a starter that includes all the general tooling a modern TypeScript/Node repository could possibly need.
Each of the included tools exists for a good reason and provides real value.

If you don't want to use any particular tool, you can always remove it manually.

### Which tools can't I remove?

The following pieces of this template's tooling don't have options to be removed:

- Linting with ESLint and `pnpm run lint`
- GitHub repository metadata such as the code of conduct and issue templates
- Prettier and `pnpm run format`
- tsup and `pnpm run build`
- TypeScript and `pnpm run tsc`

If you have a strong desire to add an `--exclude-*` flag for any of them, please do [file a feature request](https://github.com/JoshuaKGoldberg/create-typescript-app/issues/new?assignees=&labels=type%3A+feature&projects=&template=03-feature.yml&title=%F0%9F%9A%80+Feature%3A+%3Cshort+description+of+the+feature%3E).
