import { determineLabelChanges } from "set-github-repository-labels";

import { base } from "../base.js";
import { outcomeLabels } from "./outcomeLabels.js";

export const blockRepositoryLabels = base.createBlock({
	about: {
		name: "Repository Labels",
	},
	produce({ options }) {
		const changes = determineLabelChanges(
			options.existingLabels ?? [],
			outcomeLabels,
		);
		const requestData = {
			owner: options.owner,
			repo: options.repository,
		};

		return {
			requests: changes.map((change) => {
				switch (change.type) {
					case "delete":
						return {
							endpoint: "DELETE /repos/{owner}/{repo}/labels/{name}",
							id: `delete label '${change.name}'`,
							parameters: {
								...requestData,
								name: change.name,
							},
							type: "octokit",
						};
					case "patch":
						return {
							endpoint: "PATCH /repos/{owner}/{repo}/labels/{name}",
							id: `patch label '${change.originalName}'`,
							parameters: {
								...requestData,
								color: change.color,
								description: change.description,
								name: change.originalName,
								new_name: change.newName,
							},
							type: "octokit",
						};
					case "post":
						return {
							endpoint: "POST /repos/{owner}/{repo}/labels",
							id: `post label '${change.name}'`,
							parameters: {
								...requestData,
								color: change.color,
								description: change.description,
								name: change.name,
							},
							type: "octokit",
						};
				}
			}),
		};
	},
});
