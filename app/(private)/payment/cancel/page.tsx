"use client";

import { AlertTriangle } from "lucide-react";
import StatusPage from "@/components/shared/status-page";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function PaymentCancelledPage() {
  return (
    <StatusPage
      title="Payment Cancelled"
      description="Your payment process was cancelled. No charges have been made to your account."
      icon={<AlertTriangle className="h-10 w-10 text-amber-500" />}
      iconColor="amber"
      showEventDetails={true}
      primaryActionText="Try Again"
      primaryActionHref="/events/event-123"
      secondaryActionText="Return to Dashboard"
      secondaryActionHref="/dashboard"
      additionalContent={
        <Alert className="bg-blue-50 border-blue-200">
          <AlertDescription className="text-blue-800">
            If you experienced any issues during the payment process, please
            contact our support team for assistance.
          </AlertDescription>
        </Alert>
      }
    />
  );
}
