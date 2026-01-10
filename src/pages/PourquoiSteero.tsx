import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Check, Star, Brain, Eye, RefreshCw, Pencil, BookOpen, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
const alternatives = [{
  icon: "❌",
  title: "Excel dispersé",
  description: "Formules cassées, suivi irrégulier."
}, {
  icon: "❌",
  title: "Apps bancaires",
  description: "Beaucoup de données, peu de décisions."
}, {
  icon: "❌",
  title: "Notion bricolé",
  description: "Puissant mais fragile."
}, {
  icon: "✅",
  title: "Steero",
  description: "Un cadre simple, pensé pour durer.",
  highlight: true
}];
const testimonials = [{
  quote: "Steero m'a permis de comprendre enfin où partait mon argent. En 3 mois, j'ai économisé plus que jamais.",
  author: "Marie L.",
  role: "Freelance"
}, {
  quote: "La saisie manuelle semblait contraignante au début, mais c'est devenu un rituel qui m'aide vraiment à réfléchir.",
  author: "Thomas D.",
  role: "Cadre"
}, {
  quote: "Simple, efficace, sans prise de tête. Exactement ce dont j'avais besoin pour reprendre le contrôle.",
  author: "Sophie M.",
  role: "Enseignante"
}];
interface BehavioralElement {
  icon: typeof Brain;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  reference: string;
  bgColor: string;
  borderColor: string;
}

const behavioralElements: BehavioralElement[] = [{
  icon: Brain,
  emoji: "🧠",
  title: "La compréhension naît de l'effort cognitif",
  subtitle: "Pas de la simple exposition à l'information",
  description: "Le cerveau apprend durablement lorsqu'il est actif, pas passif. L'enregistrement manuel oblige à identifier la dépense, la catégoriser, la comparer à une intention et l'assumer consciemment. Automatiser supprime l'effort cognitif, donc la compréhension profonde.",
  reference: "Chi et Wylie – The ICAP Framework",
  bgColor: "bg-primary/5",
  borderColor: "border-primary/20",
}, {
  icon: Eye,
  emoji: "👁️",
  title: "L'automatisation crée une illusion de contrôle",
  subtitle: "Sans maîtrise réelle",
  description: "\"Mes comptes sont connectés\", \"Mes dépenses sont catégorisées\"… Mais l'utilisateur ne sait pas expliquer où va son argent, ni pourquoi il dévie de ses objectifs. L'automatisation déplace la responsabilité vers l'outil, pas vers l'utilisateur.",
  reference: "Parasuraman & Riley – Humans and Automation",
  bgColor: "bg-secondary",
  borderColor: "border-primary/15",
}, {
  icon: RefreshCw,
  emoji: "🔄",
  title: "Le rituel transforme la finance en comportement",
  subtitle: "Pas en donnée",
  description: "Ritualiser permet d'ancrer une routine consciente, de créer un point de contact régulier avec la réalité financière et de transformer une contrainte abstraite en pratique tangible. Les micro-rituels sont plus efficaces que les bilans occasionnels automatisés.",
  reference: "BJ Fogg – Behavior Model",
  bgColor: "bg-card",
  borderColor: "border-border",
}, {
  icon: Pencil,
  emoji: "✏️",
  title: "L'enregistrement manuel crée un lien émotionnel",
  subtitle: "Clé de la décision",
  description: "Une dépense enregistrée manuellement déclenche une micro-évaluation émotionnelle, rend le coût psychologiquement réel et renforce la mémoire de la décision. Sans friction minimale, il n'y a ni prise de conscience, ni arbitrage réel.",
  reference: "Baumeister & Vohs – Self-regulation",
  bgColor: "bg-primary/5",
  borderColor: "border-primary/20",
}, {
  icon: BookOpen,
  emoji: "📖",
  title: "Automatiser trop tôt empêche l'apprentissage",
  subtitle: "Erreur classique des apps financières",
  description: "L'automatisation est utile après la compréhension, pas avant. Dans la majorité des apps, l'utilisateur est bombardé de données sans cadre mental ni pédagogie. Résultat : abandon rapide, consultation passive, aucune progression réelle.",
  reference: "Sweller – Cognitive Load Theory",
  bgColor: "bg-secondary",
  borderColor: "border-primary/15",
}];

// Animated visual for each behavioral element
const BehavioralAnimation = ({ element, isOpen }: { element: BehavioralElement; isOpen: boolean }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isOpen) { setStep(0); return; }
    const interval = setInterval(() => {
      setStep(s => (s + 1) % 4);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const Icon = element.icon;

  return (
    <div className="flex items-center justify-center py-4">
      <motion.div
        animate={{
          scale: step === 2 ? 1.1 : 1,
          rotate: step === 1 ? [0, -5, 5, 0] : 0,
        }}
        transition={{ duration: 0.5 }}
        className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center"
      >
        <Icon className="w-8 h-8 text-primary" />
      </motion.div>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ 
          width: step >= 1 ? 60 : 0, 
          opacity: step >= 1 ? 1 : 0 
        }}
        transition={{ duration: 0.4 }}
        className="h-0.5 bg-gradient-to-r from-primary/40 to-primary mx-2"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: step >= 2 ? 1 : 0, 
          opacity: step >= 2 ? 1 : 0 
        }}
        transition={{ duration: 0.3, type: "spring" }}
        className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center"
      >
        <Check className="w-5 h-5 text-primary" />
      </motion.div>
    </div>
  );
};

// Behavioral card component
const BehavioralCard = ({
  element,
  index,
  isOpen,
  onToggle,
  isExplored,
}: {
  element: BehavioralElement;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isExplored: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={onToggle}
      className={`
        relative rounded-2xl border cursor-pointer transition-all duration-300
        ${element.bgColor} ${element.borderColor}
        ${isOpen ? 'shadow-card ring-2 ring-primary/20' : 'shadow-soft hover:shadow-card'}
        ${isExplored && !isOpen ? 'saturate-[0.7] opacity-90' : ''}
      `}
    >
      {/* Explored badge */}
      <AnimatePresence>
        {isExplored && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -5 }}
            className="absolute -top-2 -right-2 z-10"
          >
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20">
              ✓ Lu
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Emoji with explored indicator */}
          <div className="relative flex-shrink-0">
            <div className={`
              w-14 h-14 rounded-xl flex items-center justify-center text-2xl
              ${isOpen ? 'bg-primary/15' : 'bg-primary/10'}
              transition-all duration-300
            `}>
              {element.emoji}
            </div>
            <AnimatePresence>
              {isExplored && !isOpen && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-primary-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-foreground leading-tight">
                  {index + 1}. {element.title}
                </h3>
                <p className="text-sm text-primary font-medium mt-0.5">
                  {element.subtitle}
                </p>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 mt-1"
              >
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-border/50">
                {/* Animation */}
                <BehavioralAnimation element={element} isOpen={isOpen} />

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {element.description}
                </p>

                {/* Reference */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground/70 bg-muted/50 rounded-lg px-3 py-2">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="italic">Référence : {element.reference}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
const PourquoiSteero = () => {
  const [openCardIndex, setOpenCardIndex] = useState<number | null>(null);
  const [exploredCards, setExploredCards] = useState<Set<number>>(new Set());

  const handleToggleCard = (index: number) => {
    if (openCardIndex !== index) {
      setExploredCards(prev => new Set(prev).add(index));
    }
    setOpenCardIndex(prev => prev === index ? null : index);
  };

  return <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-hero-gradient overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.7,
            ease: "easeOut"
          }} className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Pourquoi choisir <span className="text-gradient">Steero</span> ?
            </motion.h1>
            <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.7,
            delay: 0.2,
            ease: "easeOut"
          }} className="text-lg text-muted-foreground mb-8">
              Une approche différente de la gestion financière, basée sur la compréhension, la régularité et le
              changement durable.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }}>
                <h2 className="text-3xl font-bold text-foreground mb-4">Notre mission</h2>
                <p className="text-muted-foreground mb-4">
                  Steero est né d'un constat simple : les applications de finances personnelles automatisent tout, mais
                  ne changent rien à tes comportements.
                </p>
                <p className="text-muted-foreground mb-6">
                  Notre mission est de t'aider à développer une véritable compréhension de ta gestion financière, pas
                  simplement un outil pour consulter des graphiques générés automatiquement.
                </p>
                <ul className="space-y-3">
                  {["Comprends et ajuste tes décisions", "Créé des habitudes durables", "Atteinds tes objectifs"].map((item, i) => <motion.li key={i} initial={{
                  opacity: 0,
                  x: -20
                }} whileInView={{
                  opacity: 1,
                  x: 0
                }} viewport={{
                  once: true
                }} transition={{
                  duration: 0.4,
                  delay: 0.3 + i * 0.1
                }} className="flex items-center gap-3 text-foreground">
                        <Check className="w-5 h-5 text-primary" />
                        {item}
                      </motion.li>)}
                </ul>
              </motion.div>
              <motion.div initial={{
              opacity: 0,
              x: 30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6,
              delay: 0.2
            }} className="bg-primary/5 rounded-3xl p-8">
                <blockquote className="text-xl italic text-foreground">"La vraie liberté financière vient de la compréhension, qui naît et se renforce par l'action et non par l'automatisation."</blockquote>
                <p className="mt-4 text-muted-foreground">L'équipe Steero</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparaison alternatives */}
      <section className="py-16 bg-hero-gradient">
        <div className="container mx-auto px-6">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5
        }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Tu as peut-être déjà essayé...</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Des solutions qui promettent beaucoup, mais qui ne changent pas vraiment tes habitudes.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {alternatives.map((alt, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.5,
            delay: index * 0.15,
            ease: "easeOut"
          }} className={`text-center p-6 rounded-2xl transition-all ${alt.highlight ? "bg-primary text-primary-foreground shadow-lg scale-105" : "bg-card border border-border/50"}`}>
                <span className="text-3xl mb-3 block">{alt.icon}</span>
                <h3 className={`font-semibold mb-2 ${alt.highlight ? "text-primary-foreground" : "text-foreground"}`}>
                  {alt.title}
                </h3>
                <p className={`text-sm ${alt.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {alt.description}
                </p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Éléments comportementaux */}
      <section id="fondements-comportementaux" className="py-20 bg-primary/5 scroll-mt-40">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-card border border-border mb-4">
                🧠 Approche scientifique
              </span>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Les fondements comportementaux de Steero
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Steero aide chacun à piloter consciemment sa trajectoire financière, plutôt que de la subir.
              </p>
              
              {/* Progress indicator */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground"
              >
                <span className="text-primary font-medium">{exploredCards.size}</span>
                <span>/</span>
                <span>{behavioralElements.length} principes explorés</span>
                {exploredCards.size === behavioralElements.length && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-2 text-primary"
                  >
                    ✓ Complet !
                  </motion.span>
                )}
              </motion.div>
            </motion.div>
            
            <div className="space-y-4">
              {behavioralElements.map((element, index) => (
                <BehavioralCard
                  key={index}
                  element={element}
                  index={index}
                  isOpen={openCardIndex === index}
                  onToggle={() => handleToggleCard(index)}
                  isExplored={exploredCards.has(index)}
                />
              ))}
            </div>
            
            {/* Hint text */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-center text-sm text-muted-foreground mt-8"
            >
              Clique sur chaque principe pour en découvrir le détail
            </motion.p>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 bg-hero-gradient">
        <div className="container mx-auto px-6">
          <motion.h2 initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5
        }} className="text-3xl font-bold text-center mb-12 text-primary">
            Ce qu'on aimerait que nos utilisateurs disent de Steero
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: index * 0.15
          }} className="bg-card rounded-2xl p-6 shadow-card">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
                </div>
                <p className="text-foreground mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            <h2 className="text-3xl font-bold text-foreground mb-4">Prêt à transformer ta relation à l'argent ?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Rejoins Steero et commence 2026 dans les meilleurs dispositions</p>
            <motion.button whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.98
          }} className="btn-primary group">
              Je m'inscris à la liste d'attente
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default PourquoiSteero;