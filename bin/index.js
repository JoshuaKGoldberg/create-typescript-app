#!/usr/bin/env node
// eslint-disable-next-line n/no-missing-import
import { bin } from "../lib/bin/index.js";

process.exitCode = await bin(process.argv.slice(2));
