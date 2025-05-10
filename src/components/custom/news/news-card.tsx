import React from "react";
import Image from "next/image"
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface NewsCardProps {
  thumbnail: string;
  title: string;
  time: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ thumbnail, title, time }) => {
  return (
    <div className="flex flex-col min-w-48 min-h-72 md:max-h-96 sl:w-1/4 lg:w-1/3 sm:w-1/2 w-full p-2">
      <Card
        className={cn(
          "flex flex-col h-full overflow-clip cursor-pointer",
          "hover:border-white/30 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 ease-in-out hover:animate-shadow-pulse"
        )}
      >
        <Image
          src={thumbnail}
          alt="top-image"
          className="h-2/3 md:h-5/6 md:max-h-96 md:min-h-52 w-full object-cover"
          width={700}
          height={700}
        />
        <div className="p-4 flex flex-col flex-1 gap-2 justify-between">
          <div className="flex-1 flex flex-col gap-2">
            <p className="text-base line-clamp-3">{title}</p>
            <p className="text-sm text-foreground line-clamp-2">{time}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export { NewsCard };
