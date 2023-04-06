import { strict as assert } from "node:assert";

import { $ } from "execa";
import { promises as fs } from "fs";

const description = "New Description Test";
const owner = "NewOwnerTest";
const title = "New Title Test";
const repository = "new-repository-test";

const result =
	await $`pnpm run setup --description ${description} --owner ${owner} --title ${title} --repository ${repository} --skip-api`;
console.log("Result from pnpm run setup:", result);

const newPackageJson = JSON.parse(
	(await fs.readFile("./package.json")).toString()
);
console.log("New package JSON:", newPackageJson);

assert.equal(newPackageJson.description, description);
assert.equal(newPackageJson.name, repository);

for (const search of [
	`/JoshuaKGoldberg/`,
	"template-typescript-node-package",
]) {
	const { stdout } = await $({
		// Todo: it'd be nice to not have to use this... but we haven't figured out how yet.
		// https://github.com/JoshuaKGoldberg/template-typescript-node-package/issues/357
		shell: true,
	})`grep --exclude script/setup.js --exclude script/setup-test-e2e.js --exclude-dir node_modules -i ${search} *.* **/*.*`;
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
