import * as SecureStore from 'expo-secure-store';
import axios, { AxiosResponse } from 'axios';

let accessToken: string | null = null;
let refreshToken: string | null = null;

const baseURL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:8000';

interface RefreshTokenResponse {
  access_token: string;
}

export const setAccessToken = async (token: string): Promise<void> => {
  accessToken = token;
  await SecureStore.setItemAsync('accessToken', token);
};

export const setRefreshToken = async (token: string): Promise<void> => {
  refreshToken = token;
  await SecureStore.setItemAsync('refreshToken', token);
};

export const loadTokens = async (): Promise<void> => {
  const aToken = await SecureStore.getItemAsync('accessToken');
  const rToken = await SecureStore.getItemAsync('refreshToken');

  if (aToken) {
    accessToken = aToken;
  }

  if (rToken) {
    refreshToken = rToken;
  }
};

const refreshAccessToken = async (options: any) => {
  if (!refreshToken) {
    throw new Error('Brak refresh token.');
  }

  try {
    const response = await apiCall<RefreshTokenResponse>({
      method: 'GET',
      url: '/auth/refresh_token',
    });
    if (response?.access_token) {
      await setAccessToken(response?.access_token);
      await apiCall(options);
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw new Error('Nie można odświeżyć tokena.');
  }
};

export const apiCall = async <T>(
  options: { method: string; url: string; data?: object | string | FormData },
  refreshed: boolean = false,
): Promise<T> => {
  console.log('APICall', baseURL, options);

  const headers: Record<string, string> = {};

  if (options.data instanceof FormData) {
    headers['Content-Type'] = 'multipart/form-data';
  } else {
    headers['Content-Type'] = 'application/json';
  }

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  try {
    const response: AxiosResponse<T> = await axios({
      method: options.method,
      url: `${baseURL}${options.url}`,
      headers,
      data: options.data,
      timeout: 2000,
    });

    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      if (refreshed)
        throw new Error('Nieautoryzowany – accessToken wygasł lub jest nieprawidłowy.');
      else {
        await refreshAccessToken(options);
      }
    }
    throw new Error(`API error: ${error.response?.status || error.message}`);
  }
};
