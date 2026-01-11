import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Check, Star, Brain, Eye, RefreshCw, Pencil, BookOpen, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { useSoundEffects } from "@/hooks/useSoundEffects";
// Progress sidebar component for behavioral principles
const BehavioralProgressSidebar = ({
  elements,
  activeIndex,
  exploredCards,
  isVisible
}: {
  elements: BehavioralElement[];
  activeIndex: number | null;
  exploredCards: Set<number>;
  isVisible: boolean;
}) => {
  const scrollToCard = (index: number) => {
    const element = document.getElementById(`behavioral-card-${index}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  };
  if (!isVisible) return null;
  return <motion.div initial={{
    opacity: 0,
    x: -20
  }} animate={{
    opacity: 1,
    x: 0
  }} exit={{
    opacity: 0,
    x: -20
  }} transition={{
    duration: 0.4
  }} className="fixed left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3">
      {/* Vertical line background */}
      <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-muted rounded-full" />
      
      {/* Progress line */}
      <motion.div className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-primary rounded-full origin-top" initial={{
      height: 0
    }} animate={{
      height: `${exploredCards.size / elements.length * 100}%`
    }} transition={{
      duration: 0.4,
      ease: "easeOut"
    }} />
      
      {/* Step indicators */}
      {elements.map((element, index) => <button key={index} onClick={() => scrollToCard(index)} className="relative z-10 group flex items-center gap-3">
          {/* Step circle */}
          <motion.div animate={{
        scale: activeIndex === index ? 1.3 : 1,
        backgroundColor: exploredCards.has(index) ? "hsl(var(--primary))" : "hsl(var(--muted))"
      }} transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 300
      }} className="w-4 h-4 rounded-full border-2 border-background shadow-md flex items-center justify-center">
            {exploredCards.has(index) && activeIndex !== index && <motion.div initial={{
          scale: 0
        }} animate={{
          scale: 1
        }} transition={{
          duration: 0.2,
          delay: 0.1
        }}>
                <Check className="w-2.5 h-2.5 text-primary-foreground" />
              </motion.div>}
            {activeIndex === index && <motion.div animate={{
          scale: [1, 1.5, 1]
        }} transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }} className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
          </motion.div>
          
          {/* Label tooltip */}
          <motion.div initial={{
        opacity: 0,
        x: -10
      }} whileHover={{
        opacity: 1,
        x: 0
      }} className="absolute left-8 whitespace-nowrap bg-card px-3 py-1.5 rounded-lg shadow-lg border border-border pointer-events-none max-w-[200px]">
            <span className="text-xs font-medium text-muted-foreground">#{index + 1}</span>
            <span className="mx-1.5 text-muted-foreground/50">·</span>
            <span className="text-xs font-medium text-foreground truncate">{element.emoji}</span>
          </motion.div>
        </button>)}
    </motion.div>;
};
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
  borderColor: "border-primary/20"
}, {
  icon: Eye,
  emoji: "👁️",
  title: "L'automatisation crée une illusion de contrôle",
  subtitle: "Sans maîtrise réelle",
  description: "\"Mes comptes sont connectés\", \"Mes dépenses sont catégorisées\"… Mais l'utilisateur ne sait pas expliquer où va son argent, ni pourquoi il dévie de ses objectifs. L'automatisation déplace la responsabilité vers l'outil, pas vers l'utilisateur.",
  reference: "Parasuraman & Riley – Humans and Automation",
  bgColor: "bg-secondary",
  borderColor: "border-primary/15"
}, {
  icon: RefreshCw,
  emoji: "🔄",
  title: "Le rituel transforme la finance en comportement",
  subtitle: "Pas en simple donnée",
  description: `**🔁 3.a — Le rituel agit par répétition**

Une habitude ne se crée pas par une action isolée, mais par la répétition consciente d'un même comportement dans le temps.

Les habitudes sont des automatismes neurologiques : plus un geste est répété, plus il devient naturel et moins il demande d'effort conscient. Le rituel financier — quelques secondes, régulièrement — permet d'ancrer la compréhension, de renforcer la mémorisation et de transformer une intention en action réelle.

Les micro-actions régulières sont préférables aux efforts ponctuels : mieux vaut 30 secondes chaque jour qu'une heure une fois par mois.

📚 *Wood & Neal (2007) — A new look at habits and the habit–goal interface*

---

**⏳ 3.b — Le changement est progressif, pas instantané**

Modifier sa relation à l'argent est un apprentissage, pas une performance immédiate.

Le changement comportemental demande du temps. Les recherches montrent que plusieurs semaines — parfois plus de deux mois — sont souvent nécessaires pour qu'un comportement devienne vraiment automatique. Les écarts font partie du processus : la progression n'est jamais parfaitement linéaire.

Steero est conçu comme un compagnon de trajectoire, pas comme un outil de contrôle. Ce qui compte, c'est la progression, pas la perfection.

📚 *Lally et al. (2010) — How are habits formed: Modelling habit formation in the real world*

---

**✨ Ce qu'il faut retenir**

Changer ses habitudes financières prend du temps. Steero t'accompagne pas à pas, grâce à des rituels simples et répétés, parce que la maîtrise durable naît de la progression, pas de l'automatisation totale.`,
  reference: "Wood & Neal (2007) • Lally et al. (2010)",
  bgColor: "bg-card",
  borderColor: "border-border"
}, {
  icon: Pencil,
  emoji: "✏️",
  title: "L'enregistrement manuel crée un lien émotionnel",
  subtitle: "Clé de la décision",
  description: "Une dépense enregistrée manuellement déclenche une micro-évaluation émotionnelle, rend le coût psychologiquement réel et renforce la mémoire de la décision. Sans friction minimale, il n'y a ni prise de conscience, ni arbitrage réel.",
  reference: "Baumeister & Vohs – Self-regulation",
  bgColor: "bg-primary/5",
  borderColor: "border-primary/20"
}, {
  icon: BookOpen,
  emoji: "📖",
  title: "Automatiser trop tôt empêche l'apprentissage",
  subtitle: "Erreur classique des apps financières",
  description: "L'automatisation est utile après la compréhension, pas avant. Dans la majorité des apps, l'utilisateur est bombardé de données sans cadre mental ni pédagogie. Résultat : abandon rapide, consultation passive, aucune progression réelle.",
  reference: "Sweller – Cognitive Load Theory",
  bgColor: "bg-secondary",
  borderColor: "border-primary/15"
}];

// Animation 1: Cognitive Effort - Brain synapses firing
const CognitiveEffortAnimation = ({
  isOpen
}: {
  isOpen: boolean;
}) => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      return;
    }
    const interval = setInterval(() => {
      setStep(s => (s + 1) % 5);
    }, 600);
    return () => clearInterval(interval);
  }, [isOpen]);
  const synapses = [{
    x: 15,
    y: 25,
    delay: 0
  }, {
    x: 50,
    y: 10,
    delay: 1
  }, {
    x: 85,
    y: 25,
    delay: 2
  }, {
    x: 25,
    y: 55,
    delay: 3
  }, {
    x: 75,
    y: 55,
    delay: 4
  }];
  return <div className="flex flex-col gap-2 py-2">
      <div className="relative h-20 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl overflow-hidden">
        {/* Central brain icon */}
        <motion.div animate={{
        scale: [1, 1.05, 1],
        rotate: [0, 2, -2, 0]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center z-10">
          <Brain className="w-5 h-5 text-primary" />
        </motion.div>
        
        {/* Synapse pulses */}
        {synapses.map((synapse, i) => <motion.div key={i} initial={{
        scale: 0,
        opacity: 0
      }} animate={{
        scale: step >= synapse.delay ? [0, 1.2, 0.8] : 0,
        opacity: step >= synapse.delay ? [0, 1, 0.6] : 0
      }} transition={{
        duration: 0.5,
        ease: "easeOut"
      }} style={{
        left: `${synapse.x}%`,
        top: `${synapse.y}%`
      }} className="absolute w-2.5 h-2.5 rounded-full bg-primary -translate-x-1/2 -translate-y-1/2" />)}
        
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {synapses.map((synapse, i) => <motion.line key={i} x1="50%" y1="50%" x2={`${synapse.x}%`} y2={`${synapse.y}%`} stroke="hsl(var(--primary))" strokeWidth="1" initial={{
          pathLength: 0,
          opacity: 0
        }} animate={{
          pathLength: step >= synapse.delay ? 1 : 0,
          opacity: step >= synapse.delay ? 0.4 : 0
        }} transition={{
          duration: 0.3
        }} />)}
        </svg>
      </div>
      
      {/* Label outside the animation box */}
      <motion.p initial={{
      opacity: 0
    }} animate={{
      opacity: step >= 4 ? 1 : 0
    }} className="text-center text-xs text-primary font-medium">
        💡 Connexions actives
      </motion.p>
    </div>;
};

// Animation 2: Control Illusion - Fake vs Real dashboard
const ControlIllusionAnimation = ({
  isOpen
}: {
  isOpen: boolean;
}) => {
  const [phase, setPhase] = useState<'fake' | 'reveal' | 'real'>('fake');
  useEffect(() => {
    if (!isOpen) {
      setPhase('fake');
      return;
    }
    const timers = [setTimeout(() => setPhase('reveal'), 1500), setTimeout(() => setPhase('real'), 3000), setTimeout(() => setPhase('fake'), 5000)];
    const loop = setInterval(() => {
      setPhase('fake');
      setTimeout(() => setPhase('reveal'), 1500);
      setTimeout(() => setPhase('real'), 3000);
    }, 5500);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loop);
    };
  }, [isOpen]);
  return <div className="flex flex-col gap-2 py-2">
      <div className="relative h-20 flex items-center justify-center gap-4">
        {/* Fake automated view */}
        <motion.div animate={{
        opacity: phase === 'fake' ? 1 : 0.3,
        scale: phase === 'fake' ? 1 : 0.9,
        filter: phase === 'reveal' ? 'blur(2px)' : 'blur(0px)'
      }} className="relative flex-1 bg-muted/50 rounded-lg p-3 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-destructive/50" />
            <span className="text-xs text-muted-foreground">Auto-sync</span>
          </div>
          <div className="space-y-1">
            <div className="h-1.5 bg-muted rounded w-full" />
            <div className="h-1.5 bg-muted rounded w-3/4" />
            <div className="h-1.5 bg-muted rounded w-1/2" />
          </div>
          {phase === 'reveal' && <motion.span initial={{
          opacity: 0,
          scale: 0.8
        }} animate={{
          opacity: 1,
          scale: 1
        }} className="absolute inset-0 flex items-center justify-center text-xl">
              ❓
            </motion.span>}
        </motion.div>
        
        {/* Arrow */}
        <motion.div animate={{
        x: phase === 'real' ? [0, 5, 0] : 0
      }} transition={{
        duration: 0.5,
        repeat: phase === 'real' ? Infinity : 0
      }}>
          <ArrowRight className="w-4 h-4 text-primary" />
        </motion.div>
        
        {/* Real understanding */}
        <motion.div animate={{
        opacity: phase === 'real' ? 1 : 0.3,
        scale: phase === 'real' ? 1 : 0.9
      }} className="relative flex-1 bg-primary/10 rounded-lg p-3 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <motion.div animate={{
            scale: phase === 'real' ? [1, 1.3, 1] : 1
          }} transition={{
            duration: 0.5,
            repeat: phase === 'real' ? Infinity : 0,
            repeatDelay: 1
          }} className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs text-primary font-medium">Compris</span>
          </div>
          <div className="space-y-1">
            <div className="h-1.5 bg-primary/30 rounded w-full" />
            <div className="h-1.5 bg-primary/50 rounded w-3/4" />
            <div className="h-1.5 bg-primary/70 rounded w-1/2" />
          </div>
          {phase === 'real' && <motion.div initial={{
          scale: 0
        }} animate={{
          scale: 1
        }} className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-primary-foreground" />
            </motion.div>}
        </motion.div>
      </div>
      
      {/* Label outside */}
      <motion.p initial={{
      opacity: 0
    }} animate={{
      opacity: phase === 'real' ? 1 : 0
    }} className="text-center text-xs text-primary font-medium">
        ✓ Compréhension réelle
      </motion.p>
    </div>;
};

// Animation 3: Ritual Cycle - Daily habit loop
const RitualCycleAnimation = ({
  isOpen
}: {
  isOpen: boolean;
}) => {
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    if (!isOpen) {
      setActiveStep(0);
      return;
    }
    const interval = setInterval(() => {
      setActiveStep(s => (s + 1) % 4);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);
  const ritualSteps = [{
    icon: "🎯",
    label: "Définir",
    time: ""
  }, {
    icon: "📝",
    label: "Saisir",
    time: ""
  }, {
    icon: "📊",
    label: "Réviser",
    time: ""
  }, {
    icon: "✨",
    label: "Ancrer",
    time: ""
  }];
  return <div className="flex flex-col gap-3 py-3 mb-4">
      <div className="relative h-24 flex items-center justify-center">
        {/* Circular path */}
        <div className="w-16 h-16 rounded-full border-2 border-dashed border-primary/20" />
        
        {/* Ritual steps around the circle */}
        {ritualSteps.map((step, i) => {
        const angle = (i * 90 - 90) * (Math.PI / 180);
        const radius = 32;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return <motion.div key={i} style={{
          left: `calc(50% + ${x}px)`,
          top: `calc(50% + ${y}px)`,
          transform: 'translate(-50%, -50%)'
        }} animate={{
          scale: activeStep === i ? 1.2 : 1,
          backgroundColor: activeStep === i ? "hsl(var(--primary))" : "hsl(var(--muted))"
        }} transition={{
          duration: 0.3,
          type: "spring"
        }} className="absolute w-7 h-7 rounded-full flex items-center justify-center text-sm shadow-md">
              {step.icon}
            </motion.div>;
      })}
        
        {/* Center indicator */}
        <motion.div animate={{
        rotate: activeStep * 90
      }} transition={{
        duration: 0.5,
        type: "spring"
      }} className="absolute">
          <RefreshCw className="w-4 h-4 text-primary" />
        </motion.div>
      </div>
      
      {/* Current step label - outside the animation with proper spacing */}
      <motion.p key={activeStep} initial={{
      opacity: 0,
      y: 5
    }} animate={{
      opacity: 1,
      y: 0
    }} className="text-center text-xs font-medium text-primary bg-primary/5 rounded-full px-3 py-1.5 mx-auto">
        {ritualSteps[activeStep].icon} {ritualSteps[activeStep].label}
      </motion.p>
    </div>;
};

// Animation 4: Emotional Connection - Heart + Transaction
const EmotionalConnectionAnimation = ({
  isOpen
}: {
  isOpen: boolean;
}) => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      return;
    }
    const interval = setInterval(() => {
      setStep(s => (s + 1) % 5);
    }, 800);
    return () => clearInterval(interval);
  }, [isOpen]);
  return <div className="flex flex-col gap-2 py-2">
      <div className="relative h-16 flex items-center justify-center gap-3">
        {/* Transaction appearing */}
        <motion.div initial={{
        x: -50,
        opacity: 0
      }} animate={{
        x: step >= 1 ? 0 : -50,
        opacity: step >= 1 ? 1 : 0
      }} transition={{
        duration: 0.4,
        type: "spring"
      }} className="bg-muted rounded-lg px-2.5 py-1.5 flex items-center gap-2">
          <span className="text-base">🍽️</span>
          <div>
            <p className="text-[10px] font-medium text-foreground">Restaurant</p>
            <p className="text-[10px] text-muted-foreground">🤔 34,90€</p>
          </div>
        </motion.div>
        
        {/* Pencil writing */}
        <motion.div animate={{
        opacity: step >= 2 && step < 4 ? 1 : 0,
        y: step === 2 ? [0, -5, 0] : 0,
        rotate: step === 3 ? [0, -15, 15, 0] : 0
      }} transition={{
        duration: 0.5
      }}>
          <Pencil className="w-4 h-4 text-primary" />
        </motion.div>
        
        {/* Emotional response */}
        <motion.div initial={{
        scale: 0,
        opacity: 0
      }} animate={{
        scale: step >= 3 ? 1 : 0,
        opacity: step >= 3 ? 1 : 0
      }} transition={{
        duration: 0.3,
        type: "spring"
      }} className="relative">
          <motion.div animate={{
          scale: step === 4 ? [1, 1.2, 1] : 1
        }} transition={{
          duration: 0.6,
          repeat: step === 4 ? Infinity : 0
        }} className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-xl">❤️</span>
          </motion.div>
          
          {/* Ripple effect */}
          {step === 4 && <motion.div initial={{
          scale: 1,
          opacity: 0.6
        }} animate={{
          scale: 2,
          opacity: 0
        }} transition={{
          duration: 1,
          repeat: Infinity
        }} className="absolute inset-0 rounded-full border-2 border-primary" />}
        </motion.div>
      </div>
      
      {/* Result text - outside */}
      <motion.p initial={{
      opacity: 0
    }} animate={{
      opacity: step >= 4 ? 1 : 0
    }} className="text-center text-xs text-primary font-medium">
        👌 Réelle prise de conscience
      </motion.p>
    </div>;
};

// Animation 5: Learning Before Automation - Progressive stages
const LearningFirstAnimation = ({
  isOpen
}: {
  isOpen: boolean;
}) => {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    if (!isOpen) {
      setStage(0);
      return;
    }
    const interval = setInterval(() => {
      setStage(s => (s + 1) % 4);
    }, 1200);
    return () => clearInterval(interval);
  }, [isOpen]);
  const stages = [{
    label: "Apprendre",
    icon: BookOpen,
    fill: 33,
    color: "bg-primary/30"
  }, {
    label: "Comprendre",
    icon: Brain,
    fill: 66,
    color: "bg-primary/50"
  }, {
    label: "Maîtriser",
    icon: Check,
    fill: 100,
    color: "bg-primary"
  }];
  return <div className="flex flex-col gap-2 py-2">
      {/* Progress bar */}
      <div className="relative h-2.5 bg-muted rounded-full overflow-hidden">
        <motion.div animate={{
        width: `${stages[stage % 3].fill}%`
      }} transition={{
        duration: 0.5,
        ease: "easeOut"
      }} className={`absolute left-0 top-0 h-full ${stages[stage % 3].color} rounded-full`} />
      </div>
      
      {/* Stage indicators */}
      <div className="flex justify-between px-1">
        {stages.map((s, i) => {
        const Icon = s.icon;
        const currentStage = stage % 3;
        return <motion.div key={i} animate={{
          scale: currentStage === i ? 1.1 : 1,
          opacity: currentStage >= i ? 1 : 0.4
        }} transition={{
          duration: 0.3
        }} className="flex flex-col items-center gap-0.5">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center ${currentStage >= i ? 'bg-primary/20' : 'bg-muted'}`}>
                <Icon className={`w-3.5 h-3.5 ${currentStage >= i ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              <span className={`text-[9px] font-medium ${currentStage === i ? 'text-primary' : 'text-muted-foreground'}`}>
                {s.label}
              </span>
            </motion.div>;
      })}
      </div>
      
      {/* Status message - outside with fixed height */}
      <div className="h-4 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {stage % 3 < 1 && <motion.p key="warning" initial={{
          opacity: 0,
          y: -3
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -3
        }} className="text-center text-[10px] text-muted-foreground">
              ⚠️ Automatiser trop tôt = échec probable
            </motion.p>}
          {stage % 3 === 1 && <motion.p key="progress" initial={{
          opacity: 0,
          y: -3
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -3
        }} className="text-center text-[10px] text-primary/70">
              📈 La compréhension s'installe...
            </motion.p>}
          {stage % 3 === 2 && <motion.p key="ready" initial={{
          opacity: 0,
          y: -3
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -3
        }} className="text-center text-[10px] text-primary font-medium">
              ✓ L'automatisation peut être envisagée
            </motion.p>}
        </AnimatePresence>
      </div>
    </div>;
};

// Main animation router component
const BehavioralAnimation = ({
  element,
  index,
  isOpen
}: {
  element: BehavioralElement;
  index: number;
  isOpen: boolean;
}) => {
  switch (index) {
    case 0:
      return <CognitiveEffortAnimation isOpen={isOpen} />;
    case 1:
      return <ControlIllusionAnimation isOpen={isOpen} />;
    case 2:
      return <RitualCycleAnimation isOpen={isOpen} />;
    case 3:
      return <EmotionalConnectionAnimation isOpen={isOpen} />;
    case 4:
      return <LearningFirstAnimation isOpen={isOpen} />;
    default:
      return null;
  }
};

// Behavioral card component
const BehavioralCard = ({
  element,
  index,
  isOpen,
  onToggle,
  isExplored
}: {
  element: BehavioralElement;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isExplored: boolean;
}) => {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true
  }} transition={{
    duration: 0.4,
    delay: index * 0.1
  }} onClick={onToggle} className={`
        relative rounded-2xl border cursor-pointer transition-all duration-300
        ${element.bgColor} ${element.borderColor}
        ${isOpen ? 'shadow-card ring-2 ring-primary/20' : 'shadow-soft hover:shadow-card'}
        ${isExplored && !isOpen ? 'saturate-[0.7] opacity-90' : ''}
      `}>
      {/* Explored badge */}
      <AnimatePresence>
        {isExplored && !isOpen && <motion.div initial={{
        opacity: 0,
        scale: 0.8,
        y: -5
      }} animate={{
        opacity: 1,
        scale: 1,
        y: 0
      }} exit={{
        opacity: 0,
        scale: 0.8,
        y: -5
      }} className="absolute -top-2 -right-2 z-10">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20">
              ✓ Lu
            </span>
          </motion.div>}
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
              {isExplored && !isOpen && <motion.div initial={{
              scale: 0
            }} animate={{
              scale: 1
            }} exit={{
              scale: 0
            }} className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </motion.div>}
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
              <motion.div animate={{
              rotate: isOpen ? 180 : 0
            }} transition={{
              duration: 0.3
            }} className="flex-shrink-0 mt-1">
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isOpen && <motion.div initial={{
          height: 0,
          opacity: 0
        }} animate={{
          height: "auto",
          opacity: 1
        }} exit={{
          height: 0,
          opacity: 0
        }} transition={{
          duration: 0.3,
          ease: "easeInOut"
        }} className="overflow-hidden">
              <div className="pt-4 mt-4 border-t border-border/50">
                {/* Animation */}
                <BehavioralAnimation element={element} index={index} isOpen={isOpen} />

                {/* Description */}
                <div className="text-muted-foreground leading-relaxed mb-4 space-y-4">
                  {element.description.split('\n\n').map((paragraph, i) => {
                    // Handle horizontal rules
                    if (paragraph.trim() === '---') {
                      return <hr key={i} className="border-border/50 my-4" />;
                    }
                    // Handle bold headers with emoji
                    if (paragraph.startsWith('**')) {
                      const headerMatch = paragraph.match(/^\*\*(.+?)\*\*$/);
                      if (headerMatch) {
                        return (
                          <h4 key={i} className="font-semibold text-foreground text-sm mt-2">
                            {headerMatch[1]}
                          </h4>
                        );
                      }
                    }
                    // Handle italic references
                    if (paragraph.startsWith('📚')) {
                      return (
                        <p key={i} className="text-xs text-muted-foreground/70 italic bg-muted/30 rounded-lg px-3 py-2">
                          {paragraph.replace(/\*/g, '')}
                        </p>
                      );
                    }
                    // Regular paragraph
                    return <p key={i}>{paragraph}</p>;
                  })}
                </div>

                {/* Reference */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground/70 bg-muted/50 rounded-lg px-3 py-2">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="italic">Référence : {element.reference}</span>
                </div>
              </div>
            </motion.div>}
        </AnimatePresence>
      </div>
    </motion.div>;
};
const PourquoiSteero = () => {
  const [openCardIndex, setOpenCardIndex] = useState<number | null>(null);
  const [exploredCards, setExploredCards] = useState<Set<number>>(new Set());
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [hasTriggeredCelebration, setHasTriggeredCelebration] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { playSuccessSound, playOpenSound, playCloseSound } = useSoundEffects();

  const handleToggleCard = (index: number) => {
    const isOpening = openCardIndex !== index;
    if (isOpening) {
      setExploredCards(prev => new Set(prev).add(index));
      playOpenSound();
    } else {
      playCloseSound();
    }
    setOpenCardIndex(prev => prev === index ? null : index);
  };

  // Play sound when all principles are explored
  useEffect(() => {
    if (exploredCards.size === behavioralElements.length && !hasTriggeredCelebration) {
      setHasTriggeredCelebration(true);
      playSuccessSound();
    }
  }, [exploredCards.size, hasTriggeredCelebration, playSuccessSound]);

  // Track when behavioral section is in view
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.3;
        setIsSidebarVisible(isInView);
      }
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true
    });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return <div className="min-h-screen">
      <Header />
      
      {/* Progress Sidebar for Behavioral Section */}
      <AnimatePresence>
        {isSidebarVisible && <BehavioralProgressSidebar elements={behavioralElements} activeIndex={openCardIndex} exploredCards={exploredCards} isVisible={isSidebarVisible} />}
      </AnimatePresence>

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
      <section ref={sectionRef} id="fondements-comportementaux" className="py-20 scroll-mt-40 bg-primary-foreground">
        <div className="container mx-auto px-6 md:pl-20 lg:pl-28">
          <div className="max-w-4xl mx-auto">
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
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-card border border-border mb-4">
                🎓 Approche scientifique
              </span>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Les fondements comportementaux de Steero
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Steero aide chacun à piloter consciemment sa trajectoire financière, plutôt que de la subir.
              </p>
              
              {/* Progress indicator */}
              <motion.div initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              delay: 0.3
            }} className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <span className="text-primary font-medium">{exploredCards.size}</span>
                <span>/</span>
                <span>{behavioralElements.length} principes explorés</span>
                {exploredCards.size === behavioralElements.length && <motion.span initial={{
                scale: 0
              }} animate={{
                scale: [1, 1.2, 1]
              }} transition={{
                duration: 0.6,
                repeat: 2
              }} className="ml-2 text-primary font-semibold">
                    🎉 Bravo !
                  </motion.span>}
              </motion.div>
            </motion.div>
            
            <div className="space-y-4">
              {behavioralElements.map((element, index) => <div key={index} id={`behavioral-card-${index}`}>
                  <BehavioralCard element={element} index={index} isOpen={openCardIndex === index} onToggle={() => handleToggleCard(index)} isExplored={exploredCards.has(index)} />
                </div>)}
            </div>
            
            {/* Hint text with link */}
            <motion.div initial={{
            opacity: 0
          }} whileInView={{
            opacity: 1
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.5
          }} className="text-center text-sm text-muted-foreground mt-8">
              <p>Clique sur chaque principe pour en découvrir le détail.</p>
              <Link 
                to="/fonctionnalites" 
                className="inline-flex items-center gap-1 mt-2 text-primary font-medium hover:underline group"
              >
                Découvrir les fonctionnalités
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
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