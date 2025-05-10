import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ISmallNews } from "@/types/small-news-interface";
import { fetchAllNews } from "@/services/modules/news.service";
import { GetAllNewsRes } from "@/services/types/response/news-res";
import Link from "next/link";

const getData = async (page: number = 1): Promise<GetAllNewsRes | null> => {
  try {
    const result = await fetchAllNews({ limit: 5, page: page });
    if (result.status == 200) {
      return result.data;
    } else return null;
  } catch (err) {
    return null;
  }
};

const ColNewsList: React.FC = async () => {
  const data = await getData(1);
  const newsList: ISmallNews[] =
    data !== null
      ? data.news.map((item) => ({
          image: item.thumbnail,
          slug: item.slug,
          name: item.title,
          time: item.createdAt,
        }))
      : [];

  return (
    <Card className="p-4 flex flex-col gap-4">
      <div className="flex justify-between">
        <span className="text-xl font-medium">NEWS</span>
        <span className="text-primary">More</span>
      </div>
      {newsList.map((item, index) => {
        return index === 0 ? (
          <Link key={index} href={`/news/detail/${item.slug}`}>
            <div key={index} className="flex flex-col gap-4">
              <Image
                src={item.image}
                alt="news"
                className="w-full rounded-sm"
                width={800}
                height={800}
              />
              <span>{item.name}</span>
              <span className="text-sm text-foreground">{item.time}</span>
            </div>
          </Link>
        ) : (
          <div key={index} className="flex flex-col gap-4">
            <div className="w-full border-t border-dashed border-gray-300"></div>
            <Link key={index} href={`/news/detail/${item.slug}`}>
              <div className="flex lg:flex-row md:flex-col gap-4">
                <Image
                  src={item.image}
                  alt="news"
                  className="rounded-sm w-36 max-h-20 object-cover"
                  width={800}
                  height={800}
                />
                <div className="flex-1 flex flex-col gap-4">
                  <p className="text-sm line-clamp-2">{item.name}</p>
                  <p className="text-sm text-foreground">{item.time}</p>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </Card>
  );
};

export { ColNewsList };
