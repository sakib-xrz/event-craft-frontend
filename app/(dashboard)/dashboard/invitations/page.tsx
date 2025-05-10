"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  Mail,
  ArrowUpRight,
  Filter,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/formatters";

// Mock data for invitations
const allInvitations = [
  {
    id: "inv1",
    event: {
      id: "3",
      title: "Networking Mixer",
      date_time: "2025-05-25T18:00:00",
      venue: "Downtown Business Center",
      is_paid: true,
      registration_fee: 25,
    },
    sender: {
      id: "user2",
      name: "Sarah Williams",
      avatar: null,
    },
    status: "PENDING",
    created_at: new Date("2025-05-10T14:30:00"),
  },
  {
    id: "inv2",
    event: {
      id: "4",
      title: "Charity Gala",
      date_time: "2025-08-15T19:00:00",
      venue: "Grand Hotel Ballroom",
      is_paid: true,
      registration_fee: 150,
    },
    sender: {
      id: "user3",
      name: "Michael Brown",
      avatar: null,
    },
    status: "PENDING",
    created_at: new Date("2025-05-12T09:15:00"),
  },
  {
    id: "inv3",
    event: {
      id: "5",
      title: "Tech Startup Pitch Night",
      date_time: "2025-06-20T18:00:00",
      venue: "Innovation Hub",
      is_paid: false,
      registration_fee: 0,
    },
    sender: {
      id: "user4",
      name: "Jessica Chen",
      avatar: null,
    },
    status: "ACCEPTED",
    created_at: new Date("2025-05-08T11:20:00"),
  },
  {
    id: "inv4",
    event: {
      id: "6",
      title: "Photography Workshop",
      date_time: "2025-07-05T10:00:00",
      venue: "Art Gallery",
      is_paid: true,
      registration_fee: 75,
    },
    sender: {
      id: "user5",
      name: "David Kim",
      avatar: null,
    },
    status: "DECLINED",
    created_at: new Date("2025-05-05T16:45:00"),
  },
  {
    id: "inv5",
    event: {
      id: "7",
      title: "Marketing Conference",
      date_time: "2025-09-10T09:00:00",
      venue: "Convention Center",
      is_paid: true,
      registration_fee: 199,
    },
    sender: {
      id: "user6",
      name: "Amanda Johnson",
      avatar: null,
    },
    status: "PENDING",
    created_at: new Date("2025-05-14T13:10:00"),
  },
];

// Mock data for sent invitations
const sentInvitations = [
  {
    id: "sent1",
    event: {
      id: "1",
      title: "Tech Conference 2025",
      date_time: "2025-06-15T09:00:00",
      venue: "Tech Convention Center, San Francisco",
    },
    recipient: {
      id: "user7",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      avatar: null,
    },
    status: "PENDING",
    created_at: new Date("2025-05-11T10:30:00"),
  },
  {
    id: "sent2",
    event: {
      id: "1",
      title: "Tech Conference 2025",
      date_time: "2025-06-15T09:00:00",
      venue: "Tech Convention Center, San Francisco",
    },
    recipient: {
      id: "user8",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      avatar: null,
    },
    status: "ACCEPTED",
    created_at: new Date("2025-05-11T10:35:00"),
  },
  {
    id: "sent3",
    event: {
      id: "2",
      title: "Web Development Workshop",
      date_time: "2025-05-20T10:00:00",
      venue: "Online",
    },
    recipient: {
      id: "user9",
      name: "Thomas Wilson",
      email: "thomas.wilson@example.com",
      avatar: null,
    },
    status: "DECLINED",
    created_at: new Date("2025-05-09T14:20:00"),
  },
];

interface IReceivedInvitation {
  id: string;
  event: {
    id: string;
    title: string;
    date_time: string;
    venue: string;
    is_paid: boolean;
    registration_fee: number;
  };
  sender: {
    id: string;
    name: string;
    avatar: string | null;
  };
  status: string;
  created_at: Date;
}

interface ISentInvitation {
  id: string;
  event: {
    id: string;
    title: string;
    date_time: string;
    venue: string;
  };
  recipient: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
  };
  status: string;
  created_at: Date;
}

export default function InvitationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter received invitations
  const filteredInvitations = allInvitations.filter((invitation) => {
    // Search filter
    const matchesSearch =
      invitation.event.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      invitation.sender.name.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus =
      statusFilter === "all" ||
      invitation.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Filter sent invitations
  const filteredSentInvitations = sentInvitations.filter((invitation) => {
    // Search filter
    const matchesSearch =
      invitation.event.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      invitation.recipient.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      invitation.recipient.email
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus =
      statusFilter === "all" ||
      invitation.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Handle invitation actions
  const handleAccept = (invitationId: string) => {
    // In a real app, you would call an API to accept the invitation
    console.log("Accepting invitation:", invitationId);
  };

  const handleDecline = (invitationId: string) => {
    // In a real app, you would call an API to decline the invitation
    console.log("Declining invitation:", invitationId);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Invitations</h2>
          <p className="text-muted-foreground">Manage your event invitations</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search invitations..."
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
              <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("accepted")}>
                Accepted
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("declined")}>
                Declined
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="received" className="w-full">
        <TabsList className="justify-start overflow-x-auto">
          <TabsTrigger value="received" className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            <span>Received ({filteredInvitations.length})</span>
          </TabsTrigger>
          <TabsTrigger value="sent" className="flex items-center gap-1">
            <ArrowUpRight className="h-4 w-4" />
            <span>Sent ({filteredSentInvitations.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="received" className="mt-6 space-y-6">
          <ReceivedInvitationsList
            invitations={filteredInvitations}
            onAccept={handleAccept}
            onDecline={handleDecline}
          />
        </TabsContent>

        <TabsContent value="sent" className="mt-6 space-y-6">
          <SentInvitationsList invitations={filteredSentInvitations} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ReceivedInvitationsList({
  invitations,
  onAccept,
  onDecline,
}: {
  invitations: IReceivedInvitation[];
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}) {
  if (invitations.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Mail className="h-12 w-12 text-muted-foreground mb-3" />
          <h3 className="text-lg font-medium">No invitations found</h3>
          <p className="text-muted-foreground mt-1">
            You don&apos;t have any invitations matching your current filters.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {invitations.map((invitation) => (
        <Card key={invitation.id}>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <Link
                    href={`/events/${invitation.event.id}`}
                    className="text-xl font-semibold hover:underline"
                  >
                    {invitation.event.title}
                  </Link>
                  <Badge
                    variant={
                      invitation.status === "PENDING"
                        ? "secondary"
                        : invitation.status === "ACCEPTED"
                          ? "default"
                          : "outline"
                    }
                  >
                    {invitation.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    {invitation.sender.avatar ? (
                      <AvatarImage
                        src={invitation.sender.avatar || "/placeholder.svg"}
                        alt={invitation.sender.name}
                      />
                    ) : (
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {invitation.sender.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <p className="text-sm">
                      Invited by{" "}
                      <span className="font-medium">
                        {invitation.sender.name}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(invitation.created_at).toLocaleDateString()} at{" "}
                      {new Date(invitation.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm">
                      {formatDate(invitation.event.date_time)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm">
                      {new Date(invitation.event.date_time).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm">{invitation.event.venue}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-4 lg:w-64">
                {invitation.event.is_paid && (
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="badge-paid text-base">
                      ${invitation.event.registration_fee}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Registration Fee
                    </span>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <Link href={`/events/${invitation.event.id}`}>
                    <Button variant="outline" className="w-full gap-1">
                      View Event
                    </Button>
                  </Link>
                  {invitation.status === "PENDING" && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => onDecline(invitation.id)}
                      >
                        Decline
                      </Button>
                      <Button
                        className="flex-1"
                        onClick={() => onAccept(invitation.id)}
                      >
                        {invitation.event.is_paid ? "Pay & Accept" : "Accept"}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function SentInvitationsList({
  invitations,
}: {
  invitations: ISentInvitation[];
}) {
  if (invitations.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <ArrowUpRight className="h-12 w-12 text-muted-foreground mb-3" />
          <h3 className="text-lg font-medium">No sent invitations</h3>
          <p className="text-muted-foreground mt-1">
            You haven&apos;t sent any invitations matching your current filters.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sent Invitations</CardTitle>
        <CardDescription>
          Invitations you&apos;ve sent to others
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          {invitations.map((invitation) => (
            <div key={invitation.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/events/${invitation.event.id}`}
                      className="font-medium hover:underline"
                    >
                      {invitation.event.title}
                    </Link>
                    <Badge
                      variant={
                        invitation.status === "PENDING"
                          ? "secondary"
                          : invitation.status === "ACCEPTED"
                            ? "default"
                            : "outline"
                      }
                    >
                      {invitation.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-6 w-6">
                      {invitation.recipient.avatar ? (
                        <AvatarImage
                          src={
                            invitation.recipient.avatar || "/placeholder.svg"
                          }
                          alt={invitation.recipient.name}
                        />
                      ) : (
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {invitation.recipient.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Sent to:</span>{" "}
                      <span>{invitation.recipient.name}</span>{" "}
                      <span className="text-muted-foreground">
                        ({invitation.recipient.email})
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{formatDate(invitation.event.date_time)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>
                        {new Date(
                          invitation.event.date_time
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" />
                      <span>
                        Sent on{" "}
                        {new Date(invitation.created_at).toLocaleDateString(
                          undefined,
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 self-end sm:self-center">
                  <Button variant="outline" size="sm">
                    Resend
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
