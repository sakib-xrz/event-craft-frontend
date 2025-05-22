"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  Filter,
  Star,
  CalendarCheck,
  CalendarX,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatDate, formatTime } from "@/lib/formatters";
import { cn, sanitizeParams } from "@/lib/utils";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { useGetJoinedEventsQuery } from "@/redux/features/event/eventApi";
import { IEvent } from "@/lib/types";

export default function JoinedEventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("All Events");

  // Setup params for API request
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
    status: "",
  });

  // Update search params when searchQuery changes
  useEffect(() => {
    setParams((prev) => ({ ...prev, search: searchQuery }));
  }, [searchQuery]);

  // Update status filter when timeFilter changes
  useEffect(() => {
    const status =
      timeFilter === "Upcoming"
        ? "UPCOMING"
        : timeFilter === "Completed"
          ? "COMPLETED"
          : timeFilter === "Cancelled"
            ? "CANCELLED"
            : "";
    setParams((prev) => ({ ...prev, status }));
  }, [timeFilter]);

  // Fetch joined events data using the hook
  const { data: joinedEventsData, isLoading } = useGetJoinedEventsQuery(
    sanitizeParams(params)
  );

  // Extract events from the response
  const events = joinedEventsData?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Joined Events</h1>
        </div>
        <p className="text-muted-foreground">
          Events you&apos;ve successfully joined and are participating in.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="w-fit sm:w-48">
            <Button variant="outline" className="gap-1">
              <Filter className="h-4 w-4" />
              {timeFilter === "All Events" ? "All Events" : timeFilter}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-fit sm:w-48">
            <DropdownMenuItem onClick={() => setTimeFilter("All Events")}>
              All Events
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeFilter("Upcoming")}>
              Upcoming
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeFilter("Completed")}>
              Completed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeFilter("Cancelled")}>
              Cancelled
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div className="w-3/4 space-y-4">
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                    <div className="h-6 bg-muted rounded w-2/3"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-muted rounded w-20"></div>
                    <div className="h-8 bg-muted rounded w-20"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : events.length > 0 ? (
        <div className="space-y-4">
          {events.map((event: IEvent) => {
            const isPast = event.status === "COMPLETED";
            return (
              <Card key={event.id} className="overflow-hidden">
                <div className="relative">
                  {/* Status indicator */}
                  <div
                    className={cn(
                      "absolute top-0 left-0 w-full h-1",
                      isPast ? "bg-muted-foreground" : "bg-primary"
                    )}
                  />

                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          <Badge
                            variant="outline"
                            className={
                              event.is_virtual
                                ? "badge-virtual"
                                : "badge-in-person"
                            }
                          >
                            {event.is_virtual ? "Virtual" : "In Person"}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={
                              event.is_public ? "badge-public" : "badge-private"
                            }
                          >
                            {event.is_public ? "Public" : "Private"}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={
                              event.is_paid ? "badge-paid" : "badge-free"
                            }
                          >
                            {event.is_paid
                              ? `$${event.registration_fee}`
                              : "Free"}
                          </Badge>
                          <Badge variant={isPast ? "secondary" : "default"}>
                            {isPast ? (
                              <CalendarX className="h-3 w-3 mr-1" />
                            ) : (
                              <CalendarCheck className="h-3 w-3 mr-1" />
                            )}
                            {event.status}
                          </Badge>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold">
                            {event.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {event.organizer?.full_name &&
                              `Organized by ${event.organizer.full_name}`}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>{formatDate(event.date_time)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>{formatTime(event.date_time)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span className="truncate">
                              {event.is_virtual
                                ? "Online"
                                : event.venue || "Online"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 min-w-fit">
                        <Link href={`/events/${event.id}`}>
                          <Button variant="outline" size="sm" className="gap-1">
                            <ExternalLink className="h-3.5 w-3.5" />
                            View
                          </Button>
                        </Link>
                        {isPast && (
                          <Button size="sm" className="gap-1">
                            <Star className="h-3.5 w-3.5" />
                            Review
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <Calendar className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No joined events found</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              {searchQuery || timeFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "You haven't joined any events yet."}
            </p>
            <Link href="/events">
              <Button>Browse Events</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
