/* spellchecker: disable */
import { RepositorySettings } from "../../repositorySettings.js";
import { formatYaml } from "../formatters/formatYaml.js";

export function createDotGitHubFiles({
	email,
	funding,
	owner,
	repository,
}: Pick<RepositorySettings, "email" | "funding" | "owner" | "repository">) {
	return {
		"CODE_OF_CONDUCT.md": `# Contributor Covenant Code of Conduct

## Our Pledge

We as members, contributors, and leaders pledge to make participation in our
community a harassment-free experience for everyone, regardless of age, body
size, visible or invisible disability, ethnicity, sex characteristics, gender
identity and expression, level of experience, education, socio-economic status,
nationality, personal appearance, race, caste, color, religion, or sexual
identity and orientation.

We pledge to act and interact in ways that contribute to an open, welcoming,
diverse, inclusive, and healthy community.

## Our Standards

Examples of behavior that contributes to a positive environment for our
community include:

- Demonstrating empathy and kindness toward other people
- Being respectful of differing opinions, viewpoints, and experiences
- Giving and gracefully accepting constructive feedback
- Accepting responsibility and apologizing to those affected by our mistakes,
and learning from the experience
- Focusing on what is best not just for us as individuals, but for the overall
community

Examples of unacceptable behavior include:

- The use of sexualized language or imagery, and sexual attention or advances of
any kind
- Trolling, insulting or derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information, such as a physical or email address,
without their explicit permission
- Other conduct which could reasonably be considered inappropriate in a
professional setting

## Enforcement Responsibilities

Community leaders are responsible for clarifying and enforcing our standards of
acceptable behavior and will take appropriate and fair corrective action in
response to any behavior that they deem inappropriate, threatening, offensive,
or harmful.

Community leaders have the right and responsibility to remove, edit, or reject
comments, commits, code, wiki edits, issues, and other contributions that are
not aligned to this Code of Conduct, and will communicate reasons for moderation
decisions when appropriate.

## Scope

This Code of Conduct applies within all community spaces, and also applies when
an individual is officially representing the community in public spaces.
Examples of representing our community include using an official e-mail address,
posting via an official social media account, or acting as an appointed
representative at an online or offline event.

## Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported to the community leaders responsible for enforcement at
${email}.
All complaints will be reviewed and investigated promptly and fairly.

All community leaders are obligated to respect the privacy and security of the
reporter of any incident.

## Enforcement Guidelines

Community leaders will follow these Community Impact Guidelines in determining
the consequences for any action they deem in violation of this Code of Conduct:

### 1. Correction

**Community Impact**: Use of inappropriate language or other behavior deemed
unprofessional or unwelcome in the community.

**Consequence**: A private, written warning from community leaders, providing
clarity around the nature of the violation and an explanation of why the
behavior was inappropriate. A public apology may be requested.

### 2. Warning

**Community Impact**: A violation through a single incident or series of
actions.

**Consequence**: A warning with consequences for continued behavior. No
interaction with the people involved, including unsolicited interaction with
those enforcing the Code of Conduct, for a specified period of time. This
includes avoiding interactions in community spaces as well as external channels
like social media. Violating these terms may lead to a temporary or permanent
ban.

### 3. Temporary Ban

**Community Impact**: A serious violation of community standards, including
sustained inappropriate behavior.

**Consequence**: A temporary ban from any sort of interaction or public
communication with the community for a specified period of time. No public or
private interaction with the people involved, including unsolicited interaction
with those enforcing the Code of Conduct, is allowed during this period.
Violating these terms may lead to a permanent ban.

### 4. Permanent Ban

**Community Impact**: Demonstrating a pattern of violation of community
standards, including sustained inappropriate behavior, harassment of an
individual, or aggression toward or disparagement of classes of individuals.

**Consequence**: A permanent ban from any sort of public interaction within the
community.

## Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage],
version 2.1, available at
[https://www.contributor-covenant.org/version/2/1/code_of_conduct.html][v2.1].

Community Impact Guidelines were inspired by
[Mozilla's code of conduct enforcement ladder][mozilla coc].

For answers to common questions about this code of conduct, see the FAQ at
[https://www.contributor-covenant.org/faq][faq]. Translations are available at
[https://www.contributor-covenant.org/translations][translations].

[homepage]: https://www.contributor-covenant.org
[v2.1]: https://www.contributor-covenant.org/version/2/1/code_of_conduct.html
[mozilla coc]: https://github.com/mozilla/diversity
[faq]: https://www.contributor-covenant.org/faq
[translations]: https://www.contributor-covenant.org/translations
`,
		"CONTRIBUTING.md": `# Contributing

Thanks for your interest in contributing to \`${repository}\`! 💖

> After this page, see [DEVELOPMENT.md](./DEVELOPMENT.md) for local development instructions.

## Code of Conduct

This project contains a [Contributor Covenant code of conduct](./CODE_OF_CONDUCT.md) all contributors are expected to follow.

## Reporting Issues

Please do [report an issue on the issue tracker](https://github.com/${owner}/${repository}/issues/new/choose) if there's any bugfix, documentation improvement, or general enhancement you'd like to see in the repository! Please fully fill out all required fields in the most appropriate issue form.

## Sending Contributions

Sending your own changes as contribution is always appreciated!
There are two steps involved:

1. [Finding an Issue](#finding-an-issue)
2. [Sending a Pull Request](#sending-a-pull-request)

### Finding an Issue

With the exception of very small typos, all changes to this repository generally need to correspond to an [open issue marked as \`accepting prs\` on the issue tracker](https://github.com/${owner}/${repository}/issues?q=is%3Aopen+is%3Aissue+label%3A%22accepting+prs%22).
If this is your first time contributing, consider searching for [unassigned issues that also have the \`good first issue\` label](https://github.com/${owner}/${repository}/issues?q=is%3Aopen+is%3Aissue+label%3A%22accepting+prs%22+label%3A%22good+first+issue%22+no%3Aassignee).
If the issue you'd like to fix isn't found on the issue, see [Reporting Issues](#reporting-issues) for filing your own (please do!).

### Sending a Pull Request

Once you've identified an open issue accepting PRs that doesn't yet have a PR sent, you're free to send a pull request.
Be sure to fill out the pull request template's requested information -- otherwise your PR will likely be closed.

PRs are also expected to have a title that adheres to [commitlint](https://github.com/conventional-changelog/commitlint).
Only PR titles need to be in that format, not individual commits.
Don't worry if you get this wrong: you can always change the PR title after sending it.
Check [previously merged PRs](https://github.com/${owner}/${repository}/pulls?q=is%3Apr+is%3Amerged+-label%3Adependencies+) for reference.

#### Draft PRs

If you don't think your PR is ready for review, [set it as a draft](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/changing-the-stage-of-a-pull-request#converting-a-pull-request-to-a-draft).
Draft PRs won't be reviewed.

#### Granular PRs

Please keep pull requests single-purpose: in other words, don't attempt to solve multiple unrelated problems in one pull request.
Send one PR per area of concern.
Multi-purpose pull requests are harder and slower to review, block all changes from being merged until the whole pull request is reviewed, and are difficult to name well with semantic PR titles.

#### Pull Request Reviews

When a PR is not in draft, it's considered ready for review.
Please don't manually \`@\` tag anybody to request review.
A maintainer will look at it when they're next able to.

PRs should have passing [GitHub status checks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks) before review is requested (unless there are explicit questions asked in the PR about any failures).

#### Asking Questions

If you need help and/or have a question, posting a comment in the PR is a great way to do so.
There's no need to tag anybody individually.
One of us will drop by and help when we can.

Please post comments as [line comments](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/commenting-on-a-pull-request#adding-line-comments-to-a-pull-request) when possible, so that they can be threaded.
You can [resolve conversations](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/commenting-on-a-pull-request#resolving-conversations) on your own when you feel they're resolved - no need to comment explicitly and/or wait for a maintainer.

#### Requested Changes

After a maintainer reviews your PR, they may request changes on it.
Once you've made those changes, [re-request review on GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews#re-requesting-a-review).

Please try not to force-push commits to PRs that have already been reviewed.
Doing so makes it harder to review the changes.
We squash merge all commits so there's no need to try to preserve Git history within a PR branch.

Once you've addressed all our feedback by making code changes and/or started a followup discussion, [re-request review](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews#re-requesting-a-review) from each maintainer whose feedback you addressed.

Once all feedback is addressed and the PR is approved, we'll ensure the branch is up to date with \`main\` and merge it for you.

#### Post-Merge Recognition

Once your PR is merged, if you haven't yet been added to the [_Contributors_ table in the README.md](../README.md#contributors) for its [type of contribution](https://allcontributors.org/docs/en/emoji-key "Allcontributors emoji key"), you should be soon.
Please do ping the maintainer who merged your PR if that doesn't happen within 24 hours - it was likely an oversight on our end!
`,
		"DEVELOPMENT.md": `# Development

After [forking the repo from GitHub](https://help.github.com/articles/fork-a-repo) and [installing pnpm](https://pnpm.io/installation):

\`\`\`shell
git clone https://github.com/<your-name-here>/${repository}
cd ${repository}
pnpm install
\`\`\`

> This repository includes a list of suggested VS Code extensions.
> It's a good idea to use [VS Code](https://code.visualstudio.com) and accept its suggestion to install them, as they'll help with development.

## Building

Run [TypeScript](https://typescriptlang.org) locally to type check and build source files from \`src/\` into output files in \`lib/\`:

\`\`\`shell
pnpm build --watch
\`\`\`

You should also see suggestions from TypeScript in your editor.

## Formatting

[Prettier](https://prettier.io) is used to format code.
It should be applied automatically when you save files in VS Code or make a Git commit.

To manually reformat all files, you can run:

\`\`\`shell
pnpm format:write
\`\`\`

## Linting

This package includes several forms of linting to enforce consistent code quality and styling.
Each should be shown in VS Code, and can be run manually on the command-line:

- \`pnpm lint:knip\` ([knip](https://github.com/webpro/knip)): Detects unused files, dependencies, and code exports
- \`pnpm lint:md\` ([Markdownlint](https://github.com/DavidAnson/markdownlint)): Checks Markdown source files
- \`pnpm lint:package\` ([npm-package-json-lint](https://npmpackagejsonlint.org/)): Lints the \`package.json\` file
- \`pnpm lint:packages\` ([pnpm dedupe --check](https://pnpm.io/cli/dedupe)): Checks for unnecessarily duplicated packages in the \`pnpm-lock.yml\` file
- \`pnpm lint:spelling\` ([cspell](https://cspell.org)): Spell checks across all source files
- \`pnpm lint\` ([ESLint](https://eslint.org) with [typescript-eslint](https://typescript-eslint.io)): Lints JavaScript and TypeScript source files

## Testing

[Vitest](https://vitest.dev) is used for tests.
You can run it locally on the command-line:

\`\`\`shell
pnpm run test
\`\`\`

Add the \`--coverage\` flag to compute test coverage and place reports in the \`coverage/\` directory:

\`\`\`shell
pnpm run test --coverage
\`\`\`

Note that [console-fail-test](https://github.com/JoshuaKGoldberg/console-fail-test) is enabled for all test runs.
Calls to \`console.log\`, \`console.warn\`, and other console methods will cause a test to fail.

### Debugging Tests

This repository includes a [VS Code launch configuration](https://code.visualstudio.com/docs/editor/debugging) for debugging unit tests.
To launch it, open a test file, then run _Debug Current Test File_ from the VS Code Debug panel (or press F5).

### Testing the Setup Script

In addition to unit tests, this template also includes an "end-to-end" test for \`script/setup.js\`.
You can run it locally on the command-line:

\`\`\`shell
pnpm run setup:test
\`\`\`

That end-to-end test executes \`script/setup-test-e2e.js\`, which:

1. Runs the setup script using \`--skip-api\`
2. Checks that the local repository's files were changed correctly (e.g. removed setup-only files)

As with the setup script itself, end-to-end tests are removed on package setup.
		`,
		...(funding && { "FUNDING.yml": formatYaml({ github: funding }) }),
		"ISSUE_TEMPLATE.md": `<!-- Note: Please must use one of our issue templates to file an issue! 🛑 -->
<!-- 👉 https://github.com/${owner}/${repository}/issues/new/choose 👈 -->
<!-- **Issues that should have been filed with a template will be closed without action, and we will ask you to use a template.** -->

<!-- This blank issue template is only for issues that don't fit any of the templates. -->

## Overview

...
`,
		"PULL_REQUEST_TEMPLATE.md": `<!-- 👋 Hi, thanks for sending a PR to ${repository}! 💖.
Please fill out all fields below and make sure each item is true and [x] checked.
Otherwise we may not be able to review your PR. -->

## PR Checklist

- [ ] Addresses an existing open issue: fixes #000
- [ ] That issue was marked as [\`status: accepting prs\`](https://github.com/${owner}/${repository}/issues?q=is%3Aopen+is%3Aissue+label%3A%22status%3A+accepting+prs%22)
- [ ] Steps in [CONTRIBUTING.md](https://github.com/${owner}/${repository}/blob/main/.github/CONTRIBUTING.md) were taken

## Overview

<!-- Description of what is changed and how the code change does that. -->
`,
		"renovate.json": JSON.stringify(
			{
				$schema: "https://docs.renovatebot.com/renovate-schema.json",
				automerge: true,
				internalChecksFilter: "strict",
				labels: ["dependencies"],
				postUpdateOptions: ["pnpmDedupe"],
				stabilityDays: 3,
			},
			null,
			4
		),
	};
}
