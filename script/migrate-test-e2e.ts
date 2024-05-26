import chalk from "chalk";
import { $, execaCommand } from "execa";
import * as fs from "node:fs/promises";
import { rimraf } from "rimraf";
import { assert, describe, expect, test } from "vitest";

import packageData from "../package.json" assert { type: "json" };

const filesExpectedToBeChanged = [
	"README.md",
	"knip.json",
	".github/workflows/test.yml",
	".gitignore",
	".prettierignore",
	"cspell.json",
	"eslint.config.js",
];

const filesThatMightBeChanged = new Set([
	...filesExpectedToBeChanged,
	"script/__snapshots__/migrate-test-e2e.ts.snap",
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
const logo = "./docs/create-typescript-app.png";
const logoAlt = `Project logo: the TypeScript blue square with rounded corners, but a plus sign instead of 'TS'`;
const owner = "JoshuaKGoldberg";
const title = "Create TypeScript App";

await rimraf("coverage*");

const originalReadme = (await fs.readFile("README.md")).toString();

const originalSnapshots = (
	await fs.readFile("script/__snapshots__/migrate-test-e2e.ts.snap")
).toString();

await $({
	stdio: "inherit",
})`c8 -o ./coverage -r html -r lcov --src src node ${bin} --base everything --author ${authorName} --mode migrate --bin ${bin} --description ${description} --email-github ${emailGithub} --email-npm ${emailNpm} --guide ${guide} --guide-title ${guideTitle} --logo ${logo} --logo-alt ${logoAlt} --owner ${owner} --title ${title} --repository ${repository} --skip-all-contributors-api --skip-github-api --skip-install`;

// All Contributors seems to not be using Prettier to format files...
await fs.writeFile(
	".all-contributorsrc",
	JSON.stringify(
		JSON.parse((await fs.readFile(".all-contributorsrc")).toString()),
		null,
		2,
	) + "\n",
);

// Ignore changes to the README.md all-contributor count and contributors table...
const updatedReadme = (await fs.readFile("README.md")).toString();
await fs.writeFile(
	"README.md",
	[
		updatedReadme.slice(0, updatedReadme.indexOf("## Contributors")) +
			originalReadme.slice(
				originalReadme.indexOf("## Contributors"),
				originalReadme.indexOf("<!-- markdownlint-restore -->"),
			),
		updatedReadme.slice(updatedReadme.indexOf("<!-- markdownlint-restore -->")),
	]
		.join("")
		.replace(
			/All Contributors: \d+/g,
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			originalReadme.match(/All Contributors: \d+/)![0],
		)
		.replace(
			/all_contributors-\d+/g,
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			originalReadme.match(/all_contributors-\d+/)![0],
		),
);

// ...and even to the snapshot file, so diffs don't mind it.
await fs.writeFile(
	"script/__snapshots__/migrate-test-e2e.ts.snap",
	originalSnapshots
		.replace(
			/All Contributors: \d+/g,
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			originalReadme.match(/All Contributors: \d+/)![0],
		)
		.replace(
			/all_contributors-\d+/g,
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			originalReadme.match(/all_contributors-\d+/)![0],
		),
);

describe("expected file changes", () => {
	test.each(filesExpectedToBeChanged)("%s", async (file) => {
		const { stdout } = await execaCommand(`git diff HEAD -- ${file}`);
		const contentsAfterGitMarkers = stdout
			.split("\n")
			.slice(2)
			.join("\n")
			.replace(/@@ -\d+,\d+ \+\d+,\d+ @@/g, "@@ ... @@");

		assert(
			stdout,
			`Looks like there were no changes to ${file} from migration?`,
		);

		// If this fails, see .github/DEVELOPMENT.md > Setup Scripts for context.
		// Then see .github/DEVELOPMENT.md > Migration Snapshot Failures.
		expect(contentsAfterGitMarkers).toMatchSnapshot();
	});
});

test("unexpected file changes", async () => {
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
		.match(/modified: {3}\S+\n/g)
		?.map((match) => match.split(/\s+/)[1])
		.filter((filePath) => !filesThatMightBeChanged.has(filePath));

	console.log("Unexpected modified files are:", unstagedModifiedFiles);

	if (unstagedModifiedFiles?.length) {
		const gitDiffCommand = `git diff HEAD -- ${unstagedModifiedFiles.join(
			" ",
		)}`;
		const { stdout } = await execaCommand(gitDiffCommand);

		console.log(`Stdout from running \`${gitDiffCommand}\`:\n${stdout}`);

		throw new Error(
			[
				"",
				"Oh no! Running the migrate script unexpectedly modified:",
				...unstagedModifiedFiles.map((filePath) => ` - ${filePath}`),
				"",
				"See .github/DEVELOPMENT.md > Setup Scripts for context.",
				"Then see .github/DEVELOPMENT.md > Unexpected File Modifications.",
			]
				.map((line) => chalk.red(line))
				.join("\n"),
		);
	}
});
