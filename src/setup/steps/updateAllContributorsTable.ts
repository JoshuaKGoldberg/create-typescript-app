import fs from "node:fs/promises";

import prettier from "prettier";

import { InputValues } from "../settings/inputs.js";

export async function updateAllContributorsTable({
	owner,
	repository,
}: Pick<InputValues, "owner" | "repository">) {
	await fs.writeFile(
		".all-contributorsrc",
		prettier.format(
			JSON.stringify({
				...JSON.parse((await fs.readFile(".all-contributorsrc")).toString()),
				projectName: repository,
				projectOwner: owner,
			}),
			{ parser: "json" }
		)
	);
}
