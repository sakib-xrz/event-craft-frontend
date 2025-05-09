import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cookie, Shield, FileText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Container from "@/components/shared/container";

export default function CookiePolicyPage() {
  return (
    <Container>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Cookie Policy
          </h1>
          <p className="text-muted-foreground">Last updated: May 9, 2025</p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Cookie className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">About Cookies</h2>
                <p className="text-sm text-muted-foreground">
                  How we use cookies and similar technologies
                </p>
              </div>
            </div>

            <div className="prose max-w-none dark:prose-invert">
              <p>
                This Cookie Policy explains how EventCraft (&quot;we&quot;,
                &quot;us&quot;, and &quot;our&quot;) uses cookies and similar
                technologies to recognize you when you visit our website. It
                explains what these technologies are and why we use them, as
                well as your rights to control our use of them.
              </p>

              <h3>What are cookies?</h3>
              <p>
                Cookies are small data files that are placed on your computer or
                mobile device when you visit a website. Cookies are widely used
                by website owners in order to make their websites work, or to
                work more efficiently, as well as to provide reporting
                information.
              </p>
              <p>
                Cookies set by the website owner (in this case, EventCraft) are
                called &quot;first-party cookies&quot;. Cookies set by parties
                other than the website owner are called &quot;third-party
                cookies&quot;. Third-party cookies enable third-party features
                or functionality to be provided on or through the website (e.g.,
                advertising, interactive content, and analytics). The parties
                that set these third-party cookies can recognize your computer
                both when it visits the website in question and also when it
                visits the website in question and also when it visits certain
                other websites.
              </p>

              <h3>Why do we use cookies?</h3>
              <p>
                We use first-party and third-party cookies for several reasons.
                Some cookies are required for technical reasons in order for our
                website to operate, and we refer to these as
                &quot;essential&quot; or &quot;strictly necessary&quot; cookies.
                Other cookies also enable us to track and target the interests
                of our users to enhance the experience on our website. Third
                parties serve cookies through our website for advertising,
                analytics, and other purposes.
              </p>

              <h3>Types of cookies we use</h3>
              <p>
                The specific types of first and third-party cookies served
                through our website and the purposes they perform are described
                below:
              </p>
            </div>

            <Table className="my-6">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Type of Cookie</TableHead>
                  <TableHead>Purpose</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    Essential Cookies
                  </TableCell>
                  <TableCell>
                    These cookies are strictly necessary to provide you with
                    services available through our website and to use some of
                    its features, such as access to secure areas.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Performance Cookies
                  </TableCell>
                  <TableCell>
                    These cookies are used to enhance the performance and
                    functionality of our website but are non-essential to their
                    use. However, without these cookies, certain functionality
                    may become unavailable.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Analytics Cookies
                  </TableCell>
                  <TableCell>
                    These cookies collect information that is used either in
                    aggregate form to help us understand how our website is
                    being used or how effective our marketing campaigns are, or
                    to help us customize our website for you.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Targeting Cookies
                  </TableCell>
                  <TableCell>
                    These cookies are used to make advertising messages more
                    relevant to you. They perform functions like preventing the
                    same ad from continuously reappearing, ensuring that ads are
                    properly displayed, and in some cases selecting
                    advertisements that are based on your interests.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Social Media Cookies
                  </TableCell>
                  <TableCell>
                    These cookies are used to enable you to share pages and
                    content that you find interesting on our website through
                    third-party social networking and other websites.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="prose max-w-none dark:prose-invert">
              <h3>How can you control cookies?</h3>
              <p>
                You have the right to decide whether to accept or reject
                cookies. You can exercise your cookie preferences by clicking on
                the appropriate opt-out links provided in the cookie table
                above.
              </p>
              <p>
                You can set or amend your web browser controls to accept or
                refuse cookies. If you choose to reject cookies, you may still
                use our website though your access to some functionality and
                areas of our website may be restricted. As the means by which
                you can refuse cookies through your web browser controls vary
                from browser-to-browser, you should visit your browser&apos;s
                help menu for more information.
              </p>

              <h3>How often will we update this Cookie Policy?</h3>
              <p>
                We may update this Cookie Policy from time to time in order to
                reflect, for example, changes to the cookies we use or for other
                operational, legal, or regulatory reasons. Please therefore
                revisit this Cookie Policy regularly to stay informed about our
                use of cookies and related technologies.
              </p>
              <p>
                The date at the top of this Cookie Policy indicates when it was
                last updated.
              </p>

              <h3>Where can you get further information?</h3>
              <p>
                If you have any questions about our use of cookies or other
                technologies, please email us at privacy@EventCraft.com.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
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
            If you have any questions about our cookie practices, please contact
            us.
          </p>
          <Link href="/contact">
            <Button>Contact Us</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
