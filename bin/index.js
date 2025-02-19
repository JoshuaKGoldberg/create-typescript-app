#!/usr/bin/env node
import { runTemplateCLI } from "../../bingo/packages/bingo/lib/index.js";
import { template } from "../lib/index.js";

process.exitCode = await runTemplateCLI(template);
