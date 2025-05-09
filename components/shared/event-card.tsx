"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react";
import { formatDate, formatTime } from "@/lib/formatters";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    date_time: Date;
    venue?: string | null;
    is_public: boolean;
    is_paid: boolean;
    is_virtual: boolean;
    registration_fee: number;
    organizer: {
      full_name: string | null;
    };
  };
  featured?: boolean;
}

export default function EventCard({ event, featured = false }: EventCardProps) {
  // Calculate if the event is happening soon (within 7 days)
  const isHappeningSoon =
    new Date(event.date_time).getTime() - new Date().getTime() <
    7 * 24 * 60 * 60 * 1000;

  return (
    <Card
      className={cn(
        "group overflow-hidden transition-all duration-300 hover:shadow-lg relative flex flex-col h-full",
        featured ? "border-primary/20" : "border-border"
      )}
    >
      {/* Card top decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40"></div>

      {/* Event type indicators */}
      <div className="absolute top-4 left-4 flex flex-wrap gap-1 z-10">
        {isHappeningSoon && (
          <Badge
            variant="default"
            className="bg-orange-500 hover:bg-orange-600"
          >
            Soon
          </Badge>
        )}
        {featured && (
          <Badge variant="default" className="bg-primary hover:bg-primary/90">
            Featured
          </Badge>
        )}
      </div>

      {/* Card content */}
      <div className="flex flex-col p-5 flex-grow">
        <div className="space-y-2.5 mb-4">
          <div className="flex flex-wrap gap-1.5 mb-2">
            <Badge
              variant="outline"
              className={event.is_virtual ? "badge-virtual" : "badge-in-person"}
            >
              {event.is_virtual ? "Virtual" : "In Person"}
            </Badge>
            <Badge
              variant="outline"
              className={event.is_public ? "badge-public" : "badge-private"}
            >
              {event.is_public ? "Public" : "Private"}
            </Badge>
            <Badge
              variant="outline"
              className={event.is_paid ? "badge-paid" : "badge-free"}
            >
              {event.is_paid ? `$${event.registration_fee}` : "Free"}
            </Badge>
          </div>

          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {event.title}
          </h3>

          <p className="text-muted-foreground text-sm line-clamp-2">
            {event.description}
          </p>
        </div>

        <div className="space-y-2 mt-auto">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{formatDate(event.date_time)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span>{formatTime(event.date_time)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="line-clamp-1">{event.venue || "Online"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-primary" />
            <span>{event.organizer.full_name}</span>
          </div>
        </div>
      </div>

      {/* Card footer */}
      <div className="p-5 pt-0 mt-4">
        <Link href={`/events/${event.id}`} className="w-full">
          <Button
            variant="outline"
            className="w-full transition-colors justify-between"
          >
            View Details
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      {/* Background decoration for featured cards */}
      {featured && (
        <div className="absolute -right-12 -bottom-12 w-24 h-24 rounded-full bg-primary/5 z-0"></div>
      )}
    </Card>
  );
}
