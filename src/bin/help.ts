import chalk from "chalk";

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

interface Option {
	description: string;
	docsSection: "core" | "optional" | "opt-out" | "skip-net" | "skip-disk";
	type: string;
}

function logHelpTextSection(section: HelpTextSection): void {
	console.log(" ");

	console.log(`   ${chalk.black.bgGreenBright(section.sectionHeading)}`);

	for (const subsection of section.subsections) {
		if (subsection.warning) {
			console.log(chalk.yellow(subsection.warning));
		}

		if (subsection.subheading) {
			console.log(chalk.green(subsection.subheading));
		}

		for (const option of subsection.flags) {
			const { description, flag, type } = option;
			console.log(
				chalk.cyan(
					`
      --${flag}${
				type !== "boolean" ? ` (${chalk.cyanBright(type)})` : ""
			}: ${description}`,
				),
			);
		}
	}
}

function createHelpTextSections(
	options: Record<string, Option>,
): HelpTextSection[] {
	const core: HelpTextSection = {
		sectionHeading: "Core options:",
		subsections: [
			{
				flags: [],
				subheading: undefined,
				warning: undefined,
			},
		],
	};

	const optional: HelpTextSection = {
		sectionHeading: "Optional options:",
		subsections: [
			{
				flags: [],
				subheading: undefined,
				warning: undefined,
			},
		],
	};

	const optOut: HelpTextSection = {
		sectionHeading: "Opt-outs:",
		subsections: [
			{
				flags: [],
				subheading: undefined,
				warning: `
      ⚠️ Warning: Specifying any --exclude-* flag on the command-line will 
      cause the setup script to skip prompting for more excludes. ⚠️`,
			},
			{
				flags: [
					{
						description: `Skips network calls that fetch all-contributors
        data from GitHub`,
						flag: "exclude-contributors",
						type: "boolean",
					},
				],
				subheading: `
      You can prevent the migration script from making some network-based 
      changes using any or all of the following CLI flags:`,
				warning: undefined,
			},
			{
				flags: [],
				subheading: `
      You can prevent the migration script from making some changes on disk 
      using any or all of the following CLI flags:`,
				warning: undefined,
			},
		],
	};

	const subsections = {
		core: core.subsections[0],
		optional: optional.subsections[0],
		"opt-out": optOut.subsections[0],
		"skip-net": optOut.subsections[1],
		"skip-disk": optOut.subsections[2],
	};

	for (const [option, data] of Object.entries(options)) {
		subsections[data.docsSection].flags.push({
			description: data.description,
			flag: option,
			type: data.type,
		});
	}

	return [core, optional, optOut];
}

export function logHelpText(): void {
	const helpTextSections = createHelpTextSections(
		allArgOptions as Record<string, Option>,
	);

	console.log(" ");

	console.log(
		chalk.cyan(
			`
      A quickstart-friendly TypeScript template with comprehensive formatting, 
      linting, releases, testing, and other great tooling built-in.
      `,
		),
	);

	for (const section of helpTextSections) {
		logHelpTextSection(section);

		console.log();
	}
}
