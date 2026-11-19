import { formatYaml } from "./formatYaml.ts";

export function formatWorkflowYaml(value: unknown) {
	return ignoreDangerousTriggers(
		addBlankLinesBetweenJobs(
			formatYaml(value)
				// https://github.com/nodeca/js-yaml/pull/515
				.replaceAll(/: "\\n(.+)"/g, ": |\n$1")
				.replaceAll("\\n", "\n")
				.replaceAll("\\t", "  "),
		),
	);
}

function addBlankLinesBetweenJobs(yaml: string) {
	return yaml.replace(/(?<=^|\n)jobs:\n[\s\S]*?(?=\n\n\S|$)/, (jobs) =>
		jobs.replaceAll(/\n(?= {2}\S)/g, "\n\n").replace("jobs:\n\n", "jobs:\n"),
	);
}

function ignoreDangerousTriggers(yaml: string) {
	return yaml.replaceAll(
		/^ {2}(issue_comment|pull_request_target|workflow_run):$/gm,
		"  $1: # zizmor: ignore[dangerous-triggers]",
	);
}
