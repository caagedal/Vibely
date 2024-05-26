import { load } from "../storage/index.mjs";

export function headers() {
    const token = load("token");
  
    return {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    };
}

export async function authFetch(url, options) {
  return fetch(url, {
      ...options,
      headers: headers(),
  });
}

