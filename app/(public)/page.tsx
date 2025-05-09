import Hero from "./_components/hero";
import FeaturedEvent from "./_components/featured-event";
import UpcomingEvents from "./_components/upcoming-events";
import Features from "./_components/features";
import CTA from "./_components/cta";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedEvent />
      <UpcomingEvents />
      <Features />
      <CTA />
    </div>
  );
}
