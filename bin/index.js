#!/usr/bin/env node
import { bin } from "../lib/bin/index.js";

process.exitCode = await bin(process.argv.slice(2));
