import { describe, expect, it, vi } from "vitest";

import { Options } from "../../../../shared/types.js";
import { createDotGitHubFiles } from "./createDotGitHubFiles.js";

vi.mock("./createDevelopment/index.js", () => ({
	createDevelopment: () => "# Development!",
}));

const createOptions = (exclude: boolean) =>
	({
		access: "public",
		base: "everything",
		bin: exclude ? undefined : "./bin/index.js",
		description: "Test description.",
		directory: ".",
		email: {
			github: "github@email.com",
			npm: "npm@email.com",
		},
		excludeAllContributors: exclude,
		excludeCompliance: exclude,
		excludeLintJson: exclude,
		excludeLintKnip: exclude,
		excludeLintMd: exclude,
		excludeLintPackageJson: exclude,
		excludeLintPackages: exclude,
		excludeLintPerfectionist: exclude,
		excludeLintSpelling: exclude,
		excludeLintYml: exclude,
		excludeReleases: exclude,
		excludeRenovate: exclude,
		excludeTests: exclude,
		mode: "create",
		owner: "StubOwner",
		repository: "stub-repository",
		title: "Stub Title",
	}) satisfies Options;

describe("createDotGitHubFiles", () => {
	it("creates only markdown files when given minimal options", async () => {
		expect(await createDotGitHubFiles(createOptions(true)))
			.toMatchInlineSnapshot(`
				{
				  "CODE_OF_CONDUCT.md": "# Contributor Covenant Code of Conduct

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
				github@email.com.
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
				",
				  "CONTRIBUTING.md": "# Contributing

				Thanks for your interest in contributing to \`stub-repository\`! 💖

				> After this page, see [DEVELOPMENT.md](./DEVELOPMENT.md) for local development instructions.

				## Code of Conduct

				This project contains a [Contributor Covenant code of conduct](./CODE_OF_CONDUCT.md) all contributors are expected to follow.

				## Reporting Issues

				Please do [report an issue on the issue tracker](https://github.com/StubOwner/stub-repository/issues/new/choose) if there's any bugfix, documentation improvement, or general enhancement you'd like to see in the repository! Please fully fill out all required fields in the most appropriate issue form.

				## Sending Contributions

				Sending your own changes as contribution is always appreciated!
				There are two steps involved:

				1. [Finding an Issue](#finding-an-issue)
				2. [Sending a Pull Request](#sending-a-pull-request)

				### Finding an Issue

				With the exception of very small typos, all changes to this repository generally need to correspond to an [unassigned open issue marked as \`status: accepting prs\` on the issue tracker](https://github.com/StubOwner/stub-repository/issues?q=is%3Aissue+is%3Aopen+label%3A%22status%3A+accepting+prs%22+no%3Aassignee+).
				If this is your first time contributing, consider searching for [unassigned issues that also have the \`good first issue\` label](https://github.com/StubOwner/stub-repository/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22+label%3A%22status%3A+accepting+prs%22+no%3Aassignee+).
				If the issue you'd like to fix isn't found on the issue, see [Reporting Issues](#reporting-issues) for filing your own (please do!).

				#### Issue Claiming

				We don't use any kind of issue claiming system.
				We've found in the past that they result in accidental ["licked cookie"](https://devblogs.microsoft.com/oldnewthing/20091201-00/?p=15843) situations where contributors claim an issue but run out of time or energy trying before sending a PR.

				If an unassigned issue has been marked as \`status: accepting prs\` and an open PR does not exist, feel free to send a PR.
				Please don't post comments asking for permission or stating you will work on an issue.

				### Sending a Pull Request

				Once you've identified an open issue accepting PRs that doesn't yet have a PR sent, you're free to send a pull request.
				Be sure to fill out the pull request template's requested information -- otherwise your PR will likely be closed.

				PRs are also expected to have a title that adheres to [conventional commits](https://www.conventionalcommits.org/en/v1.0.0).
				Only PR titles need to be in that format, not individual commits.
				Don't worry if you get this wrong: you can always change the PR title after sending it.
				Check [previously merged PRs](https://github.com/StubOwner/stub-repository/pulls?q=is%3Apr+is%3Amerged+-label%3Adependencies+) for reference.

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

				## Emojis & Appreciation

				If you made it all the way to the end, bravo dear user, we love you.
				Please include your favorite emoji in the bottom of your issues and PRs to signal to us that you did in fact read this file and are trying to conform to it as best as possible.
				💖 is a good starter if you're not sure which to use.
				",
				  "DEVELOPMENT.md": "# Development!",
				  "ISSUE_TEMPLATE.md": "<!-- Note: Please must use one of our issue templates to file an issue! 🛑 -->
				<!-- 👉 https://github.com/StubOwner/stub-repository/issues/new/choose 👈 -->
				<!-- **Issues that should have been filed with a template will be closed without action, and we will ask you to use a template.** -->

				<!-- This blank issue template is only for issues that don't fit any of the templates. -->

				## Overview

				...
				",
				  "PULL_REQUEST_TEMPLATE.md": "<!-- 👋 Hi, thanks for sending a PR to stub-repository! 💖.
				Please fill out all fields below and make sure each item is true and [x] checked.
				Otherwise we may not be able to review your PR. -->

				## PR Checklist

				- [ ] Addresses an existing open issue: fixes #000
				- [ ] That issue was marked as [\`status: accepting prs\`](https://github.com/StubOwner/stub-repository/issues?q=is%3Aopen+is%3Aissue+label%3A%22status%3A+accepting+prs%22)
				- [ ] Steps in [CONTRIBUTING.md](https://github.com/StubOwner/stub-repository/blob/main/.github/CONTRIBUTING.md) were taken

				## Overview

				<!-- Description of what is changed and how the code change does that. -->
				",
				  "SECURITY.md": "# Security Policy

				We take all security vulnerabilities seriously.
				If you have a vulnerability or other security issues to disclose:

				- Thank you very much, please do!
				- Please send them to us by emailing \`github@email.com\`

				We appreciate your efforts and responsible disclosure and will make every effort to acknowledge your contributions.
				",
				}
			`);
	});

	it("creates markdown and extra files when given full options", async () => {
		expect(await createDotGitHubFiles(createOptions(false)))
			.toMatchInlineSnapshot(`
				{
				  "CODE_OF_CONDUCT.md": "# Contributor Covenant Code of Conduct

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
				github@email.com.
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
				",
				  "CONTRIBUTING.md": "# Contributing

				Thanks for your interest in contributing to \`stub-repository\`! 💖

				> After this page, see [DEVELOPMENT.md](./DEVELOPMENT.md) for local development instructions.

				## Code of Conduct

				This project contains a [Contributor Covenant code of conduct](./CODE_OF_CONDUCT.md) all contributors are expected to follow.

				## Reporting Issues

				Please do [report an issue on the issue tracker](https://github.com/StubOwner/stub-repository/issues/new/choose) if there's any bugfix, documentation improvement, or general enhancement you'd like to see in the repository! Please fully fill out all required fields in the most appropriate issue form.

				## Sending Contributions

				Sending your own changes as contribution is always appreciated!
				There are two steps involved:

				1. [Finding an Issue](#finding-an-issue)
				2. [Sending a Pull Request](#sending-a-pull-request)

				### Finding an Issue

				With the exception of very small typos, all changes to this repository generally need to correspond to an [unassigned open issue marked as \`status: accepting prs\` on the issue tracker](https://github.com/StubOwner/stub-repository/issues?q=is%3Aissue+is%3Aopen+label%3A%22status%3A+accepting+prs%22+no%3Aassignee+).
				If this is your first time contributing, consider searching for [unassigned issues that also have the \`good first issue\` label](https://github.com/StubOwner/stub-repository/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22+label%3A%22status%3A+accepting+prs%22+no%3Aassignee+).
				If the issue you'd like to fix isn't found on the issue, see [Reporting Issues](#reporting-issues) for filing your own (please do!).

				#### Issue Claiming

				We don't use any kind of issue claiming system.
				We've found in the past that they result in accidental ["licked cookie"](https://devblogs.microsoft.com/oldnewthing/20091201-00/?p=15843) situations where contributors claim an issue but run out of time or energy trying before sending a PR.

				If an unassigned issue has been marked as \`status: accepting prs\` and an open PR does not exist, feel free to send a PR.
				Please don't post comments asking for permission or stating you will work on an issue.

				### Sending a Pull Request

				Once you've identified an open issue accepting PRs that doesn't yet have a PR sent, you're free to send a pull request.
				Be sure to fill out the pull request template's requested information -- otherwise your PR will likely be closed.

				PRs are also expected to have a title that adheres to [conventional commits](https://www.conventionalcommits.org/en/v1.0.0).
				Only PR titles need to be in that format, not individual commits.
				Don't worry if you get this wrong: you can always change the PR title after sending it.
				Check [previously merged PRs](https://github.com/StubOwner/stub-repository/pulls?q=is%3Apr+is%3Amerged+-label%3Adependencies+) for reference.

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

				## Emojis & Appreciation

				If you made it all the way to the end, bravo dear user, we love you.
				Please include your favorite emoji in the bottom of your issues and PRs to signal to us that you did in fact read this file and are trying to conform to it as best as possible.
				💖 is a good starter if you're not sure which to use.
				",
				  "DEVELOPMENT.md": "# Development!",
				  "ISSUE_TEMPLATE.md": "<!-- Note: Please must use one of our issue templates to file an issue! 🛑 -->
				<!-- 👉 https://github.com/StubOwner/stub-repository/issues/new/choose 👈 -->
				<!-- **Issues that should have been filed with a template will be closed without action, and we will ask you to use a template.** -->

				<!-- This blank issue template is only for issues that don't fit any of the templates. -->

				## Overview

				...
				",
				  "PULL_REQUEST_TEMPLATE.md": "<!-- 👋 Hi, thanks for sending a PR to stub-repository! 💖.
				Please fill out all fields below and make sure each item is true and [x] checked.
				Otherwise we may not be able to review your PR. -->

				## PR Checklist

				- [ ] Addresses an existing open issue: fixes #000
				- [ ] That issue was marked as [\`status: accepting prs\`](https://github.com/StubOwner/stub-repository/issues?q=is%3Aopen+is%3Aissue+label%3A%22status%3A+accepting+prs%22)
				- [ ] Steps in [CONTRIBUTING.md](https://github.com/StubOwner/stub-repository/blob/main/.github/CONTRIBUTING.md) were taken

				## Overview

				<!-- Description of what is changed and how the code change does that. -->
				",
				  "SECURITY.md": "# Security Policy

				We take all security vulnerabilities seriously.
				If you have a vulnerability or other security issues to disclose:

				- Thank you very much, please do!
				- Please send them to us by emailing \`github@email.com\`

				We appreciate your efforts and responsible disclosure and will make every effort to acknowledge your contributions.
				",
				  "renovate.json": "{
					"$schema": "https://docs.renovatebot.com/renovate-schema.json",
					"automerge": true,
					"extends": ["config:best-practices", "replacements:all"],
					"ignoreDeps": ["codecov/codecov-action"],
					"labels": ["dependencies"],
					"minimumReleaseAge": "7 days",
					"patch": { "enabled": false },
					"postUpdateOptions": ["pnpmDedupe"]
				}
				",
				}
			`);
	});
});
