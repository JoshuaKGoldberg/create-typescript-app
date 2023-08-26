import { $ } from "execa";
import fs from "node:fs/promises";
import prettier from "prettier";

import { readFileSafeAsJson } from "../shared/readFileSafeAsJson.js";
import { AllContributorsData, Options } from "../shared/types.js";

export async function updateAllContributorsTable({
	owner,
	repository,
}: Pick<Options, "owner" | "repository">) {
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

	await $`npx -y all-contributors-cli generate`;
}
