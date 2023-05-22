import chalk from "chalk";
import { $ } from "execa";

await $({
	stdio: "inherit",
})`c8 -o ./coverage-hydrate -r html -r lcov node ./lib/hydrate/index.js`;

const { stdout: gitStatus } = await $`git status`;
console.log(`Stdout from running \`git status\`:\n${gitStatus}`);

const indexOfUnstagedFilesMessage = gitStatus.indexOf(
	"Changes not staged for commit:"
);
if (indexOfUnstagedFilesMessage === -1) {
	throw new Error(
		`Looks like hydrate didn't cause any file changes? That's ...probably incorrect? 😬`
	);
}

const filesExpectedToBeChanged = new Set([
	".all-contributorsrc",
	"README.md",
	"knip.jsonc",
	"package.json",
	"pnpm-lock.yaml",
	".eslintignore",
	".eslintrc.cjs",
	".github/DEVELOPMENT.md",
	".github/workflows/release.yml",
	".github/workflows/test.yml",
	".gitignore",
	".prettierignore",
	".release-it.json",
	"cspell.json",
]);

const unstagedModifiedFiles = gitStatus
	.slice(indexOfUnstagedFilesMessage)
	.match(/modified: {3}(\S+)\n/g)
	.map((match) => match.split(/\s+/g)[1])
	.filter((filePath) => !filesExpectedToBeChanged.has(filePath));

console.log("Unexpected modified files are:", unstagedModifiedFiles);

if (unstagedModifiedFiles.length) {
	const gitDiffCommand = `git diff HEAD -- ${unstagedModifiedFiles.join(" ")}`;
	console.log(
		`Stdout from running \`${gitDiffCommand}\`:\n${
			(await $(gitDiffCommand)).stdout
		}`
	);
	console.error(
		[
			"",
			"Oh no! Running the hydrate script modified some files:",
			...unstagedModifiedFiles.map((filePath) => ` - ${filePath}`),
			"",
			"That likely indicates changes made to the repository without",
			"corresponding updates to templates in src/hydrate/creation.",
			"",
			"Please search for those file(s)' name(s) under src/hydrate for",
			"the corresponding template and update those as well.",
		]
			.map((line) => chalk.red(line))
			.join("\n")
	);
	process.exitCode = 1;
}
