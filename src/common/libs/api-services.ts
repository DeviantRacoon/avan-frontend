import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
  AxiosError,
} from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Opciones extendidas para cada petición.
 */
export interface RequestOptions {
  /** Parámetros para query string (solo para GET, DELETE, HEAD) */
  params?: Record<string, any>;

  /** Headers adicionales opcionales */
  headers?: Record<string, string>;

  /** Timeout específico en milisegundos (por defecto 10000) */
  timeout?: number;

  /** Si `true`, se enviará como `multipart/form-data` */
  isFormData?: boolean;
}

/**
 * Servicio HTTP profesional para llamadas API.
 * Soporta JSON, archivos, headers dinámicos y timeout.
 */
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

    // Interceptor para añadir tokens automáticamente si existen
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

    // Interceptor global de errores
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(this.formatError(error))
    );
  }

  /**
   * Formatea errores en una estructura uniforme.
   */
  private formatError(error: AxiosError) {
    return {
      message: 'Error inesperado en la solicitud',
      status: error.response?.status,
      data: error.response?.data,
    };
  }

  /**
   * Método base para todas las llamadas.
   */
  private async request<T = any>(
    method: Method,
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    const isUpload = options?.isFormData ?? false;

    const config: AxiosRequestConfig = {
      method,
      url: endpoint,
      params: options?.params,
      timeout: options?.timeout ?? 10000,
      headers: {
        ...(options?.headers || {}),
      },
    };

    if (data) {
      if (isUpload) {
        config.data = data;
      } else {
        config.data = JSON.stringify(data);
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
}

const api = new ApiService();
export default api;
