import { $ } from "execa";
import fs from "node:fs/promises";
import prettier from "prettier";

import { InputValues } from "../../shared/inputs.js";
import { readFileSafeAsJson } from "../../shared/readFileSafeAsJson.js";
import { AllContributorsData } from "../../shared/types.js";

export async function updateAllContributorsTable({
	owner,
	repository,
}: Pick<InputValues, "owner" | "repository">) {
	await fs.writeFile(
		".all-contributorsrc",
		await prettier.format(
			JSON.stringify({
				...((await readFileSafeAsJson(
					".all-contributorsrc",
				)) as AllContributorsData),
				projectName: repository,
				projectOwner: owner,
			}),
			{ parser: "json" },
		),
	);

	await $`npx all-contributors-cli generate`;
}
