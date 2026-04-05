import axios, { AxiosError, type AxiosInstance } from "axios";

type ApiErrorPayload = {
  error?: string;
  message?: string;
  text?: string;
} & Record<string, string | undefined>;

export class ApiError extends Error {
  status: number;
  errorData?: string;
  text?: string;

  constructor(
    message: string,
    status: number,
    errorData?: string,
    text?: string,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errorData = errorData;
    this.text = text;
  }
}

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:9000",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const { status, data } = error.response;
      const errorPayload =
        typeof data === "object" && data !== null
          ? (data as ApiErrorPayload)
          : undefined;

      const errorMessage =
        errorPayload?.message ??
        Object.values(errorPayload ?? {}).find(
          (value): value is string =>
            typeof value === "string" && value.length > 0,
        ) ??
        "Request error";

      return Promise.reject(
        new ApiError(
          errorMessage,
          status,
          errorPayload?.error,
          errorPayload?.text,
        ),
      );
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
