import { $, execaCommand } from "execa";
import { strict as assert } from "node:assert";

const author = "Test Author";
const description = "Test description.";
const email = "test@email.com";
const repository = "test-repository";
const owner = "TestOwner";
const title = "Test Title";

await $`rm -rf ${repository}`;

await $({
	stdio: "inherit",
})`c8 -o ./coverage-create -r html -r lcov  --src src node ./bin/index.js --base everything --mode create --author ${author} --email ${email} --description ${description} --owner ${owner} --title ${title} --repository ${repository} --exclude-contributors --skip-github-api`;

process.chdir(repository);

const failures = [];

for (const command of [
	`pnpm i`,
	`pnpm run build`,
	`pnpm run format --list-different`,
	`pnpm run lint`,
	`pnpm run lint:md`,
	`pnpm run lint:package-json`,
	`pnpm run lint:packages`,
	`pnpm run lint:spelling`,
	`pnpm run lint:knip`,
	`pnpm run test run`,
	`pnpm run tsc`,
]) {
	const result = await execaCommand(command, { stdio: "inherit" });

	if (result.exitCode) {
		failures.push({ command, result });
	}
}

assert.deepEqual(failures, []);
