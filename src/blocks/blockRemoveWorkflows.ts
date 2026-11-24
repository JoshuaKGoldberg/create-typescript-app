import type { IntakeDirectory } from "bingo-fs";

import path from "node:path";
import { z } from "zod";

import { base } from "../base.ts";
import { blockRemoveFiles } from "./blockRemoveFiles.ts";
import { intakeFileAsYaml } from "./intake/intakeFileAsYaml.ts";

const zReusableWorkflow = z.object({
	on: z.union([
		z.literal("workflow_call"),
		z.array(z.string()).refine((on) => on.includes("workflow_call")),
		z.record(z.string(), z.unknown()).refine((on) => "workflow_call" in on),
	]),
});

export const blockRemoveWorkflows = base.createBlock({
	about: {
		name: "Remove Workflows",
	},
	intake({ files }) {
		const workflows = (files[".github"] as IntakeDirectory | undefined)
			?.workflows as IntakeDirectory | undefined;
		const reusable = Object.keys(workflows ?? {}).filter(
			(fileName) =>
				workflows &&
				zReusableWorkflow.safeParse(intakeFileAsYaml(workflows, [fileName]))
					.success,
		);

		return reusable.length
			? { reusable: reusable.map((fileName) => path.parse(fileName).name) }
			: undefined;
	},
	props: {
		reusable: z.array(z.string()).optional(),
		workflows: z.array(z.string()).optional(),
	},
	// TODO: Make produce() optional, so this empty-ish produce() can be removed
	// https://github.com/JoshuaKGoldberg/bingo/issues/295
	produce() {
		return {};
	},
	transition({ props }) {
		const { reusable, workflows } = props;

		return {
			extensions: [
				blockRemoveFiles({
					files: workflows
						?.filter((workflow) => !reusable?.includes(workflow))
						.map((workflow) => `.github/workflows/${workflow}.{yaml,yml}`),
				}),
			],
		};
	},
});
