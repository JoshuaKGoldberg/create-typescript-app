import fs from "node:fs/promises";

import { tryCatchAsync } from "../utils/tryCatchAsync.js";

export async function readFunding() {
	return await tryCatchAsync(async () =>
		(await fs.readFile(".github/FUNDING.yml")).toString().split(":")[1]?.trim(),
	);
}
