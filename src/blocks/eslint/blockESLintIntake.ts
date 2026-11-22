import {
	AST_NODE_TYPES,
	parse as parseAST,
	TSESTree,
} from "@typescript-eslint/typescript-estree";
import JSON5 from "json5";

import { tryCatch } from "../../utils/tryCatch.ts";
import { stylisticComment } from "../blockESLintMoreStyling.ts";
import { type ExtensionRuleGroup, zRuleOptions } from "./schemas.ts";

type ConfigExport = TSESTree.ExportDefaultDeclaration & {
	declaration: TSESTree.CallExpression;
};

export function blockESLintIntake(sourceText: string) {
	const ast = tryCatch(() =>
		parseAST(sourceText, {
			comment: true,
			loc: true,
			range: true,
		}),
	);
	const configExport = ast?.body.find(nodeIsConfigExport);
	if (!configExport) {
		return undefined;
	}

	const configArguments = configExport.declaration.arguments;
	if (configArguments.length < 2) {
		return undefined;
	}

	const ignores = getConfigIgnores(configArguments[0]);
	if (!ignores) {
		return undefined;
	}

	const configObject = getConfigObject(configArguments.slice(1));
	if (!configObject) {
		return undefined;
	}

	const rules = collectRulesObjectGroups(sourceText, configObject.rules);
	if (!rules) {
		return undefined;
	}

	return {
		extensions: rules.length ? [{ files: configObject.files, rules }] : [],
		ignores,
	};

	function areArraysEqual<T>(a: T[], b: T[]) {
		if (a.length !== b.length) {
			return false;
		}

		for (let i = 0; i < a.length; i++) {
			if (a[i] !== b[i]) {
				return false;
			}
		}

		return true;
	}

	function collectRuleFromProperty(property: TSESTree.ObjectLiteralElement) {
		if (
			property.type !== AST_NODE_TYPES.Property ||
			property.key.type !== AST_NODE_TYPES.Literal ||
			typeof property.key.value !== "string"
		) {
			return undefined;
		}

		const name = property.key.value;

		const { data } = zRuleOptions.safeParse(
			JSON5.parse(sourceText.slice(...property.value.range)),
		);

		return data && { entry: data, name };
	}

	function collectRulesObjectGroups(
		sourceText: string,
		rulesObject: TSESTree.ObjectExpression,
	) {
		let previousNode: TSESTree.Node | undefined;
		let currentGroup: ExtensionRuleGroup | undefined;
		let inStylisticGroup = false;
		const groups: ExtensionRuleGroup[] = [];

		for (const property of rulesObject.properties) {
			const precedingText = sourceText.slice(
				(previousNode?.range[1] ?? rulesObject.range[0]) + 1,
				property.range[0],
			);
			const comment =
				precedingText
					.split("\n")
					.map((line) => line.trim().replace(/^\/\/ ?/, ""))
					.filter(Boolean)
					.join("\n") || undefined;

			if (comment) {
				inStylisticGroup = comment === stylisticComment;
			}

			if (inStylisticGroup) {
				previousNode = property;
				continue;
			}

			const rule = collectRuleFromProperty(property);
			if (!rule) {
				return undefined;
			}

			if (!currentGroup || comment) {
				currentGroup = { comment, entries: {} };
				groups.push(currentGroup);
			}

			currentGroup.entries[rule.name] = rule.entry;
			previousNode = property;
		}

		return groups;
	}

	function getConfigIgnores(node: TSESTree.Node) {
		if (
			node.type === AST_NODE_TYPES.CallExpression &&
			node.callee.type === AST_NODE_TYPES.Identifier &&
			node.callee.name === "globalIgnores"
		) {
			return node.arguments.length > 0 && getStringLiterals(node.arguments[0]);
		}

		return (
			node.type === AST_NODE_TYPES.ObjectExpression &&
			node.properties.length === 1 &&
			node.properties[0].type === AST_NODE_TYPES.Property &&
			node.properties[0].key.type === AST_NODE_TYPES.Identifier &&
			node.properties[0].key.name === "ignores" &&
			getStringLiterals(node.properties[0].value)
		);
	}

	function getConfigObject(nodes: TSESTree.Node[]) {
		const configObject = nodes.find(
			(node): node is TSESTree.ObjectExpression =>
				node.type === AST_NODE_TYPES.ObjectExpression &&
				areArraysEqual(
					node.properties.map((property) =>
						property.type === AST_NODE_TYPES.Property &&
						property.key.type === AST_NODE_TYPES.Identifier
							? property.key.name
							: undefined,
					),
					["extends", "files", "languageOptions", "rules", "settings"],
				),
		);
		if (!configObject) {
			return undefined;
		}

		const [, filesProperty, , rulesProperty] = configObject.properties;
		if (
			filesProperty.type !== AST_NODE_TYPES.Property ||
			rulesProperty.type !== AST_NODE_TYPES.Property ||
			rulesProperty.value.type !== AST_NODE_TYPES.ObjectExpression
		) {
			return undefined;
		}

		const files = getStringLiterals(filesProperty.value);
		return files && { files, rules: rulesProperty.value };
	}

	function getStringLiterals(node: TSESTree.Node) {
		if (node.type !== AST_NODE_TYPES.ArrayExpression) {
			return undefined;
		}

		const values = node.elements.map((element) =>
			element?.type === AST_NODE_TYPES.Literal &&
			typeof element.value === "string"
				? element.value
				: undefined,
		);

		return values.every((value) => value !== undefined) ? values : undefined;
	}

	function nodeIsConfigExport(node: TSESTree.Node): node is ConfigExport {
		return (
			node.type === AST_NODE_TYPES.ExportDefaultDeclaration &&
			node.declaration.type === AST_NODE_TYPES.CallExpression &&
			nodeIsConfigFunction(node.declaration.callee)
		);
	}

	function nodeIsConfigFunction(node: TSESTree.Node) {
		if (node.type === AST_NODE_TYPES.Identifier) {
			return node.name === "defineConfig";
		}

		return (
			node.type === AST_NODE_TYPES.MemberExpression &&
			node.object.type === AST_NODE_TYPES.Identifier &&
			node.object.name === "tseslint" &&
			node.property.type === AST_NODE_TYPES.Identifier &&
			node.property.name === "config"
		);
	}
}
