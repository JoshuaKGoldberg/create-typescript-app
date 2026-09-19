import { base } from "../base.mjs";
import { blockRemoveFiles } from "./blockRemoveFiles.mjs";
import { blockPackageJson } from "./blockPackageJson.mjs";
import { blockRemoveWorkflows } from "./blockRemoveWorkflows.mjs";
import { blockRemoveDependencies } from "./blockRemoveDependencies.mjs";
import { blockESLint } from "./blockESLint.mjs";
//#region src/blocks/blockESLintPackageJson.ts
const blockESLintPackageJson = base.createBlock({
	about: { name: "ESLint package.json Plugin" },
	produce() {
		return { addons: [blockESLint({
			extensions: [{
				extends: ["packageJson.configs.recommended", "packageJson.configs.stylistic"],
				files: ["package.json"]
			}],
			imports: [{
				source: "eslint-plugin-package-json",
				specifier: "packageJson"
			}]
		}), blockPackageJson({ properties: { scripts: { "lint:package-json": void 0 } } })] };
	},
	transition() {
		return { addons: [
			blockRemoveFiles({ files: [".npmpackagejsonlintrc*"] }),
			blockRemoveDependencies({ dependencies: ["npm-package-json-lint", "npm-package-json-lint-config-default"] }),
			blockRemoveWorkflows({ workflows: ["lint-package-json"] })
		] };
	}
});
//#endregion
export { blockESLintPackageJson };
