# Opt-Outs

The setup scripts can be directed with CLI flags to opt out tooling portions and/or using API calls.

> This page uses `npx template-typescript-node-package` in its code examples, but `pnpm run initialize` and `pnpm run migrate` work the same.

## Excluding Tooling Portions

The setup scripts normally will prompt you to select how much of the tooling you'd like to enable in a new repository.
Alternately, you can bypass that prompt by providing any number of the following CLI flags:

- `--exclude-compliance`: Don't add a GitHub Actions workflow to verify that PRs match an expected format.
- `--exclude-contributors`: Don't add all-contributors to track contributions and display them in a README.md table.
- `--exclude-lint-json`: Don't apply linting and sorting to `*.json` and `*.jsonc` files.
- `--exclude-lint-knip`: Don't add Knip to detect unused files, dependencies, and code exports.
- `--exclude-lint-md`: Don't apply linting to `*.md` files.
- `--exclude-lint-package`: Don't add npm-package-json-lint to lint for package.json correctness.
- `--exclude-lint-packages`: Don't add a pnpm dedupe workflow to ensure packages aren't duplicated unnecessarily.
- `--exclude-lint-perfectionist`: Don't apply eslint-plugin-perfectionist to ensure imports, keys, and so on are in sorted order.
- `--exclude-lint-spelling`: Don't add cspell to spell check against dictionaries of known words.
- `--exclude-lint-yml`: Don't apply linting and sorting to `*.yaml` and `*.yml` files.
- `--exclude-releases`: Don't add release-it to generate changelogs, package bumps, and publishes based on conventional commits.
- `--exclude-renovate`: Don't add a Renovate config to dependencies up-to-date with PRs.
- `--exclude-tests`: Don't add Vitest tooling for fast unit tests, configured with coverage tracking.

For example, initializing with all tooling except for `package.json` checks and Renovate:

```shell
npx template-typescript-node-package --exclude-lint-package --exclude-lint-packages --exclude-renovate
```

## Skipping API Calls

You can prevent the migration script from making some network-based changes using any or all of the following CLI flags:

- `--skip-contributors-data`: Skips network calls that fetch all-contributors data from GitHub
  - This flag does nothing if `--exclude-contributors` was specified.
- `--skip-github-api` _(`boolean`)_: Skips calling to GitHub APIs.
- `--skip-install` _(`boolean`)_: Skips installing all the new template packages with `pnpm`.

For example, providing all three flags will completely skip all network requests:

```shell
npx template-typescript-node-package --skip-contributors-data --skip-github-api --skip-install
```

> 💡 Tip: To temporarily preview what the script would apply, you can run with all `--skip-*` flags, then `git add -A; git reset --hard HEAD` to completely reset all changes.
