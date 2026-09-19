import { BaseOptionsFor } from "bingo-stratum";
import { z } from "zod";
//#region src/base.d.ts
declare const base: import("bingo-stratum").Base<{
  access: z.ZodUnion<[z.ZodLiteral<"public">, z.ZodLiteral<"restricted">]>;
  author: z.ZodOptional<z.ZodString>;
  bin: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodRecord<z.ZodString, z.ZodString>]>>;
  contributors: z.ZodOptional<z.ZodArray<z.ZodObject<{
    avatar_url: z.ZodString;
    contributions: z.ZodArray<z.ZodString, "many">;
    login: z.ZodString;
    name: z.ZodString;
    profile: z.ZodString;
  }, "strip", z.ZodTypeAny, {
    avatar_url: string;
    contributions: string[];
    login: string;
    name: string;
    profile: string;
  }, {
    avatar_url: string;
    contributions: string[];
    login: string;
    name: string;
    profile: string;
  }>, "many">>;
  description: z.ZodDefault<z.ZodString>;
  directory: z.ZodString;
  documentation: z.ZodObject<{
    development: z.ZodOptional<z.ZodString>;
    readme: z.ZodObject<{
      additional: z.ZodOptional<z.ZodString>;
      explainer: z.ZodOptional<z.ZodString>;
      footnotes: z.ZodOptional<z.ZodString>;
      usage: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
      additional?: string | undefined;
      explainer?: string | undefined;
      footnotes?: string | undefined;
      usage?: string | undefined;
    }, {
      additional?: string | undefined;
      explainer?: string | undefined;
      footnotes?: string | undefined;
      usage?: string | undefined;
    }>;
  }, "strip", z.ZodTypeAny, {
    readme: {
      additional?: string | undefined;
      explainer?: string | undefined;
      footnotes?: string | undefined;
      usage?: string | undefined;
    };
    development?: string | undefined;
  }, {
    readme: {
      additional?: string | undefined;
      explainer?: string | undefined;
      footnotes?: string | undefined;
      usage?: string | undefined;
    };
    development?: string | undefined;
  }>;
  email: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodObject<{
    github: z.ZodString;
    npm: z.ZodString;
  }, "strip", z.ZodTypeAny, {
    github: string;
    npm: string;
  }, {
    github: string;
    npm: string;
  }>]>, {
    github: string;
    npm: string;
  }, string | {
    github: string;
    npm: string;
  }>;
  emoji: z.ZodOptional<z.ZodString>;
  existingLabels: z.ZodOptional<z.ZodArray<z.ZodObject<{
    color: z.ZodString;
    description: z.ZodString;
    name: z.ZodString;
  }, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    color: string;
  }, {
    name: string;
    description: string;
    color: string;
  }>, "many">>;
  funding: z.ZodOptional<z.ZodString>;
  guide: z.ZodOptional<z.ZodObject<{
    href: z.ZodString;
    title: z.ZodString;
  }, "strip", z.ZodTypeAny, {
    href: string;
    title: string;
  }, {
    href: string;
    title: string;
  }>>;
  keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
  logo: z.ZodOptional<z.ZodObject<{
    alt: z.ZodString;
    height: z.ZodOptional<z.ZodNumber>;
    src: z.ZodString;
    width: z.ZodOptional<z.ZodNumber>;
  }, "strip", z.ZodTypeAny, {
    alt: string;
    src: string;
    height?: number | undefined;
    width?: number | undefined;
  }, {
    alt: string;
    src: string;
    height?: number | undefined;
    width?: number | undefined;
  }>>;
  node: z.ZodObject<{
    minimum: z.ZodString;
    pinned: z.ZodOptional<z.ZodString>;
  }, "strip", z.ZodTypeAny, {
    minimum: string;
    pinned?: string | undefined;
  }, {
    minimum: string;
    pinned?: string | undefined;
  }>;
  owner: z.ZodString;
  packageData: z.ZodOptional<z.ZodObject<{
    dependencies: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    devDependencies: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    peerDependencies: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    peerDependenciesMeta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    scripts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodOptional<z.ZodString>>>;
  }, "strip", z.ZodTypeAny, {
    dependencies?: Record<string, string> | undefined;
    devDependencies?: Record<string, string> | undefined;
    peerDependencies?: Record<string, string> | undefined;
    peerDependenciesMeta?: Record<string, unknown> | undefined;
    scripts?: Record<string, string | undefined> | undefined;
  }, {
    dependencies?: Record<string, string> | undefined;
    devDependencies?: Record<string, string> | undefined;
    peerDependencies?: Record<string, string> | undefined;
    peerDependenciesMeta?: Record<string, unknown> | undefined;
    scripts?: Record<string, string | undefined> | undefined;
  }>>;
  pnpm: z.ZodOptional<z.ZodString>;
  repository: z.ZodString;
  rulesetId: z.ZodOptional<z.ZodString>;
  title: z.ZodString;
  type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"commonjs">, z.ZodLiteral<"module">]>>;
  version: z.ZodOptional<z.ZodString>;
  words: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
  workflowsVersions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodObject<{
    hash: z.ZodOptional<z.ZodString>;
    pinned: z.ZodOptional<z.ZodBoolean>;
  }, "strip", z.ZodTypeAny, {
    pinned?: boolean | undefined;
    hash?: string | undefined;
  }, {
    pinned?: boolean | undefined;
    hash?: string | undefined;
  }>>>>;
}>;
type BaseOptions = BaseOptionsFor<typeof base> & {
  preset?: string;
};
//#endregion
export { BaseOptions, base };