import { PageBody } from "@/components/custom/page-body";
import SkeletonCard from "@/components/custom/skeleton-card";
import SkeletonMinCard from "@/components/custom/skeleton-min-card";

export default function Loading() {
  return (
    <PageBody>
      <div className="flex flex-col gap-4 col-span-12 md:col-span-8">
        <div className="flex flex-wrap -mr-2 -ml-2 content-center">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
      <div className="flex flex-col gap-4 col-span-12 md:col-span-4 mt-2">
        <SkeletonMinCard />
        <SkeletonMinCard />
        <SkeletonMinCard />
        <SkeletonMinCard />
        <SkeletonMinCard />
        <SkeletonMinCard />
        <SkeletonMinCard />
        <SkeletonMinCard />
      </div>
    </PageBody>
  );
}
