import {
	AST_NODE_TYPES,
	parse as parseAST,
	TSESTree,
} from "@typescript-eslint/typescript-estree";
import JSON5 from "json5";

import { tryCatch } from "../../utils/tryCatch.js";
import { zConfigEmoji } from "./schemas.js";

export function blockESLintPluginIntake(sourceText: string) {
	const ast = tryCatch(() =>
		parseAST(sourceText, {
			comment: true,
			loc: true,
			range: true,
		}),
	);
	if (!ast) {
		return undefined;
	}

	const config = findConfig(ast.body);
	if (!config) {
		return undefined;
	}

	const configEmoji = findConfigEmoji(config.properties);
	if (!configEmoji) {
		return undefined;
	}

	const { data } = zConfigEmoji.safeParse(
		JSON5.parse(sourceText.slice(...configEmoji.range)),
	);

	return data && { configEmoji: data };

	function findConfig(body: TSESTree.ProgramStatement[]) {
		for (const node of body) {
			if (
				node.type === AST_NODE_TYPES.VariableDeclaration &&
				node.declarations[0].id.type === AST_NODE_TYPES.Identifier &&
				node.declarations[0].id.name === "config" &&
				node.declarations[0].init?.type === AST_NODE_TYPES.ObjectExpression
			) {
				return node.declarations[0].init;
			}
		}
	}

	function findConfigEmoji(properties: TSESTree.ObjectLiteralElement[]) {
		for (const node of properties) {
			if (
				node.type === AST_NODE_TYPES.Property &&
				node.key.type === AST_NODE_TYPES.Identifier &&
				node.key.name === "configEmoji" &&
				node.value.type === AST_NODE_TYPES.ArrayExpression
			) {
				return node.value;
			}
		}
	}
}
