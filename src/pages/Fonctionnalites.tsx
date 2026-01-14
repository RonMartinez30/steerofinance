import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
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
        stiffness: 300
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
// featureGroups is now defined inside the component to use translations

// Onboarding steps animation - horizontal direction
const OnboardingAnimation = ({
  isOpen,
  t
}: {
  isOpen: boolean;
  t: (key: string) => string;
}) => {
  const [step, setStep] = useState(0);
  const steps = [
    t('fonctionnalites.animations.objectives'),
    t('fonctionnalites.animations.income'),
    t('fonctionnalites.animations.fixedExpenses'),
    t('fonctionnalites.animations.priorities')
  ];
  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      return;
    }
    const interval = setInterval(() => {
      setStep(s => (s + 1) % (steps.length + 1));
    }, 800);
    return () => clearInterval(interval);
  }, [isOpen, steps.length]);
  return <div className="mt-4 mb-2">
      <div className="flex items-center justify-between gap-2">
        {steps.map((label, i) => <div key={i} className="flex-1">
            <motion.div initial={{
          scaleX: 0,
          opacity: 0.3
        }} animate={{
          scaleX: step > i ? 1 : 0,
          opacity: step > i ? 1 : 0.4
        }} style={{
          originX: 0
        }} transition={{
          duration: 0.5,
          ease: "easeOut"
        }} className={`h-2 rounded-full mb-2 ${step > i ? 'bg-primary' : 'bg-muted'}`} />
            <motion.div initial={{
          opacity: 0,
          x: -10
        }} animate={{
          opacity: step > i ? 1 : 0.4,
          x: step > i ? 0 : -10
        }} transition={{
          duration: 0.3
        }} className="text-xs text-center font-medium text-primary">
              {step > i && <Check className="inline w-3 h-3 mr-1" />}
              {label}
            </motion.div>
          </div>)}
      </div>
      <motion.div initial={{
      opacity: 0,
      x: 20
    }} animate={{
      opacity: step === steps.length ? 1 : 0,
      x: step === steps.length ? 0 : 20
    }} className="mt-3 text-center text-sm font-medium text-primary">
        {t('fonctionnalites.animations.profileComplete')}
      </motion.div>
    </div>;
};

// Budget hierarchy animation - horizontal cascade
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
    const interval = setInterval(() => {
      setStep(s => (s + 1) % 4);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);
  const categories = [{
    name: t('fonctionnalites.animations.housing'),
    amount: "800€",
    sub: [`${t('fonctionnalites.animations.rent')} 750€`, `${t('fonctionnalites.animations.insurance')} 50€`]
  }, {
    name: t('fonctionnalites.animations.food'),
    amount: "400€",
    sub: [`${t('fonctionnalites.animations.groceries')} 300€`, `${t('fonctionnalites.animations.restaurant')} 100€`]
  }, {
    name: t('fonctionnalites.animations.leisure'),
    amount: "150€",
    sub: [`${t('fonctionnalites.animations.sports')} 50€`, `${t('fonctionnalites.animations.outings')} 100€`]
  }];
  return <div className="mt-4 mb-2 space-y-2">
      {categories.map((cat, i) => <motion.div key={i} initial={{
      opacity: 0,
      x: -30
    }} animate={{
      opacity: step >= i ? 1 : 0,
      x: step >= i ? 0 : -30
    }} transition={{
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut"
    }}>
          <div className="flex justify-between items-center bg-primary/10 rounded-lg px-3 py-2">
            <span className="font-medium text-foreground text-sm">{cat.name}</span>
            <span className="text-primary font-bold text-sm">{cat.amount}</span>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= i + 1 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="ml-4 mt-1 flex gap-1 h-6"
          >
            {cat.sub.map((sub, j) => <motion.div key={j} 
              initial={{ opacity: 0, x: -15 }}
              animate={{ 
                opacity: step >= i + 1 ? 1 : 0, 
                x: step >= i + 1 ? 0 : -15 
              }}
              transition={{
                delay: step >= i + 1 ? j * 0.15 : 0,
                duration: 0.3
              }} 
              className="text-xs text-primary bg-primary/5 rounded px-2 py-1 whitespace-nowrap"
            >
              {sub}
            </motion.div>)}
          </motion.div>
        </motion.div>)}
    </div>;
};

// Fixed transactions animation - vertical flow
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
    const interval = setInterval(() => {
      setStep(s => (s + 1) % 5);
    }, 700);
    return () => clearInterval(interval);
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
        {transactions.map((tx, i) => <motion.div key={i} initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: step > i ? 1 : 0.3,
        y: step > i ? 0 : -20
      }} transition={{
        duration: 0.4,
        ease: "easeOut"
      }} className="flex items-center gap-3 bg-secondary rounded-lg px-3 py-2">
            <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
              {tx.day}
            </span>
            <span className="flex-1 text-sm text-foreground">{tx.label}</span>
            <motion.span initial={{
          scale: 0.8
        }} animate={{
          scale: step > i ? 1 : 0.8
        }} className={`font-bold text-sm ${tx.type === "income" ? "text-primary" : "text-muted-foreground"}`}>
              {tx.amount}
            </motion.span>
          </motion.div>)}
      </div>
    </div>;
};

// Daily transactions templates animation - vertical scroll effect
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
    const interval = setInterval(() => {
      setActiveTemplate(active => active === null ? 0 : active === 2 ? null : active + 1);
    }, 1000);
    return () => clearInterval(interval);
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
        {templates.map((template, i) => <motion.div key={i} initial={{
        opacity: 0,
        y: 15
      }} animate={{
        opacity: 1,
        y: 0,
        scale: activeTemplate === i ? 1.03 : 1,
        boxShadow: activeTemplate === i ? "0 4px 12px hsl(var(--primary) / 0.2)" : "none"
      }} transition={{
        delay: i * 0.1,
        duration: 0.3
      }} className="flex items-center gap-3 bg-primary/10 rounded-xl p-3 cursor-pointer">
            <div className="text-2xl">{template.emoji}</div>
            <div className="flex-1 text-sm font-medium text-foreground">{template.label}</div>
            <motion.div initial={{
          opacity: 0,
          x: 10
        }} animate={{
          opacity: activeTemplate === i ? 1 : 0.5,
          x: activeTemplate === i ? 0 : 10
        }} className="text-sm text-primary font-bold">
              {template.amount}
            </motion.div>
          </motion.div>)}
      </div>
      <motion.div animate={{
      opacity: activeTemplate !== null ? 1 : 0
    }} className="mt-3 text-center text-xs text-primary">
        {t('fonctionnalites.animations.tapToAdd')}
      </motion.div>
    </div>;
};

// Gauge animation - pulse effect
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
    const timers = [setTimeout(() => setStep(1), 300), setTimeout(() => setStep(2), 1200), setTimeout(() => setStep(3), 2100)];
    const loopTimer = setInterval(() => {
      setStep(0);
      setTimeout(() => setStep(1), 300);
      setTimeout(() => setStep(2), 1200);
      setTimeout(() => setStep(3), 2100);
    }, 4000);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loopTimer);
    };
  }, [isOpen]);
  const spentWidth = 45,
    currentWidth = 20,
    remainingWidth = 35;
  return <div className="mt-4 mb-2">
      <div className="relative h-8 bg-muted rounded-full overflow-hidden">
        <motion.div initial={{
        width: 0
      }} animate={{
        width: step >= 1 ? `${spentWidth}%` : 0
      }} transition={{
        duration: 0.6,
        ease: "easeOut"
      }} className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-primary/80" />
        <motion.div initial={{
        width: 0
      }} animate={{
        width: step >= 2 ? `${currentWidth}%` : 0,
        scale: step >= 2 ? [1, 1.02, 1] : 1
      }} transition={{
        width: {
          duration: 0.5,
          ease: "easeOut"
        },
        scale: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }} style={{
        left: `${spentWidth}%`
      }} className="absolute top-0 h-full bg-gradient-to-r from-primary/60 to-primary/40">
          {step >= 2 && <motion.div animate={{
          opacity: [0.3, 0.7, 0.3]
        }} transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut"
        }} className="absolute inset-0 bg-white/40" />}
        </motion.div>
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: step >= 3 ? 1 : 0
      }} transition={{
        duration: 0.4
      }} style={{
        left: `${spentWidth + currentWidth}%`,
        width: `${remainingWidth}%`
      }} className="absolute top-0 h-full bg-gradient-to-r from-muted-foreground/20 to-muted-foreground/10" />
      </div>
      <div className="flex justify-between mt-3 text-xs">
        <motion.div animate={{
        opacity: step >= 1 ? 1 : 0
      }} className="flex items-center gap-1">
          <motion.span animate={{
          scale: step === 1 ? [1, 1.2, 1] : 1
        }} transition={{
          duration: 0.3
        }} className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-primary font-medium">{t('fonctionnalites.animations.spent')}</span>
        </motion.div>
        <motion.div animate={{
        opacity: step >= 2 ? 1 : 0
      }} className="flex items-center gap-1">
          <motion.span animate={{
          scale: step >= 2 ? [1, 1.15, 1] : 1
        }} transition={{
          duration: 1.2,
          repeat: step >= 2 ? Infinity : 0,
          ease: "easeInOut"
        }} className="w-3 h-3 rounded-full bg-primary/60" />
          <span className="text-primary/80 font-medium">{t('fonctionnalites.animations.inProgress')}</span>
        </motion.div>
        <motion.div animate={{
        opacity: step >= 3 ? 1 : 0
      }} className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-muted-foreground/30" />
          <span className="text-muted-foreground font-medium">{t('fonctionnalites.animations.remaining')}</span>
        </motion.div>
      </div>
      <motion.div animate={{
      opacity: step >= 2 ? 1 : 0
    }} className="mt-3 text-center">
        <motion.span animate={{
        scale: step === 2 ? [1, 1.1, 1] : 1
      }} transition={{
        duration: 0.8,
        repeat: step === 2 ? Infinity : 0
      }} className="text-lg font-bold text-primary/80">
          -25€
        </motion.span>
        <span className="text-muted-foreground text-sm ml-2">→</span>
        <motion.span animate={{
        opacity: step >= 3 ? 1 : 0,
        scale: step >= 3 ? [1, 1.05, 1] : 1
      }} transition={{
        scale: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }} className="text-lg font-bold text-primary ml-2">
          175€
        </motion.span>
      </motion.div>
    </div>;
};

// Rituals/habits animation - soft pulse effect
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
    const timers = checks.map((_, i) => setTimeout(() => setChecks(c => {
      const n = [...c];
      n[i] = true;
      return n;
    }), 300 + i * 400));
    const resetTimer = setTimeout(() => setChecks([false, false, false, false, false, false, false]), 4000);
    const loopTimer = setInterval(() => {
      setChecks([false, false, false, false, false, false, false]);
      checks.forEach((_, i) => setTimeout(() => setChecks(c => {
        const n = [...c];
        n[i] = true;
        return n;
      }), 300 + i * 400));
    }, 5000);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(resetTimer);
      clearInterval(loopTimer);
    };
  }, [isOpen]);
  const days = ["L", "M", "M", "J", "V", "S", "D"];
  const completedCount = checks.filter(Boolean).length;
  return <div className="mt-4 mb-2">
      <div className="text-xs text-foreground font-medium mb-2 text-center">{t('fonctionnalites.animations.checkExpenses')}</div>
      <div className="flex justify-center gap-2">
        {days.map((d, i) => <motion.div key={i} animate={{
        backgroundColor: checks[i] ? "hsl(var(--primary))" : "hsl(var(--muted))",
        scale: checks[i] ? [1, 1.25, 1] : [1, 1.03, 1]
      }} transition={{
        duration: checks[i] ? 0.3 : 2,
        repeat: checks[i] ? 0 : Infinity,
        ease: "easeInOut"
      }} className="w-8 h-8 rounded-full flex items-center justify-center">
            {checks[i] ? <motion.div initial={{
          scale: 0,
          rotate: -180
        }} animate={{
          scale: 1,
          rotate: 0
        }} transition={{
          type: "spring",
          stiffness: 300
        }}>
                <Check className="w-4 h-4 text-primary-foreground" />
              </motion.div> : <span className="text-xs font-medium text-muted-foreground">{d}</span>}
          </motion.div>)}
      </div>
      <motion.div animate={{
      opacity: completedCount >= 5 ? 1 : 0,
      scale: completedCount >= 5 ? [1, 1.05, 1] : 1
    }} transition={{
      scale: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }} className="mt-3 text-center text-xs text-primary font-medium">
        {t('fonctionnalites.animations.consecutiveDays')}
      </motion.div>
    </div>;
};

// Indicators animation - soft pulse/breathing effect
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
      }, 30);
    }, i * 300));
    return () => timers.forEach(clearTimeout);
  }, [isOpen]);
  const indicators = [{
    label: t('fonctionnalites.animations.budgetUsed'),
    value: values[0]
  }, {
    label: t('fonctionnalites.animations.savings'),
    value: values[1]
  }, {
    label: t('fonctionnalites.animations.rituals'),
    value: values[2]
  }];
  return <div className="mt-4 mb-2 space-y-3">
      {indicators.map((ind, i) => <motion.div key={i} initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: i * 0.2
    }}>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-foreground font-medium">{ind.label}</span>
            <motion.span animate={{
          scale: ind.value > 0 ? [1, 1.1, 1] : 1
        }} transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.3
        }} className="text-primary font-bold">
              {ind.value}%
            </motion.span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <motion.div initial={{
          width: 0
        }} animate={{
          width: `${ind.value}%`
        }} transition={{
          duration: 0.5,
          ease: "easeOut"
        }} className="h-full bg-primary rounded-full relative overflow-hidden">
              <motion.div animate={{
            opacity: [0.3, 0.6, 0.3]
          }} transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2
          }} className="absolute inset-0 bg-white/30" />
            </motion.div>
          </div>
        </motion.div>)}
    </div>;
};

// Future Feature Card component with expandable animation
const FutureFeatureCard = ({
  emoji,
  title,
  description,
  delay,
  sounds,
  animation,
  t
}: {
  emoji: string;
  title: string;
  description: string;
  delay: number;
  sounds: ReturnType<typeof useSoundEffects>;
  animation: React.ReactNode;
  t: (key: string) => string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (isOpen) {
      sounds.playCloseSound();
    } else {
      sounds.playOpenSound();
    }
    setIsOpen(!isOpen);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onClick={handleToggle}
      className={`group bg-card/60 border border-border/50 rounded-xl p-6 relative overflow-hidden transition-all duration-300 cursor-pointer ${
        isOpen ? 'shadow-lg shadow-primary/10 border-primary/30' : 'hover:shadow-lg hover:shadow-primary/5'
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
        <motion.div
          className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center mb-4"
          whileHover={{ scale: 1.1 }}
          animate={{ rotate: isOpen ? [0, 5, -5, 0] : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <motion.span
            className="text-lg opacity-60"
            animate={{ 
              opacity: isOpen ? 1 : 0.6,
              scale: isOpen ? 1.1 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            {emoji}
          </motion.span>
        </motion.div>

        <div className="flex items-center gap-2 mb-2">
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

        <p className="text-sm text-muted-foreground/70 leading-relaxed">
          {description}
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
    </motion.div>
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

// Get animation variants based on direction
const getCardAnimationVariants = (direction: AnimationDirection) => {
  switch (direction) {
    case "horizontal":
      return {
        hidden: {
          opacity: 0,
          x: -30
        },
        visible: {
          opacity: 1,
          x: 0
        },
        exit: {
          opacity: 0,
          x: 30
        }
      };
    case "vertical":
      return {
        hidden: {
          opacity: 0,
          y: -20
        },
        visible: {
          opacity: 1,
          y: 0
        },
        exit: {
          opacity: 0,
          y: 20
        }
      };
    case "pulse":
      return {
        hidden: {
          opacity: 0,
          scale: 0.95
        },
        visible: {
          opacity: 1,
          scale: 1
        },
        exit: {
          opacity: 0,
          scale: 0.95
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
    if (isOpen) {
      sounds.playCloseSound();
    } else {
      sounds.playOpenSound();
    }
    onToggle();
  };
  const variants = getCardAnimationVariants(feature.animationDirection);
  return <motion.div onClick={handleClick} className={`cursor-pointer rounded-2xl border-2 ${feature.borderColor} ${feature.bgColor} ${isLarge ? 'p-8' : 'p-6'} transition-all duration-300 hover:shadow-lg hover:scale-[1.02] relative ${isExplored && !isOpen ? 'saturate-[0.7] opacity-90' : ''} ${!isOpen ? 'min-h-[100px]' : ''}`}>
      {/* Badge "Découvert" */}
      <AnimatePresence>
        {isExplored && !isOpen && <motion.div initial={{
        opacity: 0,
        scale: 0.8,
        y: -10
      }} animate={{
        opacity: 1,
        scale: 1,
        y: 0
      }} exit={{
        opacity: 0,
        scale: 0.8
      }} transition={{
        duration: 0.3
      }} className="absolute -top-2 -right-2 flex items-center gap-1 bg-primary/90 text-primary-foreground text-xs font-medium px-2 py-1 rounded-full shadow-md">
            <Check className="w-3 h-3" />
            <span>{t('fonctionnalites.discovered')}</span>
          </motion.div>}
      </AnimatePresence>
      
      <div className="flex items-center gap-4">
        <div className={`${isLarge ? 'text-5xl md:text-6xl' : 'text-4xl md:text-5xl'} relative flex-shrink-0`}>
          {feature.emoji}
          {/* Checkmark overlay when explored */}
          <AnimatePresence>
            {isExplored && !isOpen && <motion.div initial={{
            opacity: 0,
            scale: 0
          }} animate={{
            opacity: 1,
            scale: 1
          }} exit={{
            opacity: 0,
            scale: 0
          }} transition={{
            duration: 0.2,
            type: "spring",
            stiffness: 300
          }} className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center shadow-sm">
                <Check className="w-3 h-3 text-primary-foreground" />
              </motion.div>}
          </AnimatePresence>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className={`${isLarge ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'} font-semibold ${feature.textColor}`}>
              {feature.title}
            </h3>
            {/* Chevron arrow next to title */}
            <motion.div 
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className={`${feature.textColor} opacity-50 flex-shrink-0`}
            >
              <svg width="16" height="16" viewBox="0 0 12 12" fill="none">
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </div>
          <motion.p 
            animate={{
              opacity: isOpen ? 0 : 1,
              height: isOpen ? 0 : 'auto'
            }}
            transition={{ duration: 0.2 }}
            className={`text-sm ${feature.textColor} opacity-70 mt-1 overflow-hidden`}
          >
            {feature.microPromise}
          </motion.p>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {isOpen && <motion.div variants={variants} initial="hidden" animate="visible" exit="exit" transition={{
        duration: 0.3,
        ease: "easeInOut"
      }} className="overflow-hidden">
            <FeatureAnimation type={feature.animation} isOpen={isOpen} t={t} />
            <p className="mt-4 text-muted-foreground leading-relaxed pt-4 border-t border-current/10">
              {feature.details}
            </p>
          </motion.div>}
      </AnimatePresence>
    </motion.div>;
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
      emoji: "🧭",
      title: t('fonctionnalites.features.onboarding.title'),
      microPromise: t('fonctionnalites.features.onboarding.microPromise'),
      details: t('fonctionnalites.features.onboarding.details'),
      bgColor: "bg-primary/5",
      borderColor: "border-primary/20",
      textColor: "text-primary",
      animation: "onboarding",
      animationDirection: "horizontal"
    }, {
      emoji: "💰",
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
      emoji: "📅",
      title: t('fonctionnalites.features.fixed.title'),
      microPromise: t('fonctionnalites.features.fixed.microPromise'),
      details: t('fonctionnalites.features.fixed.details'),
      bgColor: "bg-card",
      borderColor: "border-border",
      textColor: "text-foreground",
      animation: "fixed",
      animationDirection: "vertical"
    }, {
      emoji: "🧾",
      title: t('fonctionnalites.features.daily.title'),
      microPromise: t('fonctionnalites.features.daily.microPromise'),
      details: t('fonctionnalites.features.daily.details'),
      bgColor: "bg-primary/5",
      borderColor: "border-primary/20",
      textColor: "text-primary",
      animation: "daily",
      animationDirection: "vertical"
    }, {
      emoji: "🟢",
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
      emoji: "🎯",
      title: t('fonctionnalites.features.rituals.title'),
      microPromise: t('fonctionnalites.features.rituals.microPromise'),
      details: t('fonctionnalites.features.rituals.details'),
      bgColor: "bg-card",
      borderColor: "border-border",
      textColor: "text-foreground",
      animation: "rituals",
      animationDirection: "pulse"
    }, {
      emoji: "📊",
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
              <div className={`grid gap-6 ${group.isLarge ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                {group.features.map((feature, featureIndex) => <motion.div key={featureIndex} initial={{
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

          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {/* Projets financiers */}
            <FutureFeatureCard
              emoji="🧳"
              title={t('fonctionnalites.futureFeatures.projects.title')}
              description={t('fonctionnalites.futureFeatures.projects.description')}
              delay={0.1}
              sounds={sounds}
              t={t}
              animation={
                <div className="relative h-32 w-full flex items-center justify-center gap-3">
                  {/* Envelope 1 - Vacances */}
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="relative"
                  >
                    <motion.div 
                      className="w-16 h-20 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 rounded-lg border border-blue-200/50 dark:border-blue-700/30 flex flex-col items-center justify-center shadow-sm"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <span className="text-lg mb-1">✈️</span>
                      <span className="text-[8px] font-medium text-blue-600/80 dark:text-blue-400/80">Vacances</span>
                      <motion.div 
                        className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                      >
                        <span className="text-[7px] text-white font-bold">75%</span>
                      </motion.div>
                    </motion.div>
                    <motion.div
                      className="absolute bottom-0 left-1 right-1 h-1.5 bg-muted rounded-full overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.div 
                        className="h-full bg-blue-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Envelope 2 - Projet */}
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                    className="relative"
                  >
                    <motion.div 
                      className="w-16 h-20 bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/20 rounded-lg border border-amber-200/50 dark:border-amber-700/30 flex flex-col items-center justify-center shadow-sm"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                    >
                      <span className="text-lg mb-1">🎁</span>
                      <span className="text-[8px] font-medium text-amber-600/80 dark:text-amber-400/80">Cadeaux</span>
                      <motion.div 
                        className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.7, type: "spring" }}
                      >
                        <span className="text-[7px] text-white font-bold">40%</span>
                      </motion.div>
                    </motion.div>
                    <motion.div
                      className="absolute bottom-0 left-1 right-1 h-1.5 bg-muted rounded-full overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <motion.div 
                        className="h-full bg-amber-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "40%" }}
                        transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Envelope 3 - Rénovation */}
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="relative"
                  >
                    <motion.div 
                      className="w-16 h-20 bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-emerald-800/20 rounded-lg border border-emerald-200/50 dark:border-emerald-700/30 flex flex-col items-center justify-center shadow-sm"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                    >
                      <span className="text-lg mb-1">🔧</span>
                      <span className="text-[8px] font-medium text-emerald-600/80 dark:text-emerald-400/80">Travaux</span>
                      <motion.div 
                        className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.9, type: "spring" }}
                      >
                        <span className="text-[7px] text-white font-bold">20%</span>
                      </motion.div>
                    </motion.div>
                    <motion.div
                      className="absolute bottom-0 left-1 right-1 h-1.5 bg-muted rounded-full overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.div 
                        className="h-full bg-emerald-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "20%" }}
                        transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
                      />
                    </motion.div>
                  </motion.div>
                </div>
              }
            />

            {/* Tiers & avances */}
            <FutureFeatureCard
              emoji="👥"
              title={t('fonctionnalites.futureFeatures.tiers.title')}
              description={t('fonctionnalites.futureFeatures.tiers.description')}
              delay={0.2}
              sounds={sounds}
              t={t}
              animation={
                <div className="relative h-32 w-full flex flex-col items-center justify-center gap-2">
                  {/* Person owing money */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex items-center gap-2 bg-card/80 rounded-lg px-3 py-2 border border-border/50 w-full max-w-[180px]"
                  >
                    <motion.div 
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-100 to-rose-50 dark:from-rose-900/30 dark:to-rose-800/20 flex items-center justify-center border border-rose-200/50 dark:border-rose-700/30"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-sm">👤</span>
                    </motion.div>
                    <div className="flex-1">
                      <p className="text-[9px] font-medium text-foreground/80">Marie</p>
                      <p className="text-[8px] text-muted-foreground">Me doit</p>
                    </div>
                    <motion.span 
                      className="text-xs font-semibold text-rose-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      +45€
                    </motion.span>
                  </motion.div>

                  {/* Arrow indicator */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="flex items-center gap-1"
                  >
                    <motion.div
                      animate={{ y: [0, 2, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-3 h-3 text-muted-foreground/50 rotate-90" />
                    </motion.div>
                  </motion.div>

                  {/* Person I owe money to */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="flex items-center gap-2 bg-card/80 rounded-lg px-3 py-2 border border-border/50 w-full max-w-[180px]"
                  >
                    <motion.div 
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 flex items-center justify-center border border-blue-200/50 dark:border-blue-700/30"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >
                      <span className="text-sm">👤</span>
                    </motion.div>
                    <div className="flex-1">
                      <p className="text-[9px] font-medium text-foreground/80">Paul</p>
                      <p className="text-[8px] text-muted-foreground">Je dois</p>
                    </div>
                    <motion.span 
                      className="text-xs font-semibold text-blue-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      -20€
                    </motion.span>
                  </motion.div>

                  {/* Balance indicator */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="absolute bottom-0 right-2 text-[9px] text-muted-foreground/60"
                  >
                    Solde: <span className="text-emerald-500 font-medium">+25€</span>
                  </motion.div>
                </div>
              }
            />

            {/* Patrimoine */}
            <FutureFeatureCard
              emoji="🏠"
              title={t('fonctionnalites.futureFeatures.patrimoine.title')}
              description={t('fonctionnalites.futureFeatures.patrimoine.description')}
              delay={0.3}
              sounds={sounds}
              t={t}
              animation={
                <div className="relative h-40 w-full flex flex-col items-center justify-start pt-2">
                  <div className="flex gap-4 items-end">
                    {/* Actifs column */}
                    <motion.div
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                      style={{ originY: 1 }}
                      className="flex flex-col items-center"
                    >
                      <motion.div
                        className="w-14 rounded-t-lg overflow-hidden"
                        initial={{ height: 0 }}
                        animate={{ height: 70 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                      >
                        <div className="h-full bg-gradient-to-t from-emerald-500 to-emerald-400 flex flex-col items-center justify-end pb-1">
                          <motion.span 
                            className="text-[8px] text-white font-medium"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                          >
                            12 500€
                          </motion.span>
                        </div>
                      </motion.div>
                      <motion.div 
                        className="mt-1 flex flex-col items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <span className="text-[9px] font-medium text-foreground/70">Actifs</span>
                        <div className="flex gap-0.5 mt-0.5">
                          <span className="text-[7px] text-muted-foreground">💰🏦📈</span>
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* VS separator */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, type: "spring" }}
                      className="text-[10px] text-muted-foreground/50 font-medium pb-8"
                    >
                      vs
                    </motion.div>

                    {/* Passifs column */}
                    <motion.div
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                      style={{ originY: 1 }}
                      className="flex flex-col items-center"
                    >
                      <motion.div
                        className="w-14 rounded-t-lg overflow-hidden"
                        initial={{ height: 0 }}
                        animate={{ height: 40 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <div className="h-full bg-gradient-to-t from-rose-500 to-rose-400 flex flex-col items-center justify-end pb-1">
                          <motion.span 
                            className="text-[8px] text-white font-medium"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                          >
                            4 200€
                          </motion.span>
                        </div>
                      </motion.div>
                      <motion.div 
                        className="mt-1 flex flex-col items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        <span className="text-[9px] font-medium text-foreground/70">Passifs</span>
                        <div className="flex gap-0.5 mt-0.5">
                          <span className="text-[7px] text-muted-foreground">💳🏠</span>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Net worth indicator - positioned below the chart */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="mt-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1"
                  >
                    <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-medium">
                      Patrimoine net: +8 300€
                    </span>
                  </motion.div>
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