import { tryCatch } from "../../utils/tryCatch.mjs";
import { zConfigEmoji } from "./schemas.mjs";
import JSON5 from "json5";
import { AST_NODE_TYPES, parse } from "@typescript-eslint/typescript-estree";
//#region src/blocks/eslint/blockESLintPluginIntake.ts
function blockESLintPluginIntake(sourceText) {
	const ast = tryCatch(() => parse(sourceText, {
		comment: true,
		loc: true,
		range: true
	}));
	if (!ast) return;
	const config = findConfig(ast.body);
	if (!config) return;
	const configEmoji = findConfigEmoji(config.properties);
	if (!configEmoji) return;
	const { data } = zConfigEmoji.safeParse(JSON5.parse(sourceText.slice(...configEmoji.range)));
	return data && { configEmoji: data };
	function findConfig(body) {
		for (const node of body) if (node.type === AST_NODE_TYPES.VariableDeclaration && node.declarations[0].id.type === AST_NODE_TYPES.Identifier && node.declarations[0].id.name === "config" && node.declarations[0].init?.type === AST_NODE_TYPES.ObjectExpression) return node.declarations[0].init;
	}
	function findConfigEmoji(properties) {
		for (const node of properties) if (node.type === AST_NODE_TYPES.Property && node.key.type === AST_NODE_TYPES.Identifier && node.key.name === "configEmoji" && node.value.type === AST_NODE_TYPES.ArrayExpression) return node.value;
	}
}
//#endregion
export { blockESLintPluginIntake };
