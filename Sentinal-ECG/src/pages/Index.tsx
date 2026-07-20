import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { EmergencyWorkflowSection } from "@/components/home/EmergencyWorkflowSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <EmergencyWorkflowSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
