import Link from "next/link";
import { Calendar, Mail, Phone, MapPin } from "lucide-react";
import Container from "./container";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <Container className="py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl text-primary">EventCraft</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your all-in-one platform for event planning and participation.
              Create, join, and celebrate together.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@eventcraft.com</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+8801540581443</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} EventCraft. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
