import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Users, Star, Award, Globe, Heart } from "lucide-react";
import Container from "@/components/shared/container";

export default function AboutPage() {
  return (
    <Container>
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          About EventCraft
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We&apos;re on a mission to bring people together through memorable
          events and experiences.
        </p>
      </div>

      {/* Our Story Section */}
      <div className="grid gap-12 items-center mb-20 text-center">
        <div className="space-y-6">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
            Our Story
          </div>
          <h2 className="text-3xl font-bold tracking-tight">
            Creating connections since 2020
          </h2>
          <p className="text-muted-foreground">
            EventCraft was founded with a simple idea: to make event planning
            and participation seamless and enjoyable. What started as a small
            project has grown into a platform that connects thousands of event
            organizers with participants around the world.
          </p>
          <p className="text-muted-foreground">
            Our team of passionate event enthusiasts and tech experts work
            together to create tools that empower organizers and enhance the
            experience for attendees. We believe that great events create
            lasting memories and meaningful connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">10,000+</p>
                <p className="text-sm text-muted-foreground">Events Hosted</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">50,000+</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">4.8/5</p>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Our Values</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These core principles guide everything we do at EventCraft
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community First</h3>
              <p className="text-muted-foreground">
                We believe in the power of bringing people together and
                fostering meaningful connections through events.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-muted-foreground">
                We strive for excellence in everything we do, from our
                platform&apos;s performance to our customer support.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Inclusively</h3>
              <p className="text-muted-foreground">
                We&apos;re committed to creating a platform that&apos;s
                accessible and welcoming to everyone, regardless of background.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Meet Our Team
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The passionate people behind EventCraft
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Alex Johnson", role: "CEO & Founder", avatar: null },
            { name: "Sarah Williams", role: "CTO", avatar: null },
            { name: "Michael Brown", role: "Head of Design", avatar: null },
            { name: "Emily Davis", role: "Head of Marketing", avatar: null },
          ].map((member, index) => (
            <Card key={index}>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  {member.avatar ? (
                    <AvatarImage
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.name}
                    />
                  ) : (
                    <AvatarFallback className="bg-primary/10 text-primary text-xl">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  )}
                </Avatar>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {member.role}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                    </svg>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                    </svg>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-muted/50 rounded-lg p-8 md:p-12 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Join Our Community
          </h2>
          <p className="text-muted-foreground mb-6">
            Whether you&apos;re organizing events or looking to participate,
            EventCraft has everything you need to create memorable experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Get Started</Button>
            <Button variant="outline" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
