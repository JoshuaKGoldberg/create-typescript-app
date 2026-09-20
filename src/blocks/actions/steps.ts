import { IntakeDirectory } from "bingo-fs";
import _ from "lodash";
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
	const steps = _.get(yaml, ymlPath) as JobOrRunStep[] | undefined;

	return Array.isArray(steps) ? steps : undefined;
}

export function intakeFileYamlSteps(
	files: IntakeDirectory,
	filePath: string[],
	ymlPath: string[],
) {
	const actionYml = intakeFileAsYaml(files, filePath);

	return actionYml ? getYamlSteps(actionYml, ymlPath) : undefined;
}
