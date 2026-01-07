import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import NextSteps from "@/components/NextSteps";
import Countdown from "@/components/Countdown";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <NextSteps />
      <section className="py-16 bg-card">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">
            Le compte à rebours est lancé
          </h2>
          <div className="max-w-2xl mx-auto">
            <Countdown />
          </div>
        </div>
      </section>
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
