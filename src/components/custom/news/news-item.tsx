import React from "react";
import Image from "next/image";

export interface NewsItemProps {
  title: string;
  slug?: string;
  author: string;
  thumbnail: string;
  time: string;
  onClick?: () => void;
}

const NewsItem: React.FC<NewsItemProps> = ({
  title,
  author,
  thumbnail,
  time,
  onClick,
}) => {
  return (
    <div className="flex gap-4 flex-col sm:flex-row" onClick={onClick}>
      <Image
        src={thumbnail}
        alt="news-thumbnail"
        className="md:h-36 sm:h-28 lg:h-52 object-cover sm:w-60 w-80 lg:w-80 rounded-sm"
        width={700}
        height={900}
      />
      <div className="flex flex-col gap-1">
        <p className="sm:line-clamp-2 font-medium mb-4">{title}</p>
        <p className="text-sm">
          Author: <span className="text-primary">{author}</span>
        </p>
        <p className="text-sm text-foreground">{time}</p>
      </div>
    </div>
  );
};

export { NewsItem };
