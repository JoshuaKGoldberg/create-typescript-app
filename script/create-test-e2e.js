import { $, execaCommand } from "execa";
import { strict as assert } from "node:assert";
import fs from "node:fs/promises";

const description = "Test description.";
const repository = "test-repository";
const owner = "TestOwner";
const title = "Test Title";

await fs.mkdir(repository);
process.chdir(repository);

await $({
	stdio: "inherit",
})`c8 -o ./coverage-create -r html -r lcov node ../bin/index.js  --mode create --description ${description} --owner ${owner} --title ${title} --repository ${repository} --skip-contributors --skip-github-api`;

const failures = [];

for (const command of [
	`pnpm i`,
	`pnpm run build`,
	`pnpm run format`,
	`pnpm run lint`,
	`pnpm run lint:md`,
	`pnpm run lint:package`,
	`pnpm run lint:packages`,
	`pnpm run lint:spelling`,
	`pnpm run lint:knip`,
	`pnpm run test`,
	`pnpm run tsc`,
]) {
	const result = await execaCommand(command, { stdio: "inherit" });

	if (result.exitCode) {
		failures.push({ command, result });
	}
}

assert.equal(failures, []);
