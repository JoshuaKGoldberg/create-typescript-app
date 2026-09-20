import { JobOrRunStep } from "../actions/steps.ts";

export const codecovTokenSecret = "${{ secrets.CODECOV_TOKEN }}";

export function findCodecovStep(steps: JobOrRunStep[]) {
	return steps.find(
		(step) =>
			typeof step.uses === "string" &&
			step.uses.startsWith("codecov/codecov-action"),
	);
}
