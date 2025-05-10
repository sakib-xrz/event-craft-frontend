"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  Search,
  Filter,
  ChevronDown,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Ban,
  AlertTriangle,
  Users,
} from "lucide-react";
import { formatDate } from "@/lib/formatters";
import { Separator } from "@/components/ui/separator";

// Mock data for events
const events = [
  {
    id: "1",
    title: "Tech Conference 2025",
    date_time: "2025-06-15T09:00:00",
    venue: "Tech Convention Center, San Francisco",
  },
  {
    id: "2",
    title: "Web Development Workshop",
    date_time: "2025-05-20T10:00:00",
    venue: "Online",
  },
  {
    id: "3",
    title: "Networking Mixer",
    date_time: "2025-05-25T18:00:00",
    venue: "Downtown Business Center",
  },
];

interface IParticipant {
  id: string;
  name: string;
  email: string;
  status: string;
  role: string;
  company: string;
  joinedAt: string;
  avatar: string | null;
  eventId: string;
}

// Mock data for participants
const allParticipants = [
  {
    id: "p1",
    name: "John Doe",
    email: "john.doe@example.com",
    status: "APPROVED",
    role: "Attendee",
    company: "Google",
    joinedAt: "2025-04-10",
    avatar: null,
    eventId: "1",
  },
  {
    id: "p2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    status: "APPROVED",
    role: "Speaker",
    company: "Microsoft",
    joinedAt: "2025-04-12",
    avatar: null,
    eventId: "1",
  },
  {
    id: "p3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    status: "PENDING",
    role: "Attendee",
    company: "Amazon",
    joinedAt: "2025-04-15",
    avatar: null,
    eventId: "1",
  },
  {
    id: "p4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    status: "PENDING",
    role: "Attendee",
    company: "Apple",
    joinedAt: "2025-04-16",
    avatar: null,
    eventId: "1",
  },
  {
    id: "p5",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    status: "BANNED",
    role: "Attendee",
    company: "Tesla",
    joinedAt: "2025-04-05",
    avatar: null,
    eventId: "1",
  },
  {
    id: "p6",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    status: "APPROVED",
    role: "Attendee",
    company: "Facebook",
    joinedAt: "2025-04-08",
    avatar: null,
    eventId: "2",
  },
  {
    id: "p7",
    name: "David Lee",
    email: "david.lee@example.com",
    status: "PENDING",
    role: "Attendee",
    company: "Twitter",
    joinedAt: "2025-04-14",
    avatar: null,
    eventId: "2",
  },
];

export default function ManageParticipantsPage() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId") || "1";

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    []
  );
  const [isBanDialogOpen, setIsBanDialogOpen] = useState(false);
  const [selectedParticipantForAction, setSelectedParticipantForAction] =
    useState<string | null>(null);

  // Get current event
  const currentEvent =
    events.find((event) => event.id === eventId) || events[0];

  // Filter participants based on search query, status filter, and role filter
  const filteredParticipants = allParticipants
    .filter((participant) => participant.eventId === eventId)
    .filter((participant) => {
      // Search filter
      const matchesSearch =
        participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        participant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (participant.company &&
          participant.company
            .toLowerCase()
            .includes(searchQuery.toLowerCase()));

      // Status filter
      const matchesStatus =
        statusFilter === "all" ||
        participant.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });

  // Toggle participant selection
  const toggleParticipantSelection = (participantId: string) => {
    setSelectedParticipants((prev) =>
      prev.includes(participantId)
        ? prev.filter((id) => id !== participantId)
        : [...prev, participantId]
    );
  };

  // Select all participants
  const selectAllParticipants = () => {
    if (selectedParticipants.length === filteredParticipants.length) {
      setSelectedParticipants([]);
    } else {
      setSelectedParticipants(
        filteredParticipants.map((participant) => participant.id)
      );
    }
  };

  // Handle bulk actions
  const handleBulkApprove = () => {
    // In a real app, you would call an API to approve the selected participants
    console.log("Approving participants:", selectedParticipants);
    // Reset selection after action
    setSelectedParticipants([]);
  };

  const handleBulkDecline = () => {
    // In a real app, you would call an API to decline the selected participants
    console.log("Declining participants:", selectedParticipants);
    // Reset selection after action
    setSelectedParticipants([]);
  };

  // Handle individual actions
  const handleApprove = (participantId: string) => {
    // In a real app, you would call an API to approve the participant
    console.log("Approving participant:", participantId);
  };

  const handleDecline = (participantId: string) => {
    // In a real app, you would call an API to decline the participant
    console.log("Declining participant:", participantId);
  };

  const handleBan = (participantId: string) => {
    setSelectedParticipantForAction(participantId);
    setIsBanDialogOpen(true);
  };

  const confirmBan = () => {
    // In a real app, you would call an API to ban the participant
    console.log("Banning participant:", selectedParticipantForAction);
    setIsBanDialogOpen(false);
    setSelectedParticipantForAction(null);
  };

  const handleUnban = (participantId: string) => {
    // In a real app, you would call an API to unban the participant
    console.log("Unbanning participant:", participantId);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-2">
            <Link
              href="/dashboard/events"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Link>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            Manage Participants
          </h2>
          <p className="text-muted-foreground">
            {currentEvent.title} - {formatDate(currentEvent.date_time)}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search participants..."
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
              <DropdownMenuItem onClick={() => setStatusFilter("approved")}>
                Approved
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("banned")}>
                Banned
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {selectedParticipants.length > 0 && (
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={
                    selectedParticipants.length === filteredParticipants.length
                  }
                  onCheckedChange={selectAllParticipants}
                />
                <span>
                  {selectedParticipants.length} participant
                  {selectedParticipants.length !== 1 ? "s" : ""} selected
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  onClick={() => setSelectedParticipants([])}
                >
                  Clear Selection
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 text-destructive"
                  onClick={handleBulkDecline}
                >
                  <XCircle className="h-4 w-4" />
                  Decline
                </Button>
                <Button size="sm" className="gap-1" onClick={handleBulkApprove}>
                  <CheckCircle2 className="h-4 w-4" />
                  Approve
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <ParticipantsList
        participants={filteredParticipants}
        selectedParticipants={selectedParticipants}
        toggleSelection={toggleParticipantSelection}
        onApprove={handleApprove}
        onDecline={handleDecline}
        onBan={handleBan}
        onUnban={handleUnban}
      />

      {/* Ban Confirmation Dialog */}
      <Dialog open={isBanDialogOpen} onOpenChange={setIsBanDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ban Participant</DialogTitle>
            <DialogDescription>
              Are you sure you want to ban this participant? They will no longer
              be able to access this event.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center gap-3 p-3 rounded-lg border">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <p className="text-sm">
                Banning a participant is a serious action and should only be
                done if they have violated your event&apos;s rules or code of
                conduct.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBanDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmBan}>
              Ban Participant
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ParticipantsList({
  participants,
  onApprove,
  onDecline,
  onBan,
  onUnban,
}: {
  participants: IParticipant[];
  selectedParticipants: string[];
  toggleSelection: (id: string) => void;
  onApprove: (id: string) => void;
  onDecline: (id: string) => void;
  onBan: (id: string) => void;
  onUnban: (id: string) => void;
}) {
  if (participants.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Users className="h-12 w-12 text-muted-foreground mb-3" />
          <h3 className="text-lg font-medium">No participants found</h3>
          <p className="text-muted-foreground mt-1">
            There are no participants matching your current filters.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="px-6 py-4">
        <div className="flex items-center">
          <div className="flex flex-1 items-center justify-between">
            <div className="grid grid-cols-4 w-full text-xs font-medium text-muted-foreground">
              <div className="col-span-2 md:col-span-2">Participant</div>
              <div>Status</div>
              <div className="text-right">Actions</div>
            </div>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="p-0">
        <div className="divide-y">
          {participants.map((participant) => (
            <div key={participant.id} className="flex items-center px-6 py-4">
              <div className="flex flex-1 items-center justify-between">
                <div className="grid grid-cols-4 w-full items-center">
                  <div className="col-span-2 md:col-span-2 flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      {participant.avatar ? (
                        <AvatarImage
                          src={participant.avatar || "/placeholder.svg"}
                          alt={participant.name}
                        />
                      ) : (
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {participant.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{participant.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {participant.email}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Badge
                      variant={
                        participant.status === "APPROVED"
                          ? "default"
                          : participant.status === "PENDING"
                            ? "secondary"
                            : "destructive"
                      }
                      className={
                        participant.status === "BANNED"
                          ? "bg-destructive/20 text-destructive"
                          : ""
                      }
                    >
                      {participant.status}
                    </Badge>
                  </div>
                  <div className="flex justify-end gap-2">
                    {participant.status === "PENDING" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 px-2"
                          onClick={() => onDecline(participant.id)}
                        >
                          <XCircle className="h-4 w-4" />
                          <span className="sr-only">Decline</span>
                        </Button>
                        <Button
                          size="sm"
                          className="h-8 px-2"
                          onClick={() => onApprove(participant.id)}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          <span className="sr-only">Approve</span>
                        </Button>
                      </>
                    )}
                    {participant.status === "APPROVED" && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => onBan(participant.id)}
                          >
                            <Ban className="h-4 w-4 mr-2" />
                            Ban Participant
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                    {participant.status === "BANNED" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8"
                        onClick={() => onUnban(participant.id)}
                      >
                        Unban
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
