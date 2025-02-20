#!/usr/bin/env node
import { runTemplateCLI } from "bingo";

import { template } from "../lib/index.js";

process.exitCode = await runTemplateCLI(template);
