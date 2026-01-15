import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";

interface FAQItem {
  question: string;
  answer: string;
  highlighted?: boolean;
}

interface FAQSection {
  title: string;
  colorClass: string;
  items: FAQItem[];
}

const FAQ = () => {
  const { t } = useTranslation();

  const faqSections: FAQSection[] = [{
    title: t('faq.sections.understand.title'),
    colorClass: "bg-blue-50/50 border-l-4 border-l-blue-400",
    items: [{
      question: t('faq.sections.understand.q1.question'),
      answer: t('faq.sections.understand.q1.answer')
    }, {
      question: t('faq.sections.understand.q2.question'),
      answer: t('faq.sections.understand.q2.answer'),
      highlighted: true
    }, {
      question: t('faq.sections.understand.q3.question'),
      answer: t('faq.sections.understand.q3.answer')
    }]
  }, {
    title: t('faq.sections.howItWorks.title'),
    colorClass: "bg-emerald-50/50 border-l-4 border-l-emerald-400",
    items: [{
      question: t('faq.sections.howItWorks.q1.question'),
      answer: t('faq.sections.howItWorks.q1.answer'),
      highlighted: true
    }, {
      question: t('faq.sections.howItWorks.q2.question'),
      answer: t('faq.sections.howItWorks.q2.answer')
    }, {
      question: t('faq.sections.howItWorks.q3.question'),
      answer: t('faq.sections.howItWorks.q3.answer')
    }]
  }, {
    title: t('faq.sections.security.title'),
    colorClass: "bg-amber-50/50 border-l-4 border-l-amber-400",
    items: [{
      question: t('faq.sections.security.q1.question'),
      answer: t('faq.sections.security.q1.answer'),
      highlighted: true
    }, {
      question: t('faq.sections.security.q2.question'),
      answer: t('faq.sections.security.q2.answer')
    }]
  }, {
    title: t('faq.sections.access.title'),
    colorClass: "bg-violet-50/50 border-l-4 border-l-violet-400",
    items: [{
      question: t('faq.sections.access.q1.question'),
      answer: t('faq.sections.access.q1.answer')
    }, {
      question: t('faq.sections.access.q2.question'),
      answer: t('faq.sections.access.q2.answer')
    }, {
      question: t('faq.sections.access.q3.question'),
      answer: t('faq.sections.access.q3.answer')
    }, {
      question: t('faq.sections.access.q4.question'),
      answer: t('faq.sections.access.q4.answer')
    }]
  }];

  return <div className="min-h-screen">
      <SEO
        title="FAQ - Questions sur la gestion de budget"
        description="Toutes les réponses à vos questions sur Steero. Comment bien gérer son argent ? Pourquoi Steero est mieux qu'Excel pour votre budget ? Découvrez notre approche comportementale unique."
        keywords="faq gestion budget, questions finances personnelles, comment gérer son argent, steero faq, application budget questions"
        canonical="/faq"
      />
      <Header />
      <main className="pt-32 pb-16 bg-hero-gradient">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
              {/* Left side - Sticky */}
              <div className="lg:w-1/3">
                <div className="lg:sticky lg:top-1/3 lg:-translate-y-1/4">
                  <motion.div initial={{
                  opacity: 0,
                  y: 20
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  duration: 0.6
                }}>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
                      {t('faq.title')}
                    </h1>
                    
                    <div className="space-y-2 text-muted-foreground">
                      <p className="text-sm uppercase tracking-wide font-medium">{t('faq.noAnswer')}</p>
                      <p className="text-base">{t('faq.discoverHow')}</p>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 max-w-xs">
                      <Link to="/pourquoi-steero" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90 group">
                        {t('faq.discoverApproach')}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                      <a href="#waitlist" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border bg-card text-foreground font-medium transition-all hover:bg-muted">
                        {t('faq.joinWaitlist')}
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Right side - Scrollable FAQ */}
              <div className="lg:w-2/3">
                <div className="space-y-10">
                  {faqSections.map((section, sectionIndex) => <motion.div key={sectionIndex} initial={{
                  opacity: 0,
                  y: 30
                }} whileInView={{
                  opacity: 1,
                  y: 0
                }} viewport={{
                  once: true
                }} transition={{
                  duration: 0.5,
                  delay: sectionIndex * 0.1
                }}>
                      <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        {section.title}
                      </h2>
                      <div className={`rounded-xl ${section.colorClass} p-1`}>
                        <Accordion type="single" collapsible className="space-y-1">
                          {section.items.map((item, itemIndex) => <AccordionItem key={itemIndex} value={`section-${sectionIndex}-item-${itemIndex}`} className="bg-card rounded-lg px-5 py-0 border-none shadow-sm transition-colors duration-200 hover:bg-muted/50 data-[state=open]:bg-card">
                              <AccordionTrigger className="text-left text-foreground font-semibold hover:no-underline py-3 text-[15px]">
                                <span className="flex items-center gap-2">
                                  {item.highlighted && <span className="text-amber-500" title="Question importante">🔑</span>}
                                  {item.question}
                                </span>
                              </AccordionTrigger>
                              <AccordionContent className="text-muted-foreground/80 whitespace-pre-line text-sm pb-4 pt-0">
                                {item.answer}
                              </AccordionContent>
                            </AccordionItem>)}
                        </Accordion>
                      </div>
                    </motion.div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
};
export default FAQ;