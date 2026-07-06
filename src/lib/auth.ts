import axios, { isAxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

interface LoginDTO {
  email: string;
  password: string;
}

interface User {
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
  try {
    const payload = { email, password };
    const { data } = await axios.post(`${API_URL}/auth/login`, payload);
    return data;
  } catch (error) {
    if (isAxiosError<{ message?: string }>(error)) {
      throw new Error(error.response?.data?.message ?? error.message);
    }

    throw error;
  }
}
