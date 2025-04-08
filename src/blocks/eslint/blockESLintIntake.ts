import {
	AST_NODE_TYPES,
	parse as parseAST,
	TSESTree,
} from "@typescript-eslint/typescript-estree";
import JSON5 from "json5";

import { tryCatch } from "../../utils/tryCatch.js";
import { stylisticComment } from "../blockESLintMoreStyling.js";
import { type ExtensionRuleGroup, zRuleOptions } from "./schemas.js";

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

	const rulesObject = getConfigRulesObject(configArguments.slice(1));
	if (!rulesObject) {
		return undefined;
	}

	const rules = collectRulesObjectGroups(sourceText, rulesObject);
	if (!rules) {
		return undefined;
	}

	return { ignores, rules };

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
		const groups: ExtensionRuleGroup[] = [];

		for (const property of rulesObject.properties) {
			const precedingText = sourceText.slice(
				(previousNode?.range[1] ?? rulesObject.range[0]) + 1,
				property.range[0],
			);
			const comment =
				precedingText.replaceAll(/\/\/ ?|\t\s*/g, "").trim() || undefined;

			// blockESLintMoreStyling's comment always gets pushed to the end.
			if (comment === stylisticComment) {
				break;
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
		return (
			node.type === AST_NODE_TYPES.ObjectExpression &&
			node.properties.length === 1 &&
			node.properties[0].type === AST_NODE_TYPES.Property &&
			node.properties[0].key.type === AST_NODE_TYPES.Identifier &&
			node.properties[0].key.name === "ignores" &&
			node.properties[0].value.type === AST_NODE_TYPES.ArrayExpression &&
			node.properties[0].value.elements.every(
				(element): element is TSESTree.Literal & { value: string } =>
					element?.type === AST_NODE_TYPES.Literal &&
					typeof element.value === "string",
			) &&
			node.properties[0].value.elements.map(
				(element) => element.value as string,
			)
		);
	}

	function getConfigRulesObject(nodes: TSESTree.Node[]) {
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

		const rulesObject = configObject.properties[3];
		return (
			rulesObject.type === AST_NODE_TYPES.Property &&
			rulesObject.value.type === AST_NODE_TYPES.ObjectExpression &&
			rulesObject.value
		);
	}

	function nodeIsConfigExport(node: TSESTree.Node): node is ConfigExport {
		return (
			node.type === AST_NODE_TYPES.ExportDefaultDeclaration &&
			node.declaration.type === AST_NODE_TYPES.CallExpression &&
			nodeIsConfigFunction(node.declaration.callee)
		);
	}

	function nodeIsConfigFunction(node: TSESTree.Node) {
		return (
			node.type === AST_NODE_TYPES.MemberExpression &&
			node.object.type === AST_NODE_TYPES.Identifier &&
			node.object.name === "tseslint" &&
			node.property.type === AST_NODE_TYPES.Identifier &&
			node.property.name === "config"
		);
	}
}
