import { formatYaml } from "./formatYaml.mjs";
//#region src/blocks/files/formatWorkflowYaml.ts
function formatWorkflowYaml(value) {
	return addBlankLinesBetweenJobs(formatYaml(value).replaceAll(/: "\\n(.+)"/g, ": |\n$1").replaceAll("\\n", "\n").replaceAll("\\t", "  "));
}
function addBlankLinesBetweenJobs(yaml) {
	return yaml.replace(/(?<=^|\n)jobs:\n[\s\S]*?(?=\n\n\S|$)/, (jobs) => jobs.replaceAll(/\n(?= {2}\S)/g, "\n\n").replace("jobs:\n\n", "jobs:\n"));
}
//#endregion
export { formatWorkflowYaml };
