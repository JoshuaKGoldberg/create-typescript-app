import { z } from "zod";
//#region src/blocks/eslint/schemas.ts
const zConfigEmoji = z.array(z.tuple([z.string(), z.string()])).optional();
const zRuleOptions = z.union([
	z.literal("error"),
	z.literal("off"),
	z.literal("warn"),
	z.tuple([z.union([z.literal("error"), z.literal("warn")]), z.unknown()]),
	z.tuple([
		z.union([z.literal("error"), z.literal("warn")]),
		z.unknown(),
		z.unknown()
	])
]);
const zExtensionRuleGroup = z.object({
	comment: z.string().optional(),
	entries: z.record(z.string(), zRuleOptions)
});
const zRulesArray = z.array(zExtensionRuleGroup);
const zRulesRecord = z.record(z.string(), zRuleOptions);
const zExtensionRules = z.union([zRulesArray, zRulesRecord]);
const zExtension = z.object({
	extends: z.array(z.string()).optional(),
	files: z.array(z.string()),
	languageOptions: z.unknown().optional(),
	linterOptions: z.unknown().optional(),
	plugins: z.record(z.string(), z.string()).optional(),
	rules: zExtensionRules.optional(),
	settings: z.record(z.string(), z.unknown()).optional()
});
const zPackageImport = z.object({
	source: z.union([z.string(), z.object({
		packageName: z.string(),
		version: z.string()
	})]),
	specifier: z.string(),
	types: z.boolean().optional()
});
//#endregion
export { zConfigEmoji, zExtension, zExtensionRuleGroup, zExtensionRules, zPackageImport, zRuleOptions, zRulesArray, zRulesRecord };
