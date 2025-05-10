import Container from "@/components/shared/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  Clock,
  MapPin,
  Sparkles,
  UserPlus,
} from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero-section relative overflow-hidden py-16 md:py-24">
      <div className="hero-gradient absolute inset-0 z-0"></div>
      <div className="hero-pattern absolute inset-0 z-0 opacity-5"></div>
      <div className="absolute top-10 right-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
      <div className="absolute top-1/4 left-1/3 w-16 h-16 bg-primary/20 rounded-full blur-lg"></div>

      <Container>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center relative z-10">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
              <span className="flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span className="text-primary font-medium">
                  Discover Amazing Events
                </span>
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Create, Join & Celebrate Together
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Your all-in-one platform for planning events, managing
              participants, and creating unforgettable experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/events">
                <Button
                  size="lg"
                  className="gap-1.5 shadow-lg hover:shadow-primary/20 transition-all"
                >
                  <Calendar className="h-4 w-4" />
                  Explore Events
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-1.5 hover:bg-secondary/80 transition-all"
                >
                  <UserPlus className="h-4 w-4" />
                  Create Account
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-background"
                    style={{
                      backgroundColor: `hsl(${i * 60}, 70%, 60%)`,
                      zIndex: 4 - i,
                    }}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Join <span className="font-medium text-foreground">5,000+</span>{" "}
                users already creating events
              </p>
            </div>
            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-primary/5 rounded-full blur-xl hidden lg:block"></div>
          </div>
          <div className="flex justify-center lg:justify-end relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl -z-10"></div>
            <div className="relative w-full max-w-[500px] animate-float">
              <div
                className="absolute -top-6 -left-6 h-24 w-24 rounded-2xl bg-primary/10 backdrop-blur-sm animate-pulse"
                style={{ animationDuration: "4s" }}
              />
              <div
                className="absolute -bottom-6 -right-6 h-24 w-24 rounded-2xl bg-primary/10 backdrop-blur-sm animate-pulse"
                style={{ animationDuration: "5s" }}
              />
              <div
                className="absolute top-1/2 -right-12 h-16 w-16 rounded-full bg-primary/5 backdrop-blur-sm animate-pulse"
                style={{ animationDuration: "6s" }}
              />
              <div className="absolute -top-10 right-20 h-10 w-10 rounded-full border border-primary/20"></div>
              <div className="absolute -bottom-4 left-10 h-8 w-8 rounded-full border border-primary/20"></div>
              <div className="relative rounded-xl border p-6 shadow-xl backdrop-blur-sm bg-background/80">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold">Tech Conference 2025</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Oct 26, 2025</span>
                      </div>
                    </div>
                    <Badge className="badge-paid pointer-events-none">
                      $199.99
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>Tech Convention Center, Dhaka</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>250+ Attendees</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex -space-x-2">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="inline-block h-8 w-8 rounded-full ring-2 ring-background"
                          style={{
                            backgroundColor: `hsl(${i * 60 + 120}, 70%, 60%)`,
                            zIndex: 3 - i,
                          }}
                        />
                      ))}
                    </div>
                    <Button
                      size="sm"
                      className="shadow-md hover:shadow-lg transition-all pointer-events-none"
                    >
                      Join Now
                    </Button>
                  </div>
                </div>
              </div>
              <div
                className="absolute -z-10 inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5 rounded-xl blur-xl opacity-70 animate-pulse"
                style={{ animationDuration: "8s" }}
              ></div>
            </div>
            <div className="hidden lg:block absolute -bottom-10 -right-10 w-20 h-20 rounded-full border border-primary/20"></div>
          </div>
        </div>
      </Container>
    </section>
  );
}
