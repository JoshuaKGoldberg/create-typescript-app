import { strict as assert } from "node:assert";

import { $ } from "execa";
import { promises as fs } from "fs";
import { globby } from "globby";

const description = "New Description Test";
const repository = "new-repository-test";

const result = await $`node ./lib/hydrate/index.js`;
console.log("Result from node ./lib/hydrate/index.js:", result);

const gitStatus = await $`git status`;
console.log("Git status:", gitStatus);

// const newPackageJson = JSON.parse(
// 	(await fs.readFile("./package.json")).toString()
// );
// console.log("New package JSON:", newPackageJson);

// assert.equal(newPackageJson.description, description);
// assert.equal(newPackageJson.name, repository);

// const files = await globby(["*.*", "**/*.*"], {
// 	gitignore: true,
// 	ignoreFiles: ["script/setup.js", "script/setup-test-e2e.js"],
// });

// for (const search of [
// 	`/JoshuaKGoldberg/`,
// 	"template-typescript-node-package",
// ]) {
// 	const { stdout } = await $`grep -i ${search} ${files}`;
// 	assert.equal(
// 		stdout,
// 		`README.md:> 💙 This package is based on [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)'s [template-typescript-node-package](https://github.com/JoshuaKGoldberg/template-typescript-node-package).`
// 	);
// }

// try {
// 	await $`pnpm run lint:knip`;
// } catch (error) {
// 	console.error("Error running lint:knip:", error);
// 	process.exitCode = 1;
// }
