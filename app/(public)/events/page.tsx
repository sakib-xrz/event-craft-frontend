"use client";

import { useState, useEffect } from "react";
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
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import EventCard from "@/components/shared/event-card";
import Container from "@/components/shared/container";

// Mock data for events
const allEvents = [
  {
    id: "1",
    title: "Tech Conference 2025",
    description:
      "Join us for the biggest tech conference of the year featuring industry leaders and innovative workshops.",
    date_time: new Date("2025-06-15T09:00:00"),
    venue: "Tech Convention Center, San Francisco",
    is_public: true,
    is_paid: true,
    is_virtual: false,
    registration_fee: 199.99,
    organizer: {
      full_name: "Tech Events Inc.",
    },
  },
  {
    id: "2",
    title: "Web Development Workshop",
    description: "Learn the latest web development techniques and tools.",
    date_time: new Date("2025-05-20T10:00:00"),
    venue: "Online",
    is_public: true,
    is_paid: false,
    is_virtual: true,
    registration_fee: 0,
    organizer: {
      full_name: "Code Academy",
    },
  },
  {
    id: "3",
    title: "Music Festival",
    description: "A weekend of amazing music performances and activities.",
    date_time: new Date("2025-07-10T16:00:00"),
    venue: "Central Park",
    is_public: true,
    is_paid: true,
    is_virtual: false,
    registration_fee: 89.99,
    organizer: {
      full_name: "Festival Productions",
    },
  },
  {
    id: "4",
    title: "Networking Mixer",
    description: "Connect with professionals in your industry.",
    date_time: new Date("2025-05-25T18:00:00"),
    venue: "Downtown Business Center",
    is_public: false,
    is_paid: true,
    is_virtual: false,
    registration_fee: 25,
    organizer: {
      full_name: "Business Network Group",
    },
  },
  {
    id: "5",
    title: "Yoga Retreat",
    description: "A weekend of relaxation and mindfulness.",
    date_time: new Date("2025-06-05T08:00:00"),
    venue: "Mountain View Resort",
    is_public: true,
    is_paid: true,
    is_virtual: false,
    registration_fee: 299.99,
    organizer: {
      full_name: "Wellness Collective",
    },
  },
  {
    id: "6",
    title: "Photography Workshop",
    description: "Learn photography techniques from professionals.",
    date_time: new Date("2025-05-30T14:00:00"),
    venue: "Online",
    is_public: true,
    is_paid: false,
    is_virtual: true,
    registration_fee: 0,
    organizer: {
      full_name: "Creative Arts Studio",
    },
  },
  {
    id: "7",
    title: "Charity Gala",
    description: "An elegant evening supporting local charities.",
    date_time: new Date("2025-08-15T19:00:00"),
    venue: "Grand Hotel Ballroom",
    is_public: false,
    is_paid: true,
    is_virtual: false,
    registration_fee: 150,
    organizer: {
      full_name: "Community Foundation",
    },
  },
  {
    id: "8",
    title: "Business Leadership Conference",
    description: "Learn from top business leaders about management strategies.",
    date_time: new Date("2025-09-10T09:00:00"),
    venue: "Business Convention Center",
    is_public: true,
    is_paid: true,
    is_virtual: false,
    registration_fee: 249.99,
    organizer: {
      full_name: "Leadership Institute",
    },
  },
  {
    id: "9",
    title: "Virtual Game Night",
    description: "Join us for a fun night of virtual games and socializing.",
    date_time: new Date("2025-05-15T20:00:00"),
    venue: "Online",
    is_public: true,
    is_paid: false,
    is_virtual: true,
    registration_fee: 0,
    organizer: {
      full_name: "Game Night Organizers",
    },
  },
];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filters, setFilters] = useState({
    isPublic: null as boolean | null,
    isPaid: null as boolean | null,
    isVirtual: null as boolean | null,
  });
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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

  // Update active filters display
  useEffect(() => {
    const newActiveFilters: string[] = [];

    if (filters.isPublic === true) newActiveFilters.push("Public");
    if (filters.isPublic === false) newActiveFilters.push("Private");
    if (filters.isPaid === true) newActiveFilters.push("Paid");
    if (filters.isPaid === false) newActiveFilters.push("Free");
    if (filters.isVirtual === true) newActiveFilters.push("Virtual");
    if (filters.isVirtual === false) newActiveFilters.push("In-Person");

    setActiveFilters(newActiveFilters);
  }, [filters]);

  // Filter events based on search query and filters
  const filteredEvents = allEvents.filter((event) => {
    // Search filter
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.full_name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      false;

    // Additional filters
    if (filters.isPublic !== null && event.is_public !== filters.isPublic)
      return false;
    if (filters.isPaid !== null && event.is_paid !== filters.isPaid)
      return false;
    if (filters.isVirtual !== null && event.is_virtual !== filters.isVirtual)
      return false;

    return matchesSearch || searchQuery === "";
  });

  // Sort events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === "date") {
      return a.date_time.getTime() - b.date_time.getTime();
    } else if (sortBy === "price-low") {
      return a.registration_fee - b.registration_fee;
    } else if (sortBy === "price-high") {
      return b.registration_fee - a.registration_fee;
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      isPublic: null,
      isPaid: null,
      isVirtual: null,
    });
  };

  // Remove a specific filter
  const removeFilter = (filter: string) => {
    if (filter === "Public" || filter === "Private") {
      setFilters({ ...filters, isPublic: null });
    } else if (filter === "Paid" || filter === "Free") {
      setFilters({ ...filters, isPaid: null });
    } else if (filter === "Virtual" || filter === "In-Person") {
      setFilters({ ...filters, isVirtual: null });
    }
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
                checked={filters.isPublic === true}
                onCheckedChange={(checked) =>
                  setFilters({ ...filters, isPublic: checked ? true : null })
                }
              />
              <Label htmlFor="public" className="text-sm">
                Public Events
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="private"
                checked={filters.isPublic === false}
                onCheckedChange={(checked) =>
                  setFilters({ ...filters, isPublic: checked ? false : null })
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
                checked={filters.isPaid === false}
                onCheckedChange={(checked) =>
                  setFilters({ ...filters, isPaid: checked ? false : null })
                }
              />
              <Label htmlFor="free" className="text-sm">
                Free Events
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="paid"
                checked={filters.isPaid === true}
                onCheckedChange={(checked) =>
                  setFilters({ ...filters, isPaid: checked ? true : null })
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
                checked={filters.isVirtual === true}
                onCheckedChange={(checked) =>
                  setFilters({ ...filters, isVirtual: checked ? true : null })
                }
              />
              <Label htmlFor="virtual" className="text-sm">
                Virtual Events
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="in-person"
                checked={filters.isVirtual === false}
                onCheckedChange={(checked) =>
                  setFilters({ ...filters, isVirtual: checked ? false : null })
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground">
            Discover and join exciting events
          </p>
        </div>
        <div className="flex items-center gap-2">
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

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date (Soonest)</SelectItem>
              <SelectItem value="price-low">Price (Low to High)</SelectItem>
              <SelectItem value="price-high">Price (High to Low)</SelectItem>
              <SelectItem value="title">Title (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="relative flex flex-col lg:flex-row gap-8">
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
                placeholder="Search events by title or organizer..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
              Showing{" "}
              <span className="font-medium text-foreground">
                {sortedEvents.length}
              </span>{" "}
              events
              {activeFilters.length > 0 && (
                <>
                  {" "}
                  filtered by{" "}
                  <span className="font-medium text-foreground">
                    {activeFilters.join(", ")}
                  </span>
                </>
              )}
            </p>
          </div>

          {/* Events grid */}
          {sortedEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/20 rounded-lg">
              <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No events found</h3>
              <p className="text-muted-foreground mt-1 max-w-md">
                Try adjusting your search or filters to find what you&apos;re
                looking for.
              </p>
              {(activeFilters.length > 0 || searchQuery) && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    resetFilters();
                    setSearchQuery("");
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
