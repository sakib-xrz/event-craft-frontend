import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, FileText } from "lucide-react";
import Container from "@/components/shared/container";

export default function PrivacyPolicyPage() {
  return (
    <Container>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">Last updated: May 9, 2025</p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  Our Commitment to Privacy
                </h2>
                <p className="text-sm text-muted-foreground">
                  How we protect and respect your personal information
                </p>
              </div>
            </div>

            <div className="prose max-w-none dark:prose-invert">
              <p>
                At EventCraft, we take your privacy seriously. This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website or use our platform.
                Please read this privacy policy carefully. If you do not agree
                with the terms of this privacy policy, please do not access the
                site.
              </p>

              <h3>Information We Collect</h3>
              <p>
                We collect information that you provide directly to us when you
                register for an account, create or modify your profile, sign up
                for events, or communicate with us. This information may
                include:
              </p>
              <ul>
                <li>
                  Personal information such as your name, email address, and
                  phone number
                </li>
                <li>
                  Profile information such as your username, password, and
                  profile picture
                </li>
                <li>Payment information when you register for paid events</li>
                <li>Communications you send to us</li>
              </ul>

              <h3>How We Use Your Information</h3>
              <p>
                We may use the information we collect from you for various
                purposes, including to:
              </p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>
                  Send administrative information, such as updates, security
                  alerts, and support messages
                </li>
                <li>Respond to your comments, questions, and requests</li>
                <li>
                  Personalize your experience and deliver content relevant to
                  your interests
                </li>
                <li>
                  Monitor and analyze trends, usage, and activities in
                  connection with our services
                </li>
              </ul>

              <h3>Sharing Your Information</h3>
              <p>
                We may share the information we collect in various ways,
                including:
              </p>
              <ul>
                <li>
                  With vendors, consultants, and other service providers who
                  need access to such information to carry out work on our
                  behalf
                </li>
                <li>With event organizers when you register for an event</li>
                <li>
                  In response to a request for information if we believe
                  disclosure is in accordance with any applicable law,
                  regulation, or legal process
                </li>
                <li>
                  If we believe your actions are inconsistent with our user
                  agreements or policies, or to protect the rights, property,
                  and safety of EventCraft or others
                </li>
              </ul>

              <h3>Your Choices</h3>
              <p>
                You have several choices regarding the use of information on our
                service:
              </p>
              <ul>
                <li>
                  Account Information: You may update, correct, or delete your
                  account information at any time by logging into your account
                </li>
                <li>
                  Cookies: Most web browsers are set to accept cookies by
                  default. You can usually choose to set your browser to remove
                  or reject browser cookies
                </li>
                <li>
                  Promotional Communications: You may opt out of receiving
                  promotional emails from us by following the instructions in
                  those emails
                </li>
              </ul>

              <h3>Data Security</h3>
              <p>
                We take reasonable measures to help protect information about
                you from loss, theft, misuse, unauthorized access, disclosure,
                alteration, and destruction. However, no Internet or email
                transmission is ever fully secure or error-free.
              </p>

              <h3>Changes to This Privacy Policy</h3>
              <p>
                We may change this privacy policy from time to time. If we make
                changes, we will notify you by revising the date at the top of
                the policy and, in some cases, we may provide you with
                additional notice.
              </p>

              <h3>Contact Us</h3>
              <p>
                If you have any questions about this privacy policy, please
                contact us at:
              </p>
              <p>
                Email: privacy@EventCraft.com
                <br />
                Address: 123 Event Street, Suite 456, San Francisco, CA 94103
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Data Protection</h3>
              <p className="text-muted-foreground">
                Learn more about how we protect your personal data and maintain
                security.
              </p>
              <Button variant="link" className="mt-2">
                Data Protection Policy
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Terms of Service</h3>
              <p className="text-muted-foreground">
                Review our terms of service to understand your rights and
                responsibilities.
              </p>
              <Link href="/terms">
                <Button variant="link" className="mt-2">
                  Terms of Service
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            If you have any questions about our privacy practices, please
            contact us.
          </p>
          <Link href="/contact">
            <Button>Contact Us</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
