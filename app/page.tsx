import Navbar from "@/components/shared/navbar";
import Hero from "./_components/hero";
import FeaturedEvent from "./_components/featured-event";
import UpcomingEvents from "./_components/upcoming-events";
import Features from "./_components/features";
import CTA from "./_components/cta";
import Footer from "@/components/shared/footer";
export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <FeaturedEvent />
      <UpcomingEvents />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}
