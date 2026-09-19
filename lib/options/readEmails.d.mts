import { PackageAuthor } from "./readPackageAuthor.mjs";
//#region src/options/readEmails.d.ts
declare function readEmails(getEmailFromCodeOfConduct: () => Promise<string | undefined>, getEmailFromGit: () => Promise<string | undefined>, getEmailFromNpm: () => Promise<string | undefined>, getPackageAuthor: () => Promise<PackageAuthor>): Promise<{
  github: string;
  npm: string;
} | undefined>;
//#endregion
export { readEmails };