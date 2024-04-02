import * as fs from "node:fs/promises";
import * as path from "node:path";
import prettier from "prettier";

import { Structure } from "./types.js";

export async function writeStructureWorker(
	structure: Structure,
	basePath: string,
) {
	await fs.mkdir(basePath, { recursive: true });

	for (const [fileName, contents] of Object.entries(structure)) {
		const filePath = path.join(basePath, fileName);
		if (typeof contents === "string") {
			await fs.writeFile(filePath, await format(fileName, contents));
		} else {
			await writeStructureWorker(contents, filePath);
		}
	}
}

async function format(fileName: string, text: string) {
	const parser = inferParser(fileName, text);
	if (!parser) {
		return text;
	}

	return await prettier.format(text, {
		parser,
		useTabs: true,
	});
}

function inferParser(fileName: string, text: string) {
	if (text.startsWith("{")) {
		return "json";
	}

	switch (fileName.split(".").at(-1)) {
		case "cjs":
		case "js": {
			return "babel";
		}

		case "json": {
			return "json";
		}

		case "md": {
			return "markdown";
		}

		case "yml": {
			return "yaml";
		}
	}

	return undefined;
}
