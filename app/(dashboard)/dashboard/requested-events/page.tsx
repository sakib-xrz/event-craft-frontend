"use client";

import { useState, useEffect } from "react";
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
  ExternalLink,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatDate, formatTime } from "@/lib/formatters";
import { cn, sanitizeParams } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetRequestedEventsQuery } from "@/redux/features/event/eventApi";

// Approval status type (for type safety)
type ApprovalStatus = "PENDING" | "APPROVED" | "REJECTED";

// Payment status type
type PaymentStatus = "PAID" | "FREE" | "UNPAID";

// Event interface
interface Event {
  id: string;
  title: string;
  date_time: string;
  venue: string;
  is_paid: boolean;
  is_public: boolean;
  is_virtual: boolean;
}

// Requested event interface
interface RequestedEvent {
  id: string;
  approval_status: ApprovalStatus;
  payment_status: PaymentStatus;
  is_banned: boolean;
  event: Event;
}

export default function RequestedEventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Requests");

  // Setup params for API request
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
    approval_status: "",
  });

  // Update search params when searchQuery changes
  useEffect(() => {
    setParams((prev) => ({ ...prev, search: searchQuery }));
  }, [searchQuery]);

  // Update status filter when statusFilter changes
  useEffect(() => {
    const approval_status =
      statusFilter === "Pending"
        ? "PENDING"
        : statusFilter === "Rejected"
          ? "REJECTED"
          : "";
    setParams((prev) => ({ ...prev, approval_status }));
  }, [statusFilter]);

  // Fetch requested events data using the hook
  const { data: requestedEventsData, isLoading } = useGetRequestedEventsQuery(
    sanitizeParams(params)
  );

  // Extract events from the response (updated for new data pattern)
  const requestedEvents = requestedEventsData?.data || [];

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
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="w-fit sm:w-48">
            <Button variant="outline" className="gap-1">
              <Filter className="h-4 w-4" />
              {statusFilter}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-fit sm:w-48">
            <DropdownMenuItem onClick={() => setStatusFilter("All Requests")}>
              All Requests
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Pending")}>
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Rejected")}>
              Rejected
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div className="w-3/4 space-y-4">
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                    <div className="h-6 bg-muted rounded w-2/3"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-muted rounded w-20"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : requestedEvents.length > 0 ? (
        <div className="space-y-4">
          {requestedEvents.map((requestedEvent: RequestedEvent) => {
            const event = requestedEvent.event;
            const approvalStatus = requestedEvent.approval_status;

            return (
              <Card key={requestedEvent.id} className="overflow-hidden">
                <div className="relative">
                  {/* Status indicator */}
                  <div
                    className={cn(
                      "absolute top-0 left-0 w-full h-1",
                      approvalStatus === "PENDING"
                        ? "bg-amber-500"
                        : approvalStatus === "REJECTED"
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
                            {event.is_paid ? "Paid" : "Free"}
                          </Badge>
                          <Badge
                            variant={
                              approvalStatus === "PENDING"
                                ? "secondary"
                                : approvalStatus === "REJECTED"
                                  ? "destructive"
                                  : "default"
                            }
                          >
                            {approvalStatus === "PENDING" ? (
                              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                            ) : approvalStatus === "REJECTED" ? (
                              <XCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            )}
                            {approvalStatus === "PENDING"
                              ? "Pending Approval"
                              : approvalStatus === "REJECTED"
                                ? "Rejected"
                                : "Approved"}
                          </Badge>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold">
                            {event.title}
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>{formatDate(event.date_time)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>{formatTime(event.date_time)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span className="truncate">
                              {event.venue || "Online"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 min-w-fit">
                        <Link href={`/events/${event.id}`}>
                          <Button variant="outline" size="sm" className="gap-1">
                            <ExternalLink className="h-3.5 w-3.5" />
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {approvalStatus === "REJECTED" && (
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
            );
          })}
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
              {searchQuery || statusFilter !== "All Requests"
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
