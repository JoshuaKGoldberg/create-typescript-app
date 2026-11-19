import {
	MultiWorkflowJobOptions,
	MultiWorkflowJobStep,
} from "./createMultiWorkflowFile.ts";

// GitHub runs at most 10 background steps at once per job, queueing the rest:
// https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions
const maximumParallelSteps = 10;

/**
 * Merges jobs that each have at most one step (after any `pnpm build`) into a
 * single "CI" job that runs those steps in a `parallel:` group.
 * This skips repeating checkout and setup for every job.
 * Jobs that need their own checkout, condition, permissions, or multiple
 * sequential steps stay separate.
 */
export function groupParallelJobs(jobs: MultiWorkflowJobOptions[]) {
	const parallelJobs: MultiWorkflowJobOptions[] = [];
	const separateJobs: MultiWorkflowJobOptions[] = [];

	for (const job of jobs) {
		if (canRunInParallel(job) && parallelJobs.length < maximumParallelSteps) {
			parallelJobs.push(job);
		} else {
			separateJobs.push(job);
		}
	}

	const parallelSteps = parallelJobs.flatMap((job) =>
		job.steps
			.filter((step) => !isBuildStep(step))
			.map((step) => ({ name: job.name, ...step })),
	);

	if (parallelSteps.length < 2) {
		return jobs;
	}

	const needsBuild = parallelJobs.some((job) => job.steps.some(isBuildStep));

	return [
		{
			name: "CI",
			steps: [
				...(needsBuild ? [{ run: "pnpm build" }] : []),
				{ parallel: parallelSteps },
			],
		},
		...separateJobs,
	].toSorted((a, b) => a.name.localeCompare(b.name));
}

function canRunInParallel(job: MultiWorkflowJobOptions) {
	return (
		!job.checkoutWith &&
		!job.if &&
		!job.permissions &&
		job.steps.filter((step) => !isBuildStep(step)).length <= 1
	);
}

function isBuildStep(step: MultiWorkflowJobStep) {
	return "run" in step && step.run === "pnpm build" && !step.if;
}
