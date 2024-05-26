import { load } from "../storage/index.mjs";

export function headers() {
  const token = load("token");
  if (!token) {
      console.error('No token found in localStorage');
      return {};
  }
  return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
  };
}

export async function authFetch(url, options = {}) {
  return fetch(url, {
      ...options,
      headers: headers(),
  });
}

export async function profileInfo() {
  return load("profile");
}

