import { CustomAxiosResponse } from "@/common/interface/axios";
import { get, post } from "@/services/api_client";

export const fetchAllUser = (data?: any) => {
  return get("/user/all", data);
};
