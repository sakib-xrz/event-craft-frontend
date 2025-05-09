import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import FeaturedEventCard from "./featured-event-card";
import Container from "@/components/shared/container";

// Mock data for featured event
const featuredEvent = {
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
};

export default function FeaturedEvent() {
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

        <FeaturedEventCard event={featuredEvent} />
      </Container>
    </section>
  );
}
