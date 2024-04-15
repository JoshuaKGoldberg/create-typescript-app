import { $ } from "execa";
import { globby } from "globby";
import { strict as assert } from "node:assert";
import * as fs from "node:fs/promises";
import { rimraf } from "rimraf";

const description = "New Description Test";
const owner = "RNR1";
const title = "New Title Test";
const repository = "new-repository-test";

await rimraf("coverage*");

// Fist we run with --mode initialize to modify the local repository files,
// asserting that the created package.json keeps the general description.
await $({
	stdio: "inherit",
})`pnpm run initialize --base everything --mode initialize --description ${description} --owner ${owner} --title ${title} --repository ${repository} --skip-all-contributors-api --skip-github-api --skip-restore`;

const newPackageJson = JSON.parse(
	(await fs.readFile("./package.json")).toString(),
) as Record<string, string>;
console.log("New package JSON:", newPackageJson);

assert.equal(newPackageJson.description, description);
assert.equal(newPackageJson.name, repository);

// Assert that the initialize script used the provided values in files,
// except for the 'This package was templated with ...' attribution notice.
const files = await globby(["*.*", "**/*.*"], {
	gitignore: true,
	ignoreFiles: ["script/initialize-test-e2e.js"],
});

for (const search of [`/JoshuaKGoldberg/`, "create-typescript-app"]) {
	const { stdout } = await $`grep -i ${search} ${files}`;
	assert.equal(
		stdout,
		`README.md:> 💙 This package was templated with [\`create-typescript-app\`](https://github.com/JoshuaKGoldberg/create-typescript-app).`,
	);
}

// Use Knip to assert that none of the template-only dependencies remain.
// They should have been removed as part of initialization.
try {
	await $`pnpm run lint:knip`;
} catch (error) {
	throw new Error(
		`Error running lint:knip: ${(error as Error).stack ?? (error as string)}`,
	);
}

// Now that initialize has passed normal steps, we reset everything,
// then run again without removing files - so we can capture test coverage
await $`git add -A`;
await $`git reset --hard HEAD`;
await $`pnpm i`;
await $`pnpm run build`;
await $({
	stdio: "inherit",
})`c8 -o ./coverage -r html -r lcov --src src node ./bin/index.js --base everything --mode initialize --description ${description} --owner ${owner} --title ${title} --repository ${repository} --skip-all-contributors-api --skip-github-api --skip-removal --skip-restore`;
