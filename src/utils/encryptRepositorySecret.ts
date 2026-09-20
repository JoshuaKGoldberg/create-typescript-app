import sodium from "libsodium-wrappers";

/**
 * Encrypts a value for a GitHub Actions secret using the repository's public key.
 * @see https://docs.github.com/en/rest/guides/encrypting-secrets-for-the-rest-api
 */
export async function encryptRepositorySecret(
	value: string,
	publicKey: string,
) {
	await sodium.ready;

	return sodium.to_base64(
		sodium.crypto_box_seal(
			sodium.from_string(value),
			sodium.from_base64(publicKey, sodium.base64_variants.ORIGINAL),
		),
		sodium.base64_variants.ORIGINAL,
	);
}
