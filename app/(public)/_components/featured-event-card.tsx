"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users, Star, ArrowRight } from "lucide-react";
import { formatCurrency, formatDate, formatTime } from "@/lib/formatters";

interface FeaturedEventCardProps {
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
}

export default function FeaturedEventCard({ event }: FeaturedEventCardProps) {
  // Calculate if the event is happening soon (within 7 days)
  const isHappeningSoon =
    new Date(event.date_time).getTime() - new Date().getTime() <
    7 * 24 * 60 * 60 * 1000;

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl relative">
      {/* Card top decoration */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary/40 via-primary/80 to-primary/40"></div>

      <div className="grid md:grid-cols-2 gap-0">
        {/* Left content */}
        <div className="relative p-6 md:p-8 space-y-4">
          {/* Event type indicators */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
              <Star className="h-3 w-3 mr-1 fill-primary" />
              Featured
            </Badge>
            {isHappeningSoon && (
              <Badge
                variant="default"
                className="bg-orange-500 hover:bg-orange-600"
              >
                Soon
              </Badge>
            )}
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
          </div>

          <h3 className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors">
            {event.title}
          </h3>

          <p className="text-muted-foreground">{event.description}</p>

          <div className="grid grid-cols-1 gap-4 pt-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-medium">{formatDate(event.date_time)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="font-medium">{formatTime(event.date_time)}</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-medium line-clamp-1 max-sm:w-48">
                    {event.venue || "Online"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Organizer</p>
                  <p className="font-medium">{event.organizer.full_name}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              {event.is_paid ? (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Registration Fee
                  </p>
                  <p className="text-xl font-bold text-primary">
                    {formatCurrency(event.registration_fee)}
                  </p>
                </div>
              ) : (
                <Badge variant="outline" className="badge-free text-base">
                  Free Event
                </Badge>
              )}
            </div>
            <Link href={`/events/${event.id}`}>
              <Button
                size="lg"
                className="gap-1 group-hover:shadow-md transition-all"
              >
                View Event
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
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
            <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
              Featured
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">{event.title}</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(event.date_time)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="line-clamp-1">{event.venue || "Online"}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-background animate-pulse"
                    style={{
                      backgroundColor: `hsl(${i * 60 + 180}, 70%, 60%)`,
                      zIndex: 4 - i,
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: "3s",
                    }}
                  />
                ))}
              </div>
              <Badge
                variant={event.is_paid ? "default" : "outline"}
                className={event.is_paid ? "badge-paid" : "badge-free"}
              >
                {event.is_paid
                  ? formatCurrency(event.registration_fee)
                  : "Free"}
              </Badge>
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
