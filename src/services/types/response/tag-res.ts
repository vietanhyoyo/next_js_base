import { PaginationRes } from "./pagination-res";

export interface TagRes {
  tag_id: number;
  tag_name: string;
}

export interface GetAllTagRes extends PaginationRes {
  tags: TagRes[];
}
