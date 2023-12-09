import { execaCommand } from "execa";
import { expect } from "vitest";
import { test } from "vitest";

import { filesExpectedToBeChanged } from "./constants.js";

test.each([...filesExpectedToBeChanged])("verify %s", async (file) => {
	const { stdout } = await execaCommand(`git diff HEAD -- ${file}`);
	expect(stdout).toMatchSnapshot();
});
