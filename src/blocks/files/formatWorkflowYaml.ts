import { formatYaml } from "./formatYaml.js";

export function formatWorkflowYaml(value: unknown) {
	return addBlankLinesBetweenJobs(
		formatYaml(value)
			// https://github.com/nodeca/js-yaml/pull/515
			.replaceAll(/: "\\n(.+)"/g, ": |\n$1")
			.replaceAll("\\n", "\n")
			.replaceAll("\\t", "  "),
	);
}

function addBlankLinesBetweenJobs(yaml: string) {
	return yaml.replace(/(?<=^|\n)jobs:\n[\s\S]*?(?=\n\n\S|$)/, (jobs) =>
		jobs.replaceAll(/\n(?= {2}\S)/g, "\n\n").replace("jobs:\n\n", "jobs:\n"),
	);
}
