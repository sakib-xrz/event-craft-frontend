"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate, formatTime } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import Container from "@/components/shared/container";
import { Clock, Calendar, MapPin, CalendarIcon } from "lucide-react";

interface StatusPageProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  showEventDetails?: boolean;
  showPaymentDetails?: boolean;
  primaryActionText?: string;
  primaryActionHref?: string;
  secondaryActionText?: string;
  secondaryActionHref?: string;
  tertiaryActionText?: string;
  tertiaryActionHref?: string;
  additionalContent?: React.ReactNode;
}

export default function StatusPage({
  title,
  description,
  icon,
  iconColor,
  showEventDetails = false,
  showPaymentDetails = false,
  primaryActionText = "Return to Dashboard",
  primaryActionHref = "/dashboard",
  secondaryActionText,
  secondaryActionHref,
  tertiaryActionText,
  tertiaryActionHref,
  additionalContent,
}: StatusPageProps) {
  const searchParams = useSearchParams();
  const [isVisible, setIsVisible] = useState(false);

  // Mock event data - in a real app, you might fetch this from an API
  const eventData = {
    id: searchParams.get("eventId") || "event-123",
    title: searchParams.get("eventTitle") || "Tech Conference 2023",
    date_time: searchParams.get("eventDate")
      ? (searchParams.get("eventDate") as string)
      : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Default to 7 days from now
    venue: searchParams.get("eventVenue") || "Convention Center, New York",
    is_virtual: searchParams.get("isVirtual") === "true",
  };

  // Mock payment data
  const paymentData = {
    id: searchParams.get("paymentId") || "pay-9876543210",
    amount: searchParams.get("amount")
      ? Number.parseFloat(searchParams.get("amount") as string)
      : 99.99,
    date: new Date(),
    method: searchParams.get("paymentMethod") || "Credit Card",
    last4: searchParams.get("last4") || "4242",
  };

  // Animation effect
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Container className="py-12 max-w-3xl">
      <div
        className={cn(
          "opacity-0 translate-y-4 transition-all duration-500",
          isVisible && "opacity-100 translate-y-0"
        )}
      >
        <div className="text-center mb-8">
          <div
            className={cn(
              "inline-flex h-20 w-20 items-center justify-center rounded-full mb-4",
              `bg-${iconColor}/10`
            )}
          >
            {icon}
          </div>
          <h1 className="text-3xl font-bold mb-3">{title}</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {description}
          </p>
        </div>

        {(showEventDetails || showPaymentDetails) && (
          <Card className="mb-8 overflow-hidden">
            {showEventDetails && (
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold mb-4">Event Details</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <CalendarIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-lg">{eventData.title}</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant="outline">
                          {eventData.is_virtual ? "Virtual" : "In Person"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{formatDate(eventData.date_time)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{formatTime(eventData.date_time)}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:col-span-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{eventData.venue}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showPaymentDetails && (
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Transaction ID
                    </span>
                    <span className="font-medium">{paymentData.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-medium">
                      {formatCurrency(paymentData.amount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium">
                      {paymentData.date.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </Card>
        )}

        {additionalContent && <div className="mb-8">{additionalContent}</div>}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {primaryActionText && primaryActionHref && (
            <Link href={primaryActionHref}>
              <Button size="lg" className="w-full sm:w-auto">
                {primaryActionText}
              </Button>
            </Link>
          )}

          {secondaryActionText && secondaryActionHref && (
            <Link href={secondaryActionHref}>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                {secondaryActionText}
              </Button>
            </Link>
          )}

          {tertiaryActionText && tertiaryActionHref && (
            <Link href={tertiaryActionHref}>
              <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                {tertiaryActionText}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Container>
  );
}
