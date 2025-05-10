import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedEventCardSkeleton() {
  return (
    <Card className="group overflow-hidden relative">
      {/* Card top decoration */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary/40 via-primary/80 to-primary/40"></div>

      <div className="grid md:grid-cols-2 gap-0">
        {/* Left content */}
        <div className="relative p-6 md:p-8 space-y-4">
          {/* Event type indicators */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-18 rounded-full" />
          </div>

          <Skeleton className="h-8 w-3/4" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>

          <div className="grid grid-cols-1 gap-4 pt-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div>
                  <Skeleton className="h-3 w-8 mb-1" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div>
                  <Skeleton className="h-3 w-10 mb-1" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div>
                  <Skeleton className="h-3 w-16 mb-1" />
                  <Skeleton className="h-5 w-32 max-sm:w-48" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div>
                  <Skeleton className="h-3 w-14 mb-1" />
                  <Skeleton className="h-5 w-28" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <Skeleton className="h-3 w-24 mb-1" />
              <Skeleton className="h-7 w-20" />
            </div>
            <Skeleton className="h-11 w-32 md:w-36" />
          </div>
        </div>

        {/* Right content - Visual showcase */}
        <div className="relative bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center p-8">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-primary/10 opacity-70"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-primary/10 opacity-70"></div>
            <div className="absolute top-1/3 left-1/4 w-16 h-16 rounded-full bg-primary/5 opacity-50"></div>
          </div>

          <div className="relative w-full max-w-[400px] aspect-[4/3] rounded-lg p-6 shadow-lg border flex flex-col justify-between backdrop-blur-sm bg-background/80">
            <div className="absolute -top-3 -right-3">
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <div>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <div className="flex items-center gap-2 mb-1">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton
                    key={i}
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-background"
                    style={{ zIndex: 4 - i }}
                  />
                ))}
              </div>
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute bottom-4 right-4 flex space-x-1">
            <div className="h-1.5 w-1.5 rounded-full bg-primary/40"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-primary/60"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-primary/80"></div>
          </div>
        </div>
      </div>
    </Card>
  );
}
