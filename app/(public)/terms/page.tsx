import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Scale, HelpCircle } from "lucide-react";
import Container from "@/components/shared/container";

export default function TermsOfServicePage() {
  return (
    <Container>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-muted-foreground">Last updated: May 9, 2025</p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Scale className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Terms and Conditions</h2>
                <p className="text-sm text-muted-foreground">
                  Please read these terms carefully before using our platform
                </p>
              </div>
            </div>

            <div className="prose max-w-none dark:prose-invert">
              <p>
                These Terms of Service (&quot;Terms&quot;) govern your access to
                and use of the EventCraft platform, including any content,
                functionality, and services offered on or through our website
                (the &quot;Service&quot;). By registering with us or by using
                our Service, you agree to be bound by these Terms.
              </p>

              <h3>1. Acceptance of Terms</h3>
              <p>
                By accessing or using the Service, you agree to be bound by
                these Terms. If you disagree with any part of the terms, then
                you may not access the Service.
              </p>

              <h3>2. Changes to Terms</h3>
              <p>
                We reserve the right, at our sole discretion, to modify or
                replace these Terms at any time. If a revision is material, we
                will try to provide at least 30 days&apos; notice prior to any
                new terms taking effect. What constitutes a material change will
                be determined at our sole discretion.
              </p>

              <h3>3. Access and Security</h3>
              <p>
                When you create an account with us, you must provide accurate,
                complete, and current information at all times. Failure to do so
                constitutes a breach of the Terms, which may result in immediate
                termination of your account.
              </p>
              <p>
                You are responsible for safeguarding the password that you use
                to access the Service and for any activities or actions under
                your password. You agree not to disclose your password to any
                third party. You must notify us immediately upon becoming aware
                of any breach of security or unauthorized use of your account.
              </p>

              <h3>4. User Content</h3>
              <p>
                Our Service allows you to post, link, store, share and otherwise
                make available certain information, text, graphics, videos, or
                other material (&quot;Content&quot;). You are responsible for
                the Content that you post on or through the Service, including
                its legality, reliability, and appropriateness.
              </p>
              <p>
                By posting Content on or through the Service, you represent and
                warrant that: (i) the Content is yours (you own it) or you have
                the right to use it and grant us the rights and license as
                provided in these Terms, and (ii) the posting of your Content on
                or through the Service does not violate the privacy rights,
                publicity rights, copyrights, contract rights or any other
                rights of any person.
              </p>

              <h3>5. Events</h3>
              <p>
                As an event organizer, you are responsible for ensuring that
                your events comply with all applicable laws and regulations.
                EventCraft reserves the right to remove any event that violates
                these Terms or is otherwise objectionable.
              </p>
              <p>
                As an event participant, you agree to comply with all rules and
                regulations set by the event organizer. EventCraft is not
                responsible for the conduct of event organizers or participants.
              </p>

              <h3>6. Payments and Fees</h3>
              <p>
                Some of our services are offered for a fee. You agree to pay all
                fees or charges to your account based on the fees, charges, and
                billing terms in effect at the time a fee or charge is due and
                payable.
              </p>
              <p>
                Payments are processed through third-party payment processors.
                By providing your payment information, you authorize us to
                charge the amount due to your selected payment method.
              </p>

              <h3>7. Refunds</h3>
              <p>
                Refund policies for events are set by the event organizers.
                EventCraft is not responsible for processing refunds for events
                unless otherwise specified.
              </p>

              <h3>8. Termination</h3>
              <p>
                We may terminate or suspend your account immediately, without
                prior notice or liability, for any reason whatsoever, including
                without limitation if you breach the Terms.
              </p>
              <p>
                Upon termination, your right to use the Service will immediately
                cease. If you wish to terminate your account, you may simply
                discontinue using the Service or contact us to request account
                deletion.
              </p>

              <h3>9. Limitation of Liability</h3>
              <p>
                In no event shall EventCraft, nor its directors, employees,
                partners, agents, suppliers, or affiliates, be liable for any
                indirect, incidental, special, consequential or punitive
                damages, including without limitation, loss of profits, data,
                use, goodwill, or other intangible losses, resulting from (i)
                your access to or use of or inability to access or use the
                Service; (ii) any conduct or content of any third party on the
                Service; (iii) any content obtained from the Service; and (iv)
                unauthorized access, use or alteration of your transmissions or
                content, whether based on warranty, contract, tort (including
                negligence) or any other legal theory, whether or not we have
                been informed of the possibility of such damage.
              </p>

              <h3>10. Governing Law</h3>
              <p>
                These Terms shall be governed and construed in accordance with
                the laws of the United States, without regard to its conflict of
                law provisions.
              </p>

              <h3>11. Contact Us</h3>
              <p>
                If you have any questions about these Terms, please contact us
                at:
              </p>
              <p>
                Email: legal@EventCraft.com
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
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Privacy Policy</h3>
              <p className="text-muted-foreground">
                Learn how we collect, use, and protect your personal
                information.
              </p>
              <Link href="/privacy">
                <Button variant="link" className="mt-2">
                  Privacy Policy
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
              <p className="text-muted-foreground">
                If you have questions about our terms, we&apos;re here to help.
              </p>
              <Link href="/contact">
                <Button variant="link" className="mt-2">
                  Contact Support
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            By using our platform, you agree to these terms and conditions.
          </p>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
