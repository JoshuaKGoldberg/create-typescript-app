#!/usr/bin/env node
import { hydrate } from "../lib/hydrate/index.js";

process.exitCode = await hydrate(process.argv.slice(2));
