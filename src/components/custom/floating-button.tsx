"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface FloatingButtonProps {
  children?: React.ReactNode;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ children }) => {
  return (
    <div
      className={cn(
        "cursor-pointer fixed bottom-8 right-6 z-40",
        "shadow-[0_2px_10px_rgba(0,0,0,0.15)] rounded-full w-11 h-11",
        "dark:shadow-[0_2px_10px_rgba(255,255,255,0.15)]",
        "flex items-center justify-center",
        "transition-opacity duration-300 ease-in-out"
      )}
    >
      {children} 
    </div>
  );
};

export { FloatingButton };
