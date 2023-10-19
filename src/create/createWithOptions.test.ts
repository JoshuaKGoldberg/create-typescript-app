import { describe, expect, it, vi } from "vitest";

import { createWithOptions } from "./createWithOptions.js";

vi.mock("execa", () => ({
	$: vi.fn(),
}));

vi.mock("../shared/cli/spinners.js", () => ({
	withSpinner: vi.fn(),
	withSpinners: vi.fn(),
}));
