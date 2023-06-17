#!/usr/bin/env node
import { hydrate } from "../src/hydrate/index.js";

process.exitCode = await hydrate(process.argv.slice(2));
