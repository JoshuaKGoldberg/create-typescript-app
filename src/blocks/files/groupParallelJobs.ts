import { createJobName } from "./createJobName.ts";
import {
	MultiWorkflowJobOptions,
	MultiWorkflowJobStep,
} from "./createMultiWorkflowFile.ts";

const maximumParallelSteps = 10;

export function groupParallelJobs(jobs: MultiWorkflowJobOptions[]) {
	if (jobs.some((job) => createJobName(job.name) === "ci")) {
		return jobs;
	}

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

	if (separateJobs.length === jobs.length) {
		return jobs;
	}

	return [
		{
			name: "CI",
			steps: [
				...(needsBuild ? [{ run: "pnpm build" }] : []),
				...(parallelSteps.length > 1
					? [{ parallel: parallelSteps }]
					: parallelSteps),
			],
		},
		...separateJobs,
	].toSorted((a, b) => a.name.localeCompare(b.name));
}

function canRunInParallel(job: MultiWorkflowJobOptions) {
	return !job.checkoutWith && !job.if && !job.permissions;
}

function canStepRunInParallel(step: MultiWorkflowJobStep) {
	return !("if" in step && step.if);
}

function isBuildStep(step: MultiWorkflowJobStep | undefined) {
	return (
		!!step &&
		Object.keys(step).length === 1 &&
		"run" in step &&
		step.run === "pnpm build"
	);
}
