import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';

import { getCurrentUser } from '../utils';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export interface RequestOptions {
  params?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
  isFormData?: boolean;
}

export interface SafeResponse<T> {
  response?: T;
  error?: { status?: number; message: string };
}

class ApiService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      headers: {
        Accept: 'application/json',
      },
    });

    this.instance.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = config.headers || {};
        if (config.headers instanceof Object) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }
      return config;
    });

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(this.formatError(error))
    );
  }

  private formatError(error: any) {
    return {
      status: error?.response?.data?.code || 500,
      message: error?.response?.data?.desc || 'Oops! Ha ocurrido un error inesperado',
    };
  }

  private async request<T = any>(
    method: Method,
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    const isUpload = options?.isFormData ?? false;
    const isGetLikeMethod = method === 'GET' || method === 'HEAD';
  
    const { token } = getCurrentUser() || {};
  
    const preparedData = data ? { ...data } : {};
  
    if (token) {
      preparedData['token'] = token;
    };
  
    const config: AxiosRequestConfig = {
      method,
      url: endpoint,
      params: isGetLikeMethod ? { ...options?.params, ...preparedData } : options?.params,
      timeout: options?.timeout ?? 10000,
      headers: {
        ...(options?.headers || {}),
      },
    };
  
    if (!isGetLikeMethod && preparedData) {
      if (isUpload) {
        config.data = preparedData; 
      } else {
        config.data = JSON.stringify(preparedData);
        config.headers!['Content-Type'] = 'application/json';
      }
    }
  
    const response: AxiosResponse<T> = await this.instance.request(config);
    return response.data;
  }
  
  
  public get<T = any>(endpoint: string, options?: RequestOptions) {
    return this.request<T>('GET', endpoint, undefined, options);
  }

  public post<T = any>(endpoint: string, data?: any, options?: RequestOptions) {
    return this.request<T>('POST', endpoint, data, options);
  }

  public put<T = any>(endpoint: string, data?: any, options?: RequestOptions) {
    return this.request<T>('PUT', endpoint, data, options);
  }

  public patch<T = any>(endpoint: string, data?: any, options?: RequestOptions) {
    return this.request<T>('PATCH', endpoint, data, options);
  }

  public delete<T = any>(endpoint: string, options?: RequestOptions) {
    return this.request<T>('DELETE', endpoint, undefined, options);
  }

  public head<T = any>(endpoint: string, options?: RequestOptions) {
    return this.request<T>('HEAD', endpoint, undefined, options);
  }

  public safe = {
    get: <T = any>(endpoint: string, data?: any, options?: RequestOptions): Promise<SafeResponse<T>> =>
      this.wrapSafe<T>('GET', endpoint, data, options),

    post: <T = any>(endpoint: string, data?: any, options?: RequestOptions): Promise<SafeResponse<T>> =>
      this.wrapSafe<T>('POST', endpoint, data, options),

    put: <T = any>(endpoint: string, data?: any, options?: RequestOptions): Promise<SafeResponse<T>> =>
      this.wrapSafe<T>('PUT', endpoint, data, options),

    patch: <T = any>(endpoint: string, data?: any, options?: RequestOptions): Promise<SafeResponse<T>> =>
      this.wrapSafe<T>('PATCH', endpoint, data, options),

    delete: <T = any>(endpoint: string, options?: RequestOptions): Promise<SafeResponse<T>> =>
      this.wrapSafe<T>('DELETE', endpoint, undefined, options),
  };

  private async wrapSafe<T>(
    method: Method,
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<SafeResponse<T>> {
    try {
      const response = await this.request<T>(method, endpoint, data, options);
      return { response };
    } catch (error) {
      return { error: this.formatError(error) };
    }
  }
}

const api = new ApiService();
export default api;
