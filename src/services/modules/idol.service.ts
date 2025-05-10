import { del, get, patch, post } from "@/services/api_client";

export const fetchCreateIdol = (data?: any) => {
  return post("/idol", data);
};

export const fetchAllIdol = (data?: any) => {
  return get("/idol/all", data);
};

export const fetchUpdateIdol = (data?: any) => {
  return patch("/idol/update", data);
};

export const fetchIdolBySlug = (slug: string) => {
  return get("/idol/" + slug);
};

export const fetchDeleteIdol = (id: number) => {
  return del("/idol/" + id);
};
