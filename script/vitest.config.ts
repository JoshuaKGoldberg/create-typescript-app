import { defineConfig } from "vitest/config";

export default defineConfig({ test: { include: ["./migrate-test-e2e.ts"] } });
