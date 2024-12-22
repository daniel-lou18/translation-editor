import axios, { AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:3000/api";

type ApiResponse = {
  status: string;
  data: string;
};

export async function getTranslation(
  translationPrompt: string
): Promise<string> {
  try {
    const result: AxiosResponse<ApiResponse> = await axios.post(
      `${API_BASE_URL}/translations/translate`,
      { translationPrompt },
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
