import jsYaml from "js-yaml";

export function createDotGitHubActions() {
	return {
		prepare: {
			"action.yml": jsYaml
				.dump({
					description: "Prepares the repo for a typical CI job",
					name: "Prepare",
					runs: {
						steps: [
							{
								uses: "pnpm/action-setup@v4",
								with: { version: 9 },
							},
							{
								uses: "actions/setup-node@v4",
								with: { cache: "pnpm", "node-version": "20" },
							},
							{
								run: "pnpm install --frozen-lockfile",
								shell: "bash",
							},
						],
						using: "composite",
					},
				})
				.replaceAll(/\n(\S)/g, "\n\n$1"),
		},
	};
}
