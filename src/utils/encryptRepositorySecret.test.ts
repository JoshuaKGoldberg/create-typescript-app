import sodium from "libsodium-wrappers";
import { describe, expect, it } from "vitest";

import { encryptRepositorySecret } from "./encryptRepositorySecret.ts";

describe(encryptRepositorySecret, () => {
	it("produces a sealed box the repository's private key can open", async () => {
		await sodium.ready;
		const { privateKey, publicKey } = sodium.crypto_box_keypair();

		const encrypted = await encryptRepositorySecret(
			"upload-token",
			sodium.to_base64(publicKey, sodium.base64_variants.ORIGINAL),
		);

		const decrypted = sodium.crypto_box_seal_open(
			sodium.from_base64(encrypted, sodium.base64_variants.ORIGINAL),
			publicKey,
			privateKey,
		);

		expect(sodium.to_string(decrypted)).toBe("upload-token");
	});
});
