import { presetCommon } from "./common.mjs";
import { presetEverything } from "./everything.mjs";
import { presetMinimal } from "./minimal.mjs";
//#region src/presets/index.d.ts
declare const presets: {
  common: import("bingo-stratum").Preset<{
    access: import("zod").ZodUnion<[import("zod").ZodLiteral<"public">, import("zod").ZodLiteral<"restricted">]>;
    author: import("zod").ZodOptional<import("zod").ZodString>;
    bin: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>]>>;
    contributors: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
      avatar_url: import("zod").ZodString;
      contributions: import("zod").ZodArray<import("zod").ZodString, "many">;
      login: import("zod").ZodString;
      name: import("zod").ZodString;
      profile: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
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
    description: import("zod").ZodDefault<import("zod").ZodString>;
    directory: import("zod").ZodString;
    documentation: import("zod").ZodObject<{
      development: import("zod").ZodOptional<import("zod").ZodString>;
      readme: import("zod").ZodObject<{
        additional: import("zod").ZodOptional<import("zod").ZodString>;
        explainer: import("zod").ZodOptional<import("zod").ZodString>;
        footnotes: import("zod").ZodOptional<import("zod").ZodString>;
        usage: import("zod").ZodOptional<import("zod").ZodString>;
      }, "strip", import("zod").ZodTypeAny, {
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
    }, "strip", import("zod").ZodTypeAny, {
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
    email: import("zod").ZodEffects<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodObject<{
      github: import("zod").ZodString;
      npm: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
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
    emoji: import("zod").ZodOptional<import("zod").ZodString>;
    existingLabels: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
      color: import("zod").ZodString;
      description: import("zod").ZodString;
      name: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
      name: string;
      description: string;
      color: string;
    }, {
      name: string;
      description: string;
      color: string;
    }>, "many">>;
    funding: import("zod").ZodOptional<import("zod").ZodString>;
    guide: import("zod").ZodOptional<import("zod").ZodObject<{
      href: import("zod").ZodString;
      title: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
      href: string;
      title: string;
    }, {
      href: string;
      title: string;
    }>>;
    keywords: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
    logo: import("zod").ZodOptional<import("zod").ZodObject<{
      alt: import("zod").ZodString;
      height: import("zod").ZodOptional<import("zod").ZodNumber>;
      src: import("zod").ZodString;
      width: import("zod").ZodOptional<import("zod").ZodNumber>;
    }, "strip", import("zod").ZodTypeAny, {
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
    node: import("zod").ZodObject<{
      minimum: import("zod").ZodString;
      pinned: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
      minimum: string;
      pinned?: string | undefined;
    }, {
      minimum: string;
      pinned?: string | undefined;
    }>;
    owner: import("zod").ZodString;
    packageData: import("zod").ZodOptional<import("zod").ZodObject<{
      dependencies: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
      devDependencies: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
      peerDependencies: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
      peerDependenciesMeta: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnknown>>;
      scripts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodOptional<import("zod").ZodString>>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    pnpm: import("zod").ZodOptional<import("zod").ZodString>;
    repository: import("zod").ZodString;
    rulesetId: import("zod").ZodOptional<import("zod").ZodString>;
    title: import("zod").ZodString;
    type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"commonjs">, import("zod").ZodLiteral<"module">]>>;
    version: import("zod").ZodOptional<import("zod").ZodString>;
    words: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
    workflowsVersions: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
      hash: import("zod").ZodOptional<import("zod").ZodString>;
      pinned: import("zod").ZodOptional<import("zod").ZodBoolean>;
    }, "strip", import("zod").ZodTypeAny, {
      pinned?: boolean | undefined;
      hash?: string | undefined;
    }, {
      pinned?: boolean | undefined;
      hash?: string | undefined;
    }>>>>;
  }>;
  everything: import("bingo-stratum").Preset<{
    access: import("zod").ZodUnion<[import("zod").ZodLiteral<"public">, import("zod").ZodLiteral<"restricted">]>;
    author: import("zod").ZodOptional<import("zod").ZodString>;
    bin: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>]>>;
    contributors: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
      avatar_url: import("zod").ZodString;
      contributions: import("zod").ZodArray<import("zod").ZodString, "many">;
      login: import("zod").ZodString;
      name: import("zod").ZodString;
      profile: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
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
    description: import("zod").ZodDefault<import("zod").ZodString>;
    directory: import("zod").ZodString;
    documentation: import("zod").ZodObject<{
      development: import("zod").ZodOptional<import("zod").ZodString>;
      readme: import("zod").ZodObject<{
        additional: import("zod").ZodOptional<import("zod").ZodString>;
        explainer: import("zod").ZodOptional<import("zod").ZodString>;
        footnotes: import("zod").ZodOptional<import("zod").ZodString>;
        usage: import("zod").ZodOptional<import("zod").ZodString>;
      }, "strip", import("zod").ZodTypeAny, {
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
    }, "strip", import("zod").ZodTypeAny, {
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
    email: import("zod").ZodEffects<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodObject<{
      github: import("zod").ZodString;
      npm: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
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
    emoji: import("zod").ZodOptional<import("zod").ZodString>;
    existingLabels: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
      color: import("zod").ZodString;
      description: import("zod").ZodString;
      name: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
      name: string;
      description: string;
      color: string;
    }, {
      name: string;
      description: string;
      color: string;
    }>, "many">>;
    funding: import("zod").ZodOptional<import("zod").ZodString>;
    guide: import("zod").ZodOptional<import("zod").ZodObject<{
      href: import("zod").ZodString;
      title: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
      href: string;
      title: string;
    }, {
      href: string;
      title: string;
    }>>;
    keywords: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
    logo: import("zod").ZodOptional<import("zod").ZodObject<{
      alt: import("zod").ZodString;
      height: import("zod").ZodOptional<import("zod").ZodNumber>;
      src: import("zod").ZodString;
      width: import("zod").ZodOptional<import("zod").ZodNumber>;
    }, "strip", import("zod").ZodTypeAny, {
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
    node: import("zod").ZodObject<{
      minimum: import("zod").ZodString;
      pinned: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
      minimum: string;
      pinned?: string | undefined;
    }, {
      minimum: string;
      pinned?: string | undefined;
    }>;
    owner: import("zod").ZodString;
    packageData: import("zod").ZodOptional<import("zod").ZodObject<{
      dependencies: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
      devDependencies: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
      peerDependencies: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
      peerDependenciesMeta: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnknown>>;
      scripts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodOptional<import("zod").ZodString>>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    pnpm: import("zod").ZodOptional<import("zod").ZodString>;
    repository: import("zod").ZodString;
    rulesetId: import("zod").ZodOptional<import("zod").ZodString>;
    title: import("zod").ZodString;
    type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"commonjs">, import("zod").ZodLiteral<"module">]>>;
    version: import("zod").ZodOptional<import("zod").ZodString>;
    words: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
    workflowsVersions: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
      hash: import("zod").ZodOptional<import("zod").ZodString>;
      pinned: import("zod").ZodOptional<import("zod").ZodBoolean>;
    }, "strip", import("zod").ZodTypeAny, {
      pinned?: boolean | undefined;
      hash?: string | undefined;
    }, {
      pinned?: boolean | undefined;
      hash?: string | undefined;
    }>>>>;
  }>;
  minimal: import("bingo-stratum").Preset<{
    access: import("zod").ZodUnion<[import("zod").ZodLiteral<"public">, import("zod").ZodLiteral<"restricted">]>;
    author: import("zod").ZodOptional<import("zod").ZodString>;
    bin: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>]>>;
    contributors: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
      avatar_url: import("zod").ZodString;
      contributions: import("zod").ZodArray<import("zod").ZodString, "many">;
      login: import("zod").ZodString;
      name: import("zod").ZodString;
      profile: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
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
    description: import("zod").ZodDefault<import("zod").ZodString>;
    directory: import("zod").ZodString;
    documentation: import("zod").ZodObject<{
      development: import("zod").ZodOptional<import("zod").ZodString>;
      readme: import("zod").ZodObject<{
        additional: import("zod").ZodOptional<import("zod").ZodString>;
        explainer: import("zod").ZodOptional<import("zod").ZodString>;
        footnotes: import("zod").ZodOptional<import("zod").ZodString>;
        usage: import("zod").ZodOptional<import("zod").ZodString>;
      }, "strip", import("zod").ZodTypeAny, {
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
    }, "strip", import("zod").ZodTypeAny, {
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
    email: import("zod").ZodEffects<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodObject<{
      github: import("zod").ZodString;
      npm: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
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
    emoji: import("zod").ZodOptional<import("zod").ZodString>;
    existingLabels: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
      color: import("zod").ZodString;
      description: import("zod").ZodString;
      name: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
      name: string;
      description: string;
      color: string;
    }, {
      name: string;
      description: string;
      color: string;
    }>, "many">>;
    funding: import("zod").ZodOptional<import("zod").ZodString>;
    guide: import("zod").ZodOptional<import("zod").ZodObject<{
      href: import("zod").ZodString;
      title: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
      href: string;
      title: string;
    }, {
      href: string;
      title: string;
    }>>;
    keywords: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
    logo: import("zod").ZodOptional<import("zod").ZodObject<{
      alt: import("zod").ZodString;
      height: import("zod").ZodOptional<import("zod").ZodNumber>;
      src: import("zod").ZodString;
      width: import("zod").ZodOptional<import("zod").ZodNumber>;
    }, "strip", import("zod").ZodTypeAny, {
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
    node: import("zod").ZodObject<{
      minimum: import("zod").ZodString;
      pinned: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
      minimum: string;
      pinned?: string | undefined;
    }, {
      minimum: string;
      pinned?: string | undefined;
    }>;
    owner: import("zod").ZodString;
    packageData: import("zod").ZodOptional<import("zod").ZodObject<{
      dependencies: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
      devDependencies: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
      peerDependencies: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
      peerDependenciesMeta: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnknown>>;
      scripts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodOptional<import("zod").ZodString>>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    pnpm: import("zod").ZodOptional<import("zod").ZodString>;
    repository: import("zod").ZodString;
    rulesetId: import("zod").ZodOptional<import("zod").ZodString>;
    title: import("zod").ZodString;
    type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"commonjs">, import("zod").ZodLiteral<"module">]>>;
    version: import("zod").ZodOptional<import("zod").ZodString>;
    words: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
    workflowsVersions: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
      hash: import("zod").ZodOptional<import("zod").ZodString>;
      pinned: import("zod").ZodOptional<import("zod").ZodBoolean>;
    }, "strip", import("zod").ZodTypeAny, {
      pinned?: boolean | undefined;
      hash?: string | undefined;
    }, {
      pinned?: boolean | undefined;
      hash?: string | undefined;
    }>>>>;
  }>;
};
//#endregion
export { presetCommon, presetEverything, presetMinimal, presets };