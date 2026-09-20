import { TakeInput } from "bingo";
import { inputFromFile } from "input-from-file";

import { getYamlSteps } from "../blocks/actions/steps.ts";
import {
	codecovTokenSecret,
	findCodecovStep,
} from "../blocks/codecov/findCodecovStep.ts";
import { loadYamlSafe } from "../blocks/intake/intakeFileAsYaml.ts";
import { swallowError } from "../utils/swallowError.ts";

export async function readCodecovToken(take: TakeInput) {
	const steps = await readTestSteps(take);
	const step = steps && findCodecovStep(steps);

	return step && step.env?.CODECOV_TOKEN === codecovTokenSecret;
}

async function readTestSteps(take: TakeInput) {
	for (const fileName of ["ci.yaml", "ci.yml"]) {
		const contents = swallowError(
			await take(inputFromFile, { filePath: `.github/workflows/${fileName}` }),
		);
		if (contents) {
			return getYamlSteps(loadYamlSafe(contents), ["jobs", "test", "steps"]);
		}
	}

	return undefined;
}
