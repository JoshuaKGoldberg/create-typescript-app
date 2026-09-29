#!/usr/bin/env node
import { runTemplateCLI } from "bingo";

import { template } from "../dist/index.mjs";

// bingo suggests rerun commands as `npx` + this file's name, which is index.js
// when package runners execute it directly
process.argv[1] = "create-typescript-app";

process.exitCode = await runTemplateCLI(template);
