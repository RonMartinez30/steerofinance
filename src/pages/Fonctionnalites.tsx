import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, FolderKanban, Users, Building2, Crosshair, LayoutGrid, RefreshCcw, ClipboardList, Gauge, CalendarCheck, BarChart3, Landmark, Wallet, Receipt, RotateCcw, type LucideIcon } from "lucide-react";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useTranslation } from "react-i18next";

// Progress sidebar component
const ProgressSidebar = ({
  groups,
  activeIndex
}: {
  groups: FeatureGroup[];
  activeIndex: number;
}) => {
  const scrollToGroup = (index: number) => {
    const element = document.getElementById(`group-${index}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };
  return <motion.div initial={{
    opacity: 0,
    x: -20
  }} animate={{
    opacity: 1,
    x: 0
  }} transition={{
    duration: 0.5,
    delay: 0.3
  }} className="fixed left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-2">
      {/* Vertical line background */}
      <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-muted rounded-full" />
      
      {/* Progress line */}
      <motion.div className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-primary rounded-full origin-top" initial={{
      height: 0
    }} animate={{
      height: `${(activeIndex + 1) / groups.length * 100}%`
    }} transition={{
      duration: 0.4,
      ease: "easeOut"
    }} />
      
      {/* Step indicators */}
      {groups.map((group, index) => <button key={index} onClick={() => scrollToGroup(index)} className="relative z-10 group flex items-center gap-3">
          {/* Step circle */}
          <motion.div animate={{
        scale: activeIndex === index ? 1.2 : 1,
        backgroundColor: index <= activeIndex ? "hsl(var(--primary))" : "hsl(var(--muted))"
      }} transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 150,
        damping: 25
      }} className="w-4 h-4 rounded-full border-2 border-background shadow-md flex items-center justify-center">
            {index < activeIndex && <motion.div initial={{
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
      }} className="absolute left-8 whitespace-nowrap bg-card px-3 py-1.5 rounded-lg shadow-lg border border-border pointer-events-none">
            <span className="text-xs font-medium text-muted-foreground">{group.label}</span>
            <span className="mx-1.5 text-muted-foreground/50">·</span>
            <span className="text-sm font-semibold text-foreground">{group.title}</span>
          </motion.div>
        </button>)}
    </motion.div>;
};
type AnimationType = "onboarding" | "budget" | "fixed" | "daily" | "gauge" | "rituals" | "indicators";
type AnimationDirection = "horizontal" | "vertical" | "pulse";
interface Feature {
  icon?: LucideIcon;
  emoji?: string;
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
// featureGroups is now defined inside the component to use translations

// Onboarding steps animation - Parcours d'initialisation progressif
const OnboardingAnimation = ({
  isOpen,
  t
}: {
  isOpen: boolean;
  t: (key: string) => string;
}) => {
  const [step, setStep] = useState(0);
  const steps = [
    { label: t('fonctionnalites.animations.banks'), Icon: Landmark },
    { label: t('fonctionnalites.animations.income'), Icon: Wallet },
    { label: t('fonctionnalites.animations.fixedExpenses'), Icon: Receipt },
    { label: t('fonctionnalites.animations.rituals'), Icon: RotateCcw }
  ];

  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      return;
    }
    // Animation progressive : chaque étape apparaît l'une après l'autre
    // Durée totale : ~5 secondes (4 étapes × 1s + état final 1s)
    const timers = steps.map((_, i) => 
      setTimeout(() => setStep(i + 1), 800 + i * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, [isOpen, steps.length]);

  const allCompleted = step === steps.length;
  
  return (
    <div className="mt-4 mb-2">
      {/* Liste des étapes avec apparition progressive */}
      <div className="space-y-2">
        {steps.map((stepItem, i) => {
          const StepIcon = stepItem.Icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{
                opacity: step > i ? 1 : 0.25,
                x: step > i ? 0 : -12
              }}
              transition={{
                duration: 0.35,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                step > i ? 'bg-primary/10' : 'bg-muted/50'
              }`}
            >
              <StepIcon className={`w-5 h-5 ${step > i ? 'text-primary' : 'text-muted-foreground'}`} />
            <span className={`flex-1 text-sm font-medium ${
              step > i ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {stepItem.label}
            </span>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: step > i ? 1 : 0,
                scale: step > i ? 1 : 0.5
              }}
              transition={{
                duration: 0.25,
                delay: step > i ? 0.15 : 0,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              <Check className="w-4 h-4 text-primary" />
            </motion.div>
          </motion.div>
          );
        })}
      </div>

      {/* État final : Profil complété */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: allCompleted ? 1 : 0,
          y: allCompleted ? 0 : 8
        }}
        transition={{
          duration: 0.35,
          delay: allCompleted ? 0.3 : 0,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        className="mt-4 text-center"
      >
        <div className="inline-flex items-center gap-2 bg-primary/15 text-primary px-4 py-2 rounded-full">
          <Check className="w-4 h-4" />
          <span className="text-sm font-medium">{t('fonctionnalites.animations.profileComplete')}</span>
        </div>
      </motion.div>

      {/* Texte de clôture */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: allCompleted ? 1 : 0 }}
        transition={{
          duration: 0.3,
          delay: allCompleted ? 0.5 : 0,
          ease: "easeOut"
        }}
        className="mt-4 text-xs text-muted-foreground text-center leading-relaxed"
      >
        {t('fonctionnalites.animations.onboardingClosing')}
      </motion.p>
    </div>
  );
};

// Budget hierarchy animation - Structure de budget mensuel (Avril & Mai côte à côte)
const BudgetAnimation = ({
  isOpen,
  t
}: {
  isOpen: boolean;
  t: (key: string) => string;
}) => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      return;
    }
    // Animation progressive : mois → catégories → sous-catégories → 2ème mois
    // Durée totale : ~6 secondes
    const timers = [
      setTimeout(() => setStep(1), 400),   // Mois Avril apparaît
      setTimeout(() => setStep(2), 1000),  // 1ère catégorie
      setTimeout(() => setStep(3), 1600),  // 2ème catégorie
      setTimeout(() => setStep(4), 2200),  // 3ème catégorie
      setTimeout(() => setStep(5), 3000),  // Mois Mai apparaît
      setTimeout(() => setStep(6), 3600),  // Catégories Mai
      setTimeout(() => setStep(7), 4800)   // Texte de clôture
    ];
    return () => timers.forEach(clearTimeout);
  }, [isOpen]);

  // Données Avril
  const aprilCategories = [
    {
      name: t('fonctionnalites.animations.housing'),
      amount: "800 €",
      subs: [
        { label: t('fonctionnalites.animations.rent'), amount: "750 €" },
        { label: t('fonctionnalites.animations.insurance'), amount: "50 €" }
      ]
    },
    {
      name: t('fonctionnalites.animations.food'),
      amount: "400 €",
      subs: [
        { label: t('fonctionnalites.animations.groceries'), amount: "300 €" },
        { label: t('fonctionnalites.animations.restaurant'), amount: "100 €" }
      ]
    },
    {
      name: t('fonctionnalites.animations.leisure'),
      amount: "150 €",
      subs: [
        { label: t('fonctionnalites.animations.sports'), amount: "50 €" },
        { label: t('fonctionnalites.animations.outings'), amount: "100 €" }
      ]
    }
  ];

  // Données Mai (avec variations sur resto, sport, sorties)
  const mayCategories = [
    {
      name: t('fonctionnalites.animations.housing'),
      amount: "800 €",
      subs: [
        { label: t('fonctionnalites.animations.rent'), amount: "750 €" },
        { label: t('fonctionnalites.animations.insurance'), amount: "50 €" }
      ]
    },
    {
      name: t('fonctionnalites.animations.food'),
      amount: "450 €",
      subs: [
        { label: t('fonctionnalites.animations.groceries'), amount: "300 €" },
        { label: t('fonctionnalites.animations.restaurant'), amount: "150 €", changed: true }
      ]
    },
    {
      name: t('fonctionnalites.animations.leisure'),
      amount: "200 €",
      subs: [
        { label: t('fonctionnalites.animations.sports'), amount: "80 €", changed: true },
        { label: t('fonctionnalites.animations.outings'), amount: "120 €", changed: true }
      ]
    }
  ];

  const renderMonth = (
    monthKey: string, 
    categories: typeof aprilCategories, 
    showCondition: number, 
    catShowCondition: number
  ) => (
    <div className="flex-1 min-w-0">
      {/* En-tête du mois */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{
          opacity: step >= showCondition ? 1 : 0,
          y: step >= showCondition ? 0 : -8
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        className="text-center mb-3"
      >
        <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
          {t(`fonctionnalites.animations.${monthKey}`)}
        </span>
      </motion.div>

      {/* Catégories */}
      <div className="space-y-2">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{
              opacity: step >= catShowCondition + i ? 1 : 0,
              x: step >= catShowCondition + i ? 0 : -8
            }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            {/* Catégorie principale */}
            <div className="flex justify-between items-center bg-primary/10 rounded-lg px-2 py-1.5">
              <span className="font-medium text-foreground text-xs">{cat.name}</span>
              <span className="text-primary font-bold text-xs">{cat.amount}</span>
            </div>

            {/* Sous-catégories */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: step >= catShowCondition + i ? 1 : 0 }}
              transition={{
                duration: 0.25,
                delay: 0.1,
                ease: "easeOut"
              }}
              className="ml-2 mt-1 space-y-0.5"
            >
              {cat.subs.map((sub, j) => (
                <div
                  key={j}
                  className={`flex justify-between items-center text-[10px] rounded px-2 py-1 ${
                    (sub as any).changed 
                      ? 'bg-primary/5 text-primary' 
                      : 'bg-muted/30 text-muted-foreground'
                  }`}
                >
                  <span>{sub.label}</span>
                  <span className={`font-medium ${(sub as any).changed ? 'text-primary' : 'text-foreground/70'}`}>
                    {sub.amount}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mt-4 mb-2">
      {/* Deux mois côte à côte */}
      <div className="flex gap-3">
        {renderMonth('april', aprilCategories, 1, 2)}
        {renderMonth('may', mayCategories, 5, 6)}
      </div>

      {/* Texte de clôture */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 7 ? 1 : 0 }}
        transition={{
          duration: 0.3,
          delay: step >= 7 ? 0.2 : 0,
          ease: "easeOut"
        }}
        className="mt-4 text-xs text-muted-foreground text-center leading-relaxed"
      >
        {t('fonctionnalites.animations.budgetClosing')}
      </motion.p>
    </div>
  );
};

// Fixed transactions animation - calm vertical flow
const FixedTransactionsAnimation = ({
  isOpen,
  t
}: {
  isOpen: boolean;
  t: (key: string) => string;
}) => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      return;
    }
    // Animation unique sans boucle
    const timers = [0, 1, 2, 3, 4].map((i) => 
      setTimeout(() => setStep(i + 1), 200 + i * 400)
    );
    return () => timers.forEach(clearTimeout);
  }, [isOpen]);
  
  const transactions = [{
    day: "01",
    label: t('fonctionnalites.animations.rent'),
    amount: "-750€",
    type: "expense"
  }, {
    day: "05",
    label: t('fonctionnalites.animations.salary'),
    amount: "+2100€",
    type: "income"
  }, {
    day: "15",
    label: t('fonctionnalites.animations.netflix'),
    amount: "-15€",
    type: "expense"
  }, {
    day: "20",
    label: t('fonctionnalites.animations.electricity'),
    amount: "-80€",
    type: "expense"
  }];
  
  return <div className="mt-4 mb-2">
      <div className="space-y-2">
        {transactions.map((tx, i) => <motion.div 
          key={i} 
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: step > i ? 1 : 0.3,
            y: step > i ? 0 : -10
          }} 
          transition={{
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1]
          }} 
          className="flex items-center gap-3 bg-secondary rounded-lg px-3 py-2"
        >
            <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
              {tx.day}
            </span>
            <span className="flex-1 text-sm text-foreground">{tx.label}</span>
            <span className={`font-bold text-sm ${tx.type === "income" ? "text-primary" : "text-muted-foreground"}`}>
              {tx.amount}
            </span>
          </motion.div>)}
      </div>
    </div>;
};

// Daily transactions templates animation - calm selection effect
const DailyTransactionsAnimation = ({
  isOpen,
  t
}: {
  isOpen: boolean;
  t: (key: string) => string;
}) => {
  const [activeTemplate, setActiveTemplate] = useState<number | null>(null);
  useEffect(() => {
    if (!isOpen) {
      setActiveTemplate(null);
      return;
    }
    // Animation unique sans boucle - sélection progressive
    const timers = [
      setTimeout(() => setActiveTemplate(0), 400),
      setTimeout(() => setActiveTemplate(1), 1200),
      setTimeout(() => setActiveTemplate(2), 2000)
    ];
    return () => timers.forEach(clearTimeout);
  }, [isOpen]);
  
  const templates = [{
    emoji: "🛒",
    label: t('fonctionnalites.animations.shopping'),
    amount: "45€"
  }, {
    emoji: "☕",
    label: t('fonctionnalites.animations.coffee'),
    amount: "3,50€"
  }, {
    emoji: "⛽",
    label: t('fonctionnalites.animations.gas'),
    amount: "60€"
  }];
  
  return <div className="mt-4 mb-2">
      <div className="flex flex-col gap-2">
        {templates.map((template, i) => <motion.div 
          key={i} 
          initial={{ opacity: 0, y: 8 }}
          animate={{
            opacity: 1,
            y: 0,
            backgroundColor: activeTemplate === i ? "hsl(var(--primary) / 0.15)" : "hsl(var(--primary) / 0.1)"
          }} 
          transition={{
            delay: i * 0.1,
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1]
          }} 
          className="flex items-center gap-3 rounded-xl p-3 cursor-pointer"
        >
            <div className="text-2xl">{template.emoji}</div>
            <div className="flex-1 text-sm font-medium text-foreground">{template.label}</div>
            <motion.div 
              animate={{
                opacity: activeTemplate !== null && activeTemplate >= i ? 1 : 0.5
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="text-sm text-primary font-bold"
            >
              {template.amount}
            </motion.div>
          </motion.div>)}
      </div>
      <motion.div 
        animate={{ opacity: activeTemplate !== null ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="mt-3 text-center text-xs text-primary"
      >
        {t('fonctionnalites.animations.tapToAdd')}
      </motion.div>
    </div>;
};

// Gauge animation - calm progressive reveal
const GaugeAnimation = ({
  isOpen,
  t
}: {
  isOpen: boolean;
  t: (key: string) => string;
}) => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      return;
    }
    // Animation unique sans boucle
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 900),
      setTimeout(() => setStep(3), 1500)
    ];
    return () => timers.forEach(clearTimeout);
  }, [isOpen]);
  
  const spentWidth = 45,
    currentWidth = 20,
    remainingWidth = 35;
    
  return <div className="mt-4 mb-2">
      <div className="relative h-8 bg-muted rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: step >= 1 ? `${spentWidth}%` : 0 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1]
          }} 
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-primary/80" 
        />
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: step >= 2 ? `${currentWidth}%` : 0 }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1]
          }} 
          style={{ left: `${spentWidth}%` }}
          className="absolute top-0 h-full bg-gradient-to-r from-primary/60 to-primary/40"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 3 ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            left: `${spentWidth + currentWidth}%`,
            width: `${remainingWidth}%`
          }}
          className="absolute top-0 h-full bg-gradient-to-r from-muted-foreground/20 to-muted-foreground/10" 
        />
      </div>
      <div className="flex justify-between mt-3 text-xs">
        <motion.div 
          animate={{ opacity: step >= 1 ? 1 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex items-center gap-1"
        >
          <span className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-primary font-medium">{t('fonctionnalites.animations.spent')}</span>
        </motion.div>
        <motion.div 
          animate={{ opacity: step >= 2 ? 1 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex items-center gap-1"
        >
          <span className="w-3 h-3 rounded-full bg-primary/60" />
          <span className="text-primary/80 font-medium">{t('fonctionnalites.animations.inProgress')}</span>
        </motion.div>
        <motion.div 
          animate={{ opacity: step >= 3 ? 1 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex items-center gap-1"
        >
          <span className="w-3 h-3 rounded-full bg-muted-foreground/30" />
          <span className="text-muted-foreground font-medium">{t('fonctionnalites.animations.remaining')}</span>
        </motion.div>
      </div>
      <motion.div 
        animate={{ opacity: step >= 2 ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="mt-3 text-center"
      >
        <span className="text-lg font-bold text-primary/80">-25€</span>
        <span className="text-muted-foreground text-sm ml-2">→</span>
        <motion.span 
          animate={{ opacity: step >= 3 ? 1 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="text-lg font-bold text-primary ml-2"
        >
          175€
        </motion.span>
      </motion.div>
    </div>;
};

// Rituals/habits animation - calm progression
const RitualsAnimation = ({
  isOpen,
  t
}: {
  isOpen: boolean;
  t: (key: string) => string;
}) => {
  const [checks, setChecks] = useState([false, false, false, false, false, false, false]);
  useEffect(() => {
    if (!isOpen) {
      setChecks([false, false, false, false, false, false, false]);
      return;
    }
    // Animation unique sans boucle
    const timers = checks.map((_, i) => setTimeout(() => setChecks(c => {
      const n = [...c];
      n[i] = true;
      return n;
    }), 300 + i * 300));
    return () => timers.forEach(clearTimeout);
  }, [isOpen]);
  
  const days = ["L", "M", "M", "J", "V", "S", "D"];
  const completedCount = checks.filter(Boolean).length;
  
  return <div className="mt-4 mb-2">
      <div className="text-xs text-foreground font-medium mb-2 text-center">{t('fonctionnalites.animations.checkExpenses')}</div>
      <div className="flex justify-center gap-2">
        {days.map((d, i) => <motion.div 
          key={i} 
          animate={{
            backgroundColor: checks[i] ? "hsl(var(--primary))" : "hsl(var(--muted))"
          }} 
          transition={{
            duration: 0.25,
            ease: [0.25, 0.1, 0.25, 1]
          }} 
          className="w-8 h-8 rounded-full flex items-center justify-center"
        >
            {checks[i] ? <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
                <Check className="w-4 h-4 text-primary-foreground" />
              </motion.div> : <span className="text-xs font-medium text-muted-foreground">{d}</span>}
          </motion.div>)}
      </div>
      <motion.div 
        animate={{ opacity: completedCount >= 5 ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="mt-3 text-center text-xs text-primary font-medium"
      >
        {t('fonctionnalites.animations.consecutiveDays')}
      </motion.div>
    </div>;
};

// Indicators animation - calm progressive reveal
const IndicatorsAnimation = ({
  isOpen,
  t
}: {
  isOpen: boolean;
  t: (key: string) => string;
}) => {
  const [values, setValues] = useState([0, 0, 0]);
  useEffect(() => {
    if (!isOpen) {
      setValues([0, 0, 0]);
      return;
    }
    const targetValues = [75, 45, 90];
    const timers = targetValues.map((target, i) => setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        current += 5;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        setValues(v => {
          const n = [...v];
          n[i] = current;
          return n;
        });
      }, 25);
    }, i * 250));
    return () => timers.forEach(clearTimeout);
  }, [isOpen]);
  
  const indicators = [{
    label: t('fonctionnalites.animations.budgetUsed'),
    value: values[0]
  }, {
    label: t('fonctionnalites.animations.savings'),
    value: values[1]
  }, {
    label: t('fonctionnalites.animations.ritualsLabel'),
    value: values[2]
  }];
  
  return <div className="mt-4 mb-2 space-y-3">
      {indicators.map((ind, i) => <motion.div 
        key={i} 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: i * 0.15,
          duration: 0.25,
          ease: "easeOut"
        }}
      >
          <div className="flex justify-between text-xs mb-1">
            <span className="text-foreground font-medium">{ind.label}</span>
            <span className="text-primary font-bold">{ind.value}%</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${ind.value}%` }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1]
              }} 
              className="h-full bg-primary rounded-full"
            />
          </div>
        </motion.div>)}
    </div>;
};

// Future Feature Card component with expandable animation
const FutureFeatureCard = ({
  icon,
  title,
  promise,
  delay,
  sounds,
  animation,
  t
}: {
  icon: "folder-kanban" | "users" | "building-2";
  title: string;
  promise: string;
  delay: number;
  sounds: ReturnType<typeof useSoundEffects>;
  animation: React.ReactNode;
  t: (key: string) => string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const IconComponent = icon === "folder-kanban" ? FolderKanban : icon === "users" ? Users : Building2;

  return (
    <div
      onClick={handleToggle}
      className={`group bg-card/60 border border-border/50 rounded-xl p-6 relative overflow-hidden transition-all duration-300 cursor-pointer ${
        isOpen ? 'shadow-lg shadow-primary/10 border-primary/30 h-auto' : 'hover:shadow-lg hover:shadow-primary/5 h-[160px]'
      }`}
    >
      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* À venir badge */}
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: delay + 0.2 }}
        className="absolute top-4 right-4 text-[10px] font-medium text-muted-foreground/60 bg-muted/50 px-2 py-1 rounded-full"
      >
        {t('fonctionnalites.comingSoon')}
      </motion.span>

      {/* Header */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0"
            whileHover={{ scale: 1.1 }}
            animate={{ rotate: isOpen ? [0, 5, -5, 0] : 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 25 }}
          >
            <motion.div
              animate={{ 
                opacity: isOpen ? 1 : 0.6,
                scale: isOpen ? 1.1 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              <IconComponent className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          </motion.div>

          <div className="flex items-center gap-2">
            <h3 className="text-base font-medium text-foreground/80">
              {title}
            </h3>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-muted-foreground/50"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground/70 leading-relaxed">
          {promise}
        </p>
      </div>

      {/* Expandable animation area */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="pt-4 mt-4 border-t border-border/30"
            >
              {animation}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 0 : 0.5 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground/50"
      >
        {t('fonctionnalites.clickForPreview')}
      </motion.div>
    </div>
  );
};

// Animation renderer
const FeatureAnimation = ({
  type,
  isOpen,
  t
}: {
  type: AnimationType;
  isOpen: boolean;
  t: (key: string) => string;
}) => {
  switch (type) {
    case "onboarding":
      return <OnboardingAnimation isOpen={isOpen} t={t} />;
    case "budget":
      return <BudgetAnimation isOpen={isOpen} t={t} />;
    case "fixed":
      return <FixedTransactionsAnimation isOpen={isOpen} t={t} />;
    case "daily":
      return <DailyTransactionsAnimation isOpen={isOpen} t={t} />;
    case "gauge":
      return <GaugeAnimation isOpen={isOpen} t={t} />;
    case "rituals":
      return <RitualsAnimation isOpen={isOpen} t={t} />;
    case "indicators":
      return <IndicatorsAnimation isOpen={isOpen} t={t} />;
    default:
      return null;
  }
};

// Get animation variants based on direction - calm, professional easing
const getCardAnimationVariants = (direction: AnimationDirection, isFuture: boolean = false) => {
  // Future features: slower, more subtle animations
  const baseDuration = isFuture ? 0.4 : 0.3;
  const baseOpacity = isFuture ? 0.95 : 1;
  
  switch (direction) {
    case "horizontal":
      return {
        hidden: {
          opacity: 0,
          x: -15
        },
        visible: {
          opacity: baseOpacity,
          x: 0
        },
        exit: {
          opacity: 0,
          x: 15
        }
      };
    case "vertical":
      return {
        hidden: {
          opacity: 0,
          y: -10
        },
        visible: {
          opacity: baseOpacity,
          y: 0
        },
        exit: {
          opacity: 0,
          y: 10
        }
      };
    case "pulse":
      return {
        hidden: {
          opacity: 0
        },
        visible: {
          opacity: baseOpacity
        },
        exit: {
          opacity: 0
        }
      };
  }
};
const FeatureCard = ({
  feature,
  isOpen,
  onToggle,
  sounds,
  isLarge = false,
  isExplored = false,
  t
}: {
  feature: Feature;
  isOpen: boolean;
  onToggle: () => void;
  sounds: ReturnType<typeof useSoundEffects>;
  isLarge?: boolean;
  isExplored?: boolean;
  t: (key: string) => string;
}) => {
  const handleClick = () => {
    onToggle();
  };
  const variants = getCardAnimationVariants(feature.animationDirection);
  
  // Hauteur uniforme pour toutes les cartes fermées
  const closedHeight = 'h-[120px]';
  
  // Icône Lucide ou emoji de fallback
  const IconComponent = feature.icon;
  
  return (
    <motion.div 
      onClick={handleClick} 
      layout
      transition={{
        layout: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
      }}
      className={`cursor-pointer rounded-2xl border ${isOpen ? 'border-primary/30 shadow-md' : 'border-border/40 hover:border-border/60'} bg-card ${isLarge ? 'p-6' : 'p-5'} transition-colors duration-250 hover:shadow-sm relative ${isExplored && !isOpen ? 'opacity-90' : ''} ${isOpen ? '' : closedHeight}`}
    >
      {/* Badge "Découvert" - plus subtil */}
      <AnimatePresence>
        {isExplored && !isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute top-3 right-3 flex items-center gap-1 bg-muted text-muted-foreground text-[10px] font-medium px-2 py-0.5 rounded-full"
          >
            <Check className="w-2.5 h-2.5" />
            <span>{t('fonctionnalites.discovered')}</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex items-start gap-4">
        {/* Icône Lucide professionnelle ou emoji de fallback */}
        <div className="flex-shrink-0 mt-0.5 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          {IconComponent ? (
            <IconComponent className="w-5 h-5 text-primary" strokeWidth={1.5} />
          ) : (
            <span className="text-2xl">{feature.emoji}</span>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          {/* Header : titre + chevron */}
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-semibold text-foreground leading-tight">
              {feature.title}
            </h3>
            
            {/* Chevron avec rotation calme */}
            <motion.div 
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex-shrink-0 text-muted-foreground/60"
            >
              <svg width="18" height="18" viewBox="0 0 12 12" fill="none">
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </div>
          
          {/* Micro-promesse - visible uniquement en état fermé */}
          <motion.p 
            animate={{
              opacity: isOpen ? 0 : 1,
              height: isOpen ? 0 : 'auto'
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="text-sm text-muted-foreground mt-1.5 leading-relaxed overflow-hidden"
          >
            {feature.microPromise}
          </motion.p>
          
          {/* Indice d'interaction - uniquement en état fermé */}
          <motion.span
            animate={{ opacity: isOpen ? 0 : 0.4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="text-[10px] text-muted-foreground/50 mt-2 block"
          >
            {t('fonctionnalites.clickForPreview')}
          </motion.span>
        </div>
      </div>
      
      {/* Contenu déplié - animations calmes et progressives */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.25, 0.1, 0.25, 1], // ease-out doux
              opacity: { duration: 0.25, delay: 0.05 }
            }} 
            className="overflow-hidden"
          >
            {/* Animation du contenu avec apparition progressive */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ 
                duration: 0.25, 
                delay: 0.1,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              <FeatureAnimation type={feature.animation} isOpen={isOpen} t={t} />
            </motion.div>
            
            {/* Texte détaillé avec délai supplémentaire */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.2, 
                delay: 0.2,
                ease: "easeOut"
              }}
              className="mt-4 text-sm text-muted-foreground leading-relaxed pt-4 border-t border-border/30"
            >
              {feature.details}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
const Fonctionnalites = () => {
  const { t } = useTranslation();
  const sounds = useSoundEffects();
  const [openCardId, setOpenCardId] = useState<string | null>(null);
  const [exploredCards, setExploredCards] = useState<Set<string>>(new Set());
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const groupRefs = useRef<(HTMLDivElement | null)[]>([]);

  const featureGroups: FeatureGroup[] = [{
    label: t('fonctionnalites.step1'),
    title: t('fonctionnalites.start'),
    isLarge: true,
    features: [{
      icon: Crosshair,
      title: t('fonctionnalites.features.onboarding.title'),
      microPromise: t('fonctionnalites.features.onboarding.microPromise'),
      details: t('fonctionnalites.features.onboarding.details'),
      bgColor: "bg-primary/5",
      borderColor: "border-primary/20",
      textColor: "text-primary",
      animation: "onboarding",
      animationDirection: "horizontal"
    }, {
      icon: LayoutGrid,
      title: t('fonctionnalites.features.budget.title'),
      microPromise: t('fonctionnalites.features.budget.microPromise'),
      details: t('fonctionnalites.features.budget.details'),
      bgColor: "bg-secondary",
      borderColor: "border-primary/15",
      textColor: "text-primary",
      animation: "budget",
      animationDirection: "horizontal"
    }]
  }, {
    label: t('fonctionnalites.step2'),
    title: t('fonctionnalites.follow'),
    features: [{
      icon: RefreshCcw,
      title: t('fonctionnalites.features.fixed.title'),
      microPromise: t('fonctionnalites.features.fixed.microPromise'),
      details: t('fonctionnalites.features.fixed.details'),
      bgColor: "bg-card",
      borderColor: "border-border",
      textColor: "text-foreground",
      animation: "fixed",
      animationDirection: "vertical"
    }, {
      icon: ClipboardList,
      title: t('fonctionnalites.features.daily.title'),
      microPromise: t('fonctionnalites.features.daily.microPromise'),
      details: t('fonctionnalites.features.daily.details'),
      bgColor: "bg-primary/5",
      borderColor: "border-primary/20",
      textColor: "text-primary",
      animation: "daily",
      animationDirection: "vertical"
    }, {
      icon: Gauge,
      title: t('fonctionnalites.features.level.title'),
      microPromise: t('fonctionnalites.features.level.microPromise'),
      details: t('fonctionnalites.features.level.details'),
      bgColor: "bg-secondary",
      borderColor: "border-primary/15",
      textColor: "text-foreground",
      animation: "gauge",
      animationDirection: "pulse"
    }]
  }, {
    label: t('fonctionnalites.step3'),
    title: t('fonctionnalites.adjustLast'),
    features: [{
      icon: CalendarCheck,
      title: t('fonctionnalites.features.rituals.title'),
      microPromise: t('fonctionnalites.features.rituals.microPromise'),
      details: t('fonctionnalites.features.rituals.details'),
      bgColor: "bg-card",
      borderColor: "border-border",
      textColor: "text-foreground",
      animation: "rituals",
      animationDirection: "pulse"
    }, {
      icon: BarChart3,
      title: t('fonctionnalites.features.indicators.title'),
      microPromise: t('fonctionnalites.features.indicators.microPromise'),
      details: t('fonctionnalites.features.indicators.details'),
      bgColor: "bg-primary/5",
      borderColor: "border-primary/20",
      textColor: "text-primary",
      animation: "indicators",
      animationDirection: "pulse"
    }]
  }];
  const handleToggleCard = (groupIndex: number, featureIndex: number) => {
    const cardId = `${groupIndex}-${featureIndex}`;
    // Mark as explored when opening
    if (openCardId !== cardId) {
      setExploredCards(prev => new Set(prev).add(cardId));
    }
    setOpenCardId(prev => prev === cardId ? null : cardId);
  };

  // Track which group is currently in view
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (let i = groupRefs.current.length - 1; i >= 0; i--) {
        const element = groupRefs.current[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveGroupIndex(i);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true
    });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return <div className="min-h-screen bg-background">
      <SEO
        title="Fonctionnalités - Comment bien gérer son budget"
        description="Découvrez les fonctionnalités Steero pour mieux gérer votre argent : budget personnalisé, saisie intuitive des dépenses, rituels financiers. Plus simple qu'un tableau Excel, plus efficace que les apps bancaires."
        keywords="fonctionnalités gestion budget, application budget, gérer son argent facilement, alternative excel budget, suivi dépenses, rituel financier"
        canonical="/fonctionnalites"
      />
      <Header />
      
      {/* Progress Sidebar */}
      <ProgressSidebar groups={featureGroups} activeIndex={activeGroupIndex} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-6">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t('fonctionnalites.heroTitle')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('fonctionnalites.heroSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature Groups */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:pl-20 lg:pl-28 space-y-24">
          {featureGroups.map((group, groupIndex) => <motion.div key={groupIndex} id={`group-${groupIndex}`} ref={el => groupRefs.current[groupIndex] = el} initial={{
          opacity: 0,
          y: 60,
          scale: 0.95
        }} whileInView={{
          opacity: 1,
          y: 0,
          scale: 1
        }} viewport={{
          once: true,
          margin: "-100px"
        }} transition={{
          duration: 0.7,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1]
        }} className="relative scroll-mt-32">
              {/* Decorative connector line between groups */}
              {groupIndex < featureGroups.length - 1 && <motion.div initial={{
            scaleY: 0,
            opacity: 0
          }} whileInView={{
            scaleY: 1,
            opacity: 1
          }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.8,
            delay: 0.5,
            ease: "easeOut"
          }} className="absolute left-1/2 -bottom-16 w-px h-12 bg-gradient-to-b from-primary/30 to-transparent origin-top" />}
              
              {/* Group Header */}
              <motion.div initial={{
            opacity: 0,
            x: -20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }} className="flex items-center gap-4 mb-8">
                <motion.span initial={{
              scale: 0,
              rotate: -180
            }} whileInView={{
              scale: 1,
              rotate: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: 0.3,
              type: "spring",
              stiffness: 200
            }} className="text-xs font-semibold text-primary/60 uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">
                  {group.label}
                </motion.span>
                <motion.h2 initial={{
              opacity: 0,
              y: 10
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.4,
              delay: 0.4
            }} className="text-2xl md:text-3xl font-bold text-foreground">
                  {group.title}
                </motion.h2>
              </motion.div>
              
              {/* Feature Cards Grid with staggered animation */}
              <div className={`grid gap-6 items-start ${group.isLarge ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                {group.features.map((feature, featureIndex) => <motion.div key={featureIndex} layout initial={{
              opacity: 0,
              y: 40,
              scale: 0.9
            }} whileInView={{
              opacity: 1,
              y: 0,
              scale: 1
            }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.5,
              delay: 0.2 + featureIndex * 0.1,
              ease: [0.22, 1, 0.36, 1]
            }}>
                    <FeatureCard feature={feature} isOpen={openCardId === `${groupIndex}-${featureIndex}`} onToggle={() => handleToggleCard(groupIndex, featureIndex)} sounds={sounds} isLarge={group.isLarge} isExplored={exploredCards.has(`${groupIndex}-${featureIndex}`)} t={t} />
                  </motion.div>)}
              </div>
            </motion.div>)}
        </div>
      </section>

      {/* Future Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6 md:pl-20 lg:pl-28">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="max-w-3xl mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground/80 mb-4">
              {t('fonctionnalites.futureTitle')}
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              {t('fonctionnalites.futureSubtitle')}
            </p>
          </motion.div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-3 items-start">
            {/* Projets financiers */}
            <FutureFeatureCard
              icon="folder-kanban"
              title={t('fonctionnalites.futureFeatures.projects.title')}
              promise={t('fonctionnalites.futureFeatures.projects.promise')}
              delay={0.1}
              sounds={sounds}
              t={t}
              animation={
                <div className="relative w-full flex flex-col items-center gap-3">
                  {/* Projet Vacances */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="w-full bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 p-4"
                  >
                    {/* Header avec titre et montant */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">✈️</span>
                        <span className="text-sm font-semibold text-foreground">{t('fonctionnalites.animations.projectVacances')}</span>
                      </div>
                      <motion.span 
                        className="text-base font-bold text-primary"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        2 300 €
                      </motion.span>
                    </div>

                    {/* Progress bar */}
                    <motion.div 
                      className="h-2 bg-muted rounded-full overflow-hidden mb-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.35 }}
                    >
                      <motion.div 
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "65%" }}
                        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                      />
                    </motion.div>
                    <motion.div 
                      className="flex justify-between text-[10px] text-muted-foreground mb-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <span>{t('fonctionnalites.animations.projectConsumed')}: <span className="text-primary font-medium">1 495 €</span></span>
                      <span>{t('fonctionnalites.animations.projectRemaining')}: <span className="font-medium">805 €</span></span>
                    </motion.div>

                    {/* Liste des budgets avec montants */}
                    <div className="space-y-1.5">
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                          <span>{t('fonctionnalites.animations.projectLodging')}</span>
                          <span className="text-muted-foreground/50">({t('fonctionnalites.animations.budgetLeisure')})</span>
                        </div>
                        <span className="text-foreground/80 font-medium">1 100 €</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                          <span>{t('fonctionnalites.animations.projectTransport')}</span>
                          <span className="text-muted-foreground/50">({t('fonctionnalites.animations.budgetTransport')})</span>
                        </div>
                        <span className="text-foreground/80 font-medium">650 €</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 }}
                        className="flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                          <span>{t('fonctionnalites.animations.projectOnSite')}</span>
                          <span className="text-muted-foreground/50">({t('fonctionnalites.animations.budgetDaily')})</span>
                        </div>
                        <span className="text-foreground/80 font-medium">550 €</span>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Texte de clôture */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="text-[11px] text-center text-muted-foreground/80 italic px-2"
                  >
                    {t('fonctionnalites.animations.projectClosing')}
                  </motion.p>
                </div>
              }
            />

            {/* Tiers & avances */}
            <FutureFeatureCard
              icon="users"
              title={t('fonctionnalites.futureFeatures.tiers.title')}
              promise={t('fonctionnalites.futureFeatures.tiers.promise')}
              delay={0.2}
              sounds={sounds}
              t={t}
              animation={
                <div className="relative w-full flex flex-col gap-3">
                  {/* Section: Mes avoirs - Ce qu'on me doit */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="space-y-1.5"
                  >
                    <p className="text-[10px] font-medium text-foreground/70 mb-1">{t('fonctionnalites.animations.tiersOwedToMe')}</p>
                    
                    {/* Marie - Vacances */}
                    <motion.div
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center justify-between bg-primary/5 rounded-lg px-3 py-1.5 border border-primary/20"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">👤</span>
                        <div>
                          <p className="text-[10px] font-medium text-foreground/80">Marie</p>
                          <p className="text-[8px] text-muted-foreground">{t('fonctionnalites.animations.tiersVacationShare')}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-primary">+45 €</span>
                    </motion.div>

                    {/* Lucas - Restaurant */}
                    <motion.div
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center justify-between bg-primary/5 rounded-lg px-3 py-1.5 border border-primary/20"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">👤</span>
                        <div>
                          <p className="text-[10px] font-medium text-foreground/80">Lucas</p>
                          <p className="text-[8px] text-muted-foreground">{t('fonctionnalites.animations.tiersRestaurant')}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-primary">+32 €</span>
                    </motion.div>

                    {/* Employeur - Notes de frais */}
                    <motion.div
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center justify-between bg-primary/5 rounded-lg px-3 py-1.5 border border-primary/20"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">🏢</span>
                        <div>
                          <p className="text-[10px] font-medium text-foreground/80">{t('fonctionnalites.animations.tiersEmployer')}</p>
                          <p className="text-[8px] text-muted-foreground">{t('fonctionnalites.animations.tiersExpenseReports')}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-primary">+250 €</span>
                    </motion.div>
                  </motion.div>

                  {/* Section: Mes dettes - Ce que je dois */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="space-y-1.5"
                  >
                    <p className="text-[10px] font-medium text-foreground/70 mb-1">{t('fonctionnalites.animations.tiersIOwe')}</p>
                    
                    {/* Paul - Cadeau groupe */}
                    <motion.div
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex items-center justify-between bg-destructive/5 rounded-lg px-3 py-1.5 border border-destructive/20"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">👤</span>
                        <div>
                          <p className="text-[10px] font-medium text-foreground/80">Paul</p>
                          <p className="text-[8px] text-muted-foreground">{t('fonctionnalites.animations.tiersGroupGift')}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-destructive">-20 €</span>
                    </motion.div>
                  </motion.div>

                  {/* Solde trésorerie */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex justify-between items-center pt-2 border-t border-border/30"
                  >
                    <span className="text-[10px] text-muted-foreground">{t('fonctionnalites.animations.tiersTreasuryBalance')}</span>
                    <span className="text-xs font-bold text-primary">+307 €</span>
                  </motion.div>

                  {/* Texte de clôture */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="text-[11px] text-center text-muted-foreground/80 italic px-2"
                  >
                    {t('fonctionnalites.animations.tiersClosing')}
                  </motion.p>
                </div>
              }
            />

            {/* Patrimoine */}
            <FutureFeatureCard
              icon="building-2"
              title={t('fonctionnalites.futureFeatures.patrimoine.title')}
              promise={t('fonctionnalites.futureFeatures.patrimoine.promise')}
              delay={0.3}
              sounds={sounds}
              t={t}
              animation={
                <div className="relative w-full flex flex-col gap-3">
                  {/* Section: Actifs */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="space-y-1.5"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[10px] font-medium text-foreground/70">{t('fonctionnalites.animations.patrimoineAssets')}</p>
                      <span className="text-[10px] font-semibold text-primary">+192 630 €</span>
                    </div>
                    
                    {/* Appartement */}
                    <motion.div
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center justify-between bg-primary/5 rounded-lg px-3 py-1.5 border border-primary/20"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">🏠</span>
                        <div>
                          <p className="text-[10px] font-medium text-foreground/80">{t('fonctionnalites.animations.patrimoineApartment')}</p>
                          <p className="text-[8px] text-muted-foreground">{t('fonctionnalites.animations.patrimoineRealEstate')}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-primary">+180 000 €</span>
                    </motion.div>

                    {/* Comptes courants et épargnes */}
                    <motion.div
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center justify-between bg-primary/5 rounded-lg px-3 py-1.5 border border-primary/20"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">💰</span>
                        <div>
                          <p className="text-[10px] font-medium text-foreground/80">{t('fonctionnalites.animations.patrimoineAccounts')}</p>
                          <p className="text-[8px] text-muted-foreground">{t('fonctionnalites.animations.patrimoineLiquidity')}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-primary">+7 630 €</span>
                    </motion.div>

                    {/* Actions & ETF */}
                    <motion.div
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center justify-between bg-primary/5 rounded-lg px-3 py-1.5 border border-primary/20"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">📈</span>
                        <div>
                          <p className="text-[10px] font-medium text-foreground/80">{t('fonctionnalites.animations.patrimoineStocksETF')}</p>
                          <p className="text-[8px] text-muted-foreground">{t('fonctionnalites.animations.patrimoineInvestments')}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-primary">+5 000 €</span>
                    </motion.div>
                  </motion.div>

                  {/* Section: Passifs */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="space-y-1.5"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[10px] font-medium text-foreground/70">{t('fonctionnalites.animations.patrimoineLiabilities')}</p>
                      <span className="text-[10px] font-semibold text-destructive">-156 000 €</span>
                    </div>
                    
                    {/* Crédit immobilier */}
                    <motion.div
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex items-center justify-between bg-destructive/5 rounded-lg px-3 py-1.5 border border-destructive/20"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">🏦</span>
                        <div>
                          <p className="text-[10px] font-medium text-foreground/80">{t('fonctionnalites.animations.patrimoineMortgage')}</p>
                          <p className="text-[8px] text-muted-foreground">{t('fonctionnalites.animations.patrimoineApartmentDebt')}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-destructive">-156 000 €</span>
                    </motion.div>
                  </motion.div>

                  {/* Patrimoine net avec évolution */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="pt-2 border-t border-border/30"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-medium text-foreground/80">{t('fonctionnalites.animations.patrimoineNetWorth')}</span>
                      <motion.span 
                        className="text-sm font-bold text-primary"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        +36 630 €
                      </motion.span>
                    </div>
                    
                    {/* Timeline d'évolution */}
                    <div className="flex items-center gap-1 mt-2">
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.0 }}
                        className="flex flex-col items-center"
                      >
                        <span className="text-[7px] text-muted-foreground/60">2024</span>
                        <div className="w-2 h-2 rounded-full bg-primary/30" />
                        <span className="text-[7px] text-muted-foreground/80">+12k</span>
                      </motion.div>
                      <motion.div 
                        className="flex-1 h-0.5 bg-gradient-to-r from-primary/30 to-primary/50"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1.1, duration: 0.4 }}
                        style={{ originX: 0 }}
                      />
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2 }}
                        className="flex flex-col items-center"
                      >
                        <span className="text-[7px] text-muted-foreground/60">2025</span>
                        <div className="w-2 h-2 rounded-full bg-primary/50" />
                        <span className="text-[7px] text-muted-foreground/80">+24k</span>
                      </motion.div>
                      <motion.div 
                        className="flex-1 h-0.5 bg-gradient-to-r from-primary/50 to-primary"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1.3, duration: 0.4 }}
                        style={{ originX: 0 }}
                      />
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.4, type: "spring", stiffness: 200 }}
                        className="flex flex-col items-center"
                      >
                        <span className="text-[7px] text-primary font-medium">2026</span>
                        <motion.div 
                          className="w-3 h-3 rounded-full bg-primary"
                          animate={{ boxShadow: ["0 0 0 0 hsl(var(--primary) / 0.4)", "0 0 0 4px hsl(var(--primary) / 0)", "0 0 0 0 hsl(var(--primary) / 0.4)"] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-[7px] text-primary font-semibold">+37k</span>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Texte de clôture */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="text-[11px] text-center text-muted-foreground/80 italic px-2"
                  >
                    {t('fonctionnalites.animations.patrimoineClosing')}
                  </motion.p>
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card">
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
          duration: 0.6
        }} className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t('fonctionnalites.ctaTitle')}
            </h2>
            <p className="text-muted-foreground mb-8">
              {t('fonctionnalites.ctaSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group">
                <a href="/#cta">
                  {t('common.joinWaitlist')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/pourquoi-steero">
                  {t('common.discoverApproach')}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Fonctionnalites;