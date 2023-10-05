import { describe, expect, it } from "vitest";

import { findIntroSectionClose } from "./findIntroSectionClose.js";

describe("findIntroSectionClose", () => {
	it.each([
		[
			`# First
## Second`,
			6,
		],
		[
			`# First
<h2>Second</h2>`,
			6,
		],
		[
			`# First
<h2>Second</h2>`,
			6,
		],
		[
			`# First
\`\`\`js
...
\`\`\``,
			6,
		],
		[
			`# First

[![](https://img.shields.io/badge/abc-ffcc00.svg)](image.jpg)

[![](https://img.shields.io/badge/abc-ffcc00.svg)](image.jpg)
`,
			135,
		],
		[
			`Plain heading

Next line.
`,
			14,
		],
	])("%s", (contents, expected) => {
		expect(findIntroSectionClose(contents)).toEqual(expected);
	});
});
