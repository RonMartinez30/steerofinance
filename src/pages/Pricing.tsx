import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Check, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import { useWaitlist } from "@/contexts/WaitlistContext";

type BillingPeriod = "quarterly" | "annual";

const Pricing = () => {
  const { t } = useTranslation();
  const { openWaitlist } = useWaitlist();
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("quarterly");

  const isAnnual = billingPeriod === "annual";
  const monthlyPrice = 8.0;
  const annualPrice = 6.0;
  const discountPercent = 25;

  const quarterlyTotal = (monthlyPrice * 3).toFixed(2).replace(".", ",");
  const annualTotal = 72;
  const annualSavings = 24;

  const getPrice = () =>
    isAnnual
      ? `${annualPrice.toFixed(2).replace(".", ",")}€`
      : `${monthlyPrice.toFixed(2).replace(".", ",")}€`;

  const getOriginalPrice = () =>
    isAnnual ? `${monthlyPrice.toFixed(2).replace(".", ",")}€` : null;

  const getTotalBilled = () =>
    isAnnual ? `${annualTotal},00€` : `${quarterlyTotal}€`;

  const features = [
    t("pricing.feature1"),
    t("pricing.feature2"),
    t("pricing.feature3"),
    t("pricing.feature4"),
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={t("pricing.seoTitle")}
        description={t("pricing.seoDescription")}
      />
      <Header />

      {/* Hero épuré + carte premium */}
      <main className="relative pt-32 pb-24 overflow-hidden">
        {/* Soft background ambience */}
        <div className="absolute inset-0 bg-hero-gradient -z-10" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-6">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center mb-14"
          >
            <h1
              className="text-5xl md:text-6xl font-normal text-foreground mb-6 leading-[1.1] tracking-tight"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {t("pricing.titlePart1")}{" "}
              <span className="italic text-primary">
                {t("pricing.titleHighlight")}
              </span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {t("pricing.subtitle")}
            </p>
          </motion.div>

          {/* Billing toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex justify-center mb-10"
          >
            <div className="inline-flex items-center gap-1 bg-card border border-border rounded-full p-1 shadow-soft">
              <button
                onClick={() => setBillingPeriod("quarterly")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  !isAnnual
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t("pricing.quarterly")}
              </button>
              <button
                onClick={() => setBillingPeriod("annual")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  isAnnual
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t("pricing.annual")}
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    isAnnual
                      ? "bg-background/15 text-background"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  −{discountPercent}%
                </span>
              </button>
            </div>
          </motion.div>

          {/* Premium pricing card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="max-w-lg mx-auto"
          >
            <div className="relative bg-card border border-border rounded-3xl p-8 md:p-10 shadow-card">
              {/* Top accent */}
              <div className="absolute -top-px left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                  {t("pricing.planName")}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  <Sparkles className="w-3 h-3" />
                  {t("pricing.founderTitle")}
                </span>
              </div>

              {/* Price */}
              <div className="mb-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={billingPeriod}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-baseline gap-2"
                  >
                    <span
                      className="text-6xl md:text-7xl text-foreground tracking-tight"
                      style={{ fontFamily: "'DM Serif Display', serif" }}
                    >
                      {getPrice()}
                    </span>
                    {getOriginalPrice() && (
                      <span className="text-xl line-through text-muted-foreground/60">
                        {getOriginalPrice()}
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground ml-1">
                      /{t("pricing.perMonth")}
                    </span>
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={`billing-${billingPeriod}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-muted-foreground mt-3"
                  >
                    {isAnnual
                      ? t("pricing.billedAnnually")
                      : t("pricing.billedQuarterly")}{" "}
                    · {t("pricing.totalBilled")} {getTotalBilled()}
                    {isAnnual && (
                      <span className="text-primary font-medium">
                        {" "}
                        — {t("pricing.savings")} {annualSavings},00€
                      </span>
                    )}
                  </motion.p>
                </AnimatePresence>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {t("pricing.description")}
              </p>

              {/* Feature list */}
              <ul className="space-y-3 mb-8">
                {features.map((feat, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                    className="flex items-start gap-3 text-sm text-foreground"
                  >
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-primary" strokeWidth={3} />
                    </span>
                    {feat}
                  </motion.li>
                ))}
              </ul>

              {/* Early Adopters — refined */}
              <div className="mb-8 rounded-2xl border border-primary/15 bg-primary/5 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                    {t("pricing.earlyBadge")} · 200 places
                  </span>
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed">
                  {t("pricing.earlyText1")}
                </p>
              </div>

              <Button
                onClick={openWaitlist}
                size="lg"
                className="w-full rounded-full group"
              >
                {t("pricing.cta")}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>14 jours d'essai · Sans carte bancaire</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Plan Impact */}
      <section className="py-20 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-8">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3 inline-block">
                {t("pricing.impactName")}
              </span>
              <h2
                className="text-3xl md:text-4xl text-foreground"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {t("pricing.impactTitle")}
              </h2>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 space-y-4 text-muted-foreground text-sm leading-relaxed shadow-soft">
              <p>
                {t("pricing.impactIntro")}{" "}
                <span className="font-semibold text-foreground">
                  {t("pricing.impactName")}
                </span>
                .
              </p>
              <p>{t("pricing.impactLimited")}</p>
              <p>
                {t("pricing.impactEligibility")}{" "}
                <span className="font-semibold text-foreground">
                  {t("pricing.impactDiscount")}
                </span>{" "}
                {t("pricing.impactDuration")}
              </p>
              <p>{t("pricing.impactReview")}</p>
              <p className="font-medium text-foreground">
                {t("pricing.impactGoal")}
              </p>
              <div className="pt-3 text-center">
                <a
                  href="https://www.notion.so/68ab0233fa764fee9a8845d05af589e7?v=319020d992408096af72000cb7be3444&source=copy_link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="rounded-full">
                    {t("pricing.impactCta")}
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mx-auto"
          >
            <h2
              className="text-3xl md:text-4xl text-foreground mb-3"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {t("pricing.faqTitle")}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t("pricing.faqDescription")}
            </p>
            <Link to="/faq">
              <Button variant="outline" className="rounded-full group">
                {t("pricing.faqCta")}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
