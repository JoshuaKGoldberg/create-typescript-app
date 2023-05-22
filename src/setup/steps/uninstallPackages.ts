import { $ } from "execa";

export async function uninstallPackages() {
	await $`pnpm remove chalk execa js-yaml`;
	await $`pnpm remove @clack/prompts @octokit/request-error @types/js-yaml @types/prettier all-contributors-cli globby octokit npm-user replace-in-file title-case tsx -D`;
}
