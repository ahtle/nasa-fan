import { api } from "@/lib/api";

interface LoginDTO {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
}

interface LoginResponse {
  accessToken: string;
  user: User;
}

export async function login({
  email,
  password,
}: LoginDTO): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
  return data;
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>("/auth/me");
  return data;
}

export const authMeQueryKey = ["auth", "me"] as const;
