"use client";
import React from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import {
  Captions,
  Download,
  Fullscreen,
  Thumbnails,
  Zoom,
} from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { cn, isValidUrl } from "@/lib/utils";

interface PhotoListProps {
  photoList: { src: string }[];
  disable?: boolean | false;
}

const PhotoList: React.FC<PhotoListProps> = ({ photoList, disable }) => {
  const [index, setIndex] = React.useState<number>(-1);

  const photoArray = photoList.filter((item) => isValidUrl(item.src));

  const photoRenderList = photoArray.map((item, index) => (
    <Image
      key={index}
      src={item.src}
      alt={`photo-item-${index}`}
      className="h-40 w-auto object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => {
        if (disable) return;
        setIndex(index);
      }}
      width={800}
      height={800}
    />
  ));

  return (
    <div className="relative">
      <div
        className={cn(
          "w-full",
          `${photoRenderList.length !== 0 ? "h-40" : ""}`
        )}
      >
        <div
          className="flex overflow-x-hidden hover:overflow-x-scroll whitespace-nowrap custom-scrollbar scrollbar gap-4"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#4A5568 #EDF2F7",
          }}
        >
          {photoRenderList}
        </div>
      </div>
      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        plugins={[Captions, Download, Fullscreen, Zoom, Thumbnails]}
        captions={{
          showToggle: true,
          descriptionTextAlign: "end",
        }}
        slides={photoList}
      />
    </div>
  );
};

export { PhotoList };
