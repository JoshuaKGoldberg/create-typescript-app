import fs from "node:fs/promises";

export async function readFundingIfExists() {
	try {
		return (await fs.readFile(".github/FUNDING.yml"))
			.toString()
			.split(":")[1]
			?.trim();
	} catch {
		return undefined;
	}
}
