import { TranslationMatch } from "@/types";
import axios, { AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:3000/api";

type ApiResponse<T> = {
  status: string;
  data: T;
};

export async function getTranslation(
  sourceSegment: string,
  examples: TranslationMatch
): Promise<string> {
  try {
    const result: AxiosResponse<ApiResponse<string>> = await axios.post<
      ApiResponse<string>
    >(
      `${API_BASE_URL}/translations/translate`,
      { sourceSegment, examples },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "An error occurred");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}
