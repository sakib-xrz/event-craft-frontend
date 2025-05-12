"use client";

import { XCircle, HelpCircle } from "lucide-react";
import StatusPage from "@/components/shared/status-page";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentFailedPage() {
  return (
    <StatusPage
      title="Payment Failed"
      description="We couldn't process your payment. Please check your payment details and try again."
      icon={<XCircle className="h-10 w-10 text-red-500" />}
      iconColor="red"
      showEventDetails={true}
      primaryActionText="Try Again"
      primaryActionHref="/events/event-123"
      secondaryActionText="Return to Dashboard"
      secondaryActionHref="/dashboard"
      additionalContent={
        <div className="space-y-4">
          <Alert className="bg-red-50 border-red-200">
            <AlertDescription className="text-red-800">
              Your payment was not processed and you have not been charged.
            </AlertDescription>
          </Alert>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                  <HelpCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium">
                    Common reasons for payment failure:
                  </h3>
                </div>
              </div>

              <ul className="space-y-3 ml-4 list-disc">
                <li>Insufficient funds in your account</li>
                <li>Incorrect card details entered</li>
                <li>Card expired or blocked for online transactions</li>
                <li>Transaction declined by your bank</li>
                <li>Network or connectivity issues</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      }
    />
  );
}
