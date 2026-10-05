# Setup Mode

You can run `npx create-typescript-app` in your terminal to interactively create a new repository:

```shell
npx create-typescript-app
```

The setup script will by default:

1. Prompt you for a directory, which template preset to run with, and some starting information
2. Initialize new directory as a local Git repository
3. Copy the template's files to that directory
4. Create a new repository on GitHub and set it as the local repository's upstream
5. Configure relevant settings on the GitHub repository

You'll then need to set up a token, some GitHub apps, and npm publishing by hand.
See [Tokens and Apps](./TokensAndApps.md).

Your new repository will then be ready for development!
Hooray! 🥳

## Options

You can customize which pieces of tooling are provided and the options they're created with.
See [CLI.md](./CLI.md).

For example, skipping the _"This package was templated with..."_ block:

```shell
npx create-typescript-app --mode create --exclude-templated-with
```

See [Blocks.md](./Blocks.md) for details on the tooling pieces and which presets they're included in.
