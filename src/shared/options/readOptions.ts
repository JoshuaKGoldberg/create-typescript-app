import { parseArgs } from "node:util";
import { titleCase } from "title-case";
import { z } from "zod";

import { withSpinner } from "../cli/spinners.js";
import { Mode, OptionsGuide, PromptedOptions } from "../types.js";
import { Options, OptionsLogo } from "../types.js";
import { allArgOptions } from "./args.js";
import { augmentOptionsWithExcludes } from "./augmentOptionsWithExcludes.js";
import { createOptionDefaults } from "./createOptionDefaults/index.js";
import { detectEmailRedundancy } from "./detectEmailRedundancy.js";
import { ensureRepositoryExists } from "./ensureRepositoryExists.js";
import { getBase } from "./getBase.js";
import { getGitHub, GitHub } from "./getGitHub.js";
import { getPrefillOrPromptedOption } from "./getPrefillOrPromptedOption.js";
import { logInferredOptions } from "./logInferredOptions.js";
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

	if (mode === "migrate" && !values.base) {
		values.base = await getBase();
	}

	const mappedOptions = {
		access: values.access,
		author: values.author,
		auto: !!values.auto,
		base: values.base,
		bin: values.bin,
		description: values.description,
		directory: values.directory,
		email:
			(values.email ?? values["email-github"] ?? values["email-npm"])
				? {
						github: values.email ?? values["email-github"],
						npm: values.email ?? values["email-npm"],
					}
				: undefined,
		excludeAllContributors: values["exclude-all-contributors"],
		excludeCompliance: values["exclude-compliance"],
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
		guide: values.guide,
		guideTitle: values["guide-title"],
		logo: values.logo,
		logoAlt: values["logo-alt"],
		offline: values.offline,
		owner: values.owner,
		preserveGeneratedFrom:
			values["preserve-generated-from"] ?? values.owner === "JoshuaKGoldberg",
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

	const ownerOption = await getPrefillOrPromptedOption({
		auto: !!mappedOptions.auto,
		getDefaultValue: defaults.owner,
		message: "What organization or user will the repository be under?",
		name: "owner",
		provided: options.owner,
	});

	options.owner ??= ownerOption.value;

	if (!options.owner) {
		return {
			cancelled: true,
			error: ownerOption.error,
			options,
		};
	}

	const repositoryOption = await getPrefillOrPromptedOption({
		auto: !!mappedOptions.auto,
		getDefaultValue: defaults.repository,
		message: "What will the kebab-case name of the repository be?",
		name: "repository",
		provided: options.repository,
	});

	options.repository ??= repositoryOption.value;

	if (!options.repository) {
		return {
			cancelled: true,
			error: repositoryOption.error,
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
		return { cancelled: true, error: repositoryOption.error, options };
	}

	const descriptionOption = await getPrefillOrPromptedOption({
		auto: !!mappedOptions.auto,
		getDefaultValue: async () =>
			(await defaults.description()) ?? "A very lovely package. Hooray!",
		message: "How would you describe the new package?",
		name: "description",
		provided: options.description,
	});

	options.description ??= descriptionOption.value;

	if (!options.description) {
		return { cancelled: true, error: descriptionOption.error, options };
	}

	const titleOption = await getPrefillOrPromptedOption({
		auto: !!mappedOptions.auto,
		getDefaultValue: async () =>
			(await defaults.title()) ?? titleCase(repository).replaceAll("-", " "),
		message: "What will the Title Case title of the repository be?",
		name: "title",
		provided: options.title,
	});

	options.title ??= titleOption.value;

	if (!options.title) {
		return { cancelled: true, error: titleOption.error, options };
	}

	let guide: OptionsGuide | undefined;

	if (options.guide) {
		if (options.guideTitle) {
			guide = { href: options.guide, title: options.guideTitle };
		} else {
			const titleOption = await getPrefillOrPromptedOption({
				auto: !!mappedOptions.auto,
				message: "What is the title text for the guide?",
				name: "getPrefillOrPromptedOption",
			});

			if (!titleOption.value) {
				return { cancelled: true, error: titleOption.error, options };
			}

			guide = { href: options.guide, title: titleOption.value };
		}
	}

	let logo: OptionsLogo | undefined;

	if (options.logo) {
		if (options.logoAlt) {
			logo = { alt: options.logoAlt, src: options.logo };
		} else {
			const logoAltOption = await getPrefillOrPromptedOption({
				auto: !!mappedOptions.auto,
				message: "What is the alt text (non-visual description) of the logo?",
				name: "getPrefillOrPromptedOption",
			});

			if (!logoAltOption.value) {
				return { cancelled: true, error: logoAltOption.error, options };
			}

			logo = { alt: logoAltOption.value, src: options.logo };
		}
	}

	let email = options.email ?? (await defaults.email());

	if (!email) {
		const emailOption = await getPrefillOrPromptedOption({
			auto: !!mappedOptions.auto,
			message: "What email should be used in package.json and .md files?",
			name: "email",
		});

		if (!emailOption.value) {
			return { cancelled: true, error: emailOption.error, options };
		}

		email = { github: emailOption.value, npm: emailOption.value };
	}

	const augmentedOptions = await augmentOptionsWithExcludes({
		...options,
		access: options.access ?? "public",
		author:
			options.author ?? (await defaults.author()) ?? (await defaults.owner()),
		bin: options.bin ?? (await defaults.bin()),
		description: options.description,
		directory:
			options.directory ?? promptedOptions.directory ?? options.repository,
		email,
		funding: options.funding ?? (await defaults.funding()),
		guide: guide ?? (await defaults.guide()),
		logo: logo ?? (await defaults.logo()),
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

	if (options.auto) {
		logInferredOptions(augmentedOptions);
	}

	return {
		cancelled: false,
		github,
		options: augmentedOptions,
	};
}
