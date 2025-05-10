"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CreditCard,
  ArrowLeft,
  Star,
  MessageSquare,
  User,
  ChevronRight,
} from "lucide-react";
import { formatCurrency, formatDate, formatTime } from "@/lib/formatters";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Container from "@/components/shared/container";
import { useGetEventByIdQuery } from "@/redux/features/event/eventApi";
import EventDetailsPageSkeleton from "../_components/skeletion";

interface IEventDetailsUser {
  id: string;
  full_name: string;
  email: string;
}

interface IEventDetailsParticipant {
  user: IEventDetailsUser;
}

interface IEventDetailsReview {
  id: string;
  user: IEventDetailsUser;
  rating: number;
  comment: string;
  created_at: Date;
}

interface IEventDetails {
  id: string;
  title: string;
  description: string;
  date_time: string;
  venue: string | null;
  is_featured: boolean;
  is_public: boolean;
  is_paid: boolean;
  is_virtual: boolean;
  registration_fee: number;
  status: string;
  organizer: {
    full_name: string;
    email: string;
  };
  participants: IEventDetailsParticipant[] | [];
  reviews: IEventDetailsReview[] | [];
}

export default function EventDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [expandedReviews, setExpandedReviews] = useState<string[]>([]);

  const {
    data: eventDetails,
    isLoading,
    isError,
  } = useGetEventByIdQuery(params.id);

  if (isLoading) {
    return <EventDetailsPageSkeleton />;
  }

  if (isError) {
    return (
      <Container>
        <h1 className="text-2xl font-bold mb-4">Event not found</h1>
        <p className="text-muted-foreground mb-6">
          The event you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link href="/events">
          <Button>Back to Events</Button>
        </Link>
      </Container>
    );
  }

  const event = eventDetails?.data as IEventDetails;

  // Toggle review expansion
  const toggleReviewExpansion = (reviewId: string) => {
    setExpandedReviews((prev) =>
      prev.includes(reviewId)
        ? prev.filter((id) => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  // Calculate average rating
  const averageRating =
    event.reviews.length > 0
      ? event.reviews.reduce((sum, review) => sum + review.rating, 0) /
        event.reviews.length
      : 0;

  return (
    <Container>
      <div className="mb-6">
        <Link
          href="/events"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className={
                  event.is_virtual ? "badge-virtual" : "badge-in-person"
                }
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
                {event.is_paid ? "Paid" : "Free"}
              </Badge>
              <Badge variant="secondary">{event.status}</Badge>
            </div>

            <h1 className="text-3xl font-bold">{event.title}</h1>

            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              <span>Organized by {event.organizer.full_name}</span>
            </div>
          </div>

          <Tabs defaultValue="details" className="w-full">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="participants">Participants</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">
                        {formatDate(event.date_time)}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium">
                        {formatTime(event.date_time)}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{event.venue || "Online"}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Participants
                      </p>
                      <p className="font-medium">
                        {event.participants.length} attending
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">About this event</h2>
                <p className="text-muted-foreground">{event.description}</p>
              </div>
            </TabsContent>

            <TabsContent value="participants" className="mt-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <CardTitle>Participants</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {event.participants.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {event.participants.map(
                        (participant: IEventDetailsParticipant) => (
                          <div
                            key={participant.user.id}
                            className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                          >
                            <Avatar className="h-12 w-12 border">
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {participant.user.full_name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <p className="font-medium truncate">
                                {participant.user.full_name}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <h3 className="text-lg font-medium">
                        No participants found
                      </h3>
                    </div>
                  )}
                </CardContent>
                {event.participants.length > 0 && (
                  <CardFooter className="flex justify-center border-t pt-4">
                    <Button variant="outline" size="sm">
                      View All Participants
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1">
                      <CardTitle>Reviews</CardTitle>
                      {event.reviews.length > 0 && (
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={cn(
                                  "h-4 w-4",
                                  star <= Math.round(averageRating)
                                    ? "fill-primary text-primary"
                                    : "text-muted-foreground"
                                )}
                              />
                            ))}
                          </div>
                          <span className="font-medium">
                            {averageRating.toFixed(1)}
                          </span>
                          <span className="text-muted-foreground">
                            ({event.reviews.length}{" "}
                            {event.reviews.length === 1 ? "review" : "reviews"})
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {event.reviews.length > 0 ? (
                    <div className="space-y-6">
                      {event.reviews.map((review) => {
                        const isExpanded = expandedReviews.includes(review.id);
                        const commentLength = review.comment.length;
                        const shouldTruncate =
                          commentLength > 150 && !isExpanded;

                        return (
                          <div
                            key={review.id}
                            className="space-y-3 pb-6 border-b last:border-0 last:pb-0"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 border">
                                  <AvatarFallback className="bg-primary/10 text-primary">
                                    {review.user.full_name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <span className="font-medium">
                                    {review.user.full_name}
                                  </span>
                                  <div className="text-xs text-muted-foreground">
                                    {new Date(
                                      review.created_at
                                    ).toLocaleDateString(undefined, {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                                  />
                                ))}
                              </div>
                            </div>

                            <div className="text-sm">
                              {shouldTruncate ? (
                                <>
                                  <p>{review.comment.substring(0, 150)}...</p>
                                  <Button
                                    variant="link"
                                    size="sm"
                                    className="px-0 h-auto font-normal"
                                    onClick={() =>
                                      toggleReviewExpansion(review.id)
                                    }
                                  >
                                    Read more
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <p>{review.comment}</p>
                                  {commentLength > 150 && (
                                    <Button
                                      variant="link"
                                      size="sm"
                                      className="px-0 h-auto font-normal"
                                      onClick={() =>
                                        toggleReviewExpansion(review.id)
                                      }
                                    >
                                      Show less
                                    </Button>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <h3 className="text-lg font-medium">No reviews yet</h3>
                    </div>
                  )}
                </CardContent>
                {event.reviews.length > 0 && (
                  <CardFooter className="flex justify-between border-t pt-4">
                    <Button variant="outline">Write a Review</Button>
                    {event.reviews.length > 4 && (
                      <Button variant="ghost" className="gap-1">
                        View All Reviews
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    )}
                  </CardFooter>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              {event.is_paid ? (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Registration Fee
                  </p>
                  <p className="text-3xl font-bold">
                    {formatCurrency(event.registration_fee)}
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Registration Fee
                  </p>
                  <Badge variant="outline" className="badge-free text-base">
                    Free Event
                  </Badge>
                </div>
              )}

              <div className="pt-2">
                <Button className="w-full gap-2">
                  {event.is_public ? (
                    event.is_paid ? (
                      <>
                        <CreditCard className="h-4 w-4" />
                        Pay & Join
                      </>
                    ) : (
                      <>
                        <Users className="h-4 w-4" />
                        Join Event
                      </>
                    )
                  ) : event.is_paid ? (
                    <>
                      <CreditCard className="h-4 w-4" />
                      Pay & Request to Join
                    </>
                  ) : (
                    <>
                      <Users className="h-4 w-4" />
                      Request to Join
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-3">Event Organizer</h3>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {event.organizer.full_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{event.organizer.full_name}</p>
                  <p className="text-sm text-muted-foreground">Organizer</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-3">Share with Friends</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
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
                <Button variant="outline" size="icon" className="rounded-full">
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
                <Button variant="outline" size="icon" className="rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                  </svg>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}
