import Container from "@/components/shared/container";
import { Calendar, CreditCard, Shield } from "lucide-react";

export default function Features() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl mb-2">
            Why Choose EventCraft?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform offers everything you need to create, manage, and
            participate in events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card shadow-sm">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Easy Event Creation</h3>
            <p className="text-muted-foreground">
              Create public or private events with customizable registration
              options in minutes.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card shadow-sm">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Integrated Payments</h3>
            <p className="text-muted-foreground">
              Collect registration fees securely with our built-in payment
              processing system.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card shadow-sm">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Participant Management</h3>
            <p className="text-muted-foreground">
              Approve requests, send invitations, and manage your event
              attendees with ease.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
