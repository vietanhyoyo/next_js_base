import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Link as LinkIcon } from "lucide-react";

interface BioIconLinkProps {
  bioLink: string;
}

const iconMap: Record<string, string> = {
  tiktok: "/images/icons/tiktok.png",
  instagram: "/images/icons/instagram-icon.webp",
  weibo: "/images/icons/weibo.png",
  youtube: "/images/icons/youtube-icon.png",
  zepeto: "/images/icons/zepeto.png",
  threads: "/images/icons/threads.png",
};

const BioIconLink: React.FC<BioIconLinkProps> = ({ bioLink }) => {
  const matchedPlatform = Object.keys(iconMap).find((platform) =>
    bioLink.includes(platform)
  );
  
  const renderIcon = () => {
    if (matchedPlatform) {
      const iconSrc = iconMap[matchedPlatform];
      return (
        <Link href={bioLink}>
          <Image
            src={iconSrc}
            alt={`${matchedPlatform} Icon`}
            width={36}
            height={36}
            className={matchedPlatform === "tiktok" || matchedPlatform === "threads" ? "rounded-full" : ""}
          />
        </Link>
      );
    }
    return (
      <Link href={bioLink}>
        <LinkIcon width={36} className="text-black/25" />
      </Link>
    );
  };

  return (
    <div
      className={cn(
        "cursor-pointer",
        "shadow-[0_2px_10px_rgba(0,0,0,0.15)] rounded-full w-14 h-14 bg-white/80",
        "dark:shadow-[0_2px_10px_rgba(255,255,255,0.15)] dark:bg-slate-50/90",
        "flex items-center justify-center"
      )}
    >
      {renderIcon()}
    </div>
  );
};

export { BioIconLink };
