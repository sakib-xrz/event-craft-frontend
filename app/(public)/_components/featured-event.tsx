"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import FeaturedEventCard from "./featured-event-card";
import Container from "@/components/shared/container";
import { useGetFeaturedEventQuery } from "@/redux/features/event/eventApi";
import FeaturedEventCardSkeleton from "./featured-event-card-skeleton";

export default function FeaturedEvent() {
  const { data: featuredEvent, isLoading } = useGetFeaturedEventQuery({});

  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Featured Event
            </h2>
            <p className="text-muted-foreground">
              Don&apos;t miss out on our highlighted event of the month
            </p>
          </div>
          <Link href="/events">
            <Button variant="ghost" className="gap-1">
              View all events
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <FeaturedEventCardSkeleton />
        ) : (
          <FeaturedEventCard event={featuredEvent?.data} />
        )}
      </Container>
    </section>
  );
}
