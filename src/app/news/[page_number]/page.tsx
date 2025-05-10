import { ColNewsList } from "@/components/custom/news/col-news-list";
import { ColVisualList } from "@/components/custom/idols/col-visual-list";
import CustomBreadcrumb from "@/components/custom/custom-breadcrumb";
import { NewsItem, NewsItemProps } from "@/components/custom/news/news-item";
import { PageBody } from "@/components/custom/page-body";
import PaginationWrapper from "@/components/custom/pagination-wrapper";
import { VisualCarouse } from "@/components/custom/idols/visual-carousel";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RelatedNews } from "@/components/custom/news/related-news-list";
import { GetAllNewsRes } from "@/services/types/response/news-res";
import { fetchAllNews } from "@/services/modules/news.service";
import Link from "next/link";

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

export default async function NewsPage({
  params,
}: {
  params: { page_number: string };
}) {
  const slug = params.page_number;
  const currentPage = Number(slug);
  const data = await getData(currentPage);

  const newsList: NewsItemProps[] =
    data !== null
      ? data.news.map((item) => {
          return {
            slug: item.slug,
            title: item.title,
            thumbnail: item.thumbnail,
            author: item.author,
            time: item.createdAt,
          };
        })
      : [];

  return (
    <PageBody>
      <div className="flex flex-col gap-4 col-span-12 md:col-span-8">
        <Card className="flex flex-col p-4 gap-4 items-start">
          <CustomBreadcrumb items={[{ label: "News", href: "/news" }]} />
          <div className="flex w-full justify-between items-center">
            <div className="flex flex-wrap gap-2">
              <Select>
                <SelectTrigger className="w-[180px] focus-within:border-primary focus:ring-0 focus:ring-primary">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">All country</SelectItem>
                  <SelectItem value="dark">Korean</SelectItem>
                  <SelectItem value="system">USA</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px] focus-within:border-primary focus:ring-0 focus:ring-primary">
                  <SelectValue placeholder="Genres" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">All Genres</SelectItem>
                  <SelectItem value="dark">Singer</SelectItem>
                  <SelectItem value="system">Artist</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <span className="hidden md:block">699 result</span>
          </div>

          {newsList.map((item, index) => {
            return (
              <Link key={index} href={`/news/detail/${item.slug}`}>
                <NewsItem
                  key={index}
                  title={item.title}
                  thumbnail={item.thumbnail}
                  author={item.author}
                  time={item.time}
                />
              </Link>
            );
          })}

          <PaginationWrapper
            className="flex justify-start items-start"
            totalPage={data?.totalPages ?? 0}
            selectedPage={currentPage}
            pathName="/news"
          />
        </Card>
        <p className="text-xl h-5">RELATED</p>
        <RelatedNews />
      </div>
      <div className="flex flex-col gap-4 col-span-12 md:col-span-4">
        <VisualCarouse />
        <ColNewsList />
        <ColVisualList />
      </div>
    </PageBody>
  );
}
