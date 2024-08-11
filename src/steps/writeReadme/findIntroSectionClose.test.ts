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
		[
			`<h1 align="center">Title</h1>

<p align="center">Description.</p>

<p align="center">
	(existing badges)
</p>

<img align="right" alt="Project logo: ..." src="./logo.png">

First intro text.

## Getting Started
`,
			173,
		],
	])("%o", (contents, expected) => {
		expect(findIntroSectionClose(contents)).toEqual(expected);
	});
});
