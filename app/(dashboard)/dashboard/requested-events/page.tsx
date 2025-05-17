"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  Filter,
  XCircle,
  AlertCircle,
  CheckCircle,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatDate, formatTime } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for requested events
const requestedEvents = [
  {
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
    request_status: "PENDING",
    request_date: "2025-05-01T14:30:00",
    organizer: {
      id: "org1",
      full_name: "Tech Events Inc.",
    },
  },
  {
    id: "2",
    title: "Web Development Workshop",
    description: "Learn the latest web development techniques and tools.",
    date_time: "2025-05-20T10:00:00",
    venue: "Online",
    is_public: true,
    is_paid: false,
    is_virtual: true,
    registration_fee: 0,
    request_status: "PENDING",
    request_date: "2025-05-05T09:15:00",
    organizer: {
      id: "org2",
      full_name: "Web Dev Academy",
    },
  },
  {
    id: "3",
    title: "Networking Mixer",
    description: "Connect with professionals in your industry.",
    date_time: "2025-05-25T18:00:00",
    venue: "Downtown Business Center",
    is_public: false,
    is_paid: true,
    is_virtual: false,
    registration_fee: 25,
    request_status: "REJECTED",
    request_date: "2025-04-28T11:45:00",
    rejection_reason: "Event has reached maximum capacity.",
    organizer: {
      id: "org3",
      full_name: "Business Networking Group",
    },
  },
];

export default function RequestedEventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter events based on search query and status filter
  const filteredEvents = requestedEvents.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "pending" && event.request_status === "PENDING") ||
      (statusFilter === "rejected" && event.request_status === "REJECTED");
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Requested Events
          </h1>
        </div>
        <p className="text-muted-foreground">
          Events you&apos;ve requested to join and their current status.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-1">
              <Filter className="h-4 w-4" />
              Status: {statusFilter === "all" ? "All" : statusFilter}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setStatusFilter("all")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("rejected")}>
              Rejected
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <div className="relative">
                {/* Status indicator */}
                <div
                  className={cn(
                    "absolute top-0 left-0 w-full h-1",
                    event.request_status === "PENDING"
                      ? "bg-amber-500"
                      : event.request_status === "REJECTED"
                        ? "bg-destructive"
                        : "bg-primary"
                  )}
                />

                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant="outline"
                          className={
                            event.is_virtual
                              ? "badge-virtual"
                              : "badge-in-person"
                          }
                        >
                          {event.is_virtual ? "Virtual" : "In Person"}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            event.is_public ? "badge-public" : "badge-private"
                          }
                        >
                          {event.is_public ? "Public" : "Private"}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            event.is_paid ? "badge-paid" : "badge-free"
                          }
                        >
                          {event.is_paid
                            ? `$${event.registration_fee}`
                            : "Free"}
                        </Badge>
                        <Badge
                          variant={
                            event.request_status === "PENDING"
                              ? "secondary"
                              : event.request_status === "REJECTED"
                                ? "destructive"
                                : "default"
                          }
                          className="ml-auto md:ml-0"
                        >
                          {event.request_status === "PENDING" ? (
                            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                          ) : event.request_status === "REJECTED" ? (
                            <XCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          )}
                          {event.request_status === "PENDING"
                            ? "Pending Approval"
                            : event.request_status === "REJECTED"
                              ? "Rejected"
                              : "Approved"}
                        </Badge>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold">{event.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Organized by {event.organizer.full_name}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>{formatDate(event.date_time as string)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>{formatTime(event.date_time as string)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="truncate">
                            {event.venue || "Online"}
                          </span>
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        <span>
                          Requested on{" "}
                          {formatDate(event.request_date as string)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 min-w-fit">
                      <Link href={`/events/${event.id}`}>
                        <Button variant="outline" size="sm">
                          View Event
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {event.request_status === "REJECTED" &&
                    event.rejection_reason && (
                      <div className="mt-4">
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Request Rejected</AlertTitle>
                          <AlertDescription>
                            The organizer has rejected your request to join this
                            event.
                          </AlertDescription>
                        </Alert>
                      </div>
                    )}
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <Calendar className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">
              No requested events found
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "You haven't requested to join any events yet."}
            </p>
            <Link href="/events">
              <Button>Browse Events</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
