import { strict as assert } from "node:assert";

import { $ } from "execa";
import { readPackageUp } from "read-pkg-up";

const description = "New Description Test";
const owner = "NewOwnerTest";
const title = "New Title Test";
const repository = "new-repository-test";

const result =
	await $`pnpm run setup --description ${description} --owner ${owner} --title ${title} --repository ${repository} --skip-api`;
console.log("Result from pnpm run setup:", result);

const { packageJson: newPackageJson } = await readPackageUp();
console.log("New package JSON:", newPackageJson);

assert.equal(newPackageJson.description, description);
assert.equal(newPackageJson.name, repository);

for (const search of [
	`/JoshuaKGoldberg/`,
	"template-typescript-node-package",
]) {
	const { stdout } = await $({
		shell: true,
	})`grep --exclude script/setup.js --exclude script/setup-test-e2e.js --exclude-dir node_modules -i ${search} *.* **/*.*`;
	assert.equal(
		stdout,
		`README.md:> 💙 This package is based on [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)'s [template-typescript-node-package](https://github.com/JoshuaKGoldberg/template-typescript-node-package).`
	);
}

try {
	await $`pnpm lint:knip`;
} catch (error) {
	console.error("Error running lint:knip:", error);
	process.exitCode = 1;
}
