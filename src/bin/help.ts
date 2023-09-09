import chalk from "chalk";

import { logLine } from "../shared/cli/lines.js";
import { allArgOptions } from "../shared/options/args.js";

interface HelpTextSection {
	sectionHeading: string;
	subsections: {
		flags: Flag[];
		subheading: string | undefined;
		warning: string | undefined;
	}[];
}

interface Flag {
	description: string;
	flag: string;
	type: string;
}

function logHelpTextSection(section: HelpTextSection): void {
	logLine();

	logLine(chalk.black.bgGreenBright(section.sectionHeading));

	for (const subsection of section.subsections) {
		if (typeof subsection.warning === "string") {
			logLine(chalk.yellow(subsection.warning));

			logLine();
		}

		if (typeof subsection.subheading === "string") {
			logLine(chalk.green(subsection.subheading));

			logLine();
		}

		for (const option of subsection.flags) {
			const { description, flag, type } = option;
			logLine(
				chalk.cyan(
					`
      --${flag}${
				type !== "boolean" ? ` (${chalk.cyanBright(type)}) ` : ""
			}: ${description}
      `,
				),
			);
		}
	}
}

function createHelpTextSections(options: any): HelpTextSection[] {
	const helpTextSections: HelpTextSection[] = [];

	let core: HelpTextSection = {
		sectionHeading: "Core options:",
		subsections: [
			{
				flags: [],
				subheading: undefined,
				warning: undefined,
			},
		],
	};

	let optional: HelpTextSection = {
		sectionHeading: "Optional options:",
		subsections: [
			{
				flags: [],
				subheading: undefined,
				warning: undefined,
			},
		],
	};

	let optOut: HelpTextSection = {
		sectionHeading: "Opt-outs:",
		subsections: [
			{
				flags: [],
				subheading: undefined,
				warning: `
      ⚠️ Warning: Specifying any --exclude-* flag on the command-line will 
      cause the setup script to skip prompting for more excludes. ⚠️
      `,
			},
			{
				flags: [
					{
						description: `
        Skips network calls that fetch 
        all-contributors data from GitHub
        `,
						flag: "exclude-contributors",
						type: "boolean",
					},
					{
						description: `
        Skips calling to GitHub APIs.
        `,
						flag: "skip-github-api",
						type: "boolean",
					},
					{
						description: `
        Skips installing all the new template 
        packages with pnpm.
        `,
						flag: "skip-install",
						type: "boolean",
					},
				],
				subheading: `
      You can prevent the migration script from making some network-based 
      changes using any or all of the following CLI flags:
      `,
				warning: undefined,
			},
			{
				flags: [
					{
						description: `
        Skips removing setup docs and scripts, 
        including this ${chalk.cyanBright("docs/")} directory
        `,
						flag: "skip-removal",
						type: "boolean",
					},
					{
						description: `
        Skips the prompt offering to restore the 
        repository if an error occurs during setup
        `,
						flag: "skip-restore",
						type: "boolean",
					},
					{
						description: `
        Skips uninstalling packages only used for 
        setup scripts
        `,
						flag: "skip-uninstall",
						type: "boolean",
					},
				],
				subheading: `
      You can prevent the migration script from making some changes on disk 
      using any or all of the following CLI flags:
      `,
				warning: undefined,
			},
		],
	};

	for (const option of Object.keys(options)) {
		const data = options[option];

		if (data.docsSection === "core") {
			core.subsections[0].flags.push({
				description: data.description,
				flag: option,
				type: data.type,
			});
		}

		if (data.docsSection === "optional") {
			optional.subsections[0].flags.push({
				description: data.description,
				flag: option,
				type: data.type,
			});
		}

		if (data.docsSection === "opt-out") {
			optOut.subsections[0].flags.push({
				description: data.description,
				flag: option,
				type: data.type,
			});
		}
	}

	helpTextSections.push(core, optional, optOut);

	return helpTextSections;
}

export function logHelpText(): void {
	const helpTextSections = createHelpTextSections(allArgOptions);

	logLine();

	logLine(
		chalk.cyan(
			`
      A quickstart-friendly TypeScript template with comprehensive formatting, 
      linting, releases, testing, and other great tooling built-in.
      `,
		),
	);

	logLine();

	for (const section of helpTextSections) {
		logHelpTextSection(section);

		logLine();
	}

	logLine();

	logLine(chalk.black.bgGreenBright("Core options:"));

	logLine(
		chalk.cyan(
			`
      --base: Whether to scaffold the repository with:
        • everything: that comes with the template (${chalk.cyanBright.bold(
					"recommended",
				)})
        • minimum: amounts of tooling, essentially opting out of everything
        • prompt: for which portions to exclude
      `,
			`
      --create-repository: Whether to create a corresponding repository on 
        github.com (if it doesn't yet exist)
      `,
			`
      --mode: Whether to:
        • create: a new repository in a child directory
        • initialize: a freshly repository in the current directory
        • migrate: an existing repository in the current directory
      `,
			`
      --description (${chalk.cyanBright.bold(
				"string",
			)}): Sentence case description of the repository 
        (e.g. A quickstart-friendly TypeScript package with lots of great 
        repository tooling. ✨)
      `,
			`
      --owner (${chalk.cyanBright.bold(
				"string",
			)}): GitHub organization or user the repository is 
        underneath (e.g. JoshuaKGoldberg)
      `,
			`
      --repository (${chalk.cyanBright.bold(
				"string",
			)}): The kebab-case name of the repository 
        (e.g. create-typescript-app)
      `,
			`
      --title (${chalk.cyanBright.bold(
				"string",
			)}): Title Case title for the repository to be used in 
        documentation (e.g. Create TypeScript App)
      `,
		),
	);

	logLine();

	logLine(chalk.black.bgGreenBright("Optional options:"));

	logLine(
		chalk.cyan(
			`
      --author (${chalk.cyanBright.bold(
				"string",
			)}): Username on npm to publish packages under (by 
        default, an existing npm author, or the currently logged in npm user, 
        or ${chalk.cyanBright("owner.")}${chalk.magentaBright("toLowerCase()")})
      `,
			`
      --email (${chalk.cyanBright.bold(
				"string",
			)}): Email address to be listed as the point of contact in 
        docs and packages (e.g. example@joshuakgoldberg.com)
      `,
			`
      --funding (${chalk.cyanBright.bold(
				"string",
			)}): GitHub organization or username to mention in 
        ${chalk.cyanBright("funding.yml")} (by default, owner)
      `,
		),
	);

	logLine();

	logLine(chalk.black.bgGreenBright("Opt-outs:"));

	logLine();

	logLine(
		chalk.yellow(
			`
      ⚠️ Warning: Specifying any --exclude-* flag on the command-line will 
      cause the setup script to skip prompting for more excludes. ⚠️
      `,
		),
	);

	logLine(
		chalk.cyan(
			`
      --exclude-compliance: Don't add a GitHub Actions workflow to verify that 
        PRs match an expected format.
      `,
			`
      --exclude-contributors: Don't add all-contributors to track contributions 
        and display them in a README.md table.
      `,
			`
      --exclude-lint-json: Don't apply linting and sorting to ${chalk.cyanBright(
				"*.json",
			)} and 
        ${chalk.cyanBright("*.jsonc")} files.
      `,
			`
      --exclude-lint-knip: Don't add Knip to detect unused files, dependencies, 
        and code exports.
      `,
			`
      --exclude-lint-md: Don't apply linting to ${chalk.cyanBright(
				"*.md",
			)} files.
      `,
			`
      --exclude-lint-package-json: Don't add npm-package-json-lint to lint for 
        package.json correctness.
      `,
			`
      --exclude-lint-packages: Don't add a pnpm dedupe workflow to ensure 
        packages aren't duplicated unnecessarily.
      `,
			`
      --exclude-lint-perfectionist: Don't apply eslint-plugin-perfectionist to 
        ensure imports, keys, and so on are in sorted order.
      `,
			`
      --exclude-lint-spelling: Don't add cspell to spell check against 
        dictionaries of known words.
      `,
			`
      --exclude-lint-yml: Don't apply linting and sorting to ${chalk.cyanBright(
				"*.yaml",
			)} and ${chalk.cyanBright("*.yml")} 
        files.
      `,
			`
      --exclude-releases: Don't add release-it to generate changelogs, package 
        bumps, and publishes based on conventional commits.
      `,
			`
      --exclude-renovate: Don't add a Renovate config to dependencies 
        up-to-date with PRs.
      `,
			`
      --exclude-tests: Don't add Vitest tooling for fast unit tests, configured 
        with coverage tracking.
      `,
		),
	);

	logLine();

	logLine(
		chalk.green(
			`
      You can prevent the migration script from making some network-based 
      changes using any or all of the following CLI flags:
      `,
		),
	);

	logLine(
		chalk.cyan(
			`
      --exclude-contributors: Skips network calls that fetch 
        all-contributors data from GitHub
      `,
			`
      --skip-github-api: Skips calling to GitHub APIs.
      `,
			`
      --skip-install: Skips installing all the new template 
        packages with pnpm.
      `,
		),
	);

	logLine();

	logLine(
		chalk.green(
			`
      You can prevent the migration script from making some changes on disk 
      using any or all of the following CLI flags:
      `,
		),
	);

	logLine(
		chalk.cyan(
			`
      --skip-removal: Skips removing setup docs and scripts, 
        including this ${chalk.cyanBright("docs/")} directory
      `,
			`
      --skip-restore: Skips the prompt offering to restore the 
        repository if an error occurs during setup
      `,
			`
      --skip-uninstall: Skips uninstalling packages only used for 
        setup scripts
      `,
		),
	);
}
