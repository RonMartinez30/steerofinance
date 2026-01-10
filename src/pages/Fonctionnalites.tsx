import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  UserCircle, 
  Wallet, 
  CalendarClock, 
  Receipt, 
  Gauge, 
  Target, 
  BarChart3,
  ArrowRight
} from "lucide-react";

const features = [
  {
    icon: UserCircle,
    title: "Parcours d'initialisation",
    description: "Guide pour compléter le profil",
    details: "Un parcours guidé et intuitif pour configurer ton profil financier. Étape par étape, tu définis tes objectifs, tes revenus et tes priorités pour que Steero s'adapte parfaitement à ta situation.",
  },
  {
    icon: Wallet,
    title: "Gestion du budget",
    description: "Plusieurs niveaux de catégorie, évolutif et mensuel",
    details: "Organise tes finances avec un système de catégories hiérarchiques. Ton budget évolue avec toi, s'adapte à chaque mois et te permet d'affiner ta gestion au fil du temps.",
  },
  {
    icon: CalendarClock,
    title: "Gestion des transactions fixes",
    description: "Une vision exhaustive de tous les revenus et dépenses fixes avec date de transaction",
    details: "Centralise tous tes prélèvements, abonnements et revenus récurrents. Visualise clairement ce qui rentre et ce qui sort chaque mois, avec les dates exactes de chaque transaction.",
  },
  {
    icon: Receipt,
    title: "Gestion des transactions du quotidien",
    description: "Les modèles de transactions pré-renseignés facilitent la gestion manuelle",
    details: "Gagne du temps grâce aux modèles de transactions personnalisables. Tes achats récurrents sont pré-renseignés pour une saisie rapide et sans friction.",
  },
  {
    icon: Gauge,
    title: "Le Niveau",
    description: "Jauge budgétaire dynamique",
    details: "Lors de chaque saisie, visualise instantanément : ce qui a déjà été dépensé, ce que représente la dépense en cours, et ce qu'il te restera disponible dans ton budget. Une prise de décision éclairée en temps réel.",
  },
  {
    icon: Target,
    title: "Suivi des rituels",
    description: "Pensé comme un habit tracker pour suivre la régularité",
    details: "Un système de rituels qui te guide sur ce que tu dois faire, regarder, et quelles questions te poser. Suis ta régularité et développe des habitudes financières durables pour pouvoir ajuster ta trajectoire.",
  },
  {
    icon: BarChart3,
    title: "Indicateurs et visuels ludiques",
    description: "T'aider à la prise de décision avec des éléments factuels",
    details: "Des visualisations claires et engageantes qui transforment tes données en insights actionnables. Comprends rapidement ta situation grâce à des indicateurs pensés pour faciliter tes décisions.",
  },
];

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
              Chaque outil de Steero a été conçu pour t'aider à comprendre, maîtriser et ritualiser ta gestion budgétaire.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 md:gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row gap-8 items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Icon Card */}
                <div className="w-full md:w-1/3 flex justify-center">
                  <div className="w-32 h-32 rounded-3xl bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-16 h-16 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-2/3 text-center md:text-left">
                  <span className="inline-block text-sm font-medium text-primary mb-2">
                    0{index + 1}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                    {feature.title}
                  </h2>
                  <p className="text-lg font-medium text-primary/80 mb-4">
                    {feature.description}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.details}
                  </p>
                </div>
              </motion.div>
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
