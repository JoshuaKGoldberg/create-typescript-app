import * as prompts from "@clack/prompts";
import chalk from "chalk";

import { filterPromptCancel } from "../prompts.js";
import { Options, OptionsBase } from "../types.js";
import { exclusionDescriptions } from "./exclusionDescriptions.js";

export interface ExclusionDescription {
	hint: string;
	label: string;
	uncommon?: true;
}

export type ExclusionKey = keyof Options & `exclude${string}`;

const exclusionKeys = Object.keys(exclusionDescriptions) as ExclusionKey[];

export async function augmentOptionsWithExcludes(
	options: Options,
): Promise<Options | undefined> {
	const base =
		options.base ??
		filterPromptCancel<OptionsBase | symbol>(
			await prompts.select({
				initialValue: "common" as OptionsBase,
				message: `How much tooling would you like the template to set up for you?`,
				options: [
					{
						label: makeLabel(
							"minimum",
							"Just the bare starter tooling most repositories should ideally include.",
						),
						value: "minimum",
					},
					{
						label: makeLabel(
							"common",
							"Important additions to the minimum starters such as releases and tests.",
						),
						value: "common",
					},
					{
						label: makeLabel(
							"everything",
							"The most thorough tooling imaginable: sorting, spellchecking, and more!",
						),
						value: "everything",
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
			return {
				...options,
				...Object.fromEntries(
					exclusionKeys
						.filter((exclusion) => exclusionDescriptions[exclusion].uncommon)
						.map((exclusion) => [exclusion, options[exclusion] ?? true]),
				),
			};

		case "everything":
			return options;

		case "minimum":
			return {
				...options,
				...Object.fromEntries(
					exclusionKeys.map((exclusion) => [
						exclusion,
						options[exclusion] ?? true,
					]),
				),
			};

		case "prompt":
			const exclusionsNotEnabled = new Set(
				filterPromptCancel(
					await prompts.multiselect({
						initialValues: exclusionKeys,
						message:
							"Select the tooling portions you'd like to remove. All are enabled by default.",
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
				...Object.fromEntries(
					exclusionKeys.map(
						(exclusionKey) =>
							[exclusionKey, !exclusionsNotEnabled.has(exclusionKey)] as const,
					),
				),
			};
	}
}

function makeLabel(label: string, message: string) {
	return [chalk.bold(label), message].join("\t ");
}
