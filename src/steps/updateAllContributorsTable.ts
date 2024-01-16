import { $ } from "execa";
import * as fs from "node:fs/promises";

import { readFileSafeAsJson } from "../shared/readFileSafeAsJson.js";
import { AllContributorsData, Options } from "../shared/types.js";
import { formatJson } from "./writing/creation/formatters/formatJson.js";

export async function updateAllContributorsTable({
	owner,
	repository,
}: Pick<Options, "owner" | "repository">) {
	await fs.writeFile(
		".all-contributorsrc",
		await formatJson({
			...((await readFileSafeAsJson(
				".all-contributorsrc",
			)) as AllContributorsData),
			projectName: repository,
			projectOwner: owner,
		}),
	);

	await $`npx -y all-contributors-cli generate`;
}
