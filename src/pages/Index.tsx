import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RealProblem from "@/components/RealProblem";
import HowItWorks from "@/components/HowItWorks";
import WhySteero from "@/components/WhySteero";
import Differentiation from "@/components/Differentiation";
import FreeResources from "@/components/FreeResources";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <RealProblem />
      <HowItWorks />
      <WhySteero />
      <Differentiation />
      <FreeResources />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;