import sodium from "libsodium-wrappers";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { readCodecovSecret } from "./readCodecovSecret.ts";

const mockTake = vi.fn();

const getCodecovToken = () => Promise.resolve(true);
const getOwner = () => Promise.resolve("test-owner");
const getRepository = () => Promise.resolve("test-repository");

describe(readCodecovSecret, () => {
	beforeEach(() => {
		vi.stubEnv("CODECOV_API_TOKEN", "codecov-api-token");
	});

	afterEach(() => {
		vi.unstubAllEnvs();
	});

	it("resolves with undefined without requests when CODECOV_API_TOKEN is not set", async () => {
		vi.stubEnv("CODECOV_API_TOKEN", "");

		const actual = await readCodecovSecret(
			mockTake,
			getCodecovToken,
			getOwner,
			getRepository,
		);

		expect(actual).toBeUndefined();
		expect(mockTake).not.toHaveBeenCalled();
	});

	it("resolves with undefined without requests when codecovToken is not on", async () => {
		const actual = await readCodecovSecret(
			mockTake,
			() => Promise.resolve(false),
			getOwner,
			getRepository,
		);

		expect(actual).toBeUndefined();
		expect(mockTake).not.toHaveBeenCalled();
	});

	it("resolves with undefined when the Codecov API does not provide an upload token", async () => {
		mockTake.mockResolvedValueOnce({ graph_token: "abc" });

		const actual = await readCodecovSecret(
			mockTake,
			getCodecovToken,
			getOwner,
			getRepository,
		);

		expect(actual).toBeUndefined();
		expect(mockTake).toHaveBeenCalledTimes(1);
		expect(mockTake).toHaveBeenCalledWith(expect.anything(), {
			init: { headers: { Authorization: "Bearer codecov-api-token" } },
			url: "https://api.codecov.io/api/v2/github/test-owner/repos/test-repository/config/",
		});
	});

	it("resolves with undefined when the repository public key cannot be retrieved", async () => {
		mockTake
			.mockResolvedValueOnce({ upload_token: "upload-token" })
			.mockResolvedValueOnce(undefined);

		const actual = await readCodecovSecret(
			mockTake,
			getCodecovToken,
			getOwner,
			getRepository,
		);

		expect(actual).toBeUndefined();
		expect(mockTake).toHaveBeenLastCalledWith(expect.anything(), {
			endpoint: "GET /repos/{owner}/{repo}/actions/secrets/public-key",
			options: { owner: "test-owner", repo: "test-repository" },
		});
	});

	it("resolves with the upload token encrypted for the public key when both are retrieved", async () => {
		await sodium.ready;
		const { privateKey, publicKey } = sodium.crypto_box_keypair();

		mockTake
			.mockResolvedValueOnce({ upload_token: "upload-token" })
			.mockResolvedValueOnce({
				key: sodium.to_base64(publicKey, sodium.base64_variants.ORIGINAL),
				key_id: "key-id",
			});

		const actual = await readCodecovSecret(
			mockTake,
			getCodecovToken,
			getOwner,
			getRepository,
		);

		expect(actual).toEqual({
			encryptedValue: expect.any(String),
			keyId: "key-id",
		});

		const decrypted = sodium.crypto_box_seal_open(
			sodium.from_base64(
				actual?.encryptedValue ?? "",
				sodium.base64_variants.ORIGINAL,
			),
			publicKey,
			privateKey,
		);

		expect(sodium.to_string(decrypted)).toBe("upload-token");
	});
});
