import axios from 'axios';
import { Platform } from 'react-native';

// Android emulator uses 10.0.2.2 to access host machine's localhost
// For physical devices, use your computer's IP address (e.g., http://192.168.1.100:4000/api)
// iOS simulator can use localhost directly
const API_BASE_URL = Platform.OS === 'android' 
  ? 'http://10.0.2.2:4000/api'  // Android emulator
  : 'http://localhost:4000/api';  // iOS simulator or physical device

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export function setClientToken(token?: string | null) {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common.Authorization;
  }
}

export function getApiBaseUrl() {
  return API_BASE_URL;
}

