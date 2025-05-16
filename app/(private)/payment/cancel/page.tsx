"use client";

import { AlertTriangle } from "lucide-react";
import StatusPage from "@/components/shared/status-page";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCreatePaymentIntentMutation } from "@/redux/features/payment/paymentApi";
import { useGetPaymentDetailsQuery } from "@/redux/features/payment/paymentApi";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { OverlayLoading } from "@/components/ui/overlay-loading";

export default function PaymentCancelledPage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("pay_id");
  const participantId = searchParams.get("participant_id");

  const { data: payment, isLoading } = useGetPaymentDetailsQuery(paymentId, {
    skip: !paymentId,
  });

  const [createPaymentIntent, { isLoading: isCreatingPaymentIntent }] =
    useCreatePaymentIntentMutation();

  const handlePayAgain = async () => {
    const paymentResponse = await createPaymentIntent({
      participant_id: participantId,
    }).unwrap();

    if (paymentResponse.data?.payment_url) {
      window.location.href = paymentResponse.data.payment_url;
    } else {
      toast.error("Failed to create payment link");
    }
  };

  return (
    <>
      <OverlayLoading isLoading={isLoading} />
      <StatusPage
        title="Payment Cancelled"
        description="Your payment process was cancelled. No charges have been made to your account."
        icon={<AlertTriangle className="h-10 w-10 text-amber-500" />}
        iconColor="amber"
        primaryActionText={
          isCreatingPaymentIntent ? "Processing..." : "Try Again"
        }
        primaryActionOnClick={handlePayAgain}
        primaryActionDisabled={isCreatingPaymentIntent}
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
        showEventDetails={true}
        eventData={{
          id: payment?.data?.event?.id,
          title: payment?.data?.event?.title,
          date_time: payment?.data?.event?.date_time,
          venue: payment?.data?.event?.venue,
          is_virtual: payment?.data?.event?.is_virtual,
        }}
      />
    </>
  );
}
