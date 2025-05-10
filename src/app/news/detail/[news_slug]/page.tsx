import Image from "next/image";
import CustomBreadcrumb from "@/components/custom/custom-breadcrumb";
import { ColVisualList } from "@/components/custom/idols/col-visual-list";
import { ColNewsList } from "@/components/custom/news/col-news-list";
import { RelatedNews } from "@/components/custom/news/related-news-list";
import { PageBody } from "@/components/custom/page-body";
import { Card } from "@/components/ui/card";
import { NewsRes } from "@/services/types/response/news-res";
import { fetchNewsBySlug } from "@/services/modules/news.service";
import HTMLRenderer from "@/components/custom/html-renderer";

const getData = async (slug: string): Promise<NewsRes | null> => {
  try {
    const result = await fetchNewsBySlug(slug);
    if (result.status == 200) {
      return result.data;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};

export default async function NewsSlugPage({ params }: { params: { news_slug: string } }) {
  const detail_slug = params.news_slug;
  const data = await getData(detail_slug);
  return (
    <PageBody>
      <div className="flex flex-col gap-4 col-span-12 md:col-span-8">
        <Card className="flex flex-col p-4 gap-4 ">
          <CustomBreadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "News", href: "news" },
              { label: data?.title ?? "" },
            ]}
          />
          <h1 className={"text-primary font-semibold text-xl sm:text-2xl"}>
            {data?.title}
          </h1>
          <div className="flex gap-4 text-sm sm:text-base">
            <span>{data?.author}</span>
            <span className="text-foreground">{data?.createdAt}</span>
          </div>
          <div className="w-full border-t border-dashed border-gray-300"></div>
          <div className="flex flex-col text-foreground gap-4">
            <Image
              src={data?.thumbnail ?? ""}
              alt="news-content-photo"
              className="w-full h-auto"
              width={1500}
              height={1500}
            />
            <HTMLRenderer htmlString={data?.content ?? ""} />
          </div>
        </Card>
        <p className="text-xl h-5">RELATED</p>
        <RelatedNews />
      </div>
      <div className="flex flex-col gap-4 col-span-12 md:col-span-4 h-full">
        <div className="sticky top-0">
          <ColNewsList />
          <ColVisualList />
        </div>
      </div>
    </PageBody>
  );
}
