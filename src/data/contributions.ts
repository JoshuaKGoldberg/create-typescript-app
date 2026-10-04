interface ContributionType {
	description: string;
	link?: string;
	symbol: string;
}

// This intentionally uses the same types as all-contributors-cli:
// https://github.com/all-contributors/cli/blob/74bc388bd6f0ae2658e6495e9d3781d737438a97/src/util/contribution-types.js
export const contributionTypes: Partial<Record<string, ContributionType>> = {
	a11y: {
		description: "Accessibility",
		symbol: "️️️️♿️",
	},
	audio: {
		description: "Audio",
		symbol: "🔊",
	},
	blog: {
		/* spellchecker: disable-next-line */
		description: "Blogposts",
		symbol: "📝",
	},
	bug: {
		description: "Bug reports",
		link: "issues?q=author%3A",
		symbol: "🐛",
	},
	business: {
		description: "Business development",
		symbol: "💼",
	},
	code: {
		description: "Code",
		link: "commits?author=",
		symbol: "💻",
	},
	content: {
		description: "Content",
		symbol: "🖋",
	},
	data: {
		description: "Data",
		symbol: "🔣",
	},
	design: {
		description: "Design",
		symbol: "🎨",
	},
	doc: {
		description: "Documentation",
		link: "commits?author=",
		symbol: "📖",
	},
	eventOrganizing: {
		description: "Event Organizing",
		symbol: "📋",
	},
	example: {
		description: "Examples",
		symbol: "💡",
	},
	financial: {
		description: "Financial",
		symbol: "💵",
	},
	fundingFinding: {
		description: "Funding Finding",
		symbol: "🔍",
	},
	ideas: {
		description: "Ideas, Planning, & Feedback",
		symbol: "🤔",
	},
	infra: {
		description: "Infrastructure (Hosting, Build-Tools, etc)",
		symbol: "🚇",
	},
	maintenance: {
		description: "Maintenance",
		symbol: "🚧",
	},
	mentoring: {
		description: "Mentoring",
		symbol: "🧑‍🏫",
	},
	platform: {
		description: "Packaging/porting to new platform",
		symbol: "📦",
	},
	plugin: {
		description: "Plugin/utility libraries",
		symbol: "🔌",
	},
	projectManagement: {
		description: "Project Management",
		symbol: "📆",
	},
	promotion: {
		description: "Promotion",
		symbol: "📣",
	},
	question: {
		description: "Answering Questions",
		symbol: "💬",
	},
	research: {
		description: "Research",
		symbol: "🔬",
	},
	review: {
		description: "Reviewed Pull Requests",
		link: "pulls?q=is%3Apr+reviewed-by%3A",
		symbol: "👀",
	},
	security: {
		description: "Security",
		symbol: "🛡️",
	},
	talk: {
		description: "Talks",
		symbol: "📢",
	},
	test: {
		description: "Tests",
		link: "commits?author=",
		symbol: "⚠️",
	},
	tool: {
		description: "Tools",
		symbol: "🔧",
	},
	translation: {
		description: "Translation",
		symbol: "🌍",
	},
	tutorial: {
		description: "Tutorials",
		symbol: "✅",
	},
	userTesting: {
		description: "User Testing",
		symbol: "📓",
	},
	video: {
		description: "Videos",
		symbol: "📹",
	},
};

export const startingOwnerContributions = [
	"code",
	"content",
	"doc",
	"ideas",
	"infra",
	"maintenance",
	"projectManagement",
	"tool",
];
