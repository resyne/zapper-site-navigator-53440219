import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import SectorsSection from "@/components/home/SectorsSection";
import ClientLogos from "@/components/home/ClientLogos";
import ProblemSection from "@/components/home/ProblemSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import SelfDiscoverySection from "@/components/home/SelfDiscoverySection";
import CaseStudyTeaser from "@/components/home/CaseStudyTeaser";
import TrustpilotSection from "@/components/home/TrustpilotSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <SectorsSection />
        <ClientLogos />
        <ProblemSection />
        <HowItWorksSection />
        <SelfDiscoverySection />
        <CaseStudyTeaser />
        <TrustpilotSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
