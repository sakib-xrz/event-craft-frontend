import Container from "@/components/shared/container";
import EventCard from "@/components/shared/event-card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

// Mock data for upcoming events
const upcomingEvents = [
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
];

export default function UpcomingEvents() {
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
          {upcomingEvents.slice(0, 6).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </Container>
    </section>
  );
}
