import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="flex flex-col min-w-48 sl:w-1/4 lg:w-1/3 sm:w-1/2 w-full p-2 space-y-3">
      <Skeleton className="h-[180px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
}
