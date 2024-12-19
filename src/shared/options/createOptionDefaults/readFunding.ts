import fs from "node:fs/promises";
import path from "node:path";

import { tryCatchAsync } from "../../tryCatchAsync.js";

export async function readFunding(directory: string) {
	return await tryCatchAsync(async () =>
		(await fs.readFile(path.join(directory, ".github/FUNDING.yml")))
			.toString()
			.split(":")[1]
			?.trim(),
	);
}
