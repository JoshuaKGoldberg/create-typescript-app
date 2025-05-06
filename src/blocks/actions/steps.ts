import { IntakeDirectory } from "bingo-fs";
import _ from "lodash";
import { z } from "zod";

import { intakeFileAsYaml } from "../intake/intakeFileAsYaml.js";

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

export function intakeFileYamlSteps(
	files: IntakeDirectory,
	filePath: string[],
	ymlPath: string[],
) {
	const actionYml = intakeFileAsYaml(files, filePath);
	if (!actionYml) {
		return undefined;
	}

	const steps = _.get(actionYml, ymlPath) as JobOrRunStep[] | undefined;
	if (!steps || !Array.isArray(steps)) {
		return undefined;
	}

	return steps;
}
