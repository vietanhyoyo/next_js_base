import { del, get, patch, post } from "../api_client";

export const fetchCreateNews = (data?: any) => {
  return post("/news", data);
};

export const fetchAllNews = (data?: any) => {
  return get("/news/all", data);
};

export const fetchUpdateNews = (data?: any) => {
  return patch("/news/update", data);
};

export const fetchDeleteNews = (id: number) => {
  return del("/news/" + id);
};

export const fetchNewsBySlug = (slug: string) => {
  return get("/news/" + slug);
};