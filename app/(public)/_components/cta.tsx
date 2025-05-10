import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import React from "react";
import Container from "@/components/shared/container";

export default function CTA() {
  return (
    <section className="py-12 md:py-16 bg-primary/5">
      <Container>
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Ready to Create Your First Event?
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Join thousands of event organizers who trust EventCraft to create
            memorable experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link href="/register">
              <Button size="lg" className="gap-1.5">
                <UserPlus className="h-4 w-4" />
                Get Started for Free
              </Button>
            </Link>
            <Link href="/events">
              <Button size="lg" variant="outline" className="gap-1.5">
                <Calendar className="h-4 w-4" />
                Browse Events
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
