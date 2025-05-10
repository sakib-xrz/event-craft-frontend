import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Calendar,
  Users,
  Clock,
  MapPin,
  ArrowRight,
  Plus,
  Mail,
  Star,
  TrendingUp,
  Activity,
} from "lucide-react";
import { formatDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";

// Mock data for dashboard
const upcomingEvents = [
  {
    id: "1",
    title: "Tech Conference 2025",
    date_time: "2025-06-15T09:00:00",
    venue: "Tech Convention Center, San Francisco",
    participants: 45,
    capacity: 100,
  },
  {
    id: "2",
    title: "Web Development Workshop",
    date_time: "2025-05-20T10:00:00",
    venue: "Online",
    participants: 28,
    capacity: 50,
  },
];

const pendingInvitations = [
  {
    id: "inv1",
    event: {
      id: "3",
      title: "Networking Mixer",
      date_time: "2025-05-25T18:00:00",
    },
    sender: {
      name: "Sarah Williams",
    },
  },
  {
    id: "inv2",
    event: {
      id: "4",
      title: "Charity Gala",
      date_time: "2025-08-15T19:00:00",
    },
    sender: {
      name: "Michael Brown",
    },
  },
];

const stats = [
  {
    title: "Total Events",
    value: "12",
    icon: Calendar,
    change: "+2",
    trend: "up",
  },
  {
    title: "Total Participants",
    value: "248",
    icon: Users,
    change: "+18",
    trend: "up",
  },
  {
    title: "Average Rating",
    value: "4.8",
    icon: Star,
    change: "+0.2",
    trend: "up",
  },
  {
    title: "Pending Invitations",
    value: "2",
    icon: Mail,
    change: "-1",
    trend: "down",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s an overview of your events and activities.
          </p>
        </div>
        <Link href="/dashboard/events/create">
          <Button className="gap-1">
            <Plus className="h-4 w-4" />
            Create Event
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium">{stat.title}</p>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <div
                  className={cn(
                    "flex items-center gap-1 text-xs font-medium",
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  )}
                >
                  {stat.change}
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingUp className="h-3 w-3 rotate-180 transform" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        {/* Upcoming Events */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Upcoming Events
              </CardTitle>
              <CardDescription>
                Your events happening in the next 30 days
              </CardDescription>
            </div>
            <Link href="/dashboard/events" className="hidden md:block">
              <Button variant="ghost" size="sm" className="gap-1">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="rounded-lg border p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <Link
                        href={`/dashboard/events/${event.id}`}
                        className="font-medium hover:underline"
                      >
                        {event.title}
                      </Link>
                      <div className="flex flex-col xl:flex-row gap-2 sm:gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{formatDate(event.date_time)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>
                            {new Date(event.date_time).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{event.venue}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-sm">
                        <Users className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>
                          {event.participants}/{event.capacity}
                        </span>
                      </div>
                      <Link href={`/dashboard/events/${event.id}`}>
                        <Button size="sm">Manage</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {upcomingEvents.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium">No upcoming events</h3>
                  <p className="text-muted-foreground mt-1 mb-4">
                    You don&apos;t have any events scheduled in the next 30
                    days.
                  </p>
                  <Link href="/dashboard/events/create">
                    <Button>Create Event</Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pending Invitations */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              Pending Invitations
            </CardTitle>
            <CardDescription>
              You have {pendingInvitations.length} pending invitations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Invitations Section */}
            {pendingInvitations.length > 0 && (
              <div className="space-y-4">
                {pendingInvitations.map((invitation) => (
                  <div
                    key={invitation.id}
                    className="flex items-start gap-3 rounded-lg border p-3"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {invitation.sender.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">
                          {invitation.sender.name}
                        </span>{" "}
                        invited you to{" "}
                        <Link
                          href={`/events/${invitation.event.id}`}
                          className="font-medium text-primary hover:underline"
                        >
                          {invitation.event.title}
                        </Link>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(invitation.event.date_time)}
                      </p>
                      <div className="flex gap-2 pt-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs"
                        >
                          Decline
                        </Button>
                        <Button size="sm" className="h-7 text-xs">
                          Accept
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {pendingInvitations.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Activity className="h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium">No pending invitations</h3>
                <p className="text-muted-foreground mt-1">
                  You have no pending invitations.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
