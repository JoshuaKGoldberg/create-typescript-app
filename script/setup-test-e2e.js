import { $ } from "execa";
import { promises as fs } from "fs";
import { globby } from "globby";
import { strict as assert } from "node:assert";

const description = "New Description Test";
const owner = "RNR1";
const title = "New Title Test";
const repository = "new-repository-test";

// First we run setup to modifies the local repo, so we can test the changes
await $({
	stdio: "inherit",
})`node ./lib/setup/index.js --description ${description} --owner ${owner} --title ${title} --repository ${repository} --skip-api --skip-restore`;

const newPackageJson = JSON.parse(
	(await fs.readFile("./package.json")).toString()
);
console.log("New package JSON:", newPackageJson);

assert.equal(newPackageJson.description, description);
assert.equal(newPackageJson.name, repository);

const files = await globby(["*.*", "**/*.*"], {
	gitignore: true,
	ignoreFiles: ["script/setup.js", "script/setup-test-e2e.js"],
});

for (const search of [
	`/JoshuaKGoldberg/`,
	"template-typescript-node-package",
]) {
	const { stdout } = await $`grep -i ${search} ${files}`;
	assert.equal(
		stdout,
		`README.md:> 💙 This package is based on [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)'s [template-typescript-node-package](https://github.com/JoshuaKGoldberg/template-typescript-node-package).`
	);
}

try {
	await $`pnpm run lint:knip`;
} catch (error) {
	console.error("Error running lint:knip:", error);
	process.exitCode = 1;
}

// Now that setup has passed normal steps, we reset everything,
// then run again without removing files - so we can capture test coverage
await $`git add -A`;
await $`git reset --hard HEAD`;
await $`pnpm i`;
await $`pnpm run build`;
await $({
	stdio: "inherit",
})`c8 -o ./coverage-setup -r html -r lcov node ./lib/setup/index.js --description ${description} --owner ${owner} --title ${title} --repository ${repository} --skip-api --skip-removal --skip-restore`;
