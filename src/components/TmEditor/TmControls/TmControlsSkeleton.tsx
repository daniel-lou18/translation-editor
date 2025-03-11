import { Skeleton } from "@/components/ui/skeleton";

export function TmControlsSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-4 w-[120px]" />
      <Skeleton className="h-10 w-[200px]" />
    </div>
  );
}
