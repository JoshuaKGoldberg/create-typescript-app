import { $ } from "execa";

export async function uninstallPackages() {
	await $`pnpm remove @clack/prompts chalk execa git-remote-origin-url git-url-parse js-yaml npm-user prettier title-case`;
	await $`pnpm remove @octokit/request-error @types/git-url-parse @types/js-yaml @types/prettier all-contributors-cli c8 globby octokit replace-in-file tsx -D`;
	await $`pnpm add prettier -D`;
}
