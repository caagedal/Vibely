import { load } from "../storage/index.mjs";
import { API_KEY } from "../api/constants.mjs";

/**
 * Generates headers for authenticated API requests.
 *
 * @returns {object} The headers object.
 */
export function headers() {
	const token = load("token");

	if (!token) {
		console.error("Token mangler i localStorage");
		return {};
	}

	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
		"X-Noroff-API-Key": API_KEY,
	};
}

/**
 * Performs a fetch request with authentication headers and error handling.
 *
 * @param {string} url - The request URL.
 * @param {RequestInit} [options={}] - Fetch options.
 * @returns {Promise<Response>} The fetch response object.
 * @throws Will throw an error if the response is not ok.
 */
export async function authFetch(url, options = {}) {
	const response = await fetch(url, {
		...options,
		headers: {
			...headers(),
			...(options.headers || {}),
		},
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.errors?.[0]?.message || "Unknown API error");
	}

	return response;
}
