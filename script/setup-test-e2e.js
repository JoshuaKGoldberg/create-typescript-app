/* global $ */

import { strict as assert } from "node:assert";

import { promises as fs } from "fs";

const description = "New Description Test";
const owner = "NewOwnerTest";
const title = "New Title Test";
const repository = "new-repository-test";

const result =
	await $`pnpm run setup --description ${description} --owner ${owner} --title ${title} --repository ${repository} --skip-api`;
console.log({ result });

const newPackageJson = JSON.parse(
	(await fs.readFile("./package.json")).toString()
);

assert.equal(newPackageJson.description, description);
assert.equal(newPackageJson.name, repository);

for (const search of [
	`/JoshuaKGoldberg/`,
	"template-typescript-node-package",
]) {
	const grepResult =
		await $`grep --exclude script/setup.js --exclude script/setup-test-e2e.js --exclude-dir node_modules -i ${search} *.* **/*.*`;
	assert.equal(
		grepResult.stdout.trim(),
		`README.md:> 💙 This package is based on [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)'s [template-typescript-node-package](https://github.com/JoshuaKGoldberg/template-typescript-node-package).`
	);
}
