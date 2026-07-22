import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ValuePropSection } from '@/components/sections/ValuePropSection';
import { TrustBanner } from '@/components/sections/TrustBanner';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { DeliverabilitySection } from '@/components/sections/DeliverabilitySection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { WhoIsItForSection } from '@/components/sections/WhoIsItForSection';
import { WhyBuildingSection } from '@/components/sections/WhyBuildingSection';
import { RoadmapSection } from '@/components/sections/RoadmapSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { WaitlistSection } from '@/components/sections/WaitlistSection';
import { usePageViewTracker, useScrollDepthTracker } from '@/hooks/useAnalytics';

export const LandingPage: React.FC = () => {
  usePageViewTracker();
  useScrollDepthTracker();

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      <main>
        <HeroSection />
        <ValuePropSection />
        <TrustBanner />
        <ProblemSection />
        <FeaturesSection />
        <DeliverabilitySection />
        <HowItWorksSection />
        <WhoIsItForSection />
        <WhyBuildingSection />
        <RoadmapSection />
        <FAQSection />
        <WaitlistSection />
      </main>
      <Footer />
    </div>
  );
};
