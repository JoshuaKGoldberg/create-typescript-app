import { parseArgs } from "node:util";
import { titleCase } from "title-case";
import { z } from "zod";

import { withSpinner } from "../cli/spinners.js";
import { Mode, PromptedOptions } from "../types.js";
import { Options, OptionsLogo } from "../types.js";
import { allArgOptions } from "./args.js";
import { augmentOptionsWithExcludes } from "./augmentOptionsWithExcludes.js";
import { createOptionDefaults } from "./createOptionDefaults/index.js";
import { detectEmailRedundancy } from "./detectEmailRedundancy.js";
import { ensureRepositoryExists } from "./ensureRepositoryExists.js";
import { GitHub, getGitHub } from "./getGitHub.js";
import { getPrefillOrPromptedOption } from "./getPrefillOrPromptedOption.js";
import { optionsSchema } from "./optionsSchema.js";

export interface GitHubAndOptions {
	github: GitHub | undefined;
	options: Options;
}

export interface OptionsParseCancelled {
	cancelled: true;
	error?: string | z.ZodError<object>;
	options: object;
}

export interface OptionsParseSuccess extends GitHubAndOptions {
	cancelled: false;
}

export type OptionsParseResult = OptionsParseCancelled | OptionsParseSuccess;

export async function readOptions(
	args: string[],
	mode: Mode,
	promptedOptions: PromptedOptions = {},
): Promise<OptionsParseResult> {
	const defaults = createOptionDefaults(promptedOptions);
	const { values } = parseArgs({
		args,
		options: allArgOptions,
		strict: false,
		tokens: true,
	});

	const mappedOptions = {
		access: values.access,
		author: values.author,
		base: values.base,
		description: values.description,
		directory: values.directory,
		email:
			values.email ?? values["email-github"] ?? values["email-npm"]
				? {
						github: values.email ?? values["email-github"],
						npm: values.email ?? values["email-npm"],
				  }
				: undefined,
		excludeAllContributors: values["exclude-all-contributors"],
		excludeCompliance: values["exclude-compliance"],
		excludeLintDeprecation: values["exclude-lint-deprecation"],
		excludeLintESLint: values["exclude-lint-eslint"],
		excludeLintJSDoc: values["exclude-lint-jsdoc"],
		excludeLintJson: values["exclude-lint-json"],
		excludeLintKnip: values["exclude-lint-knip"],
		excludeLintMd: values["exclude-lint-md"],
		excludeLintPackageJson: values["exclude-lint-package-json"],
		excludeLintPackages: values["exclude-lint-packages"],
		excludeLintPerfectionist: values["exclude-lint-perfectionist"],
		excludeLintRegex: values["exclude-lint-regex"],
		excludeLintSpelling: values["exclude-lint-spelling"],
		excludeLintStrict: values["exclude-lint-strict"],
		excludeLintYml: values["exclude-lint-yml"],
		excludeReleases: values["exclude-releases"],
		excludeRenovate: values["exclude-renovate"],
		excludeTests: values["unit-tests"],
		funding: values.funding,
		offline: values.offline,
		owner: values.owner,
		repository: values.repository,
		skipAllContributorsApi:
			values["skip-all-contributors-api"] ?? values.offline,
		skipGitHubApi: values["skip-github-api"] ?? values.offline,
		skipInstall: values["skip-install"],
		skipRemoval: values["skip-removal"],
		skipRestore: values["skip-restore"],
		skipUninstall: values["skip-uninstall"],
		title: values.title,
	};

	const emailError = detectEmailRedundancy(values);
	if (emailError) {
		return {
			cancelled: true,
			error: emailError,
			options: mappedOptions,
		};
	}

	const optionsParseResult = optionsSchema.safeParse(mappedOptions);

	if (!optionsParseResult.success) {
		return {
			cancelled: true,
			error: optionsParseResult.error,
			options: mappedOptions,
		};
	}

	const options = optionsParseResult.data;

	options.owner ??= await getPrefillOrPromptedOption(
		"What organization or user will the repository be under?",
		defaults.owner,
	);
	if (!options.owner) {
		return {
			cancelled: true,
			options,
		};
	}

	options.repository ??= await getPrefillOrPromptedOption(
		"What will the kebab-case name of the repository be?",
		defaults.repository,
	);
	if (!options.repository) {
		return {
			cancelled: true,
			options,
		};
	}

	const { github, repository } = await ensureRepositoryExists(
		options.skipGitHubApi
			? undefined
			: await withSpinner("Checking GitHub authentication", getGitHub),
		{
			mode,
			owner: options.owner,
			repository: options.repository,
		},
	);
	if (!repository) {
		return { cancelled: true, options };
	}

	options.description ??= await getPrefillOrPromptedOption(
		"How would you describe the new package?",
		async () =>
			(await defaults.description()) ?? "A very lovely package. Hooray!",
	);
	if (!options.description) {
		return { cancelled: true, options };
	}

	options.title ??= await getPrefillOrPromptedOption(
		"What will the Title Case title of the repository be?",
		async () =>
			(await defaults.title()) ?? titleCase(repository).replaceAll("-", " "),
	);
	if (!options.title) {
		return { cancelled: true, options };
	}

	let logo: OptionsLogo | undefined;

	if (options.logo) {
		const alt =
			options.logoAlt ??
			(await getPrefillOrPromptedOption(
				"What is the alt text (non-visual description) of the logo?",
			));
		if (!alt) {
			return { cancelled: true, options };
		}

		logo = { alt, src: options.logo };
	}

	const email =
		options.email ??
		(await defaults.email()) ??
		(await getPrefillOrPromptedOption(
			"What email should be used in package.json and .md files?",
		));
	if (!email) {
		return { cancelled: true, options };
	}

	const augmentedOptions = await augmentOptionsWithExcludes({
		...options,
		access: options.access ?? "public",
		author: options.author ?? (await defaults.owner()),
		description: options.description,
		directory:
			options.directory ?? promptedOptions.directory ?? options.repository,
		email: typeof email === "string" ? { github: email, npm: email } : email,
		funding: options.funding ?? (await defaults.funding()),
		logo,
		mode,
		owner: options.owner,
		repository,
		title: options.title,
	});

	if (!augmentedOptions) {
		return {
			cancelled: true,
			options,
		};
	}

	return {
		cancelled: false,
		github,
		options: augmentedOptions,
	};
}
