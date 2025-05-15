"use client";

import { Clock } from "lucide-react";
import StatusPage from "@/components/shared/status-page";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function JoinPendingApprovalPage() {
  return (
    <StatusPage
      title="Request Submitted"
      description="Your request to join this event has been submitted and is pending approval from the event organizer."
      icon={<Clock className="h-10 w-10 text-amber-500" />}
      iconColor="amber"
      primaryActionText="View Dashboard"
      primaryActionHref="/dashboard"
      secondaryActionText="Browse Events"
      secondaryActionHref="/events"
      additionalContent={
        <div className="space-y-4">
          <Alert className="bg-amber-50 border-amber-200">
            <AlertDescription className="text-amber-800">
              You&apos;ll receive an notification once the organizer approves
              your request.
            </AlertDescription>
          </Alert>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-4">Request Status</h3>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Waiting for approval</span>
                  <span>Approved</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>

              <div className="text-sm text-muted-foreground">
                <p>
                  Most requests are processed within 24-48 hours. If you
                  don&apos;t hear back within 3 days, please contact the event
                  organizer directly.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      }
    />
  );
}
