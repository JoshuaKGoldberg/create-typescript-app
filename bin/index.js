#!/usr/bin/env node
import { runTemplateCLI } from "bingo";

import { template } from "../lib/index.mjs";

process.exitCode = await runTemplateCLI(template);
