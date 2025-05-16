"use client";

import { CheckCircle2 } from "lucide-react";
import StatusPage from "@/components/shared/status-page";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSearchParams } from "next/navigation";
import { useGetPaymentDetailsQuery } from "@/redux/features/payment/paymentApi";
import { OverlayLoading } from "@/components/ui/overlay-loading";

export default function PaymentSuccessPendingApprovalPage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("pay_id");

  const { data: payment, isLoading } = useGetPaymentDetailsQuery(paymentId, {
    skip: !paymentId,
  });

  return (
    <>
      <OverlayLoading isLoading={isLoading} />
      <StatusPage
        title="Payment Successful!"
        description="Your payment has been processed successfully. Your request to join the event is now pending approval from the organizer."
        icon={<CheckCircle2 className="h-10 w-10 text-green-500" />}
        iconColor="green"
        primaryActionText="Browse Events"
        primaryActionHref="/events"
        secondaryActionText="View Dashboard"
        secondaryActionHref="/dashboard"
        additionalContent={
          <div className="space-y-4">
            <Alert className="bg-amber-50 border-amber-200">
              <AlertDescription className="text-amber-800">
                The event organizer will review your request. You&apos;ll
                receive an notification once your request is approved.
              </AlertDescription>
            </Alert>
          </div>
        }
        showEventDetails={true}
        eventData={{
          id: payment?.data?.event?.id,
          title: payment?.data?.event?.title,
          date_time: payment?.data?.event?.date_time,
          venue: payment?.data?.event?.venue,
          is_virtual: payment?.data?.event?.is_virtual,
        }}
        showPaymentDetails={true}
        paymentData={{
          amount: payment?.data?.amount,
          status: payment?.data?.status,
          paid_at: payment?.data?.paid_at,
          transaction_id: payment?.data?.transaction_id,
        }}
      />
    </>
  );
}
