import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Differentiation from "@/components/Differentiation";
import NextSteps from "@/components/NextSteps";
import Countdown from "@/components/Countdown";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
const Index = () => {
  return <div className="min-h-screen">
      <Header />
      <Hero />
      <HowItWorks />
      <Differentiation />
      <NextSteps />
      <CTA />
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary">
            Le compte à rebours est lancé
          </h2>
          <div className="max-w-2xl mx-auto">
            <Countdown />
          </div>
        </div>
      </section>
      <Footer />
    </div>;
};
export default Index;