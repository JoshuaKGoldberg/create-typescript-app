import { base } from "../base.mjs";
import { blockRemoveFiles } from "./blockRemoveFiles.mjs";
import { z } from "zod";
//#region src/blocks/blockDevelopmentDocs.ts
const zInnerSection = z.object({
	contents: z.string(),
	heading: z.string()
});
function printInnerSection(innerSection) {
	return [
		`### ${innerSection.heading}`,
		``,
		innerSection.contents
	];
}
const zSection = z.object({
	contents: z.union([z.string(), z.object({
		after: z.array(z.string()).optional(),
		before: z.string().optional(),
		items: z.array(z.string()).optional(),
		plural: z.string().optional()
	})]).optional(),
	innerSections: z.array(zInnerSection).optional()
});
function printSection(heading, section) {
	const innerSections = section.innerSections?.flatMap(printInnerSection) ?? [];
	if (section.contents === void 0) return innerSections;
	const contents = typeof section.contents === "string" ? { before: section.contents } : section.contents;
	return [
		`## ${heading}`,
		``,
		...contents.before ? [contents.before] : [],
		...contents.items?.sort((a, b) => a.replaceAll("`", "").localeCompare(b.replaceAll("`", ""))) ?? [],
		...contents.items?.length && contents.plural ? [``, contents.plural] : [],
		...contents.after ?? [],
		...innerSections
	];
}
const blockDevelopmentDocs = base.createBlock({
	about: { name: "Development Docs" },
	addons: {
		hints: z.array(z.string()).default([]),
		sections: z.record(z.string(), zSection).default({})
	},
	produce({ addons, options }) {
		return { files: { ".github": { "DEVELOPMENT.md": [
			`# Development`,
			``,
			...options.guide ? [
				`> If you'd like a more guided walkthrough, see [${options.guide.title}](${options.guide.href}).`,
				`> It'll walk you through the common activities you'll need to contribute.`,
				``
			] : [],
			`After [forking the repo from GitHub](https://help.github.com/articles/fork-a-repo) and [installing pnpm](https://pnpm.io/installation):`,
			``,
			`\`\`\`shell`,
			`git clone https://github.com/(your-name-here)/${options.repository}`,
			`cd ${options.repository}`,
			`pnpm install`,
			`\`\`\``,
			``,
			...addons.hints.length ? [...addons.hints, ``] : [],
			...Object.entries(addons.sections).sort(([a], [b]) => a.localeCompare(b)).flatMap(([heading, section]) => printSection(heading, section)),
			...options.documentation.development ? [options.documentation.development] : []
		].join("\n") } } };
	},
	transition() {
		return { addons: [blockRemoveFiles({ files: ["DEVELOPMENT.md"] })] };
	}
});
//#endregion
export { blockDevelopmentDocs };
