import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios';
import { API_BASE_URL, SESSION_KEY } from '@/constants';
import { getData } from '@/utils/storage';
import { User } from '@/types';

interface UserSession extends User {
  token?: string;
}

interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export class ApiRequestError extends Error {
  public readonly code?: string;
  public readonly status?: number;

  constructor(message: string, code?: string, status?: number) {
    super(message);
    this.name = 'ApiRequestError';
    this.code = code;
    this.status = status;
  }
}

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const session = await getData(SESSION_KEY) as UserSession;
      if (session?.token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${session.token}`;
      }
      return config;
    } catch (error) {
      return config;
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response) {
      const apiError = new ApiRequestError(
        error.response.data?.message || 'Erro na requisição',
        error.response.data?.code,
        error.response.status
      );

      if (error.response.status === 401) {
        return Promise.reject(
          new ApiRequestError('Erro ao autenticar', 'unauthorized', 401)
        );
      }

      return Promise.reject(apiError);
    }

    if (error.request) {
      return Promise.reject(
        new ApiRequestError('Não foi possível conectar ao servidor')
      );
    }

    return Promise.reject(
      new ApiRequestError('Erro ao processar a requisição')
    );
  }
);

export const apiService = {
  get: <T>(url: string, config?: AxiosRequestConfig) => 
    api.get<T>(url, config).then(response => response.data),

  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    api.post<T>(url, data, config).then(response => response.data),

  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    api.put<T>(url, data, config).then(response => response.data),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    api.delete<T>(url, config).then(response => response.data),

  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    api.patch<T>(url, data, config).then(response => response.data),
};

export default api;