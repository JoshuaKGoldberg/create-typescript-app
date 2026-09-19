#!/usr/bin/env node
import { runTemplateCLI } from "bingo";

import { template } from "../dist/index.mjs";

process.exitCode = await runTemplateCLI(template);
