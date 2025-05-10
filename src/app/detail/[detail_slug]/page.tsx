import React from "react";
import { PageBody } from "@/components/custom/page-body";
import { ColNewsList } from "@/components/custom/news/col-news-list";
import { ColVisualList } from "@/components/custom/idols/col-visual-list";
import CustomBreadcrumb from "@/components/custom/custom-breadcrumb";
import { BioIconLink } from "@/components/custom/idols/bio-icon-link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PhotoList } from "@/components/custom/idols/photo-list";
import {
  VisualCard,
  VisualCardProps,
} from "@/components/custom/idols/visual-card";
import { IdolRes } from "@/services/types/response/idol-res";
import { fetchIdolBySlug } from "@/services/modules/idol.service";
import HTMLRenderer from "@/components/custom/html-renderer";

const getData = async (slug: string): Promise<IdolRes | null> => {
  try {
    const result = await fetchIdolBySlug(slug);
    if (result.status == 200) {
      return result.data;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};

export default async function DetailPage({
  params,
}: {
  params: { detail_slug: string };
}) {
  const detail_slug = params.detail_slug;
  const data = await getData(detail_slug);
  const cardList: VisualCardProps[] = [
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgBa5WasHE1zp5aHMHAmwlTJZ1v3mNETzCjqkPHo8iiJ3V5G6yiWeX42o33yadNYEJt6k&usqp=CAU",
      name: "Winter",
      description: "Kpop idol, in aespa",
      tags: ["KPOP", "KOREAN"],
    },
    {
      image: "https://i0.wp.com/superdesigner.co/img/bg.png?ssl=1",
      name: "Hanni",
      description: "Kpop idol, in aespa",
      tags: ["KPOP", "KOREAN"],
    },
    {
      image:
        "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/298646759/original/f9de1b00523af7891badb488fd64d48397710b09/build-websites-using-tailwindcss.png",
      name: "Winter",
      description: "Kpop idol, in aespa",
      tags: ["KPOP", "KOREAN"],
    },
  ];

  return (
    <PageBody>
      <div className="flex flex-col gap-4 col-span-12 md:col-span-8">
        <CustomBreadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Detail" }]}
        />
        <div className="flex flex-col md:flex-row gap-4">
          <Image
            src={data?.thumbnail ?? ""}
            alt={"thumbnail"}
            className="object-cover w-72 h-80 rounded-lg"
            width={900}
            height={900}
          />
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl">{data?.idol_name}</h1>
            <h2 className="text-foreground text-justify">
              <div className="line-clamp-6">
                <HTMLRenderer htmlString={data?.description ?? ""} />
              </div>
            </h2>
            <div className="flex gap-4 flex-wrap">
              {data?.bio_link?.map((item, index) => (
                <BioIconLink key={index} bioLink={item} />
              ))}
            </div>
            <div className="flex gap-2">
              <Badge variant="outline">KOREAN</Badge>
              <Badge variant="outline">KPOP</Badge>
            </div>
          </div>
        </div>
        <Separator className="w-full" />
        <p className="text-xl">DETAILS</p>
        <div className="text-character">
          <HTMLRenderer htmlString={data?.detail ?? ""} />
        </div>
        {data!.images?.length > 0 && (
          <>
            <Separator className="w-full" />
            <p className="text-xl">PHOTOS</p>
          </>
        )}
        <PhotoList
          photoList={data?.images?.map((img) => ({ src: img })) || []}
        />
        <Separator className="w-full" />
        <p className="text-xl">RELATED</p>
        <div className="flex flex-wrap -mr-2 -ml-2 content-center">
          {cardList.map((item, index) => (
            <VisualCard
              key={index}
              image={item.image}
              name={item.name}
              description={item.description}
              tags={item.tags}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 col-span-12 md:col-span-4">
        <ColNewsList />
        <ColVisualList />
      </div>
    </PageBody>
  );
}
