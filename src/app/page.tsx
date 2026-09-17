import { BeforeAfter } from "@/components/BeforeAfter";
import { Faq } from "@/components/Faq";
import { FinalCTA } from "@/components/FinalCTA";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { InAction } from "@/components/InAction";
import { QuoteForm } from "@/components/QuoteForm";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { TrustBar } from "@/components/TrustBar";
import { WhyDownSouth } from "@/components/WhyDownSouth";

/**
 * The whole site, in reading order.
 *
 * Section order is deliberate: proof sits high (the hero carries a real
 * before/after), the services explain the offer, then the galleries carry the
 * trust, then the form, then the closer. Draft flags live inside the sections
 * that need them.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <BeforeAfter />
      <InAction />
      <HowItWorks />
      <QuoteForm />
      <WhyDownSouth />
      <Testimonials />
      <Faq />
      <FinalCTA />
    </>
  );
}