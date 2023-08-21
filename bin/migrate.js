#!/usr/bin/env node
import { migrate } from "../lib/migrate/index.js";

process.exitCode = await migrate(process.argv.slice(2));
