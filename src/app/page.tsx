
import Image from "next/image";
import AppLayout from "@/components/ui/layout";
import HeroSection from "@/components/ui/HeroSection/HeroSection";
import EventSection from "@/components/ui/eventsSection/eventSection";
import HowItWorksSection from "@/components/ui/HowItWorks/howItworks";
import TeamSection from "@/components/ui/TeamSection/TeamSection";
import CTASection from "@/components/ui/CTASection/CTA";
import FAQSection from "@/components/ui/FAQSection/FAQ";
import PricingSection from "@/components/ui/PricingSection/PricingSection";
import IntegrationsSection from "@/components/ui/IntegrationsSection/IntegrationsSection";
import TestimonialsSection from "@/components/ui/Testmonial/Testmonial";
import FeaturesSection from "@/components/ui/FeaturesSection/FeaturesSection";

export default function Home() {
  return (
    <AppLayout>
      <HeroSection/>
      <EventSection />
      <FeaturesSection />
      <HowItWorksSection/>
      <PricingSection/>
      <FAQSection/>
      <TestimonialsSection/>
      <CTASection/>
      <TeamSection/>
    </AppLayout>
  );
}



