import * as fs from "node:fs/promises";

import { readFileSafe } from "../../shared/readFileSafe.js";
import { Options } from "../../shared/types.js";
import { endOfReadmeMatcher, endOfReadmeNotice } from "../updateReadme.js";
import { findExistingBadges } from "./findExistingBadges.js";
import { findIntroSectionClose } from "./findIntroSectionClose.js";
import { generateTopContent } from "./generateTopContent.js";

const contributorsIndicator = `<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->`;

function generateAllContributorsContent(options: Options) {
	return [
		`## Contributors`,
		``,
		`<!-- spellchecker: disable -->`,
		contributorsIndicator,
		`<!-- prettier-ignore-start -->`,
		!options.excludeLintMd && `<!-- markdownlint-disable -->`,
		`<table>`,
		`<!-- (this will be filled in by all-contributors) -->`,
		`</table>`,
		``,
		!options.excludeLintMd && `<!-- markdownlint-restore -->`,
		`<!-- prettier-ignore-end -->`,
		``,
		`<!-- ALL-CONTRIBUTORS-LIST:END -->`,
		`<!-- spellchecker: enable -->`,
	]
		.filter(Boolean)
		.join("\n");
}

export async function writeReadme(options: Options) {
	const allContributorsContent =
		!options.excludeAllContributors && generateAllContributorsContent(options);
	let contents = await readFileSafe("README.md", "");
	if (!contents) {
		await fs.writeFile(
			"README.md",
			[
				generateTopContent(options, []),
				allContributorsContent,
				endOfReadmeNotice.slice(1),
			]
				.filter(Boolean)
				.join("\n\n"),
		);
		return;
	}

	const endOfIntroSection = findIntroSectionClose(contents);

	contents = [
		generateTopContent(options, findExistingBadges(contents)),
		contents.slice(endOfIntroSection),
	]
		.join("")
		.replace(/\[!\[.+\]\(.+\)\]\(.+\)/g, "")
		.replace(/!\[.+\]\(.+\)/g, "")
		.replaceAll("\r", "")
		.replaceAll("\n\n\n", "\n\n");

	if (allContributorsContent && !contents.includes(contributorsIndicator)) {
		contents = [contents, allContributorsContent].join("\n\n");
	}

	if (!endOfReadmeMatcher.test(contents)) {
		contents = [contents, endOfReadmeNotice].join("\n");
	}

	await fs.writeFile("README.md", contents);
}
