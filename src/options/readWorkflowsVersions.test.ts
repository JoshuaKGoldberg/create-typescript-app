import { inputFromFile } from "input-from-file";
import { describe, expect, it } from "vitest";

import { inputFromDirectory } from "../inputs/inputFromDirectory.ts";
import { readWorkflowsVersions } from "./readWorkflowsVersions.ts";

function createTake(files: Record<string, string>) {
	return (input: unknown, { directoryPath, filePath } = {} as never) => {
		if (input === inputFromDirectory) {
			const prefix = `${directoryPath as string}/`;
			return Promise.resolve([
				...new Set(
					Object.keys(files)
						.filter((key) => key.startsWith(prefix))
						.map((key) => key.slice(prefix.length).split("/")[0]),
				),
			]);
		}

		if (input === inputFromFile) {
			return Promise.resolve(files[filePath as string] ?? new Error("Nope"));
		}

		throw new Error(`Unexpected input: ${String(input)}`);
	};
}

describe(readWorkflowsVersions, () => {
	it("collects pinned versions and hashes from workflows and composite actions", async () => {
		const take = createTake({
			".github/actions/prepare/action.yaml": [
				"runs:",
				"  steps:",
				"    - uses: pnpm/action-setup@abc123 # v6",
			].join("\n"),
			".github/workflows/ci.yaml": [
				"jobs:",
				"  lint:",
				"    steps:",
				"      - uses: actions/checkout@v7",
			].join("\n"),
		});

		const actual = await readWorkflowsVersions(take as never);

		expect(actual).toEqual({
			"actions/checkout": { v7: { pinned: true } },
			"pnpm/action-setup": { v6: { hash: "abc123" } },
		});
	});

	it("collects a hash and version from a folded scalar uses", async () => {
		const take = createTake({
			".github/actions/transition/action.yml": [
				"runs:",
				"  steps:",
				"    - id: auto-commit-action",
				"      uses: >-",
				"        stefanzweifel/git-auto-commit-action@e348103e9026cc0eee72ae06630dbe30c8bf7a79",
				"        # v5",
				"      with:",
				"        commit_message: Example",
			].join("\n"),
		});

		const actual = await readWorkflowsVersions(take as never);

		expect(actual).toEqual({
			"stefanzweifel/git-auto-commit-action": {
				v5: { hash: "e348103e9026cc0eee72ae06630dbe30c8bf7a79" },
			},
		});
	});
});
