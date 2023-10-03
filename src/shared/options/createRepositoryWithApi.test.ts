import { Octokit } from "octokit";
import { describe, expect, it, vi } from "vitest";

import { createRepositoryWithApi } from "./createRepositoryWithApi.js";

const options = { owner: "StubOwner", repository: "stub-repository" };

const mockCreateUsingTemplate = vi.fn();
const mockCreateInOrg = vi.fn();
const mockCreateForAuthenticatedUser = vi.fn();
const mockGetAuthenticated = vi.fn();

const createMockOctokit = () =>
	({
		rest: {
			repos: {
				createForAuthenticatedUser: mockCreateForAuthenticatedUser,
				createInOrg: mockCreateInOrg,
				createUsingTemplate: mockCreateUsingTemplate,
			},
			users: {
				getAuthenticated: mockGetAuthenticated,
			},
		},
	}) as unknown as Octokit;

describe("createRepositoryWithApi", () => {
	it("creates using a template when preserveGeneratedFrom is true", async () => {
		await createRepositoryWithApi(createMockOctokit(), {
			...options,
			preserveGeneratedFrom: true,
		});

		expect(mockCreateForAuthenticatedUser).not.toHaveBeenCalled();
		expect(mockCreateInOrg).not.toHaveBeenCalled();
		expect(mockCreateUsingTemplate).toHaveBeenCalledWith({
			name: options.repository,
			owner: options.owner,
			template_owner: "JoshuaKGoldberg",
			template_repo: "create-typescript-app",
		});
	});

	it("creates under the user when the user is the owner", async () => {
		mockGetAuthenticated.mockResolvedValueOnce({
			data: {
				login: options.owner,
			},
		});
		await createRepositoryWithApi(createMockOctokit(), options);

		expect(mockCreateForAuthenticatedUser).toHaveBeenCalledWith({
			name: options.repository,
		});
		expect(mockCreateInOrg).not.toHaveBeenCalled();
		expect(mockCreateUsingTemplate).not.toHaveBeenCalled();
	});

	it("creates under an org when the user is not the owner", async () => {
		const login = "other-user";
		mockGetAuthenticated.mockResolvedValueOnce({ data: { login } });
		await createRepositoryWithApi(createMockOctokit(), options);

		expect(mockCreateForAuthenticatedUser).not.toHaveBeenCalled();
		expect(mockCreateInOrg).toHaveBeenCalledWith({
			name: options.repository,
			org: options.owner,
		});
		expect(mockCreateUsingTemplate).not.toHaveBeenCalled();
	});
});
