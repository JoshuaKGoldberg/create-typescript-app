import { z } from "zod";

export const zConfigEmoji = z
	.array(z.tuple([z.string(), z.string()]))
	.optional();

export const zRuleOptions = z.union([
	z.literal("error"),
	z.literal("off"),
	z.literal("warn"),
	z.tuple([z.union([z.literal("error"), z.literal("warn")]), z.unknown()]),
	z.tuple([
		z.union([z.literal("error"), z.literal("warn")]),
		z.unknown(),
		z.unknown(),
	]),
]);

export type RuleOptions = z.infer<typeof zRuleOptions>;

export const zExtensionRuleGroup = z.object({
	comment: z.string().optional(),
	entries: z.record(z.string(), zRuleOptions),
});

export type ExtensionRuleGroup = z.infer<typeof zExtensionRuleGroup>;

export const zExtensionRules = z.union([
	z.record(z.string(), zRuleOptions),
	z.array(zExtensionRuleGroup),
]);

export type ExtensionRules = z.infer<typeof zExtensionRules>;

export const zExtension = z.object({
	extends: z.array(z.string()).optional(),
	files: z.array(z.string()).optional(),
	languageOptions: z.unknown().optional(),
	linterOptions: z.unknown().optional(),
	plugins: z.record(z.string(), z.string()).optional(),
	rules: zExtensionRules.optional(),
	settings: z.record(z.string(), z.unknown()).optional(),
});

export type Extension = z.infer<typeof zExtension>;

export const zPackageImport = z.object({
	source: z.union([
		z.string(),
		z.object({ packageName: z.string(), version: z.string() }),
	]),
	specifier: z.string(),
	types: z.boolean().optional(),
});
