"use client";

import React from "react";
import { AdminBody } from "@/components/admin/admin-body";
import PaginationWrapper from "@/components/custom/pagination-wrapper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchAllUser } from "@/services/modules/user.service";
import { GetAllUserRes } from "@/services/types/response/user-res";

const getData = async (page: number = 1): Promise<GetAllUserRes | null> => {
  try {
    const result = await fetchAllUser({ limit: 5, page: page });
    if (result.status == 200) {
      return result.data;
    } else return null;
  } catch (err) {
    return null;
  }
};

export default function AdminUserPage() {
  const [data, setData] = React.useState<GetAllUserRes | null>(null);
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await getData(currentPage);
      setData(result);
    };

    fetchData();
  }, [currentPage]);

  if (data === null) return <div></div>;

  return (
    <AdminBody>
      <div className="flex flex-col gap-4 col-span-12">
        <h1>Account Management</h1>
        <div className=" bg-card p-4 rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>User Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-center">Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.users.map((item: any) => (
                <TableRow key={item.user_id}>
                  <TableCell className="font-medium">{item.user_id}</TableCell>
                  <TableCell>{item.user_name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell className="text-center">{item.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <PaginationWrapper
            totalPage={data.totalPages}
            className="justify-start mt-8"
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </AdminBody>
  );
}
