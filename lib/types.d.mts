//#region src/types.d.ts
interface AllContributorContributor {
  avatar_url: string;
  contributions: string[];
  login: string;
  name: string;
  profile: string;
}
interface AllContributorsData {
  contributors: AllContributorContributor[];
}
interface PartialPackageData {
  author?: string | {
    email?: string;
    name?: string;
  };
  bin?: Record<string, string> | string;
  dependencies?: Record<string, string>;
  description?: string;
  devDependencies?: Record<string, string>;
  email?: string;
  engines?: {
    node?: string;
  };
  keywords?: string[];
  name?: string;
  packageManager?: string;
  publishConfig?: PartialPublishConfig;
  repository?: string | {
    type: string;
    url: string;
  };
  scripts?: Record<string, string>;
  type?: "commonjs" | "module";
  version?: string;
}
interface PartialPublishConfig {
  access?: "public" | "restricted";
}
//#endregion
export { AllContributorContributor, AllContributorsData, PartialPackageData };