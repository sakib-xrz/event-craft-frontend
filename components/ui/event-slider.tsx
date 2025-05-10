"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { IEvent } from "@/lib/types";
import { useMobile } from "@/hooks/use-mobile";

interface EventSliderProps {
  events: IEvent[];
}

export default function EventSlider({ events }: EventSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();

  const itemsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(events.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    if (sliderRef.current) {
      const translateValue = currentIndex * -100;
      sliderRef.current.style.transform = `translateX(${translateValue}%)`;
    }
  }, [currentIndex, itemsPerPage]);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          ref={sliderRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{ width: `${totalPages * 100}%` }}
        >
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <div
              key={pageIndex}
              className="flex w-full gap-6"
              style={{ width: `${100 / totalPages}%` }}
            >
              {events
                .slice(
                  pageIndex * itemsPerPage,
                  pageIndex * itemsPerPage + itemsPerPage
                )
                .map((event) => (
                  <Card key={event.id} className="flex-1">
                    <CardHeader className="pb-3">
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant={event.is_public ? "default" : "outline"}
                        >
                          {event.is_public ? "Public" : "Private"}
                        </Badge>
                        <Badge
                          variant={event.is_paid ? "secondary" : "outline"}
                        >
                          {event.is_paid
                            ? `Paid ($${event.registration_fee})`
                            : "Free"}
                        </Badge>
                      </div>
                      <CardTitle className="mt-2 line-clamp-1">
                        {event.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {event.description}
                      </p>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-4 w-4 text-muted-foreground"
                          >
                            <rect
                              width="18"
                              height="18"
                              x="3"
                              y="4"
                              rx="2"
                              ry="2"
                            ></rect>
                            <line x1="16" x2="16" y1="2" y2="6"></line>
                            <line x1="8" x2="8" y1="2" y2="6"></line>
                            <line x1="3" x2="21" y1="10" y2="10"></line>
                          </svg>
                          <span className="text-muted-foreground">
                            {new Date(event.date_time).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-4 w-4 text-muted-foreground"
                          >
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          <span className="line-clamp-1 text-muted-foreground">
                            {event.venue}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href={`/events/${event.id}`}>View Details</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute -left-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background shadow-md"
        onClick={handlePrev}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        <span className="sr-only">Previous</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute -right-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background shadow-md"
        onClick={handleNext}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="m9 18 6-6-6-6"></path>
        </svg>
        <span className="sr-only">Next</span>
      </Button>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <Button
              key={i}
              variant="outline"
              size="icon"
              className={`h-2 w-2 rounded-full p-0 ${i === currentIndex ? "bg-primary" : "bg-muted"}`}
              onClick={() => setCurrentIndex(i)}
            >
              <span className="sr-only">Page {i + 1}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
