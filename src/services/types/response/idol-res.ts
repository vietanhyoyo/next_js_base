import { PaginationRes } from "./pagination-res";
import { TagRes } from "./tag-res";

export interface IdolRes {
  idol_id: number;
  slug: string;
  thumbnail: string;
  idol_name: string;
  description: string;
  detail: string;
  images: string[];
  tags: TagRes[];
  bio_link: string[];
}

export interface GetAllIdolRes extends PaginationRes {
  idols: IdolRes[];
}
