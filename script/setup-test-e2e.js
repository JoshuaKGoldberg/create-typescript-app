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
