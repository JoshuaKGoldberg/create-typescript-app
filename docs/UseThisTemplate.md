# Using the Template Repository

As an alternative to [creating with `npx create-typescript-app`](./Setup.md), the [_Use this template_](https://github.com/JoshuaKGoldberg/create-typescript-app/generate) button on GitHub can be used to quickly create a new repository from the template.
You can set up the new repository locally by cloning it and installing packages:

```shell
git clone https://github.com/YourUsername/YourRepositoryName
cd YourRepositoryName
npx create-typescript-app
```

You'll then need to set up a token, some GitHub apps, and npm publishing by hand.
See [Tokens and Apps](./TokensAndApps.md).

Your new repository will then be ready for development!
Hooray! 🥳

## CLI Options

You can customize which pieces of tooling are provided and the options they're created with.
See [CLI.md](./CLI.md).

For example, skipping the _"This package was templated with..."_ block:

```shell
npx create-typescript-app --exclude-templated-with
```

See [Blocks.md](./Blocks.md) for details on the tooling pieces and which presets they're included in.
