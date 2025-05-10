"use client";

import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Calendar, Clock, MapPin, DollarSign } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const createEventSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be less than 100 characters")
    .required("Title is required"),
  description: Yup.string()
    .min(20, "Description must be at least 20 characters")
    .required("Description is required"),
  date: Yup.date()
    .min(new Date(), "Event date must be in the future")
    .required("Date is required"),
  time: Yup.string().required("Time is required"),
  venue: Yup.string().when("isVirtual", {
    is: false,
    then: (schema) => schema.required("Venue is required for in-person events"),
    otherwise: (schema) => schema.notRequired(),
  }),
  isPublic: Yup.boolean(),
  isPaid: Yup.boolean(),
  isVirtual: Yup.boolean(),
  registrationFee: Yup.number().when("isPaid", {
    is: true,
    then: (schema) =>
      schema
        .min(1, "Fee must be at least $1")
        .required("Registration fee is required for paid events"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export default function CreateEventPage() {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: "",
      time: "",
      venue: "",
      isPublic: true,
      isPaid: false,
      isVirtual: false,
      registrationFee: "",
    },
    validationSchema: createEventSchema,
    onSubmit: async (values) => {
      // This would be replaced with actual API call
      console.log("Event creation submitted:", values);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Handle event creation logic here
    },
  });

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">
            Create New Event
          </h1>
          <p className="text-muted-foreground">
            Fill in the details to create your event
          </p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Event Information</CardTitle>
              <CardDescription>
                Provide all the details about your event
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Basic Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Tech Conference 2025"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.title && formik.errors.title && (
                    <p className="text-xs text-destructive">
                      {formik.errors.title}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Event Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your event, what attendees can expect, etc."
                    className="min-h-[150px]"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <p className="text-xs text-destructive">
                      {formik.errors.description}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Event Date
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formik.values.date}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.date && formik.errors.date && (
                      <p className="text-xs text-destructive">
                        {formik.errors.date}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time" className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Event Time
                    </Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={formik.values.time}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.time && formik.errors.time && (
                      <p className="text-xs text-destructive">
                        {formik.errors.time}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="isVirtual"
                      className="flex items-center gap-1"
                    >
                      <MapPin className="h-4 w-4" />
                      Virtual Event
                    </Label>
                    <Switch
                      id="isVirtual"
                      name="isVirtual"
                      checked={formik.values.isVirtual}
                      onCheckedChange={(checked: boolean) =>
                        formik.setFieldValue("isVirtual", checked)
                      }
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formik.values.isVirtual
                      ? "This event will be held online"
                      : "This event will be held at a physical location"}
                  </p>
                </div>

                {!formik.values.isVirtual && (
                  <div className="space-y-2">
                    <Label htmlFor="venue">Venue / Location</Label>
                    <Input
                      id="venue"
                      name="venue"
                      placeholder="e.g., Tech Convention Center, San Francisco"
                      value={formik.values.venue}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.venue && formik.errors.venue && (
                      <p className="text-xs text-destructive">
                        {formik.errors.venue}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Separator */}
              <div className="border-t border-gray-200 my-6"></div>

              {/* Event Settings Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Event Settings</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="isPublic">Public Event</Label>
                      <p className="text-sm text-muted-foreground">
                        {formik.values.isPublic
                          ? "Anyone can see and join this event"
                          : "Only invited users can see and request to join"}
                      </p>
                    </div>
                    <Switch
                      id="isPublic"
                      name="isPublic"
                      checked={formik.values.isPublic}
                      onCheckedChange={(checked: boolean) =>
                        formik.setFieldValue("isPublic", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label
                        htmlFor="isPaid"
                        className="flex items-center gap-1"
                      >
                        <DollarSign className="h-4 w-4" />
                        Paid Event
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {formik.values.isPaid
                          ? "Charge a registration fee for this event"
                          : "This event is free to attend"}
                      </p>
                    </div>
                    <Switch
                      id="isPaid"
                      name="isPaid"
                      checked={formik.values.isPaid}
                      onCheckedChange={(checked: boolean) =>
                        formik.setFieldValue("isPaid", checked)
                      }
                    />
                  </div>

                  {formik.values.isPaid && (
                    <div className="space-y-2 pt-2">
                      <Label htmlFor="registrationFee">
                        Registration Fee ($)
                      </Label>
                      <Input
                        id="registrationFee"
                        name="registrationFee"
                        type="number"
                        placeholder="e.g., 19.99"
                        value={formik.values.registrationFee}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.registrationFee &&
                        formik.errors.registrationFee && (
                          <p className="text-xs text-destructive">
                            {formik.errors.registrationFee}
                          </p>
                        )}
                    </div>
                  )}
                </div>

                <Alert>
                  <AlertDescription>
                    <div className="space-y-2">
                      <p className="font-medium">Event Workflows</p>
                      <ol className="list-decimal pl-5 space-y-3 text-sm">
                        <li>
                          <p className="font-medium">Public Events (Free)</p>
                          <ul className="list-disc pl-5 space-y-1 mt-1">
                            <li>&quot;Join&quot; → instant acceptance</li>
                          </ul>
                        </li>
                        <li>
                          <p className="font-medium">Public Events (Paid)</p>
                          <ul className="list-disc pl-5 space-y-1 mt-1">
                            <li>
                              &quot;Join&quot; → payment flow →{" "}
                              <span className="font-semibold">Pending</span>{" "}
                              approval
                            </li>
                          </ul>
                        </li>
                        <li>
                          <p className="font-medium">Private Events (Free)</p>
                          <ul className="list-disc pl-5 space-y-1 mt-1">
                            <li>
                              &quot;Request to Join&quot; →{" "}
                              <span className="font-semibold">Pending</span>{" "}
                              approval
                            </li>
                          </ul>
                        </li>
                        <li>
                          <p className="font-medium">Private Events (Paid)</p>
                          <ul className="list-disc pl-5 space-y-1 mt-1">
                            <li>
                              &quot;Request to Join&quot; → payment flow →{" "}
                              <span className="font-semibold">Pending</span>{" "}
                              approval
                            </li>
                          </ul>
                        </li>
                      </ol>
                    </div>
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                type="button"
                onClick={() => formik.resetForm()}
              >
                Reset Form
              </Button>
              <Button
                type="submit"
                disabled={formik.isSubmitting || !formik.isValid}
              >
                {formik.isSubmitting ? "Creating Event..." : "Create Event"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
