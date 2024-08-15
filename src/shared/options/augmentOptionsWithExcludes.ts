import * as prompts from "@clack/prompts";
import chalk from "chalk";

import { filterPromptCancel } from "../prompts.js";
import { Options, OptionsBase } from "../types.js";
import {
	exclusionDescriptions,
	ExclusionKey,
	exclusionKeys,
	getExclusions,
} from "./exclusionKeys.js";

export async function augmentOptionsWithExcludes(
	options: Options,
): Promise<Options | undefined> {
	if (
		Object.keys(options).some(
			(key) =>
				key in exclusionDescriptions &&
				options[key as keyof typeof options] !== undefined,
		)
	) {
		return options;
	}

	const base =
		options.base ??
		filterPromptCancel<OptionsBase | symbol>(
			await prompts.select({
				initialValue: "common" as OptionsBase,
				message: `How much tooling would you like the template to set up for you?`,
				options: [
					{
						label: makeLabel(
							"everything",
							"The most comprehensive tooling imaginable: sorting, spellchecking, and more!",
						),
						value: "everything",
					},
					{
						hint: "recommended",
						label: makeLabel(
							"common",
							"Bare starters plus testing and automation for all-contributors and releases.",
						),
						value: "common",
					},
					{
						label: makeLabel(
							"minimal",
							"Just bare starter tooling: building, formatting, linting, and type checking.",
						),
						value: "minimal",
					},
					{
						label: makeLabel("prompt", "(allow me to customize)"),
						value: "prompt",
					},
				],
			}),
		);

	switch (base) {
		case undefined:
			return undefined;
		case "common":
		case "everything":
		case "minimal":
			return {
				...options,
				base,
				...getExclusions(options, base),
			};
		case "prompt": {
			const exclusionsNotEnabled = new Set(
				filterPromptCancel(
					await prompts.multiselect({
						initialValues: exclusionKeys,
						message:
							"Select the tooling portions you'd like to remove. All are enabled by default. Press ↑ or ↓ to change the selected item, then space to select.",
						options: Object.entries(exclusionDescriptions).map(
							([value, { hint, label }]) => ({
								hint,
								label,
								value: value as ExclusionKey,
							}),
						),
					}),
				),
			);

			return {
				...options,
				base,
				...Object.fromEntries(
					exclusionKeys.map(
						(exclusionKey) =>
							[exclusionKey, !exclusionsNotEnabled.has(exclusionKey)] as const,
					),
				),
			};
		}
	}
}

function makeLabel(label: string, message: string) {
	return [chalk.bold(label), message].join("\t ");
}
