import { z } from "zod";

import { base } from "../base.js";

function printAttributes(attributes: Record<string, number | string>) {
	return Object.entries(attributes)
		.map(([key, value]) => `${key}="${value}"`)
		.sort()
		.join(" ");
}

const zBadge = z.object({
	alt: z.string(),
	comments: z
		.object({
			after: z.string(),
			before: z.string(),
		})
		.optional(),
	href: z.string().optional(),
	src: z.string(),
});

type Badge = z.infer<typeof zBadge>;

export const blockREADME = base.createBlock({
	about: {
		name: "README.md",
	},
	addons: {
		badges: z.array(zBadge).default([]),
		defaultUsage: z.array(z.string()).default([]),
		notices: z.array(z.string()).default([]),
		sections: z.array(z.string()).default([]),
	},
	produce({ addons, options }) {
		const { badges, defaultUsage, notices, sections } = addons;

		const explainer =
			options.documentation.readme.explainer &&
			`\n${options.documentation.readme.explainer}\n`;

		const logo =
			options.logo &&
			`\n<img ${printAttributes({ align: "right", ...options.logo })}>\n`;

		const suffixes = [
			...notices,
			options.documentation.readme.footnotes,
		].filter((suffix) => typeof suffix === "string");

		return {
			files: {
				"README.md": `<h1 align="center">${options.title}</h1>

<p align="center">${formatDescription(options.description)}</p>

<p align="center">
${formatBadges(badges)}
</p>
${[logo, explainer].filter(Boolean).join("")}
## Usage

${options.documentation.readme.usage ?? defaultUsage.join("\n\n")}

## Development

See [\`.github/CONTRIBUTING.md\`](./.github/CONTRIBUTING.md), then [\`.github/DEVELOPMENT.md\`](./.github/DEVELOPMENT.md).
Thanks! ${options.emoji}
${[...sections, options.documentation.readme.additional]
	.filter(Boolean)
	.map((section) => `\n${section}`)
	.join("")}
${suffixes.length ? `\n${suffixes.map((suffix) => suffix.trim()).join("\n\n")}` : ""}`,
			},
		};
	},
});

function badgeSorter(a: Badge, b: Badge) {
	return removeEmojis(a.alt).localeCompare(removeEmojis(b.alt));
}

function formatBadge(badge: Badge) {
	const image = `<img alt="${badge.alt}" src="${badge.src}" />`;
	const tagged = badge.href
		? `<a href="${badge.href}" target="_blank">${image}</a>`
		: image;
	const commented = badge.comments
		? `${badge.comments.before}${tagged}${badge.comments.after}`
		: tagged;

	return `\t${commented}`;
}

function formatBadges(badges: Badge[]) {
	return [
		...badges,
		{
			alt: "💪 TypeScript: Strict",
			src: "https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg",
		},
	]
		.sort(badgeSorter)
		.map(formatBadge)
		.join("\n");
}

function formatDescription(description: string) {
	if (!description.includes(". ")) {
		return description;
	}

	return "\n\t" + description.replaceAll(". ", ".\n\t") + "\n";
}

function removeEmojis(text: string) {
	return text.replaceAll(/\p{Emoji}/gu, "").trim();
}
