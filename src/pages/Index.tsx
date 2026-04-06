import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Differentiation from "@/components/Differentiation";
import DiscoverFeatures from "@/components/DiscoverFeatures";
import FreeResources from "@/components/FreeResources";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <HowItWorks />
      <Differentiation />
      <DiscoverFeatures />
      <FreeResources />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;