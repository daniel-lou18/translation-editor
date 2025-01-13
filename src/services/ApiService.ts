import { ApiResponseType } from "@/types";
import axios, { AxiosHeaders, AxiosInstance, AxiosRequestConfig } from "axios";

type Config = {
  timeout: number;
  headers: Partial<AxiosHeaders>;
};

export class ApiService {
  private api: AxiosInstance;
  private config: Config = {
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  };

  constructor(baseURL: string, config?: Partial<Config>) {
    this.api = axios.create({
      baseURL,
      ...this.config,
      ...config,
    });
  }

  private handleError(error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      return new Error(error.response?.data?.message || "An error occurred");
    } else {
      console.error("Unexpected error:", error);
      return new Error("An unexpected error occurred");
    }
  }

  async get<T>(url: string): Promise<T> {
    try {
      const response = await this.api.get<ApiResponseType<T>>(url);
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.api.post<ApiResponseType<T>>(
        url,
        data,
        config
      );
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.api.put<ApiResponseType<T>>(
        url,
        data,
        config
      );
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
}
