import { intakeFileAsYaml } from "../intake/intakeFileAsYaml.mjs";
import { z } from "zod";
import _ from "lodash";
//#region src/blocks/actions/steps.ts
const zActionStep = z.intersection(z.object({
	env: z.record(z.string(), z.string()).optional(),
	if: z.string().optional(),
	with: z.record(z.string(), z.string()).optional()
}), z.union([z.object({ run: z.string() }), z.object({ uses: z.string() })]));
function intakeFileYamlSteps(files, filePath, ymlPath) {
	const actionYml = intakeFileAsYaml(files, filePath);
	if (!actionYml) return;
	const steps = _.get(actionYml, ymlPath);
	if (!steps || !Array.isArray(steps)) return;
	return steps;
}
//#endregion
export { intakeFileYamlSteps, zActionStep };
