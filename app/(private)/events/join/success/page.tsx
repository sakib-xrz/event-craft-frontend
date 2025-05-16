"use client";

import { CheckCircle2 } from "lucide-react";
import StatusPage from "@/components/shared/status-page";
import { useSearchParams } from "next/navigation";
import { useGetParticipantByTokenQuery } from "@/redux/features/participant/participantApi";
import { OverlayLoading } from "@/components/ui/overlay-loading";

export default function JoinSuccessPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { data: participant, isLoading } = useGetParticipantByTokenQuery(
    token,
    {
      skip: !token,
    }
  );

  return (
    <>
      <OverlayLoading isLoading={isLoading} />
      <StatusPage
        title="Successfully Joined!"
        description="You have successfully joined the event. We look forward to seeing you there!"
        icon={<CheckCircle2 className="h-10 w-10 text-green-500" />}
        iconColor="green"
        primaryActionText="View Event Details"
        primaryActionHref={`/events/${participant?.data?.event_id}`}
        secondaryActionText="Return to Dashboard"
        secondaryActionHref="/dashboard"
        showEventDetails={true}
        eventData={{
          id: participant?.data?.event_id,
          title: participant?.data?.event.title,
          date_time: participant?.data?.event.date_time,
          venue: participant?.data?.event.venue,
          is_virtual: participant?.data?.event.is_virtual,
        }}
        token={token}
        showToken={true}
      />
    </>
  );
}
