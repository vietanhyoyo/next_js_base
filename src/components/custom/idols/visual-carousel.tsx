"use client";
import React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GetAllIdolRes } from "@/services/types/response/idol-res";
import { fetchAllIdol } from "@/services/modules/idol.service";
import Link from "next/link";

const VisualCarouse = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [dataList, setDataList] = React.useState<
    { idol_name: string; thumbnail: string; slug: string }[]
  >([]);

  const getData = async (page: number = 1): Promise<GetAllIdolRes | null> => {
    try {
      const result = await fetchAllIdol({ limit: 3, page: page });
      if (result.status == 200) {
        return result.data;
      } else return null;
    } catch (err) {
      return null;
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getData(1);
      if (data) {
        const list = data.idols.map((item) => ({
          idol_name: item.idol_name,
          slug: item.slug,
          thumbnail: item.thumbnail,
        }));
        setDataList(list);
      }
    };

    fetchData();
  }, [api]);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, dataList]);

  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        setApi={setApi}
        plugins={[Autoplay({ delay: 3000 })]}
        className="w-full"
      >
        <CarouselContent className="-ml-1 -z-0">
          {dataList.map((item, index) => (
            <CarouselItem key={index} className="pl-1 basis-full">
              <Card className="w-full aspect-video sm:h-96 md:h-64 lg:h-96 relative">
                <Link key={index} href={`/detail/${item.slug}`}>
                  <Image
                    src={item.thumbnail}
                    alt={`Image ${index + 1}`}
                    className="object-cover w-full h-full rounded-lg"
                    width={1800}
                    height={1800}
                  />
                </Link>
                <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black to-transparent rounded-lg"></div>
                <div className="absolute bottom-10 left-6 text-white/80 text-xl">
                  {item.idol_name}
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center">
          {Array.from({ length: count }).map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className={`w-2 h-2 rounded-full mx-1 p-0 z-50 ${
                index === current - 1 ? "bg-primary" : "bg-muted"
              }`}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export { VisualCarouse };
