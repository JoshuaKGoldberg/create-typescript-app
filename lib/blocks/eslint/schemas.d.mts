import { z } from "zod";
//#region src/blocks/eslint/schemas.d.ts
declare const zConfigEmoji: z.ZodOptional<z.ZodArray<z.ZodTuple<[z.ZodString, z.ZodString], null>, "many">>;
declare const zRuleOptions: z.ZodUnion<[z.ZodLiteral<"error">, z.ZodLiteral<"off">, z.ZodLiteral<"warn">, z.ZodTuple<[z.ZodUnion<[z.ZodLiteral<"error">, z.ZodLiteral<"warn">]>, z.ZodUnknown], null>, z.ZodTuple<[z.ZodUnion<[z.ZodLiteral<"error">, z.ZodLiteral<"warn">]>, z.ZodUnknown, z.ZodUnknown], null>]>;
type RuleOptions = z.infer<typeof zRuleOptions>;
declare const zExtensionRuleGroup: z.ZodObject<{
  comment: z.ZodOptional<z.ZodString>;
  entries: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodLiteral<"error">, z.ZodLiteral<"off">, z.ZodLiteral<"warn">, z.ZodTuple<[z.ZodUnion<[z.ZodLiteral<"error">, z.ZodLiteral<"warn">]>, z.ZodUnknown], null>, z.ZodTuple<[z.ZodUnion<[z.ZodLiteral<"error">, z.ZodLiteral<"warn">]>, z.ZodUnknown, z.ZodUnknown], null>]>>;
}, "strip", z.ZodTypeAny, {
  entries: Record<string, "off" | "error" | "warn" | ["error" | "warn", unknown] | ["error" | "warn", unknown, unknown]>;
  comment?: string | undefined;
}, {
  entries: Record<string, "off" | "error" | "warn" | ["error" | "warn", unknown] | ["error" | "warn", unknown, unknown]>;
  comment?: string | undefined;
}>;
type ExtensionRuleGroup = z.infer<typeof zExtensionRuleGroup>;
declare const zRulesArray: z.ZodArray<z.ZodObject<{
  comment: z.ZodOptional<z.ZodString>;
  entries: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodLiteral<"error">, z.ZodLiteral<"off">, z.ZodLiteral<"warn">, z.ZodTuple<[z.ZodUnion<[z.ZodLiteral<"error">, z.ZodLiteral<"warn">]>, z.ZodUnknown], null>, z.ZodTuple<[z.ZodUnion<[z.ZodLiteral<"error">, z.ZodLiteral<"warn">]>, z.ZodUnknown, z.ZodUnknown], null>]>>;
}, "strip", z.ZodTypeAny, {
  entries: Record<string, "off" | "error" | "warn" | ["error" | "warn", unknown] | ["error" | "warn", unknown, unknown]>;
  comment?: string | undefined;
}, {
  entries: Record<string, "off" | "error" | "warn" | ["error" | "warn", unknown] | ["error" | "warn", unknown, unknown]>;
  comment?: string | undefined;
}>, "many">;
type RulesArray = z.infer<typeof zRulesArray>;
declare const zRulesRecord: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodLiteral<"error">, z.ZodLiteral<"off">, z.ZodLiteral<"warn">, z.ZodTuple<[z.ZodUnion<[z.ZodLiteral<"error">, z.ZodLiteral<"warn">]>, z.ZodUnknown], null>, z.ZodTuple<[z.ZodUnion<[z.ZodLiteral<"error">, z.ZodLiteral<"warn">]>, z.ZodUnknown, z.ZodUnknown], null>]>>;
type RulesRecord = z.infer<typeof zRulesRecord>;
declare const zExtensionRules: z.ZodUnion<[z.ZodArray<z.ZodObject<{
  comment: z.ZodOptional<z.ZodString>;
  entries: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodLiteral<"error">, z.ZodLiteral<"off">, z.ZodLiteral<"warn">, z.ZodTuple<[z.ZodUnion<[z.ZodLiteral<"error">, z.ZodLiteral<"warn">]>, z.ZodUnknown], null>, z.ZodTuple<[z.ZodUnion<[z.ZodLiteral<"error">, z.ZodLiteral<"warn">]>, z.ZodUnknown, z.ZodUnknown], null>]>>;
}, "strip", z.ZodTypeAny, {
  entries: Record<string, "off" | "error" | "warn" | ["error" | "warn", unknown] | ["error" | "warn", unknown, unknown]>;
  comment?: string | undefined;
}, {
  entries: Record<string, "off" | "error" | "warn" | ["error" | "warn", unknown] | ["error" | "warn", unknown, unknown]>;
  comment?: string | undefined;
}>, "many">, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodLiteral<"error">, z.ZodLiteral<"off">, z.ZodLiteral<"warn">, z.ZodTuple<[z.ZodUnion<[z.ZodLiteral<"error">, z.ZodLiteral<"warn">]>, z.ZodUnknown], null>, z.ZodTuple<[z.ZodUnion<[z.ZodLiteral<"error">, z.ZodLiteral<"warn">]>, z.ZodUnknown, z.ZodUnknown], null>]>>]>;
type ExtensionRules = z.infer<typeof zExtensionRules>;
declare const zExtension: z.ZodObject<{
  extends: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
  files: z.ZodArray<z.ZodString, "many">;
  languageOptions: z.ZodOptional<z.ZodUnknown>;
  linterOptions: z.ZodOptional<z.ZodUnknown>;
  plugins: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
  rules: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodObject<{
    comment: z.ZodOptional<z.ZodString>;
    entries: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodLiteral<"error">, z.ZodLiteral<"off">, z.ZodLiteral<"warn">, z.ZodTuple<[z.ZodUnion<[z.ZodLiteral<"error">, z.ZodLiteral<"warn">]>, z.ZodUnknown], null>, z.ZodTuple<[z.ZodUnion<[z.ZodLiteral<"error">, z.ZodLiteral<"warn">]>, z.ZodUnknown, z.ZodUnknown], null>]>>;
  }, "strip", z.ZodTypeAny, {
    entries: Record<string, "off" | "error" | "warn" | ["error" | "warn", unknown] | ["error" | "warn", unknown, unknown]>;
    comment?: string | undefined;
  }, {
    entries: Record<string, "off" | "error" | "warn" | ["error" | "warn", unknown] | ["error" | "warn", unknown, unknown]>;
    comment?: string | undefined;
  }>, "many">, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodLiteral<"error">, z.ZodLiteral<"off">, z.ZodLiteral<"warn">, z.ZodTuple<[z.ZodUnion<[z.ZodLiteral<"error">, z.ZodLiteral<"warn">]>, z.ZodUnknown], null>, z.ZodTuple<[z.ZodUnion<[z.ZodLiteral<"error">, z.ZodLiteral<"warn">]>, z.ZodUnknown, z.ZodUnknown], null>]>>]>>;
  settings: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
  files: string[];
  extends?: string[] | undefined;
  languageOptions?: unknown;
  linterOptions?: unknown;
  plugins?: Record<string, string> | undefined;
  rules?: Record<string, "off" | "error" | "warn" | ["error" | "warn", unknown] | ["error" | "warn", unknown, unknown]> | {
    entries: Record<string, "off" | "error" | "warn" | ["error" | "warn", unknown] | ["error" | "warn", unknown, unknown]>;
    comment?: string | undefined;
  }[] | undefined;
  settings?: Record<string, unknown> | undefined;
}, {
  files: string[];
  extends?: string[] | undefined;
  languageOptions?: unknown;
  linterOptions?: unknown;
  plugins?: Record<string, string> | undefined;
  rules?: Record<string, "off" | "error" | "warn" | ["error" | "warn", unknown] | ["error" | "warn", unknown, unknown]> | {
    entries: Record<string, "off" | "error" | "warn" | ["error" | "warn", unknown] | ["error" | "warn", unknown, unknown]>;
    comment?: string | undefined;
  }[] | undefined;
  settings?: Record<string, unknown> | undefined;
}>;
type Extension = z.infer<typeof zExtension>;
declare const zPackageImport: z.ZodObject<{
  source: z.ZodUnion<[z.ZodString, z.ZodObject<{
    packageName: z.ZodString;
    version: z.ZodString;
  }, "strip", z.ZodTypeAny, {
    version: string;
    packageName: string;
  }, {
    version: string;
    packageName: string;
  }>]>;
  specifier: z.ZodString;
  types: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
  source: string | {
    version: string;
    packageName: string;
  };
  specifier: string;
  types?: boolean | undefined;
}, {
  source: string | {
    version: string;
    packageName: string;
  };
  specifier: string;
  types?: boolean | undefined;
}>;
//#endregion
export { Extension, ExtensionRuleGroup, ExtensionRules, RuleOptions, RulesArray, RulesRecord, zConfigEmoji, zExtension, zExtensionRuleGroup, zExtensionRules, zPackageImport, zRuleOptions, zRulesArray, zRulesRecord };