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
import { Plus } from "lucide-react";
import { GetAllTagRes } from "@/services/types/response/tag-res";
import { createTag, fetchAllTag } from "@/services/modules/tag.service";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const getData = async (page: number = 1): Promise<GetAllTagRes | null> => {
  try {
    const result = await fetchAllTag({ limit: 5, page: page });
    if (result.status == 200) {
      return result.data;
    } else return null;
  } catch (err) {
    return null;
  }
};

export default function AdminTagPage() {
  const [data, setData] = React.useState<GetAllTagRes | null>(null);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [tagInput, setTagInput] = React.useState("");

  const fetchData = async () => {
    const result = await getData(currentPage);
    setData(result);
  };

  React.useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleSubmit = React.useCallback(
    async (e: any) => {
      e.preventDefault();
      await createTag({ tag_name: tagInput })
        .then(({ data, msg, status }: any) => {
          if (status === 201) {
            fetchData();
            toast({
              variant: "default",
              title: "Add success!!!",
            });
          } else {
            toast({
              variant: "destructive",
              title: "Error!!!",
              description: "There was a problem with your request.",
            });
          }
        })
        .catch((err) => {
          toast({
            variant: "destructive",
            title: err.message,
          });
        });
    },
    [tagInput]
  );

  if (data === null) return <div></div>;

  return (
    <AdminBody>
      <div className="flex flex-col gap-4 col-span-8">
        <h1>Tag Management</h1>
        <div className=" bg-card p-4 rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Tag Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.tags.map((item: any) => (
                <TableRow key={item.tag_id}>
                  <TableCell className="font-medium">{item.tag_id}</TableCell>
                  <TableCell>{item.tag_name}</TableCell>
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
      <div className="flex flex-col gap-4 col-span-4">
        <div className="bg-card p-4 rounded-md">
          <h1 className="text-primary text-xl">Add Tag</h1>
          <div className="h-4"></div>
          <Label className="block text-sm font-medium">Tag Name</Label>
          <Input
            type="text"
            id="text"
            name="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="pt-4 flex justify-end">
            <Button variant={"outline"} onClick={handleSubmit}>
              <Plus className="mr-1" />
              ADD TAG
            </Button>
          </div>
        </div>
      </div>
    </AdminBody>
  );
}
