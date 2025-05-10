import { ColNewsList } from "@/components/custom/news/col-news-list";
import { ColVisualList } from "@/components/custom/idols/col-visual-list";
import {
  VisualCardProps,
  VisualCard,
} from "@/components/custom/idols/visual-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PaginationWrapper from "@/components/custom/pagination-wrapper";
import { PageBody } from "@/components/custom/page-body";
import { VisualCarouse } from "@/components/custom/idols/visual-carousel";
import CustomBreadcrumb from "@/components/custom/custom-breadcrumb";
import { GetAllIdolRes } from "@/services/types/response/idol-res";
import { fetchAllIdol } from "@/services/modules/idol.service";

const getData = async (page: number = 1): Promise<GetAllIdolRes | null> => {
  try {
    const result = await fetchAllIdol({ limit: 12, page: page });
    if (result.status == 200) {
      return result.data;
    } else return null;
  } catch (err) {
    return null;
  }
};

export default async function Home({
  params,
}: {
  params: { page_number: string };
}) {
  const slug = params.page_number;
  const currentPage = Number(slug);
  const data = await getData(currentPage);
  const cardList =
    data !== null
      ? data.idols.map((item) => ({
          image: item.thumbnail,
          slug: item.slug,
          name: item.idol_name,
          description: item.description,
          tags: item.tags.map((tag) => tag.tag_name),
        }))
      : [];

  return (
    <PageBody>
      <div className="flex flex-col gap-4 col-span-12 md:col-span-8">
        <CustomBreadcrumb items={[{ label: "Home", href: "/" }]} />
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-2 flex-wrap">
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
          <span className="hidden md:block">{data?.total} result</span>
        </div>

        <div className="flex flex-wrap -mr-2 -ml-2 content-center">
          {cardList.map((item, index) => (
            <VisualCard
              href={`/detail/${item.slug}`}
              key={index}
              image={item.image}
              name={item.name}
              description={item.description}
              tags={item.tags}
            />
          ))}
        </div>

        <PaginationWrapper
          className="justify-start mt-4"
          totalPage={data?.totalPages ?? 0}
          selectedPage={currentPage}
          pathName="/home"
        />
      </div>
      <div className="flex flex-col gap-4 col-span-12 md:col-span-4">
        <VisualCarouse />
        <ColNewsList />
        <ColVisualList />
      </div>
    </PageBody>
  );
}
