import chalk from "chalk";
import { $, execaCommand } from "execa";
import { assert, expect, test } from "vitest";

import packageData from "../package.json" assert { type: "json" };

const filesExpectedToBeChanged = new Set([
	".all-contributorsrc",
	"bin/index.js",
	"README.md",
	"knip.jsonc",
	"package.json",
	".eslintignore",
	".eslintrc.cjs",
	".github/DEVELOPMENT.md",
	".github/workflows/lint-knip.yml",
	".github/workflows/test.yml",
	".gitignore",
	".prettierignore",
	"cspell.json",
]);

const {
	author: { email: emailNpm, name: authorName },
	description,
	name: repository,
} = packageData;
const emailGithub = "github@joshuakgoldberg.com";
const bin = "./bin/index.js";
const guide =
	"https://www.joshuakgoldberg.com/blog/contributing-to-a-create-typescript-app-repository";
const guideTitle = "Contributing to a create-typescript-app Repository";
const owner = "JoshuaKGoldberg";
const title = "Create TypeScript App";

await $({
	stdio: "inherit",
})`c8 -o ./coverage -r html -r lcov --src src node ${bin} --base everything --author ${authorName} --mode migrate --bin ${bin} --description ${description} --email-github ${emailGithub} --email-npm ${emailNpm} --guide ${guide} --guide-title ${guideTitle} --owner ${owner} --title ${title} --repository ${repository} --skip-all-contributors-api --skip-github-api --skip-install`;

test.each([...filesExpectedToBeChanged])("verify %s", async (file) => {
	const { stdout } = await execaCommand(`git diff HEAD -- ${file}`);
	expect(stdout.split("\n").slice(2).join("\n")).toMatchSnapshot();
});

// eslint-disable-next-line vitest/expect-expect
test("check for unstagedModifiedFiles", async () => {
	const { stdout: gitStatus } = await $`git status`;
	console.log(`Stdout from running \`git status\`:\n${gitStatus}`);

	const indexOfUnstagedFilesMessage = gitStatus.indexOf(
		"Changes not staged for commit:",
	);
	assert(
		indexOfUnstagedFilesMessage !== -1,
		`Looks like migrate didn't cause any file changes? That's ...probably incorrect? 😬`,
	);

	const unstagedModifiedFiles = gitStatus
		.slice(indexOfUnstagedFilesMessage)
		.match(/modified: {3}(\S+)\n/g)
		.map((match) => match.split(/\s+/g)[1])
		.filter((filePath) => !filesExpectedToBeChanged.has(filePath));

	console.log("Unexpected modified files are:", unstagedModifiedFiles);

	if (unstagedModifiedFiles.length) {
		const gitDiffCommand = `git diff HEAD -- ${unstagedModifiedFiles.join(
			" ",
		)}`;
		console.log(
			`Stdout from running \`${gitDiffCommand}\`:\n${
				(await execaCommand(gitDiffCommand)).stdout
			}`,
		);
		throw new Error(
			[
				"",
				"Oh no! Running the migrate script modified some files:",
				...unstagedModifiedFiles.map((filePath) => ` - ${filePath}`),
				"",
				"That likely indicates changes made to the repository without",
				"corresponding updates to templates in src/.",
				"",
				"Please search for those file(s)' name(s) under src/migrate for",
				"the corresponding template and update those as well.",
			]
				.map((line) => chalk.red(line))
				.join("\n"),
		);
	}
});
