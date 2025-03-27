import { base } from "../base.js";
import { blockPackageJson } from "./blockPackageJson.js";
import { blockREADME } from "./blockREADME.js";

export const blockMITLicense = base.createBlock({
	about: {
		name: "MIT License",
	},
	produce({ options }) {
		return {
			addons: [
				blockREADME({
					badges: [
						{
							alt: "📝 License: MIT",
							href: `https://github.com/${options.owner}/${options.repository}/blob/main/LICENSE.md`,
							src: "https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg",
						},
					],
				}),
				blockPackageJson({
					properties: {
						files: ["LICENSE.md"],
						license: "MIT",
					},
				}),
			],
			files: {
				"LICENSE.md": `# MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
`,
			},
		};
	},
});
