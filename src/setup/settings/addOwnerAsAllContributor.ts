import chalk from "chalk";
import { $ } from "execa";
import fs from "node:fs/promises";
import prettier from "prettier";

import { readFileAsJson } from "../../shared/readFileAsJson.js";

interface GhUserOutput {
	login: string;
}

export async function addOwnerAsAllContributor(owner: string) {
	let user: string;
	try {
		user = (JSON.parse((await $`gh api user`).stdout) as GhUserOutput).login;
	} catch {
		console.warn(
			chalk.gray(
				`Couldn't authenticate GitHub user, falling back to the provided owner name '${owner}'.`,
			),
		);
		user = owner;
	}

	await $`npx -y all-contributors-cli@6.25 add ${user} ${[
		"code",
		"content",
		"doc",
		"ideas",
		"infra",
		"maintenance",
		"projectManagement",
		"tool",
	].join(",")}`;

	const existingContributors = (await readFileAsJson(
		"./.all-contributorsrc",
	)) as AllContributorsData;
	if (!isValidAllContributorsData(existingContributors)) {
		throw new Error(
			`Invalid .all-contributorsrc: ${JSON.stringify(existingContributors)}`,
		);
	}

	await fs.writeFile(
		"./.all-contributorsrc",
		await prettier.format(
			JSON.stringify({
				...existingContributors,
				contributors: existingContributors.contributors
					.filter(({ login }) => ["JoshuaKGoldberg", user].includes(login))
					.map((contributor) =>
						contributor.login === "JoshuaKGoldberg"
							? { ...contributor, contributions: ["tool"] }
							: contributor,
					),
			}),
			{ parser: "json" },
		),
	);
}

interface AllContributorsData {
	contributors: { contributions: string[]; login: string }[];
}

function isValidAllContributorsData(
	value: unknown,
): value is AllContributorsData {
	return !!value && typeof value === "object" && "contributors" in value;
}
