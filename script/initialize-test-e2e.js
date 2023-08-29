import { $ } from "execa";
import { globby } from "globby";
import { strict as assert } from "node:assert";
import fs from "node:fs/promises";

const description = "New Description Test";
const owner = "RNR1";
const title = "New Title Test";
const repository = "new-repository-test";

// First we run initialize to modifies the local repo, so we can test the changes
await $({
	stdio: "inherit",
})`node ./bin/index.js --description ${description} --base everything --mode initialize --owner ${owner} --title ${title} --repository ${repository} --skip-github-api --skip-restore`;

const newPackageJson = JSON.parse(
	(await fs.readFile("./package.json")).toString(),
);
console.log("New package JSON:", newPackageJson);

assert.equal(newPackageJson.description, description);
assert.equal(newPackageJson.name, repository);

const files = await globby(["*.*", "**/*.*"], {
	gitignore: true,
	ignoreFiles: ["script/initialize-test-e2e.js"],
});

for (const search of [`/JoshuaKGoldberg/`, "create-typescript-app"]) {
	const { stdout } = await $`grep -i ${search} ${files}`;
	assert.equal(
		stdout,
		`README.md:> 💙 This package is based on [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)'s [create-typescript-app](https://github.com/JoshuaKGoldberg/create-typescript-app).`,
	);
}

try {
	await $`pnpm run lint:knip`;
} catch (error) {
	console.error("Error running lint:knip:", error);
	process.exitCode = 1;
}

// Now that initialize has passed normal steps, we reset everything,
// then run again without removing files - so we can capture test coverage
await $`git add -A`;
await $`git reset --hard HEAD`;
await $`pnpm i`;
await $`pnpm run build`;
await $({
	stdio: "inherit",
})`c8 -o ./coverage-initialize -r html -r lcov --src src node ./bin/index.js --base everything --description ${description} --mode initialize --owner ${owner} --title ${title} --repository ${repository} --exclude-contributors --skip-github-api --skip-removal --skip-restore`;
