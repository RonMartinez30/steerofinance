import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RealProblem from "@/components/RealProblem";
import HowItWorks from "@/components/HowItWorks";
import WhySteero from "@/components/WhySteero";
import Differentiation from "@/components/Differentiation";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Steero",
    url: "https://steerofinance.lovable.app",
    logo: "https://steerofinance.lovable.app/og-image.png",
    description:
      "Steero est un système de pilotage actif des finances personnelles. Il t'aide à reprendre le contrôle de ton argent grâce à des rituels TEMPO simples et durables.",
    sameAs: [],
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Steero",
    url: "https://steerofinance.lovable.app",
    inLanguage: "fr-FR",
  };

  const softwareLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Steero",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "8.00",
      priceCurrency: "EUR",
    },
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Steero — L'app pour bien gérer son argent"
        description="Steero est un système de pilotage actif des finances personnelles. Plus simple qu'Excel, plus efficace que les apps bancaires. Reprends le contrôle de ton argent grâce aux rituels TEMPO."
        keywords="gérer son argent, gestion budget, application budget, alternative excel, finances personnelles, suivi dépenses, rituel financier, TEMPO"
        canonical="/"
        jsonLd={[organizationLd, websiteLd, softwareLd]}
      />
      <Header />
      <Hero />
      <RealProblem />
      <HowItWorks />
      <WhySteero />
      <Differentiation />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
