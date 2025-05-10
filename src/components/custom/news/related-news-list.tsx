import React from "react";
import { NewsCard } from "@/components/custom/news/news-card";

const RelatedNews: React.FC = () => {
  const newsList = [
    {
      title:
        "IU's staff members thank the singer for treating them tickets to Universal Studios",
      thumbnail:
        "https://www.allkpop.com/upload/2024/08/content/022255/1722653748-20240802-iu.jpg",
      time: "8 minutes ago",
    },
    {
      title:
        "IU's staff members thank the singer for treating them tickets to Universal Studios",
      thumbnail:
        "https://www.allkpop.com/upload/2024/08/content/022255/1722653748-20240802-iu.jpg",
      time: "8 minutes ago",
    },
    {
      title:
        "IU's staff members thank the singer for treating them tickets to Universal Studios",
      thumbnail:
        "https://www.allkpop.com/upload/2024/08/content/022255/1722653748-20240802-iu.jpg",
      time: "8 minutes ago",
    },
  ];
  return (
    <div className="flex flex-wrap -mr-2 -ml-2 content-center">
      {newsList.map((item, index) => (
        <NewsCard
          key={index}
          title={item.title}
          thumbnail={item.thumbnail}
          time={item.time}
        />
      ))}
    </div>
  );
};

export { RelatedNews };
