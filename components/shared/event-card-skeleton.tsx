import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface EventCardSkeletonProps {
  featured?: boolean;
}

export default function EventCardSkeleton({
  featured = false,
}: EventCardSkeletonProps) {
  return (
    <Card
      className={cn(
        "group overflow-hidden relative flex flex-col h-full",
        featured ? "border-primary/20" : "border-border"
      )}
    >
      {/* Card top decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40"></div>

      {/* Card content */}
      <div className="flex flex-col p-5 flex-grow">
        <div className="space-y-2.5 mb-4">
          <div className="flex flex-wrap gap-1.5 mb-2">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>

          <Skeleton className="h-6 w-3/4" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>

        <div className="space-y-2 mt-auto">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
      </div>

      {/* Card footer */}
      <div className="p-5 pt-0 mt-4">
        <Skeleton className="h-10 w-full" />
      </div>
    </Card>
  );
}
