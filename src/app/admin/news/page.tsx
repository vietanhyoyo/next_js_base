"use client";
import { AdminBody } from "@/components/admin/admin-body";
import CreateNewsDialog from "@/components/admin/news/create-news-dialog";
import UpdateNewsDialog from "@/components/admin/news/update-news-dialog";
import { NewsItem, NewsItemProps } from "@/components/custom/news/news-item";
import PaginationWrapper from "@/components/custom/pagination-wrapper";
import { Card } from "@/components/ui/card";
import { fetchAllNews } from "@/services/modules/news.service";
import { GetAllNewsRes, NewsRes } from "@/services/types/response/news-res";
import React from "react";

const getData = async (page: number = 1): Promise<GetAllNewsRes | null> => {
  try {
    const result = await fetchAllNews({ limit: 10, page: page });
    if (result.status == 200) {
      return result.data;
    } else return null;
  } catch (err) {
    return null;
  }
};

export default function AdminNewsPage() {
  const [data, setData] = React.useState<GetAllNewsRes | null>(null);
  const [selectedNews, setSelectedNews] = React.useState<NewsRes | null>(null);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

  const fetchData = async () => {
    const result = await getData(currentPage);
    setData(result);
  };

  React.useEffect(() => {
    fetchData();
  }, [currentPage]);

  if (!data) return <div>No Data</div>;

  const newsList: NewsItemProps[] =
    data !== null
      ? data.news.map((item) => {
          return {
            title: item.title,
            thumbnail: item.thumbnail,
            author: item.author,
            time: item.createdAt,
          };
        })
      : [];

  return (
    <AdminBody>
      <div className="flex flex-col gap-4 col-span-12">
        <div className="flex justify-between">
          <UpdateNewsDialog
            news={selectedNews}
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            onRefetch={() => {
              fetchData();
            }}
          />
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="flex flex-wrap content-center col-span-8">
            <Card className="flex flex-col p-4 gap-4 items-start">
              <h1>News Management</h1>
              {newsList.map((item, index) => {
                return (
                  <NewsItem
                    key={index}
                    title={item.title}
                    thumbnail={item.thumbnail}
                    author={item.author}
                    time={item.time}
                    onClick={() => {
                      setIsDialogOpen(true);
                      setSelectedNews(data!.news[index]);
                    }}
                  />
                );
              })}

              <PaginationWrapper
                className="justify-start mt-4"
                totalPage={data!.totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </Card>
          </div>

          <div className="col-span-4 sticky top-24">
            <div className="flex justify-end mb-4">
              <CreateNewsDialog
                onRefetch={() => {
                  fetchData();
                }}
              />
            </div>
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
