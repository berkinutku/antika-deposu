import { apiClient, setClientToken } from './client';

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: 'admin' | 'user';
  };
}

export interface AuthPayload {
  email: string;
  password: string;
}

export async function signUp(payload: AuthPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/signup', payload);
  setClientToken(data.token);
  return data;
}

export async function login(payload: AuthPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/login', payload);
  setClientToken(data.token);
  return data;
}

export async function forgotPassword(email: string): Promise<void> {
  await apiClient.post('/auth/forgot-password', { email });
}

export async function resetPassword(
  token: string,
  password: string,
): Promise<void> {
  await apiClient.post('/auth/reset-password', { token, password });
}

