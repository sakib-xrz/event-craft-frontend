"use client";

import { CheckCircle2 } from "lucide-react";
import StatusPage from "@/components/shared/status-page";

export default function JoinSuccessPage() {
  return (
    <StatusPage
      title="Successfully Joined!"
      description="You have successfully joined the event. We look forward to seeing you there!"
      icon={<CheckCircle2 className="h-10 w-10 text-green-500" />}
      iconColor="green"
      showEventDetails={true}
      primaryActionText="View Event Details"
      primaryActionHref="/events/event-123"
      tertiaryActionText="Return to Dashboard"
      tertiaryActionHref="/dashboard"
    />
  );
}
