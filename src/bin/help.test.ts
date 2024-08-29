import chalk from "chalk";
import { beforeEach, describe, expect, it, MockInstance, vi } from "vitest";

import { logHelpText } from "./help.js";

function makeProxy<T extends object>(receiver: T): T {
	return new Proxy(receiver, {
		get: () => makeProxy((input: string) => input),
	});
}

vi.mock("chalk", () => ({
	default: makeProxy({}),
}));

let mockConsoleLog: MockInstance;

describe("logHelpText", () => {
	beforeEach(() => {
		mockConsoleLog = vi
			.spyOn(console, "log")
			.mockImplementation(() => undefined);
	});

	it("logs help text when called", () => {
		logHelpText([
			chalk.yellow(
				"⚠️ This template is early stage, opinionated, and not endorsed by the TypeScript team. ⚠️",
			),
			chalk.yellow(
				"⚠️ If any tooling it sets displeases you, you can always remove that portion manually. ⚠️",
			),
		]);

		expect(mockConsoleLog.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "⚠️ This template is early stage, opinionated, and not endorsed by the TypeScript team. ⚠️",
			  ],
			  [
			    " ",
			  ],
			  [
			    "⚠️ If any tooling it sets displeases you, you can always remove that portion manually. ⚠️",
			  ],
			  [
			    " ",
			  ],
			  [
			    "
			A quickstart-friendly TypeScript template with comprehensive formatting, 
			linting, releases, testing, and other great tooling built-in.
			      ",
			  ],
			  [
			    " ",
			  ],
			  [
			    "Core options:",
			  ],
			  [
			    "
			  --base (string): Whether to scaffold the repository with:
			  • everything: that comes with the template (recommended)
			  • common: additions to the minimal starters such as releases and tests
			  • minimal: amounts of tooling, essentially opting out of everything
			  • prompt: for which portions to exclude",
			  ],
			  [
			    "
			  --create-repository: Whether to create a corresponding repository on github.com 
			  (if it doesn't yet exist)",
			  ],
			  [
			    "
			  --description (string): Sentence case description of the repository 
			  (e.g. A quickstart-friendly TypeScript package with lots of great 
			  repository tooling. ✨)",
			  ],
			  [
			    "
			  --mode (string): Whether to:
			  • create: a new repository in a child directory
			  • initialize: a freshly repository in the current directory
			  • migrate: an existing repository in the current directory",
			  ],
			  [
			    "
			  --owner (string): GitHub organization or user the repository is underneath 
			  (e.g. JoshuaKGoldberg)",
			  ],
			  [
			    "
			  --repository (string): The kebab-case name of the repository 
			  (e.g. create-typescript-app)",
			  ],
			  [
			    "
			  --title (string): Title Case title for the repository to be used in 
			  documentation (e.g. Create TypeScript App)",
			  ],
			  [],
			  [
			    " ",
			  ],
			  [
			    "Optional options:",
			  ],
			  [
			    "
			  --access (string): ("public" | "restricted"): Which npm publish --access to 
			  release npm packages with (by default, "public")",
			  ],
			  [
			    "
			  --author (string): Username on npm to publish packages under (by 
			  default, an existing npm author, or the currently logged in npm user, or 
			  owner.toLowerCase())",
			  ],
			  [
			    "
			  --auto: Whether to infer all options from files on disk.",
			  ],
			  [
			    "
			  --bin (string): package.json bin value to include for npx-style running.",
			  ],
			  [
			    "
			  --directory (string): Directory to create the repository in (by default, the same 
			  name as the repository)",
			  ],
			  [
			    "
			  --email (string): Email address to be listed as the point of contact in docs 
			  and packages (e.g. example@joshuakgoldberg.com)",
			  ],
			  [
			    "
			  --email-github (string): Optionally, may be provided to use different emails in .md 
			  files",
			  ],
			  [
			    "
			  --email-npm (string): Optionally, may be provided to use different emails in 
			  package.json",
			  ],
			  [
			    "
			  --funding (string): GitHub organization or username to mention in funding.yml 
			  (by default, owner)",
			  ],
			  [
			    "
			  --guide (string): Link to a contribution guide to place at the top of the 
			  development docs",
			  ],
			  [
			    "
			  --guide-title (string): If --guide is provided or detected from an existing 
			  DEVELOPMENT.md, the text title to place in the guide link",
			  ],
			  [
			    "
			  --keywords (string): Any number of keywords to include in package.json (by default, 
			  none). This can be specified any number of times, like  
			  --keywords apple --keywords "banana cherry"",
			  ],
			  [
			    "
			  --logo (string): Local image file in the repository to display near the top of 
			  the README.md as a logo",
			  ],
			  [
			    "
			  --logo-alt (string): If --logo is provided or detected from an existing README.md, 
			  alt text that describes the image will be prompted for if not provided",
			  ],
			  [
			    "
			  --preserve-generated-from: Whether to keep the GitHub repository generated from 
			  notice (by default, false)",
			  ],
			  [],
			  [
			    " ",
			  ],
			  [
			    "Opt-outs:",
			  ],
			  [
			    "
			  ⚠️ Warning: Specifying any --exclude-* flag on the command-line will 
			  cause the setup script to skip prompting for more excludes. ⚠️",
			  ],
			  [
			    "
			  --exclude-all-contributors: Don't add all-contributors to track contributions 
			  and display them in a README.md table.",
			  ],
			  [
			    "
			  --exclude-compliance: Don't add a GitHub Actions workflow to verify that PRs match 
			  an expected format.",
			  ],
			  [
			    "
			  --exclude-lint-jsdoc: Don't use eslint-plugin-jsdoc to enforce good practices around 
			  JSDoc comments.",
			  ],
			  [
			    "
			  --exclude-lint-json: Don't apply linting and sorting to *.json, and 
			  *.jsonc files.",
			  ],
			  [
			    "
			  --exclude-lint-knip: Don't add Knip to detect unused files, dependencies, and code 
			  exports.",
			  ],
			  [
			    "
			  --exclude-lint-md: Don't apply linting to *.md files.",
			  ],
			  [
			    "
			  --exclude-lint-package-json: Don't add eslint-plugin-package-json to lint for 
			  package.json correctness.",
			  ],
			  [
			    "
			  --exclude-lint-packages: Don't add a pnpm dedupe workflow to ensure packages 
			  aren't duplicated unnecessarily.",
			  ],
			  [
			    "
			  --exclude-lint-perfectionist: Don't apply eslint-plugin-perfectionist to ensure 
			  imports, keys, and so on are in sorted order.",
			  ],
			  [
			    "
			  --exclude-lint-regex: Don't add eslint-plugin-regex to enforce good practices around 
			  regular expressions.",
			  ],
			  [
			    "
			  --exclude-lint-spelling: Don't add cspell to spell check against dictionaries 
			  of known words.",
			  ],
			  [
			    "
			  --exclude-lint-strict: Don't augment the recommended logical lint rules with 
			  typescript-eslint's strict config.",
			  ],
			  [
			    "
			  --exclude-lint-stylistic: Don't add stylistic rules such as typescript-eslint's 
			  stylistic config.",
			  ],
			  [
			    "
			  --exclude-lint-yml: Don't apply linting and sorting to *.yaml and *.yml files.",
			  ],
			  [
			    "
			  --exclude-releases: Don't add release-it to generate changelogs, package bumps, 
			  and publishes based on conventional commits.",
			  ],
			  [
			    "
			  --exclude-renovate: Don't add a Renovate config to dependencies up-to-date with 
			  PRs.",
			  ],
			  [
			    "
			  --exclude-tests: Don't add Vitest tooling for fast unit tests, configured 
			  with coverage tracking.",
			  ],
			  [
			    "
			You can prevent the migration script from making some network-based 
			changes using any or all of the following CLI flags:",
			  ],
			  [
			    "
			  --exclude-contributors: Skips network calls that fetch all-contributors
			  data from GitHub",
			  ],
			  [
			    "
			  --skip-all-contributors-api: Skips network calls that fetch all-contributors data from
			  GitHub. This flag does nothing if --exclude-all-contributors was specified.",
			  ],
			  [
			    "
			  --skip-github-api: Skips calling to GitHub APIs.",
			  ],
			  [
			    "
			  --skip-install: Skips installing all the new template packages with pnpm.",
			  ],
			  [
			    "
			You can prevent the migration script from making some changes on disk 
			using any or all of the following CLI flags:",
			  ],
			  [
			    "
			  --skip-removal: Skips removing setup docs and scripts, including this docs/ 
			  directory",
			  ],
			  [
			    "
			  --skip-restore: Skips the prompt offering to restore the repository if an 
			  error occurs during setup",
			  ],
			  [
			    "
			  --skip-uninstall: Skips uninstalling packages only used for setup scripts",
			  ],
			  [],
			  [
			    " ",
			  ],
			  [
			    "Offline Mode:",
			  ],
			  [
			    "
			  --offline: You can run create-typescript-app in an "offline" mode. 
			  Doing so will:
			  • Enable --exclude-all-contributors-api and --skip-github-api
			  • Skip network calls when setting up contributors
			  • Run pnpm commands with pnpm's --offline mode",
			  ],
			  [],
			]
		`);
	});
});
