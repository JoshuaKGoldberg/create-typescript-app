import {
	MultiWorkflowJobOptions,
	MultiWorkflowJobStep,
} from "./createMultiWorkflowFile.ts";

// GitHub runs at most 10 background steps at once per job, queueing the rest:
// https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions
const maximumParallelSteps = 10;

/**
 * Merges jobs that each have one step (after an optional leading `pnpm build`)
 * into a single "CI" job that runs those steps in a `parallel:` group.
 * This skips repeating checkout and setup for every job.
 * Jobs that need their own checkout, condition, permissions, or multiple
 * sequential steps stay separate.
 */
export function groupParallelJobs(jobs: MultiWorkflowJobOptions[]) {
	const parallelSteps: MultiWorkflowJobStep[] = [];
	const separateJobs: MultiWorkflowJobOptions[] = [];
	let needsBuild = false;

	for (const job of jobs) {
		const builds = isBuildStep(job.steps[0]);
		const steps = builds ? job.steps.slice(1) : job.steps;

		if (
			canRunInParallel(job) &&
			(builds ? steps.length <= 1 : steps.length === 1) &&
			steps.every(canStepRunInParallel) &&
			parallelSteps.length < maximumParallelSteps
		) {
			needsBuild ||= builds;
			parallelSteps.push(...steps.map((step) => ({ ...step, name: job.name })));
		} else {
			separateJobs.push(job);
		}
	}

	if (parallelSteps.length < 2) {
		return jobs;
	}

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
	return !job.checkoutWith && !job.if && !job.permissions;
}

function canStepRunInParallel(step: MultiWorkflowJobStep) {
	return !("if" in step && step.if) && !("parallel" in step);
}

function isBuildStep(step: MultiWorkflowJobStep | undefined) {
	return (
		!!step &&
		Object.keys(step).length === 1 &&
		"run" in step &&
		step.run === "pnpm build"
	);
}
