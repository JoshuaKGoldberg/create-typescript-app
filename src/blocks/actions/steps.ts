import { IntakeDirectory } from "bingo-fs";
import { z } from "zod";

import { intakeFileAsYaml } from "../intake/intakeFileAsYaml.ts";

export const zActionStep = z.intersection(
	z.object({
		env: z.record(z.string(), z.string()).optional(),
		if: z.string().optional(),
		with: z.record(z.string(), z.string()).optional(),
	}),
	z.union([z.object({ run: z.string() }), z.object({ uses: z.string() })]),
);

export interface JobOrRunStep {
	env?: Record<string, string>;
	uses?: unknown;
	with?: Record<string, string>;
}

export function getYamlSteps(yaml: unknown, ymlPath: string[]) {
	const steps = ymlPath.reduce<unknown>(
		(value, key) =>
			value && typeof value === "object"
				? (value as Record<string, unknown>)[key]
				: undefined,
		yaml,
	);

	return Array.isArray(steps) ? (steps as JobOrRunStep[]) : undefined;
}

export function intakeFileYamlSteps(
	files: IntakeDirectory,
	filePath: string[],
	ymlPath: string[],
) {
	const actionYml = intakeFileAsYaml(files, filePath);

	return actionYml ? getYamlSteps(actionYml, ymlPath) : undefined;
}
