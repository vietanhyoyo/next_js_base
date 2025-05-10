import { PaginationRes } from "./pagination-res";
import { TagRes } from "./tag-res";

export interface NewsRes {
  news_id: number;
  title: string;
  slug: string;
  thumbnail: string;
  author: string;
  description: string;
  content: string;
  tags: TagRes[];
  views: number;
  createdAt: string;
}

export interface GetAllNewsRes extends PaginationRes {
  news: NewsRes[];
}
