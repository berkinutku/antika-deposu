import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@antikaDeposu/token';
const USER_KEY = '@antikaDeposu/user';

export async function storeAuthToken(token: string) {
  await AsyncStorage.setItem(TOKEN_KEY, token);
}

export async function getAuthToken() {
  return AsyncStorage.getItem(TOKEN_KEY);
}

export async function clearAuthToken() {
  await AsyncStorage.removeItem(TOKEN_KEY);
}

export interface StoredUser {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

export async function storeUser(user: StoredUser) {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function getStoredUser(): Promise<StoredUser | null> {
  const value = await AsyncStorage.getItem(USER_KEY);
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as StoredUser;
  } catch (error) {
    console.warn('Failed to parse stored user', error);
    return null;
  }
}

export async function clearStoredUser() {
  await AsyncStorage.removeItem(USER_KEY);
}

export async function clearAuth() {
  await Promise.all([clearAuthToken(), clearStoredUser()]);
}

