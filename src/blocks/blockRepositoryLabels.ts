import { setGitHubRepositoryLabels } from "set-github-repository-labels";

import { base } from "../base.js";
import { outcomeLabels } from "./outcomeLabels.js";

export const blockRepositoryLabels = base.createBlock({
	about: {
		name: "Repository Labels",
	},
	produce({ options }) {
		return {
			requests: [
				{
					id: "repository-labels",
					async send() {
						await setGitHubRepositoryLabels({
							labels: outcomeLabels,
							owner: options.owner,
							repository: options.repository,
						});
					},
				},
			],
		};
	},
});
