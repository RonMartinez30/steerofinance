import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

type AnimationType = "onboarding" | "budget" | "fixed" | "daily" | "gauge" | "rituals" | "indicators";
type AnimationDirection = "horizontal" | "vertical" | "pulse";

interface Feature {
  emoji: string;
  title: string;
  microPromise: string;
  details: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  animation: AnimationType;
  animationDirection: AnimationDirection;
}

interface FeatureGroup {
  label: string;
  title: string;
  features: Feature[];
  isLarge?: boolean;
}

const featureGroups: FeatureGroup[] = [
  {
    label: "Étape 1",
    title: "Démarrer",
    isLarge: true,
    features: [
      {
        emoji: "🧭",
        title: "Parcours d'initialisation",
        microPromise: "Configurer ton point de départ",
        details: "Un parcours guidé et intuitif pour configurer ton profil financier. Étape par étape, tu définis tes objectifs, tes revenus et tes priorités pour que Steero s'adapte parfaitement à ta situation.",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
        textColor: "text-amber-700",
        animation: "onboarding",
        animationDirection: "horizontal",
      },
      {
        emoji: "💰",
        title: "Gestion du budget",
        microPromise: "Définir ton cadre mensuel",
        details: "Organise tes finances avec un système de catégories hiérarchiques. Ton budget évolue avec toi, s'adapte à chaque mois et te permet d'affiner ta gestion au fil du temps.",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        textColor: "text-orange-700",
        animation: "budget",
        animationDirection: "horizontal",
      },
    ],
  },
  {
    label: "Étape 2",
    title: "Suivre",
    features: [
      {
        emoji: "📅",
        title: "Transactions fixes",
        microPromise: "Anticiper ce qui revient chaque mois",
        details: "Centralise tous tes prélèvements, abonnements et revenus récurrents. Visualise clairement ce qui rentre et ce qui sort chaque mois, avec les dates exactes de chaque transaction.",
        bgColor: "bg-rose-50",
        borderColor: "border-rose-200",
        textColor: "text-rose-700",
        animation: "fixed",
        animationDirection: "vertical",
      },
      {
        emoji: "🧾",
        title: "Transactions du quotidien",
        microPromise: "Saisir sans effort au quotidien",
        details: "Gagne du temps grâce aux modèles de transactions personnalisables. Tes achats récurrents sont pré-renseignés pour une saisie rapide et sans friction.",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        textColor: "text-red-700",
        animation: "daily",
        animationDirection: "vertical",
      },
      {
        emoji: "📊",
        title: "Le Niveau",
        microPromise: "Voir où tu en es en un coup d'œil",
        details: "Lors de chaque saisie, visualise instantanément : ce qui a déjà été dépensé, ce que représente la dépense en cours, et ce qu'il te restera disponible dans ton budget.",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        textColor: "text-yellow-700",
        animation: "gauge",
        animationDirection: "pulse",
      },
    ],
  },
  {
    label: "Étape 3",
    title: "Ajuster & durer",
    features: [
      {
        emoji: "🎯",
        title: "Suivi des rituels",
        microPromise: "Suivre ce qui compte vraiment",
        details: "Un système de rituels qui te guide sur ce que tu dois faire, regarder, et quelles questions te poser. Développe des habitudes financières durables.",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        textColor: "text-orange-700",
        animation: "rituals",
        animationDirection: "pulse",
      },
      {
        emoji: "✨",
        title: "Indicateurs ludiques",
        microPromise: "Mesurer tes progrès dans le temps",
        details: "Des visualisations claires et engageantes qui transforment tes données en insights actionnables. Comprends rapidement ta situation grâce à des indicateurs pensés pour faciliter tes décisions.",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
        textColor: "text-amber-700",
        animation: "indicators",
        animationDirection: "pulse",
      },
    ],
  },
];

// Onboarding steps animation - horizontal direction
const OnboardingAnimation = ({ isOpen }: { isOpen: boolean }) => {
  const [step, setStep] = useState(0);
  const steps = ["Objectifs", "Revenus", "Dépenses fixes", "Priorités"];
  
  useEffect(() => {
    if (!isOpen) { setStep(0); return; }
    const interval = setInterval(() => {
      setStep(s => (s + 1) % (steps.length + 1));
    }, 800);
    return () => clearInterval(interval);
  }, [isOpen]);
  
  return (
    <div className="mt-4 mb-2">
      <div className="flex items-center justify-between gap-2">
        {steps.map((label, i) => (
          <div key={i} className="flex-1">
            <motion.div
              initial={{ scaleX: 0, opacity: 0.3 }}
              animate={{ 
                scaleX: step > i ? 1 : 0, 
                opacity: step > i ? 1 : 0.4,
                backgroundColor: step > i ? "#f59e0b" : "#e5e7eb"
              }}
              style={{ originX: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-2 rounded-full mb-2"
            />
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: step > i ? 1 : 0.4, x: step > i ? 0 : -10 }}
              transition={{ duration: 0.3 }}
              className="text-xs text-center font-medium text-amber-700"
            >
              {step > i && <Check className="inline w-3 h-3 mr-1" />}
              {label}
            </motion.div>
          </div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: step === steps.length ? 1 : 0, x: step === steps.length ? 0 : 20 }}
        className="mt-3 text-center text-sm font-medium text-emerald-600"
      >
        ✓ Profil complet !
      </motion.div>
    </div>
  );
};

// Budget hierarchy animation - horizontal cascade
const BudgetAnimation = ({ isOpen }: { isOpen: boolean }) => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    if (!isOpen) { setStep(0); return; }
    const interval = setInterval(() => {
      setStep(s => (s + 1) % 4);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);
  
  const categories = [
    { name: "Logement", amount: "800€", sub: ["Loyer 750€", "Assurance 50€"] },
    { name: "Alimentation", amount: "400€", sub: ["Courses 300€", "Resto 100€"] },
    { name: "Loisirs", amount: "150€", sub: ["Sport 50€", "Sorties 100€"] },
  ];
  
  return (
    <div className="mt-4 mb-2 space-y-2">
      {categories.map((cat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: step >= i ? 1 : 0, x: step >= i ? 0 : -30 }}
          transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
        >
          <div className="flex justify-between items-center bg-orange-100 rounded-lg px-3 py-2">
            <span className="font-medium text-orange-800 text-sm">{cat.name}</span>
            <span className="text-orange-600 font-bold text-sm">{cat.amount}</span>
          </div>
          <AnimatePresence>
            {step >= i + 1 && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="ml-4 mt-1 flex gap-1 overflow-hidden"
              >
                {cat.sub.map((sub, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: j * 0.15, duration: 0.3 }}
                    className="text-xs text-orange-600 bg-orange-50 rounded px-2 py-1 whitespace-nowrap"
                  >
                    {sub}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

// Fixed transactions animation - vertical flow
const FixedTransactionsAnimation = ({ isOpen }: { isOpen: boolean }) => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    if (!isOpen) { setStep(0); return; }
    const interval = setInterval(() => {
      setStep(s => (s + 1) % 5);
    }, 700);
    return () => clearInterval(interval);
  }, [isOpen]);
  
  const transactions = [
    { day: "01", label: "Loyer", amount: "-750€", type: "expense" },
    { day: "05", label: "Salaire", amount: "+2100€", type: "income" },
    { day: "15", label: "Netflix", amount: "-15€", type: "expense" },
    { day: "20", label: "Électricité", amount: "-80€", type: "expense" },
  ];
  
  return (
    <div className="mt-4 mb-2">
      <div className="space-y-2">
        {transactions.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: step > i ? 1 : 0.3, y: step > i ? 0 : -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex items-center gap-3 bg-rose-100/50 rounded-lg px-3 py-2"
          >
            <span className="w-8 h-8 rounded-full bg-rose-200 flex items-center justify-center text-xs font-bold text-rose-700">
              {t.day}
            </span>
            <span className="flex-1 text-sm text-rose-800">{t.label}</span>
            <motion.span 
              initial={{ scale: 0.8 }}
              animate={{ scale: step > i ? 1 : 0.8 }}
              className={`font-bold text-sm ${t.type === "income" ? "text-emerald-600" : "text-rose-600"}`}
            >
              {t.amount}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Daily transactions templates animation - vertical scroll effect
const DailyTransactionsAnimation = ({ isOpen }: { isOpen: boolean }) => {
  const [activeTemplate, setActiveTemplate] = useState<number | null>(null);
  
  useEffect(() => {
    if (!isOpen) { setActiveTemplate(null); return; }
    const interval = setInterval(() => {
      setActiveTemplate(t => t === null ? 0 : t === 2 ? null : t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);
  
  const templates = [
    { emoji: "🛒", label: "Courses", amount: "45€" },
    { emoji: "☕", label: "Café", amount: "3,50€" },
    { emoji: "⛽", label: "Essence", amount: "60€" },
  ];
  
  return (
    <div className="mt-4 mb-2">
      <div className="flex flex-col gap-2">
        {templates.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ 
              opacity: 1,
              y: 0,
              scale: activeTemplate === i ? 1.03 : 1,
              boxShadow: activeTemplate === i ? "0 4px 12px rgba(239, 68, 68, 0.3)" : "none"
            }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="flex items-center gap-3 bg-red-100 rounded-xl p-3 cursor-pointer"
          >
            <div className="text-2xl">{t.emoji}</div>
            <div className="flex-1 text-sm font-medium text-red-800">{t.label}</div>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: activeTemplate === i ? 1 : 0.5, x: activeTemplate === i ? 0 : 10 }}
              className="text-sm text-red-600 font-bold"
            >
              {t.amount}
            </motion.div>
          </motion.div>
        ))}
      </div>
      <motion.div
        animate={{ opacity: activeTemplate !== null ? 1 : 0 }}
        className="mt-3 text-center text-xs text-red-600"
      >
        Tap pour ajouter rapidement ↓
      </motion.div>
    </div>
  );
};

// Gauge animation - pulse effect
const GaugeAnimation = ({ isOpen }: { isOpen: boolean }) => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    if (!isOpen) { setStep(0); return; }
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 1200),
      setTimeout(() => setStep(3), 2100),
    ];
    const loopTimer = setInterval(() => {
      setStep(0);
      setTimeout(() => setStep(1), 300);
      setTimeout(() => setStep(2), 1200);
      setTimeout(() => setStep(3), 2100);
    }, 4000);
    return () => { timers.forEach(clearTimeout); clearInterval(loopTimer); };
  }, [isOpen]);
  
  const spentWidth = 45, currentWidth = 20, remainingWidth = 35;
  
  return (
    <div className="mt-4 mb-2">
      <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: step >= 1 ? `${spentWidth}%` : 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-emerald-400 to-emerald-500"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ 
            width: step >= 2 ? `${currentWidth}%` : 0,
            scale: step >= 2 ? [1, 1.02, 1] : 1
          }}
          transition={{ 
            width: { duration: 0.5, ease: "easeOut" },
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{ left: `${spentWidth}%` }}
          className="absolute top-0 h-full bg-gradient-to-r from-amber-400 to-orange-500"
        >
          {step >= 2 && (
            <motion.div 
              animate={{ opacity: [0.3, 0.7, 0.3] }} 
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} 
              className="absolute inset-0 bg-white/40" 
            />
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 3 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ left: `${spentWidth + currentWidth}%`, width: `${remainingWidth}%` }}
          className="absolute top-0 h-full bg-gradient-to-r from-gray-300 to-gray-200"
        />
      </div>
      <div className="flex justify-between mt-3 text-xs">
        <motion.div animate={{ opacity: step >= 1 ? 1 : 0 }} className="flex items-center gap-1">
          <motion.span 
            animate={{ scale: step === 1 ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.3 }}
            className="w-3 h-3 rounded-full bg-emerald-500" 
          />
          <span className="text-emerald-700 font-medium">Dépensé</span>
        </motion.div>
        <motion.div animate={{ opacity: step >= 2 ? 1 : 0 }} className="flex items-center gap-1">
          <motion.span 
            animate={{ scale: step >= 2 ? [1, 1.15, 1] : 1 }}
            transition={{ duration: 1.2, repeat: step >= 2 ? Infinity : 0, ease: "easeInOut" }}
            className="w-3 h-3 rounded-full bg-amber-500" 
          />
          <span className="text-amber-700 font-medium">En cours</span>
        </motion.div>
        <motion.div animate={{ opacity: step >= 3 ? 1 : 0 }} className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-gray-300" />
          <span className="text-gray-600 font-medium">Reste</span>
        </motion.div>
      </div>
      <motion.div animate={{ opacity: step >= 2 ? 1 : 0 }} className="mt-3 text-center">
        <motion.span 
          animate={{ scale: step === 2 ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 0.8, repeat: step === 2 ? Infinity : 0 }}
          className="text-lg font-bold text-amber-600"
        >
          -25€
        </motion.span>
        <span className="text-muted-foreground text-sm ml-2">→</span>
        <motion.span 
          animate={{ opacity: step >= 3 ? 1 : 0, scale: step >= 3 ? [1, 1.05, 1] : 1 }} 
          transition={{ scale: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
          className="text-lg font-bold text-emerald-600 ml-2"
        >
          175€
        </motion.span>
      </motion.div>
    </div>
  );
};

// Rituals/habits animation - soft pulse effect
const RitualsAnimation = ({ isOpen }: { isOpen: boolean }) => {
  const [checks, setChecks] = useState([false, false, false, false, false, false, false]);
  
  useEffect(() => {
    if (!isOpen) { setChecks([false, false, false, false, false, false, false]); return; }
    const timers = checks.map((_, i) => 
      setTimeout(() => setChecks(c => { const n = [...c]; n[i] = true; return n; }), 300 + i * 400)
    );
    const resetTimer = setTimeout(() => setChecks([false, false, false, false, false, false, false]), 4000);
    const loopTimer = setInterval(() => {
      setChecks([false, false, false, false, false, false, false]);
      checks.forEach((_, i) => setTimeout(() => setChecks(c => { const n = [...c]; n[i] = true; return n; }), 300 + i * 400));
    }, 5000);
    return () => { timers.forEach(clearTimeout); clearTimeout(resetTimer); clearInterval(loopTimer); };
  }, [isOpen]);
  
  const days = ["L", "M", "M", "J", "V", "S", "D"];
  const completedCount = checks.filter(Boolean).length;
  
  return (
    <div className="mt-4 mb-2">
      <div className="text-xs text-orange-700 font-medium mb-2 text-center">📋 Vérifier mes dépenses</div>
      <div className="flex justify-center gap-2">
        {days.map((d, i) => (
          <motion.div
            key={i}
            animate={{ 
              backgroundColor: checks[i] ? "#22c55e" : "#fed7aa",
              scale: checks[i] ? [1, 1.25, 1] : [1, 1.03, 1]
            }}
            transition={{ 
              duration: checks[i] ? 0.3 : 2,
              repeat: checks[i] ? 0 : Infinity,
              ease: "easeInOut"
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center"
          >
            {checks[i] ? (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Check className="w-4 h-4 text-white" />
              </motion.div>
            ) : (
              <span className="text-xs font-medium text-orange-700">{d}</span>
            )}
          </motion.div>
        ))}
      </div>
      <motion.div
        animate={{ 
          opacity: completedCount >= 5 ? 1 : 0,
          scale: completedCount >= 5 ? [1, 1.05, 1] : 1
        }}
        transition={{ scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } }}
        className="mt-3 text-center text-xs text-emerald-600 font-medium"
      >
        🔥 5 jours consécutifs !
      </motion.div>
    </div>
  );
};

// Indicators animation - soft pulse/breathing effect
const IndicatorsAnimation = ({ isOpen }: { isOpen: boolean }) => {
  const [values, setValues] = useState([0, 0, 0]);
  
  useEffect(() => {
    if (!isOpen) { setValues([0, 0, 0]); return; }
    const targetValues = [75, 45, 90];
    const timers = targetValues.map((target, i) =>
      setTimeout(() => {
        let current = 0;
        const interval = setInterval(() => {
          current += 5;
          if (current >= target) { current = target; clearInterval(interval); }
          setValues(v => { const n = [...v]; n[i] = current; return n; });
        }, 30);
      }, i * 300)
    );
    return () => timers.forEach(clearTimeout);
  }, [isOpen]);
  
  const indicators = [
    { label: "Budget utilisé", color: "bg-amber-500", value: values[0] },
    { label: "Épargne", color: "bg-emerald-500", value: values[1] },
    { label: "Rituels", color: "bg-rose-500", value: values[2] },
  ];
  
  return (
    <div className="mt-4 mb-2 space-y-3">
      {indicators.map((ind, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.2 }}
        >
          <div className="flex justify-between text-xs mb-1">
            <span className="text-amber-800 font-medium">{ind.label}</span>
            <motion.span 
              animate={{ scale: ind.value > 0 ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              className="text-amber-600 font-bold"
            >
              {ind.value}%
            </motion.span>
          </div>
          <div className="h-3 bg-amber-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${ind.value}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`h-full ${ind.color} rounded-full relative overflow-hidden`}
            >
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                className="absolute inset-0 bg-white/30"
              />
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Animation renderer
const FeatureAnimation = ({ type, isOpen }: { type: AnimationType; isOpen: boolean }) => {
  switch (type) {
    case "onboarding": return <OnboardingAnimation isOpen={isOpen} />;
    case "budget": return <BudgetAnimation isOpen={isOpen} />;
    case "fixed": return <FixedTransactionsAnimation isOpen={isOpen} />;
    case "daily": return <DailyTransactionsAnimation isOpen={isOpen} />;
    case "gauge": return <GaugeAnimation isOpen={isOpen} />;
    case "rituals": return <RitualsAnimation isOpen={isOpen} />;
    case "indicators": return <IndicatorsAnimation isOpen={isOpen} />;
    default: return null;
  }
};

// Get animation variants based on direction
const getCardAnimationVariants = (direction: AnimationDirection) => {
  switch (direction) {
    case "horizontal":
      return {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 30 }
      };
    case "vertical":
      return {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 }
      };
    case "pulse":
      return {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 }
      };
  }
};

const FeatureCard = ({ 
  feature, 
  isOpen,
  onToggle,
  sounds,
  isLarge = false 
}: { 
  feature: Feature; 
  isOpen: boolean;
  onToggle: () => void;
  sounds: ReturnType<typeof useSoundEffects>;
  isLarge?: boolean;
}) => {
  const handleClick = () => {
    if (isOpen) {
      sounds.playCloseSound();
    } else {
      sounds.playOpenSound();
    }
    onToggle();
  };

  const variants = getCardAnimationVariants(feature.animationDirection);

  return (
    <motion.div
      layout
      onClick={handleClick}
      className={`cursor-pointer rounded-2xl border-2 ${feature.borderColor} ${feature.bgColor} ${isLarge ? 'p-8' : 'p-6'} transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}
    >
      <div className="flex items-center gap-4">
        <div className={`${isLarge ? 'text-5xl md:text-6xl' : 'text-4xl md:text-5xl'}`}>{feature.emoji}</div>
        <div className="flex-1">
          <h3 className={`${isLarge ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'} font-semibold ${feature.textColor}`}>
            {feature.title}
          </h3>
          {!isOpen && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-sm ${feature.textColor} opacity-70 mt-1`}
            >
              {feature.microPromise}
            </motion.p>
          )}
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <FeatureAnimation type={feature.animation} isOpen={isOpen} />
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
        <span className="text-sm">{isOpen ? "▲" : "▼"}</span>
      </motion.div>
    </motion.div>
  );
};

const Fonctionnalites = () => {
  const sounds = useSoundEffects();
  const [openCardId, setOpenCardId] = useState<string | null>(null);
  
  const handleToggleCard = (groupIndex: number, featureIndex: number) => {
    const cardId = `${groupIndex}-${featureIndex}`;
    setOpenCardId(prev => prev === cardId ? null : cardId);
  };

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

      {/* Feature Groups */}
      <section className="py-16">
        <div className="container mx-auto px-6 space-y-24">
          {featureGroups.map((group, groupIndex) => (
            <motion.div
              key={groupIndex}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.7, 
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="relative"
            >
              {/* Decorative connector line between groups */}
              {groupIndex < featureGroups.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0, opacity: 0 }}
                  whileInView={{ scaleY: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                  className="absolute left-1/2 -bottom-16 w-px h-12 bg-gradient-to-b from-primary/30 to-transparent origin-top"
                />
              )}
              
              {/* Group Header */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-4 mb-8"
              >
                <motion.span 
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.3,
                    type: "spring",
                    stiffness: 200
                  }}
                  className="text-xs font-semibold text-primary/60 uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full"
                >
                  {group.label}
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="text-2xl md:text-3xl font-bold text-foreground"
                >
                  {group.title}
                </motion.h2>
              </motion.div>
              
              {/* Feature Cards Grid with staggered animation */}
              <div className={`grid gap-6 ${
                group.isLarge 
                  ? 'grid-cols-1 md:grid-cols-2' 
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}>
                {group.features.map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    initial={{ opacity: 0, y: 40, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.2 + featureIndex * 0.1,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <FeatureCard 
                      feature={feature} 
                      isOpen={openCardId === `${groupIndex}-${featureIndex}`}
                      onToggle={() => handleToggleCard(groupIndex, featureIndex)}
                      sounds={sounds}
                      isLarge={group.isLarge}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
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
