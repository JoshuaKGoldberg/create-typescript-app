import chalk from "chalk";

import { allArgOptions } from "../shared/options/args.js";

interface HelpTextSection {
	sectionHeading: string;
	subsections: {
		flags: SubsectionFlag[];
		subheading?: string;
		warning?: string;
	}[];
}

interface SubsectionFlag {
	description: string;
	flag: string;
	type: string;
}

function logHelpTextSection(section: HelpTextSection): void {
	console.log(" ");

	console.log(chalk.black.bgGreenBright(section.sectionHeading));

	for (const subsection of section.subsections) {
		if (subsection.warning) {
			console.log(chalk.yellow(subsection.warning));
		}

		if (subsection.subheading) {
			console.log(chalk.green(subsection.subheading));
		}

		for (const { description, flag, type } of subsection.flags) {
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

function createHelpTextSections(): HelpTextSection[] {
	const core: HelpTextSection = {
		sectionHeading: "Core options:",
		subsections: [
			{
				flags: [],
			},
		],
	};

	const optional: HelpTextSection = {
		sectionHeading: "Optional options:",
		subsections: [
			{
				flags: [],
			},
		],
	};

	const optOut: HelpTextSection = {
		sectionHeading: "Opt-outs:",
		subsections: [
			{
				flags: [],
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
			},
			{
				flags: [],
				subheading: `
You can prevent the migration script from making some changes on disk 
using any or all of the following CLI flags:`,
			},
		],
	};

	const offline: HelpTextSection = {
		sectionHeading: "Offline Mode:",
		subsections: [
			{
				flags: [],
			},
		],
	};

	const subsections = {
		core: core.subsections[0],
		offline: offline.subsections[0],
		"opt-out": optOut.subsections[0],
		optional: optional.subsections[0],
		"skip-disk": optOut.subsections[2],
		"skip-net": optOut.subsections[1],
	};

	for (const [option, data] of Object.entries(allArgOptions)) {
		subsections[data.docsSection].flags.push({
			description: data.description,
			flag: option,
			type: data.type,
		});
	}

	return [core, optional, optOut, offline];
}

export function logHelpText(introLogs: string[]): void {
	const helpTextSections = createHelpTextSections();

	for (const log of introLogs) {
		console.log(log);
		console.log(" ");
	}

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
