import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import SectorsSection from "@/components/home/SectorsSection";
import ClientLogos from "@/components/home/ClientLogos";
import ProblemSection from "@/components/home/ProblemSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import SelfDiscoverySection from "@/components/home/SelfDiscoverySection";
import IncentivesCarousel from "@/components/home/IncentivesCarousel";
import CaseStudyTeaser from "@/components/home/CaseStudyTeaser";
import TrustpilotSection from "@/components/home/TrustpilotSection";
import CTASection from "@/components/home/CTASection";
import IndustrialSection from "@/components/home/IndustrialSection";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <SectorsSection />
        <ClientLogos />
        <ProblemSection />
        <HowItWorksSection />
        <IndustrialSection />
        <SelfDiscoverySection />
        <IncentivesCarousel />
        <CaseStudyTeaser />
        <TrustpilotSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
