"use client";

import { CheckCircle2 } from "lucide-react";
import StatusPage from "@/components/shared/status-page";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function PaymentSuccessPendingApprovalPage() {
  return (
    <StatusPage
      title="Payment Successful!"
      description="Your payment has been processed successfully. Your request to join the event is now pending approval from the organizer."
      icon={<CheckCircle2 className="h-10 w-10 text-green-500" />}
      iconColor="green"
      showEventDetails={true}
      showPaymentDetails={true}
      primaryActionText="View Dashboard"
      primaryActionHref="/dashboard"
      secondaryActionText="Browse Events"
      secondaryActionHref="/events"
      additionalContent={
        <div className="space-y-4">
          <Alert className="bg-amber-50 border-amber-200">
            <AlertDescription className="text-amber-800">
              The event organizer will review your request. You&apos;ll receive
              an notification once your request is approved.
            </AlertDescription>
          </Alert>
        </div>
      }
    />
  );
}
