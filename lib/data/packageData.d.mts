import { package_json_d_exports } from "../package.json.mjs";
//#region src/data/packageData.d.ts
declare const packageData: typeof package_json_d_exports;
declare function getPackageDependencies(...names: string[]): {
  [k: string]: string;
};
declare function getPackageDependency(name: string): string;
//#endregion
export { getPackageDependencies, getPackageDependency, packageData };