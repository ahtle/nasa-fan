import axios, { isAxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";
const ACCESS_TOKEN_KEY = "accessToken";

function readStoredAccessToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export const api = axios.create({
  baseURL: API_URL,
});

let accessToken: string | null = readStoredAccessToken();

export function hasAccessToken(): boolean {
  return accessToken !== null;
}

export function setAccessToken(token: string) {
  accessToken = token;

  if (typeof window !== "undefined") {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }
}

export function clearAccessToken() {
  accessToken = null;

  if (typeof window !== "undefined") {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
}

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError<{ message?: string }>(error)) {
      if (error.response?.status === 401) {
        clearAccessToken();
      }

      throw new Error(error.response?.data?.message ?? error.message);
    }

    throw error;
  },
);
