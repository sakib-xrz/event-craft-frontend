"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Container from "@/components/shared/container";

export default function EventDetailsPageSkeleton() {
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
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>

            <Skeleton className="h-10 w-3/4" />

            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-5 w-40" />
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
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-8 mb-1" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-8 mb-1" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-16 mb-1" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-20 mb-1" />
                      <Skeleton className="h-5 w-28" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Skeleton className="h-7 w-48 mb-3" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="participants" className="mt-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <CardTitle>
                      <Skeleton className="h-6 w-24" />
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-lg border"
                      >
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <Skeleton className="h-5 w-24" />
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center border-t pt-4">
                  <Skeleton className="h-9 w-40" />
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1">
                      <CardTitle>
                        <Skeleton className="h-6 w-16" />
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Skeleton
                              key={i}
                              className="h-4 w-4 mx-0.5 rounded-full"
                            />
                          ))}
                        </div>
                        <Skeleton className="h-4 w-8" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="space-y-3 pb-6 border-b last:border-0 last:pb-0"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div>
                              <Skeleton className="h-5 w-32 mb-1" />
                              <Skeleton className="h-3 w-24" />
                            </div>
                          </div>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((j) => (
                              <Skeleton
                                key={j}
                                className="h-4 w-4 mx-0.5 rounded-full"
                              />
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-2/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Skeleton className="h-9 w-32" />
                  <Skeleton className="h-9 w-32" />
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-1">
                <Skeleton className="h-4 w-32 mb-1" />
                <Skeleton className="h-10 w-28" />
              </div>

              <div className="pt-2">
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-6 w-36 mb-3" />
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-32 mb-1" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-6 w-40 mb-3" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}
