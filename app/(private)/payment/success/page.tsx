"use client";

import { CheckCircle2 } from "lucide-react";
import StatusPage from "@/components/shared/status-page";
import { useSearchParams } from "next/navigation";
import { useGetPaymentDetailsQuery } from "@/redux/features/payment/paymentApi";
import { OverlayLoading } from "@/components/ui/overlay-loading";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const paymentId = searchParams.get("pay_id");

  const { data: payment, isLoading } = useGetPaymentDetailsQuery(paymentId, {
    skip: !paymentId,
  });

  return (
    <>
      <OverlayLoading isLoading={isLoading} />
      <StatusPage
        title="Payment Successful!"
        description="Your payment has been processed successfully and you have been added to the event."
        icon={<CheckCircle2 className="h-10 w-10 text-green-500" />}
        iconColor="green"
        primaryActionText="View Event Details"
        primaryActionHref={`/events/${payment?.data?.event?.id}`}
        secondaryActionText="Return to Dashboard"
        secondaryActionHref="/dashboard"
        showEventDetails={true}
        eventData={{
          id: payment?.data?.event?.id,
          title: payment?.data?.event?.title,
          date_time: payment?.data?.event?.date_time,
          venue: payment?.data?.event?.venue,
          is_virtual: payment?.data?.event?.is_virtual,
        }}
        token={token}
        showToken={true}
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
