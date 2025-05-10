"use client";

import Container from "@/components/shared/container";
import EventCard from "@/components/shared/event-card";
import EventCardSkeleton from "@/components/shared/event-card-skeleton";
import { Button } from "@/components/ui/button";
import { IEvent } from "@/lib/types";
import { useGetEventsQuery } from "@/redux/features/event/eventApi";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function UpcomingEvents() {
  const { data: upcomingEvents, isLoading } = useGetEventsQuery({
    // is_featured: false,
    status: "UPCOMING",
    limit: 6,
    sort_by: "created_at",
    sort_order: "asc",
  });

  return (
    <section className="py-12 md:py-16 bg-secondary/50">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Upcoming Events
            </h2>
            <p className="text-muted-foreground">
              Discover and join exciting events happening soon
            </p>
          </div>
          <Link href="/events">
            <Button variant="outline" className="gap-1">
              See all events
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <EventCardSkeleton key={index} />
              ))
            : upcomingEvents?.data?.map((event: IEvent) => (
                <EventCard key={event.id} event={event} />
              ))}
        </div>
      </Container>
    </section>
  );
}
