"use client";
import { AdminBody } from "@/components/admin/admin-body";
import IdolDialog from "@/components/admin/idols/idol-dialog";
import UpdateIdolDialog from "@/components/admin/idols/update-idol-dialog";
import {
  VisualCard,
  VisualCardProps,
} from "@/components/custom/idols/visual-card";
import PaginationWrapper from "@/components/custom/pagination-wrapper";
import { Card } from "@/components/ui/card";
import { fetchAllIdol } from "@/services/modules/idol.service";
import { GetAllIdolRes, IdolRes } from "@/services/types/response/idol-res";
import React from "react";

const getData = async (page: number = 1): Promise<GetAllIdolRes | null> => {
  try {
    const result = await fetchAllIdol({ limit: 10, page: page });
    if (result.status == 200) {
      return result.data;
    } else return null;
  } catch (err) {
    return null;
  }
};

export default function AdminIdolPage() {
  const [data, setData] = React.useState<GetAllIdolRes | null>(null);
  const [selectedIdol, setSelectedIdol] = React.useState<IdolRes | null>(null);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

  const fetchData = async () => {
    const result = await getData(currentPage);
    setData(result);
  };

  React.useEffect(() => {
    fetchData();
  }, [currentPage]);

  const cardList =
    data !== null
      ? data.idols.map((item) => {
          return {
            image: item.thumbnail,
            name: item.idol_name,
            description: item.description,
            tags: item.tags.map((tag) => tag.tag_name),
          };
        })
      : [];

  if (!data) return <div>No Data</div>;

  return (
    <AdminBody>
      <div className="flex flex-col gap-4 col-span-12">
        <div className="flex justify-between">
          <h1>Idol Management</h1>
          <div>
            <IdolDialog
              onRefetch={() => {
                fetchData();
              }}
            />
            <UpdateIdolDialog
              idol={selectedIdol}
              open={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              onRefetch={() => {
                fetchData();
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="flex flex-wrap -mr-2 -ml-2 -mt-2 content-center col-span-8">
            {cardList.map((item, index) => (
              <VisualCard
                key={index}
                image={item.image}
                name={item.name}
                description={item.description}
                tags={item.tags}
                onClick={() => {
                  setIsDialogOpen(true);
                  setSelectedIdol(data!.idols[index]);
                }}
              />
            ))}

            <PaginationWrapper
              className="justify-start mt-4"
              totalPage={data!.totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>

          <div className="col-span-4 sticky top-24">
            <Card className="p-4 flex flex-col gap-4">
              <div className="flex justify-between">
                <span className="text-xl font-medium">FILTER</span>
                <span className="text-primary">More</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AdminBody>
  );
}
