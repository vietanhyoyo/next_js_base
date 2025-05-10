import { PaginationRes } from "./pagination-res";

export interface UserRes {
  user_id: number;
  user_name: string;
  password: string;
  email: string;
  status: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllUserRes extends PaginationRes {
  users: UserRes[];
}
