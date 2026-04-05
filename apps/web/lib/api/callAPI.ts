import type { AxiosRequestConfig, Method } from "axios";

import { axiosInstance } from "@/axiosInstance";

type CallApiOptions<TRequestData> = {
  data?: TRequestData;
  method?: Method;
  url: string;
} & Omit<
  AxiosRequestConfig<TRequestData>,
  "baseURL" | "data" | "method" | "url"
>;

export const callAPI = async <TResponse, TRequestData = undefined>({
  method = "GET",
  url,
  data,
  ...config
}: CallApiOptions<TRequestData>): Promise<TResponse> => {
  const response = await axiosInstance.request<
    TResponse,
    { data: TResponse },
    TRequestData
  >({
    ...config,
    data,
    method,
    url,
  });

  return response.data;
};
