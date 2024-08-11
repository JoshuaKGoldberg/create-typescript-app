import { z } from "zod";

export const optionsSchemaShape = {
	access: z.union([z.literal("public"), z.literal("restricted")]).optional(),
	author: z.string().optional(),
	auto: z.boolean().optional(),
	base: z
		.union([
			z.literal("common"),
			z.literal("everything"),
			z.literal("minimal"),
			z.literal("prompt"),
		])
		.optional(),
	bin: z.string().optional(),
	description: z.string().optional(),
	directory: z.string().optional(),
	email: z
		.object({
			github: z.string().email(),
			npm: z.string().email(),
		})
		.optional(),
	excludeAllContributors: z.boolean().optional(),
	excludeBuild: z.boolean().optional(),
	excludeCompliance: z.boolean().optional(),
	excludeLintESLint: z.boolean().optional(),
	excludeLintJSDoc: z.boolean().optional(),
	excludeLintJson: z.boolean().optional(),
	excludeLintKnip: z.boolean().optional(),
	excludeLintMd: z.boolean().optional(),
	excludeLintPackageJson: z.boolean().optional(),
	excludeLintPackages: z.boolean().optional(),
	excludeLintPerfectionist: z.boolean().optional(),
	excludeLintRegex: z.boolean().optional(),
	excludeLintSpelling: z.boolean().optional(),
	excludeLintStrict: z.boolean().optional(),
	excludeLintStylistic: z.boolean().optional(),
	excludeLintYml: z.boolean().optional(),
	excludeReleases: z.boolean().optional(),
	excludeRenovate: z.boolean().optional(),
	excludeTests: z.boolean().optional(),
	funding: z.string().optional(),
	guide: z.string().url().optional(),
	guideTitle: z.string().optional(),
	keywords: z.array(z.string()).optional(),
	logo: z.string().optional(),
	logoAlt: z.string().optional(),
	mode: z
		.union([z.literal("create"), z.literal("initialize"), z.literal("migrate")])
		.optional(),
	offline: z.boolean().optional(),
	owner: z.string().optional(),
	preserveGeneratedFrom: z.boolean().optional(),
	repository: z.string().optional(),
	skipAllContributorsApi: z.boolean().optional(),
	skipGitHubApi: z.boolean().optional(),
	skipInstall: z.boolean().optional(),
	skipRemoval: z.boolean().optional(),
	skipRestore: z.boolean().optional(),
	skipUninstall: z.boolean().optional(),
	title: z.string().optional(),
};

export const optionsSchema = z.object(optionsSchemaShape);
