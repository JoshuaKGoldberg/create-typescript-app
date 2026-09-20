import { TakeInput } from "bingo";

import { inputFromFetchJson } from "../inputs/inputFromFetchJson.ts";
import { inputFromOctokit } from "../inputs/inputFromOctokit.ts";
import { encryptRepositorySecret } from "../utils/encryptRepositorySecret.ts";

export interface CodecovSecret {
	encryptedValue: string;
	keyId: string;
}

export async function readCodecovSecret(
	take: TakeInput,
	getCodecovToken: () => Promise<boolean | undefined>,
	getOwner: () => Promise<string | undefined>,
	getRepository: () => Promise<string | undefined>,
): Promise<CodecovSecret | undefined> {
	const apiToken = process.env.CODECOV_API_TOKEN;
	if (!apiToken || !(await getCodecovToken())) {
		return undefined;
	}

	const owner = await getOwner();
	const repo = await getRepository();

	const config = (await take(inputFromFetchJson, {
		init: { headers: { Authorization: `Bearer ${apiToken}` } },
		url: `https://api.codecov.io/api/v2/github/${owner}/repos/${repo}/config/`,
	})) as undefined | { upload_token?: string };
	if (!config?.upload_token) {
		return undefined;
	}

	const publicKey = (await take(inputFromOctokit, {
		endpoint: "GET /repos/{owner}/{repo}/actions/secrets/public-key",
		options: { owner, repo },
	})) as undefined | { key: string; key_id: string };
	if (!publicKey) {
		return undefined;
	}

	return {
		encryptedValue: await encryptRepositorySecret(
			config.upload_token,
			publicKey.key,
		),
		keyId: publicKey.key_id,
	};
}
