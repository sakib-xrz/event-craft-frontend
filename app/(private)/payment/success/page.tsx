"use client";

import { CheckCircle2 } from "lucide-react";
import StatusPage from "@/components/shared/status-page";

export default function PaymentSuccessPage() {
  return (
    <StatusPage
      title="Payment Successful!"
      description="Your payment has been processed successfully and you have been added to the event."
      icon={<CheckCircle2 className="h-10 w-10 text-green-500" />}
      iconColor="green"
      showEventDetails={true}
      showPaymentDetails={true}
      primaryActionText="View Event Details"
      primaryActionHref="/events/event-123"
      secondaryActionText="Return to Dashboard"
      secondaryActionHref="/dashboard"
    />
  );
}
