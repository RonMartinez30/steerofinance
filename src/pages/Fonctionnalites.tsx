import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const features = [
  {
    emoji: "🧭",
    title: "Parcours d'initialisation",
    details: "Un parcours guidé et intuitif pour configurer ton profil financier. Étape par étape, tu définis tes objectifs, tes revenus et tes priorités pour que Steero s'adapte parfaitement à ta situation.",
    color: "from-amber-400 to-orange-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-700",
  },
  {
    emoji: "💰",
    title: "Gestion du budget",
    details: "Organise tes finances avec un système de catégories hiérarchiques. Ton budget évolue avec toi, s'adapte à chaque mois et te permet d'affiner ta gestion au fil du temps.",
    color: "from-orange-400 to-red-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-700",
  },
  {
    emoji: "📅",
    title: "Transactions fixes",
    details: "Centralise tous tes prélèvements, abonnements et revenus récurrents. Visualise clairement ce qui rentre et ce qui sort chaque mois, avec les dates exactes de chaque transaction.",
    color: "from-rose-400 to-pink-500",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
    textColor: "text-rose-700",
  },
  {
    emoji: "🧾",
    title: "Transactions du quotidien",
    details: "Gagne du temps grâce aux modèles de transactions personnalisables. Tes achats récurrents sont pré-renseignés pour une saisie rapide et sans friction.",
    color: "from-red-400 to-orange-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-700",
  },
  {
    emoji: "📊",
    title: "Le Niveau",
    details: "Lors de chaque saisie, visualise instantanément : ce qui a déjà été dépensé, ce que représente la dépense en cours, et ce qu'il te restera disponible dans ton budget.",
    color: "from-yellow-400 to-amber-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    textColor: "text-yellow-700",
  },
  {
    emoji: "🎯",
    title: "Suivi des rituels",
    details: "Un système de rituels qui te guide sur ce que tu dois faire, regarder, et quelles questions te poser. Développe des habitudes financières durables.",
    color: "from-orange-500 to-rose-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-700",
  },
  {
    emoji: "✨",
    title: "Indicateurs ludiques",
    details: "Des visualisations claires et engageantes qui transforment tes données en insights actionnables. Comprends rapidement ta situation grâce à des indicateurs pensés pour faciliter tes décisions.",
    color: "from-amber-500 to-yellow-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-700",
  },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onClick={() => setIsOpen(!isOpen)}
      className={`cursor-pointer rounded-2xl border-2 ${feature.borderColor} ${feature.bgColor} p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}
    >
      <div className="flex items-center gap-4">
        <div className={`text-4xl md:text-5xl`}>
          {feature.emoji}
        </div>
        <h3 className={`text-lg md:text-xl font-semibold ${feature.textColor}`}>
          {feature.title}
        </h3>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-muted-foreground leading-relaxed pt-4 border-t border-current/10">
              {feature.details}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className={`mt-3 text-center ${feature.textColor} opacity-50`}
      >
        <span className="text-sm">
          {isOpen ? "▲" : "▼"}
        </span>
      </motion.div>
    </motion.div>
  );
};

const Fonctionnalites = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Des fonctionnalités pensées pour ton autonomie financière
            </h1>
            <p className="text-lg text-muted-foreground">
              Clique sur une carte pour en savoir plus
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Prêt à reprendre le contrôle ?
            </h2>
            <p className="text-muted-foreground mb-8">
              Rejoins la liste d'attente pour être parmi les premiers à découvrir Steero.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group">
                <a href="/#cta">
                  Rejoindre la liste d'attente
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/pourquoi-steero">
                  Découvrir l'approche Steero
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Fonctionnalites;
