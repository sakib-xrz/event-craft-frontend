"use client";

import { XCircle, HelpCircle } from "lucide-react";
import StatusPage from "@/components/shared/status-page";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import {
  useCreatePaymentIntentMutation,
  useGetPaymentDetailsQuery,
} from "@/redux/features/payment/paymentApi";
import { OverlayLoading } from "@/components/ui/overlay-loading";
import { toast } from "sonner";

export default function PaymentFailedPage() {
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
        title="Payment Failed"
        description="We couldn't process your payment. Please check your payment details and try again."
        icon={<XCircle className="h-10 w-10 text-red-500" />}
        iconColor="red"
        primaryActionText={
          isCreatingPaymentIntent ? "Processing..." : "Try Again"
        }
        primaryActionOnClick={handlePayAgain}
        primaryActionDisabled={isCreatingPaymentIntent}
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
