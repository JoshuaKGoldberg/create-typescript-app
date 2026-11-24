import { z } from "zod";

import { WorkflowsVersions } from "../../schemas.ts";

export const zMatrixJob = z.looseObject({
	name: z.string(),
	steps: z.array(z.record(z.string(), z.unknown())),
	strategy: z.looseObject({
		matrix: z.record(z.string(), z.unknown()),
	}),
});

export type MatrixJob = z.infer<typeof zMatrixJob>;

export function getMatrixJobCheckNames({ name, strategy }: MatrixJob) {
	const entries = Object.entries(strategy.matrix);
	const axes = entries.filter((entry): entry is [string, unknown[]] =>
		Array.isArray(entry[1]),
	);

	if (
		axes.length !== entries.length ||
		axes.some(([key]) => key === "exclude" || key === "include")
	) {
		return [];
	}

	const combinations = axes.reduce<Record<string, string>[]>(
		(previous, [key, values]) =>
			previous.flatMap((combination) =>
				values.map((value) => ({ ...combination, [key]: String(value) })),
			),
		[{}],
	);

	const names = combinations.map((combination) =>
		name.includes("${{")
			? name.replaceAll(
					/\$\{\{\s*matrix\.([\w-]+)\s*\}\}/gu,
					(matched, key: string) => combination[key] ?? matched,
				)
			: `${name} (${Object.values(combination).join(", ")})`,
	);

	return Array.from(new Set(names)).filter(
		(expanded) => !expanded.includes("${{"),
	);
}

export function withVersionComments(
	job: MatrixJob,
	workflowsVersions: undefined | WorkflowsVersions,
): MatrixJob {
	return {
		...job,
		steps: job.steps.map((step) =>
			typeof step.uses === "string"
				? { ...step, uses: withVersionComment(step.uses, workflowsVersions) }
				: step,
		),
	};
}

function withVersionComment(
	uses: string,
	workflowsVersions: undefined | WorkflowsVersions,
) {
	const [action, hash] = uses.split("@");
	const version = Object.entries(workflowsVersions?.[action] ?? {}).find(
		([, existing]) => existing.hash === hash,
	)?.[0];

	return version ? `${uses} # ${version}` : uses;
}
