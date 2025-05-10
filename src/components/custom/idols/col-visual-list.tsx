import React from "react";
import Image from "next/image";

import { Card } from "@/components/ui/card";
import { VisualCardProps } from "@/components/custom/idols/visual-card";
import { GetAllIdolRes } from "@/services/types/response/idol-res";
import { fetchAllIdol } from "@/services/modules/idol.service";
import HTMLRenderer from "../html-renderer";

const getData = async (page: number = 1): Promise<GetAllIdolRes | null> => {
  try {
    const result = await fetchAllIdol({ limit: 5, page: page });
    if (result.status == 200) {
      return result.data;
    } else return null;
  } catch (err) {
    return null;
  }
};

const ColVisualList: React.FC = async () => {
  const data = await getData(1);
  const dataList =
    data !== null
      ? data.idols.map((item) => ({
          image: item.thumbnail,
          name: item.idol_name,
          description: item.description,
        }))
      : [];
  const visualList: VisualCardProps[] = [
    {
      image: "https://tailwindcss.com/_next/static/media/card.a1cd9cff.jpg",
      name: "Name",
      description:
        "Lorem description, in the company, Korean main, Kpop, 2000 year, top trending",
    },
    {
      image:
        "https://i2.wp.com/onaircode.com/wp-content/uploads/2017/11/Tesselation-Transition.jpg?fit=948%2C527&ssl=1",
      name: "Name",
      description:
        "Lorem description, in the company, Korean main, Kpop, 2000 year, top trending",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgcNBwlMUmSrF-2P0XD35wFIa3-p4AMuTcCb5me0-kzhUo2Cn1Dts3VfS6R7yKd_TVAvk&usqp=CAU",
      name: "Name",
      description: "Lorem description, in the company, Korean main, Kpop",
    },
    {
      image:
        "https://i2.wp.com/onaircode.com/wp-content/uploads/2017/11/Tesselation-Transition.jpg?fit=948%2C527&ssl=1",
      name: "Name",
      description: "Lorem description, in the company, Korean main, Kpop",
    },
    {
      image: "https://tailwindcss.com/_next/static/media/card.a1cd9cff.jpg",
      name: "Name",
      description: "Lorem description, in the company, Korean main, Kpop",
    },
  ];

  return (
    <Card className="p-4 flex flex-col gap-4">
      <div className="flex justify-between">
        <span className="text-xl font-medium">KOREAN</span>
        <span className="text-primary">More</span>
      </div>
      {dataList.map((item, index) => {
        return (
          <div key={index} className="flex flex-col gap-4">
            <div className="flex lg:flex-row md:flex-col gap-4 rounded-lg border-2 p-4">
              <Image
                src={item.image}
                alt="news"
                className="w-24 h-24 object-cover rounded-full"
                width={300}
                height={300}
              />
              <div className="flex-1">
                <p className="text-md">{item.name}</p>
                <p className="text-sm text-foreground line-clamp-3 pt-1">
                  <HTMLRenderer htmlString={item.description} />
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </Card>
  );
};

export { ColVisualList };
