import { ApiResponseType, BlobResponse } from "@/types";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

type Config = Partial<AxiosRequestConfig>;

export class ApiService {
  private api: AxiosInstance;
  private config: Config = {
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    },
  };

  constructor(baseURL: string, config?: Config) {
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
      console.error("Unexpected error: ", error);
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

  async getBlob(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<BlobResponse> {
    try {
      const response = await this.api.get<Blob>(url, {
        ...config,
        responseType: "blob",
        headers: { Accept: "text/plain" },
      });
      const { data, headers } = response;

      const contentDisposition: string = headers["content-type"];
      const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
      const fileName = fileNameMatch ? fileNameMatch[1] : `file-${Date.now()}`;

      return { data, fileName };
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
