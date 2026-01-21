import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const Pricing = () => {
  const { t } = useTranslation();

  const plans = [
    {
      name: t("pricing.free.name"),
      price: "0€",
      period: t("pricing.perMonth"),
      description: t("pricing.free.description"),
      features: [
        t("pricing.free.feature1"),
        t("pricing.free.feature2"),
        t("pricing.free.feature3"),
        t("pricing.free.feature4"),
      ],
      cta: t("pricing.free.cta"),
      highlighted: false,
    },
    {
      name: t("pricing.pro.name"),
      price: "9€",
      period: t("pricing.perMonth"),
      description: t("pricing.pro.description"),
      features: [
        t("pricing.pro.feature1"),
        t("pricing.pro.feature2"),
        t("pricing.pro.feature3"),
        t("pricing.pro.feature4"),
        t("pricing.pro.feature5"),
      ],
      cta: t("pricing.pro.cta"),
      highlighted: true,
    },
    {
      name: t("pricing.family.name"),
      price: "14€",
      period: t("pricing.perMonth"),
      description: t("pricing.family.description"),
      features: [
        t("pricing.family.feature1"),
        t("pricing.family.feature2"),
        t("pricing.family.feature3"),
        t("pricing.family.feature4"),
        t("pricing.family.feature5"),
      ],
      cta: t("pricing.family.cta"),
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={t("pricing.seoTitle")}
        description={t("pricing.seoDescription")}
      />
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t("pricing.title")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("pricing.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground shadow-2xl scale-105"
                    : "bg-card border border-border"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-sm font-semibold px-4 py-1 rounded-full">
                    {t("pricing.popular")}
                  </div>
                )}

                <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? "text-primary-foreground" : "text-foreground"}`}>
                  {plan.name}
                </h3>

                <div className="mb-4">
                  <span className={`text-4xl font-bold ${plan.highlighted ? "text-primary-foreground" : "text-foreground"}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    /{plan.period}
                  </span>
                </div>

                <p className={`text-sm mb-6 ${plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 shrink-0 mt-0.5 ${plan.highlighted ? "text-primary-foreground" : "text-primary"}`} />
                      <span className={`text-sm ${plan.highlighted ? "text-primary-foreground/90" : "text-foreground"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full rounded-full ${
                    plan.highlighted
                      ? "bg-white text-primary hover:bg-white/90"
                      : "btn-primary"
                  }`}
                >
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t("pricing.faqTitle")}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t("pricing.faqDescription")}
            </p>
            <Link to="/faq">
              <Button variant="outline" className="rounded-full">
                {t("pricing.faqCta")}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
