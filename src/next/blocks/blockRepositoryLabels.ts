import { outcomeLabels } from "../../steps/initializeGitHubRepository/outcomeLabels.js";
import { base } from "../base.js";

export const blockRepositoryLabels = base.createBlock({
	about: {
		name: "Repository Labels",
	},
	produce({ options }) {
		return {
			scripts: [
				`npx set-github-repository-labels --labels ${JSON.stringify(outcomeLabels)} --owner "${options.owner}" --repository "${options.repository}"`,
			],
		};
	},
});
