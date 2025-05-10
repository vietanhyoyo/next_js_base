import { CustomAxiosResponse } from "@/common/interface/axios";
import { get, post } from "@/services/api_client";

export const fetchAllTag = (data?: any) => {
  return get("/tag/all", data);
};

export const createTag = (data?: any) => {
  return post("/tag", data);
};
