"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Filter,
  ChevronDown,
} from "lucide-react";
import { formatDate } from "@/lib/formatters";

interface IEvent {
  id: string;
  title: string;
  description: string;
  date_time: string;
  venue: string;
  is_public: boolean;
  is_paid: boolean;
  is_virtual: boolean;
  status: string;
  participants: number;
  capacity: number;
}

// Mock data for events
const allEvents = [
  {
    id: "1",
    title: "Tech Conference 2025",
    description:
      "Join us for the biggest tech conference of the year featuring industry leaders and innovative workshops.",
    date_time: "2025-06-15T09:00:00",
    venue: "Tech Convention Center, San Francisco",
    is_public: true,
    is_paid: true,
    is_virtual: false,
    status: "UPCOMING",
    participants: 45,
    capacity: 100,
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
    status: "UPCOMING",
    participants: 28,
    capacity: 50,
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
    status: "UPCOMING",
    participants: 15,
    capacity: 30,
  },
  {
    id: "4",
    title: "Product Launch Webinar",
    description: "Join us for the exclusive launch of our new product line.",
    date_time: "2025-04-10T14:00:00",
    venue: "Online",
    is_public: true,
    is_paid: false,
    is_virtual: true,
    status: "COMPLETED",
    participants: 120,
    capacity: 200,
  },
  {
    id: "5",
    title: "Annual Charity Gala",
    description: "A night of fundraising and entertainment for a good cause.",
    date_time: "2024-12-15T19:00:00",
    venue: "Grand Hotel Ballroom",
    is_public: true,
    is_paid: true,
    is_virtual: false,
    status: "COMPLETED",
    participants: 85,
    capacity: 100,
  },
];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Filter events based on search query and filters
  const filteredEvents = allEvents.filter((event) => {
    // Search filter
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus =
      statusFilter === "all" ||
      event.status.toLowerCase() === statusFilter.toLowerCase();

    // Type filter
    const matchesType =
      typeFilter === "all" ||
      (typeFilter === "virtual" && event.is_virtual) ||
      (typeFilter === "in-person" && !event.is_virtual);

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Events</h2>
          <p className="text-muted-foreground">
            Manage all your events in one place
          </p>
        </div>
        <Link href="/dashboard/events/create">
          <Button className="gap-1">
            <Plus className="h-4 w-4" />
            Create Event
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
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
              <DropdownMenuItem onClick={() => setStatusFilter("upcoming")}>
                Upcoming
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("completed")}>
                Completed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                <Filter className="h-4 w-4" />
                Type: {typeFilter === "all" ? "All" : typeFilter}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTypeFilter("all")}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter("virtual")}>
                Virtual
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter("in-person")}>
                In-Person
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

function EventCard({ event }: { event: IEvent }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap gap-2 mb-1">
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
              <Badge
                variant={event.status === "UPCOMING" ? "secondary" : "outline"}
                className={event.status === "COMPLETED" ? "bg-muted" : ""}
              >
                {event.status}
              </Badge>
            </div>

            <div>
              <Link
                href={`/dashboard/events/${event.id}`}
                className="text-xl font-semibold hover:underline"
              >
                {event.title}
              </Link>
              <p className="text-muted-foreground mt-1">{event.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="text-sm font-medium">
                    {formatDate(event.date_time)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="text-sm font-medium">
                    {new Date(event.date_time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium">{event.venue}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 lg:w-64">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">
                  {event.participants}/{event.capacity}
                </p>
                <p className="text-xs text-muted-foreground">Participants</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Link href={`/events/${event.id}`} className="flex-1">
                  <Button variant="outline" className="w-full gap-1">
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/events/${event.id}/edit`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Event
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/dashboard/events/manage-participants?eventId=${event.id}`}
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Manage Participants
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Link
                href={`/dashboard/events/manage-participants?eventId=${event.id}`}
              >
                <Button className="w-full gap-1">
                  <Users className="h-4 w-4" />
                  Manage Participants
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
