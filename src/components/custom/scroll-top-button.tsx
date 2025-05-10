"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";

const ScrollTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Kiểm tra vị trí cuộn và hiển thị/ẩn nút
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Xử lý cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      onClick={scrollToTop}
      className={cn(
        "cursor-pointer fixed bottom-8 right-6 z-40",
        "shadow-[0_2px_10px_rgba(0,0,0,0.15)] rounded-full w-11 h-11 bg-primary",
        "dark:shadow-[0_2px_10px_rgba(255,255,255,0.15)]",
        "flex items-center justify-center",
        "transition-opacity duration-300 ease-in-out",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <ArrowUp className="text-white" />
    </div>
  );
};

export { ScrollTopButton };
