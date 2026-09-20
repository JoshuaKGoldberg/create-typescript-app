import { TakeInput } from "bingo";
import { inputFromFile } from "input-from-file";
import { load } from "js-yaml";
import _ from "lodash";

import { JobOrRunStep } from "../blocks/actions/steps.ts";
import { swallowError } from "../utils/swallowError.ts";

export const codecovTokenSecret = "${{ secrets.CODECOV_TOKEN }}";

export async function readCodecovToken(take: TakeInput) {
	const steps = await readTestSteps(take);
	const step = steps?.find(
		(step) =>
			typeof step.uses === "string" &&
			step.uses.startsWith("codecov/codecov-action"),
	);

	return step && step.env?.CODECOV_TOKEN === codecovTokenSecret;
}

async function readTestSteps(take: TakeInput) {
	for (const fileName of ["ci.yaml", "ci.yml"]) {
		const contents = swallowError(
			await take(inputFromFile, { filePath: `.github/workflows/${fileName}` }),
		);
		if (contents) {
			const steps = _.get(tryLoad(contents), ["jobs", "test", "steps"]) as
				JobOrRunStep[] | undefined;

			return Array.isArray(steps) ? steps : undefined;
		}
	}

	return undefined;
}

function tryLoad(contents: string) {
	try {
		return load(contents);
	} catch {
		return undefined;
	}
}
