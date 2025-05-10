import { post } from "@/services/api_client";

export const fetchLogin = (data?: any) => {
  return post("/auth/login", data);
};
