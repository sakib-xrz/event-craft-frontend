"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useGetEventsQuery } from "@/redux/features/event/eventApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Search, X, Filter, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn, generateQueryString, sanitizeParams } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import EventCard from "@/components/shared/event-card";
import Container from "@/components/shared/container";
import { useDebounce } from "@/hooks/use-debounce";
import { IEvent } from "@/lib/types";
import EventCardSkeleton from "@/components/shared/event-card-skeleton";
import CustomPagination from "@/components/shared/custom-pagination";

export default function EventsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get URL parameters with defaults
  const initialParams = {
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 9,
    search: searchParams.get("search") || "",
    sort_by: searchParams.get("sort_by") || "created_at",
    sort_order: searchParams.get("sort_order") || "desc",
    is_public: searchParams.get("is_public")
      ? searchParams.get("is_public") === "true"
      : null,
    is_paid: searchParams.get("is_paid")
      ? searchParams.get("is_paid") === "true"
      : null,
    is_virtual: searchParams.get("is_virtual")
      ? searchParams.get("is_virtual") === "true"
      : null,
  };

  const [params, setParams] = useState(initialParams);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [searchInput, setSearchInput] = useState(initialParams.search);

  // Debounce search query
  const debouncedSearch = useDebounce(searchInput, 500);

  // Update search param when debounced search changes
  useEffect(() => {
    setParams((prev) => ({ ...prev, search: debouncedSearch }));
  }, [debouncedSearch]);

  // Update URL when filters change
  useEffect(() => {
    const queryString = generateQueryString(params);
    router.push(`/events${queryString}`);
  }, [params, router]);

  // Fetch events with filters
  const { data: eventsData, isLoading } = useGetEventsQuery(
    sanitizeParams(params)
  );

  // Check screen size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // Handle pagination page change
  const handlePageChange = (page: number) => {
    if (page < 1 || (eventsData?.meta && page > eventsData.meta.totalPages)) {
      return;
    }
    setParams((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Active filters display
  const activeFilters = (() => {
    const filters: string[] = [];
    if (params.is_public === true) filters.push("Public");
    if (params.is_public === false) filters.push("Private");
    if (params.is_paid === true) filters.push("Paid");
    if (params.is_paid === false) filters.push("Free");
    if (params.is_virtual === true) filters.push("Virtual");
    if (params.is_virtual === false) filters.push("In-Person");
    return filters;
  })();

  // Reset filters
  const resetFilters = () => {
    setParams({
      page: 1,
      limit: 9,
      search: "",
      sort_by: "created_at",
      sort_order: "asc",
      is_public: null,
      is_paid: null,
      is_virtual: null,
    });
    setSearchInput("");
  };

  // Remove a specific filter
  const removeFilter = (filter: string) => {
    if (filter === "Public" || filter === "Private") {
      setParams((prev) => ({ ...prev, is_public: null }));
    } else if (filter === "Paid" || filter === "Free") {
      setParams((prev) => ({ ...prev, is_paid: null }));
    } else if (filter === "Virtual" || filter === "In-Person") {
      setParams((prev) => ({ ...prev, is_virtual: null }));
    }
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    const [field, order] = value.split("-");
    setParams((prev) => ({
      ...prev,
      sort_by: field,
      sort_order: order,
    }));
  };

  // Filter sidebar component
  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        {activeFilters.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 mb-2">
              {activeFilters.map((filter) => (
                <Badge
                  key={filter}
                  variant="secondary"
                  className="px-2 py-1 gap-1"
                >
                  {filter}
                  <button
                    onClick={() => removeFilter(filter)}
                    aria-label={`Remove ${filter} filter`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-xs h-7"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>

      <Separator />

      <div className="space-y-4">
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
            Event Type
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 pb-4 space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="public"
                checked={params.is_public === true}
                onCheckedChange={(checked) =>
                  setParams((prev) => ({
                    ...prev,
                    page: 1,
                    is_public: checked ? true : null,
                  }))
                }
              />
              <Label htmlFor="public" className="text-sm">
                Public Events
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="private"
                checked={params.is_public === false}
                onCheckedChange={(checked) =>
                  setParams((prev) => ({
                    ...prev,
                    page: 1,
                    is_public: checked ? false : null,
                  }))
                }
              />
              <Label htmlFor="private" className="text-sm">
                Private Events
              </Label>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
            Price
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 pb-4 space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="free"
                checked={params.is_paid === false}
                onCheckedChange={(checked) =>
                  setParams((prev) => ({
                    ...prev,
                    page: 1,
                    is_paid: checked ? false : null,
                  }))
                }
              />
              <Label htmlFor="free" className="text-sm">
                Free Events
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="paid"
                checked={params.is_paid === true}
                onCheckedChange={(checked) =>
                  setParams((prev) => ({
                    ...prev,
                    page: 1,
                    is_paid: checked ? true : null,
                  }))
                }
              />
              <Label htmlFor="paid" className="text-sm">
                Paid Events
              </Label>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
            Location
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 pb-4 space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="virtual"
                checked={params.is_virtual === true}
                onCheckedChange={(checked) =>
                  setParams((prev) => ({
                    ...prev,
                    page: 1,
                    is_virtual: checked ? true : null,
                  }))
                }
              />
              <Label htmlFor="virtual" className="text-sm">
                Virtual Events
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="in-person"
                checked={params.is_virtual === false}
                onCheckedChange={(checked) =>
                  setParams((prev) => ({
                    ...prev,
                    page: 1,
                    is_virtual: checked ? false : null,
                  }))
                }
              />
              <Label htmlFor="in-person" className="text-sm">
                In-Person Events
              </Label>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );

  return (
    <Container>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 lg:mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground">
            Discover and join exciting events
          </p>
        </div>
        <div className="flex items-center gap-2 w-full">
          {isSmallScreen && (
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              {activeFilters.length > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-1 h-5 w-5 p-0 flex items-center justify-center"
                >
                  {activeFilters.length}
                </Badge>
              )}
            </Button>
          )}

          <Select
            value={`${params.sort_by}-${params.sort_order}`}
            onValueChange={handleSortChange}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="created_at-desc">
                Date (Newest First)
              </SelectItem>
              <SelectItem value="created_at-asc">
                Date (Oldest First)
              </SelectItem>
              <SelectItem value="registration_fee-asc">
                Price (Low to High)
              </SelectItem>
              <SelectItem value="registration_fee-desc">
                Price (High to Low)
              </SelectItem>
              <SelectItem value="title-asc">Title (A-Z)</SelectItem>
              <SelectItem value="title-desc">Title (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="relative flex flex-col lg:flex-row lg:gap-8">
        {/* Mobile filter drawer */}
        {isSmallScreen && (
          <div
            className={cn(
              "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-200",
              isMobileFilterOpen
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            )}
          >
            <div
              className={cn(
                "fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-background p-6 shadow-lg transition-transform duration-300 ease-in-out",
                isMobileFilterOpen ? "translate-x-0" : "-translate-x-full"
              )}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <FilterSidebar />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t">
                <Button
                  className="w-full"
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Desktop sidebar */}
        {!isSmallScreen && (
          <div className="w-64 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search events by title..."
                className="pl-10"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setParams((prev) => ({ ...prev, page: 1 }));
                }}
              />
            </div>

            {/* Active filters display (mobile) */}
            {isSmallScreen && activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {activeFilters.map((filter) => (
                  <Badge
                    key={filter}
                    variant="secondary"
                    className="px-2 py-1 gap-1"
                  >
                    {filter}
                    <button
                      onClick={() => removeFilter(filter)}
                      aria-label={`Remove ${filter} filter`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="text-xs h-7"
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              {!isLoading && (
                <>
                  {eventsData?.data.length > 0 && (
                    <>
                      Showing{" "}
                      <span className="font-medium text-foreground">
                        {eventsData?.data.length || 0}
                      </span>{" "}
                      events out of {eventsData?.meta?.total || 0}
                    </>
                  )}
                  {activeFilters.length > 0 && (
                    <>
                      {" "}
                      filtered by{" "}
                      <span className="font-medium text-foreground">
                        {activeFilters.join(", ")}
                      </span>
                    </>
                  )}
                </>
              )}
            </p>
          </div>

          {/* Events grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: params.limit }).map((_, index) => (
                <EventCardSkeleton key={index} />
              ))}
            </div>
          ) : eventsData?.data.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {eventsData.data.map((event: IEvent) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>

              {/* Pagination */}
              {eventsData.meta && eventsData.meta.total > 1 && (
                <CustomPagination
                  params={{ page: params.page }}
                  totalPages={Math.ceil(eventsData.meta.total / params.limit)}
                  handlePageChange={handlePageChange}
                />
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/20 rounded-lg">
              <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No events found</h3>
              <p className="text-muted-foreground mt-1 max-w-md">
                Try adjusting your search or filters to find what you&apos;re
                looking for.
              </p>
              {(activeFilters.length > 0 || params.search) && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    resetFilters();
                    setSearchInput("");
                  }}
                >
                  Clear all filters
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
