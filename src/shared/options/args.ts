import chalk from "chalk";

export const allArgOptions = {
	access: {
		description: `(${chalk.cyanBright(
			'"public" | "restricted"',
		)}): Which ${chalk.cyanBright("npm publish --access")} to 
  release npm packages with (by default, "public")`,
		docsSection: "optional",
		type: "string",
	},
	author: {
		description: `Username on npm to publish packages under (by 
  default, an existing npm author, or the currently logged in npm user, or 
  ${chalk.cyanBright("owner.toLowerCase()")})`,
		docsSection: "optional",
		type: "string",
	},
	auto: {
		description: `Whether to infer all options from files on disk.`,
		docsSection: "optional",
		type: "boolean",
	},
	base: {
		description: `Whether to scaffold the repository with:
  • everything: that comes with the template (${chalk.cyanBright.bold(
		"recommended",
	)})
  • common: additions to the minimal starters such as releases and tests
  • minimal: amounts of tooling, essentially opting out of everything
  • prompt: for which portions to exclude`,
		docsSection: "core",
		type: "string",
	},
	bin: {
		description: `package.json bin value to include for npx-style running.`,
		docsSection: "optional",
		type: "string",
	},
	"create-repository": {
		description: `Whether to create a corresponding repository on github.com 
  (if it doesn't yet exist)`,
		docsSection: "core",
		type: "boolean",
	},
	description: {
		description: `Sentence case description of the repository 
  (e.g. A quickstart-friendly TypeScript package with lots of great 
  repository tooling. ✨)`,
		docsSection: "core",
		type: "string",
	},
	directory: {
		description: `Directory to create the repository in (by default, the same 
  name as the repository)`,
		docsSection: "optional",
		type: "string",
	},
	email: {
		description: `Email address to be listed as the point of contact in docs 
  and packages (e.g. example@joshuakgoldberg.com)`,
		docsSection: "optional",
		type: "string",
	},
	"email-github": {
		description: `Optionally, may be provided to use different emails in ${chalk.cyanBright(
			".md",
		)} 
  files`,
		docsSection: "optional",
		type: "string",
	},
	"email-npm": {
		description: `Optionally, may be provided to use different emails in 
  ${chalk.cyanBright("package.json")}`,
		docsSection: "optional",
		type: "string",
	},
	"exclude-all-contributors": {
		description: `Don't add all-contributors to track contributions 
  and display them in a README.md table.`,
		docsSection: "opt-out",
		type: "boolean",
	},
	"exclude-compliance": {
		description: `Don't add a GitHub Actions workflow to verify that PRs match 
  an expected format.`,
		docsSection: "opt-out",
		type: "boolean",
	},
	"exclude-lint-jsdoc": {
		description: `Don't use eslint-plugin-jsdoc to enforce good practices around 
  JSDoc comments.`,
		docsSection: "opt-out",
		type: "boolean",
	},
	"exclude-lint-json": {
		description: `Don't apply linting and sorting to ${chalk.cyanBright(
			"*.json",
		)}, and 
  ${chalk.cyanBright("*.jsonc")} files.`,
		docsSection: "opt-out",
		type: "boolean",
	},
	"exclude-lint-knip": {
		description: `Don't add Knip to detect unused files, dependencies, and code 
  exports.`,
		docsSection: "opt-out",
		type: "boolean",
	},
	"exclude-lint-md": {
		description: `Don't apply linting to ${chalk.cyanBright("*.md")} files.`,
		docsSection: "opt-out",
		type: "boolean",
	},
	"exclude-lint-package-json": {
		description: `Don't add eslint-plugin-package-json to lint for 
  package.json correctness.`,
		docsSection: "opt-out",
		type: "boolean",
	},
	"exclude-lint-packages": {
		description: `Don't add a pnpm dedupe workflow to ensure packages 
  aren't duplicated unnecessarily.`,
		docsSection: "opt-out",
		type: "boolean",
	},
	"exclude-lint-perfectionist": {
		description: `Don't apply eslint-plugin-perfectionist to ensure 
  imports, keys, and so on are in sorted order.`,
		docsSection: "opt-out",
		type: "boolean",
	},
	"exclude-lint-regex": {
		description: `Don't add eslint-plugin-regex to enforce good practices around 
  regular expressions.`,
		docsSection: "opt-out",
		type: "boolean",
	},
	"exclude-lint-spelling": {
		description: `Don't add cspell to spell check against dictionaries 
  of known words.`,
		docsSection: "opt-out",
		type: "boolean",
	},
	"exclude-lint-strict": {
		description: `Don't augment the recommended logical lint rules with 
  typescript-eslint's strict config.`,
		docsSection: "opt-out",
		type: "boolean",
	},
	"exclude-lint-stylistic": {
		description: `Don't add stylistic rules such as typescript-eslint's 
  stylistic config.`,
		docsSection: "opt-out",
		type: "boolean",
	},
	"exclude-lint-yml": {
		description: `Don't apply linting and sorting to ${chalk.cyanBright(
			"*.yaml",
		)} and ${chalk.cyanBright("*.yml")} files.`,
		docsSection: "opt-out",
		type: "boolean",
	},
	"exclude-releases": {
		description: `Don't add release-it to generate changelogs, package bumps, 
  and publishes based on conventional commits.`,
		docsSection: "opt-out",
		type: "boolean",
	},
	"exclude-renovate": {
		description: `Don't add a Renovate config to dependencies up-to-date with 
  PRs.`,
		docsSection: "opt-out",
		type: "boolean",
	},
	"exclude-tests": {
		description: `Don't add Vitest tooling for fast unit tests, configured 
  with coverage tracking.`,
		docsSection: "opt-out",
		type: "boolean",
	},
	funding: {
		description: `GitHub organization or username to mention in ${chalk.cyanBright(
			"funding.yml",
		)} 
  (by default, owner)`,
		docsSection: "optional",
		type: "string",
	},
	guide: {
		description: `Link to a contribution guide to place at the top of the 
  development docs`,
		docsSection: "optional",
		type: "string",
	},
	"guide-title": {
		description: `If ${chalk.cyanBright(
			"--guide",
		)} is provided or detected from an existing 
  DEVELOPMENT.md, the text title to place in the guide link`,
		docsSection: "optional",
		type: "string",
	},
	keywords: {
		description: `Any number of keywords to include in ${chalk.cyanBright(
			"package.json",
		)} (by default, 
  none). This can be specified any number of times, like  
  ${chalk.cyanBright('--keywords apple --keywords "banana cherry"')}`,
		docsSection: "optional",
		multiple: true,
		type: "string",
	},
	logo: {
		description: `Local image file in the repository to display near the top of 
  the README.md as a logo`,
		docsSection: "optional",
		type: "string",
	},
	"logo-alt": {
		description: `If ${chalk.cyanBright(
			"--logo",
		)} is provided or detected from an existing README.md, 
  alt text that describes the image will be prompted for if not provided`,
		docsSection: "optional",
		type: "string",
	},
	mode: {
		description: `Whether to:
  • create: a new repository in a child directory
  • initialize: a freshly repository in the current directory
  • migrate: an existing repository in the current directory`,
		docsSection: "core",
		type: "string",
	},
	offline: {
		description: `You can run ${chalk.cyanBright(
			"create-typescript-app",
		)} in an "offline" mode. 
  Doing so will:
  • Enable ${chalk.cyanBright(
		"--exclude-all-contributors-api",
	)} and ${chalk.cyanBright("--skip-github-api")}
  • Skip network calls when setting up contributors
  • Run pnpm commands with pnpm's ${chalk.cyanBright("--offline")} mode`,
		docsSection: "offline",
		type: "boolean",
	},
	owner: {
		description: `GitHub organization or user the repository is underneath 
  (e.g. JoshuaKGoldberg)`,
		docsSection: "core",
		type: "string",
	},
	"preserve-generated-from": {
		description: `Whether to keep the GitHub repository generated from 
  notice (by default, false)`,
		docsSection: "optional",
		type: "boolean",
	},
	repository: {
		description: `The kebab-case name of the repository 
  (e.g. create-typescript-app)`,
		docsSection: "core",
		type: "string",
	},
	"skip-all-contributors-api": {
		description: `Skips network calls that fetch all-contributors data from
  GitHub. This flag does nothing if ${chalk.cyanBright(
		"--exclude-all-contributors",
	)} was specified.`,
		docsSection: "skip-net",
		type: "boolean",
	},
	"skip-github-api": {
		description: `Skips calling to GitHub APIs.`,
		docsSection: "skip-net",
		type: "boolean",
	},
	"skip-install": {
		description: `Skips installing all the new template packages with pnpm.`,
		docsSection: "skip-net",
		type: "boolean",
	},
	"skip-removal": {
		description: `Skips removing setup docs and scripts, including this ${chalk.cyanBright(
			"docs/",
		)} 
  directory`,
		docsSection: "skip-disk",
		type: "boolean",
	},
	"skip-restore": {
		description: `Skips the prompt offering to restore the repository if an 
  error occurs during setup`,
		docsSection: "skip-disk",
		type: "boolean",
	},
	"skip-uninstall": {
		description: `Skips uninstalling packages only used for setup scripts`,
		docsSection: "skip-disk",
		type: "boolean",
	},
	title: {
		description: `Title Case title for the repository to be used in 
  documentation (e.g. Create TypeScript App)`,
		docsSection: "core",
		type: "string",
	},
} as const;
