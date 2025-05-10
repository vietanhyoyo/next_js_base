import React from "react";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import HTMLRenderer from "../html-renderer";
import Link from "next/link";

export interface VisualCardProps {
  image: string;
  name: string;
  slug?: string;
  description: string;
  tags?: string[];
  onClick?: () => void;
  href?: string;
}

const VisualCard: React.FC<VisualCardProps> = ({
  image,
  name,
  description,
  tags,
  onClick,
  href,
}) => {
  return (
    <Link
      href={href ?? ""}
      className="flex flex-col min-w-48 min-h-72 md:max-h-96 sl:w-1/4 lg:w-1/3 sm:w-1/2 w-full p-2"
    >
      <Card
        className={cn(
          "flex flex-col h-full overflow-clip cursor-pointer",
          "hover:border-white/30 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 ease-in-out hover:animate-shadow-pulse"
        )}
        onClick={onClick}
      >
        <Image
          src={image}
          alt="top-image"
          className="h-2/3 md:h-5/6 max-h-72 md:min-h-52 w-full object-cover"
          width={600}
          height={600}
        />
        <div className="p-4 flex flex-col flex-1 gap-2 justify-between">
          <div className="flex-1">
            <p className="text-md">{name}</p>
            <div className="h-10 pt-1">
              <div className="text-xs text-foreground line-clamp-2">
                <HTMLRenderer htmlString={description} />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {tags != undefined ? (
              tags.map((tag, id) => (
                <Badge key={id} variant="outline">
                  {tag}
                </Badge>
              ))
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export { VisualCard };
