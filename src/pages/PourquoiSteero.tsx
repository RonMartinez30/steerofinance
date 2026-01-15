import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { ArrowRight, Check, Star, Brain, Eye, RefreshCw, Pencil, BookOpen, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSoundEffects } from "@/hooks/useSoundEffects";
// Progress sidebar component for behavioral principles
const BehavioralProgressSidebar = ({
  elements,
  activeIndex,
  exploredCards,
  isVisible,
  t
}: {
  elements: BehavioralElement[];
  activeIndex: number | null;
  exploredCards: Set<number>;
  isVisible: boolean;
  t: (key: string) => string;
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
            <span className="text-xs font-medium text-foreground truncate">{element.emoji} {t(element.titleKey)}</span>
          </motion.div>
        </button>)}
    </motion.div>;
};
interface Alternative {
  icon: string;
  titleKey: string;
  descriptionKey: string;
  highlight?: boolean;
}

const alternativesData: Alternative[] = [
  { icon: "❌", titleKey: "whySteero.alternatives.excel.title", descriptionKey: "whySteero.alternatives.excel.description" },
  { icon: "❌", titleKey: "whySteero.alternatives.bankApps.title", descriptionKey: "whySteero.alternatives.bankApps.description" },
  { icon: "❌", titleKey: "whySteero.alternatives.notion.title", descriptionKey: "whySteero.alternatives.notion.description" },
  { icon: "✅", titleKey: "whySteero.alternatives.steero.title", descriptionKey: "whySteero.alternatives.steero.description", highlight: true }
];

interface BehavioralElement {
  icon: typeof Brain;
  emoji: string;
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  referenceKey: string;
  bgColor: string;
  borderColor: string;
}

const behavioralElementsData: BehavioralElement[] = [
  {
    icon: Brain,
    emoji: "🧠",
    titleKey: "whySteero.behavioral.cognitive.title",
    subtitleKey: "whySteero.behavioral.cognitive.subtitle",
    descriptionKey: "whySteero.behavioral.cognitive.description",
    referenceKey: "whySteero.behavioral.cognitive.reference",
    bgColor: "bg-primary/5",
    borderColor: "border-primary/20"
  },
  {
    icon: Eye,
    emoji: "👁️",
    titleKey: "whySteero.behavioral.illusion.title",
    subtitleKey: "whySteero.behavioral.illusion.subtitle",
    descriptionKey: "whySteero.behavioral.illusion.description",
    referenceKey: "whySteero.behavioral.illusion.reference",
    bgColor: "bg-secondary",
    borderColor: "border-primary/15"
  },
  {
    icon: RefreshCw,
    emoji: "🔄",
    titleKey: "whySteero.behavioral.ritual.title",
    subtitleKey: "whySteero.behavioral.ritual.subtitle",
    descriptionKey: "whySteero.behavioral.ritual.description",
    referenceKey: "whySteero.behavioral.ritual.reference",
    bgColor: "bg-card",
    borderColor: "border-border"
  },
  {
    icon: Pencil,
    emoji: "✏️",
    titleKey: "whySteero.behavioral.emotional.title",
    subtitleKey: "whySteero.behavioral.emotional.subtitle",
    descriptionKey: "whySteero.behavioral.emotional.description",
    referenceKey: "whySteero.behavioral.emotional.reference",
    bgColor: "bg-primary/5",
    borderColor: "border-primary/20"
  },
  {
    icon: BookOpen,
    emoji: "📖",
    titleKey: "whySteero.behavioral.learning.title",
    subtitleKey: "whySteero.behavioral.learning.subtitle",
    descriptionKey: "whySteero.behavioral.learning.description",
    referenceKey: "whySteero.behavioral.learning.reference",
    bgColor: "bg-secondary",
    borderColor: "border-primary/15"
  }
];
// Animation 1: Cognitive Effort - Brain synapses firing
const CognitiveEffortAnimation = ({
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
        💡 {t('animations.activeConnections')}
      </motion.p>
    </div>;
};

// Animation 2: Control Illusion - Fake vs Real dashboard
const ControlIllusionAnimation = ({
  isOpen,
  t
}: {
  isOpen: boolean;
  t: (key: string) => string;
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
            <span className="text-xs text-muted-foreground">{t('animations.autoSync')}</span>
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
            <span className="text-xs text-primary font-medium">{t('animations.understood')}</span>
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
        ✓ {t('animations.realUnderstanding')}
      </motion.p>
    </div>;
};

// Animation 3: Ritual Cycle - Daily habit loop
const RitualCycleAnimation = ({
  isOpen,
  t
}: {
  isOpen: boolean;
  t: (key: string) => string;
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
    label: t('animations.define'),
    time: ""
  }, {
    icon: "📝",
    label: t('animations.capture'),
    time: ""
  }, {
    icon: "📊",
    label: t('animations.review'),
    time: ""
  }, {
    icon: "✨",
    label: t('animations.anchor'),
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
            <p className="text-[10px] font-medium text-foreground">{t('animations.restaurant')}</p>
            <p className="text-[10px] text-muted-foreground">-34,90€</p>
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
            <span className="text-xl">🤔</span>
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
        👌 {t('animations.realAwareness')}
      </motion.p>
    </div>;
};

// Animation 5: Learning Before Automation - Progressive stages
const LearningFirstAnimation = ({
  isOpen,
  t
}: {
  isOpen: boolean;
  t: (key: string) => string;
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
    label: t('animations.learn'),
    icon: BookOpen,
    fill: 33,
    color: "bg-primary/30"
  }, {
    label: t('animations.understand'),
    icon: Brain,
    fill: 66,
    color: "bg-primary/50"
  }, {
    label: t('animations.master'),
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
              ⚠️ {t('animations.autoTooEarly')}
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
              📈 {t('animations.understandingGrows')}
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
              ✓ {t('animations.autoCanBeConsidered')}
            </motion.p>}
        </AnimatePresence>
      </div>
    </div>;
};

// Main animation router component
const BehavioralAnimation = ({
  element,
  index,
  isOpen,
  t
}: {
  element: BehavioralElement;
  index: number;
  isOpen: boolean;
  t: (key: string) => string;
}) => {
  switch (index) {
    case 0:
      return <CognitiveEffortAnimation isOpen={isOpen} t={t} />;
    case 1:
      return <ControlIllusionAnimation isOpen={isOpen} t={t} />;
    case 2:
      return <RitualCycleAnimation isOpen={isOpen} t={t} />;
    case 3:
      return <EmotionalConnectionAnimation isOpen={isOpen} t={t} />;
    case 4:
      return <LearningFirstAnimation isOpen={isOpen} t={t} />;
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
  isExplored,
  t
}: {
  element: BehavioralElement;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isExplored: boolean;
  t: (key: string) => string;
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
              ✓ {t('whySteero.read')}
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
                  {t(element.titleKey)}
                </h3>
                <p className="text-sm text-primary font-medium mt-0.5">
                  {t(element.subtitleKey)}
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
                <BehavioralAnimation element={element} index={index} isOpen={isOpen} t={t} />

                {/* Description */}
                <div className="text-muted-foreground leading-relaxed mb-4 space-y-3">
                  {t(element.descriptionKey).split('\n\n').map((paragraph, i) => {
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
                    // Handle bullet point lists
                    if (paragraph.includes('• ')) {
                      const lines = paragraph.split('\n');
                      const bulletLines = lines.filter(line => line.trim().startsWith('•'));
                      const nonBulletLines = lines.filter(line => !line.trim().startsWith('•') && line.trim());
                      
                      return (
                        <div key={i} className="space-y-2">
                          {nonBulletLines.length > 0 && (
                            <p className="text-muted-foreground">{nonBulletLines.join(' ')}</p>
                          )}
                          <ul className="space-y-2 pl-1">
                            {bulletLines.map((line, j) => {
                              const text = line.replace('•', '').trim();
                              
                              return (
                                <li key={j} className="flex items-start gap-3 group">
                                  <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold mt-0.5 transition-transform group-hover:scale-110">
                                    {j + 1}
                                  </span>
                                  <span className="text-foreground/80 leading-relaxed">{text}</span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    }
                    // Handle arrow callouts
                    if (paragraph.startsWith('➡️')) {
                      return (
                        <div key={i} className="bg-primary/5 border-l-4 border-primary rounded-r-lg px-4 py-3 mt-3">
                          <p className="text-foreground font-medium text-sm">{paragraph}</p>
                        </div>
                      );
                    }
                    // Regular paragraph
                    return <p key={i}>{paragraph}</p>;
                  })}
                </div>

                {/* Reference */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground/70 bg-muted/50 rounded-lg px-3 py-2">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="italic">{t('whySteero.reference')} : {t(element.referenceKey)}</span>
                </div>
              </div>
            </motion.div>}
        </AnimatePresence>
      </div>
    </motion.div>;
};
const PourquoiSteero = () => {
  const { t } = useTranslation();
  const [openCardIndex, setOpenCardIndex] = useState<number | null>(null);
  const [exploredCards, setExploredCards] = useState<Set<number>>(new Set());
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [hasTriggeredCelebration, setHasTriggeredCelebration] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { playSuccessSound, playOpenSound, playCloseSound } = useSoundEffects();

  const testimonials = (t('whySteero.testimonials', { returnObjects: true }) as { quote: string; author: string; role: string }[]);

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
    if (exploredCards.size === behavioralElementsData.length && !hasTriggeredCelebration) {
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
      <SEO
        title="Pourquoi Steero - L'approche comportementale pour gérer son argent"
        description="Pourquoi choisir Steero plutôt qu'Excel ou une app bancaire pour gérer son argent ? Découvrez notre approche unique basée sur les sciences comportementales pour mieux gérer votre budget durablement."
        keywords="pourquoi steero, alternative excel budget, mieux gérer son argent, application finances personnelles, approche comportementale argent, gestion budget durable"
        canonical="/pourquoi-steero"
      />
      <Header />
      
      {/* Progress Sidebar for Behavioral Section */}
      <AnimatePresence>
        {isSidebarVisible && <BehavioralProgressSidebar elements={behavioralElementsData} activeIndex={openCardIndex} exploredCards={exploredCards} isVisible={isSidebarVisible} t={t} />}
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
              {t('whySteero.heroTitle')} <span className="text-gradient">Steero</span> ?
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
              {t('whySteero.heroDescription')}
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
                <h2 className="text-3xl font-bold text-foreground mb-4">{t('whySteero.missionTitle')}</h2>
                <p className="text-muted-foreground mb-4">
                  {t('whySteero.missionP1')}
                </p>
                <p className="text-muted-foreground mb-6">
                  {t('whySteero.missionP2')}
                </p>
                <ul className="space-y-3">
                  {(t('whySteero.missionItems', { returnObjects: true }) as string[]).map((item, i) => <motion.li key={i} initial={{
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
                <blockquote className="text-xl italic text-foreground">"{t('whySteero.quote')}"</blockquote>
                <p className="mt-4 text-muted-foreground">{t('whySteero.quoteAuthor')}</p>
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
            <h2 className="text-3xl font-bold text-foreground mb-4">{t('whySteero.alternativesTitle')}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t('whySteero.alternativesDescription')}
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {alternativesData.map((alt, index) => <motion.div key={index} initial={{
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
                  {t(alt.titleKey)}
                </h3>
                <p className={`text-sm ${alt.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {t(alt.descriptionKey)}
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
                🎓 {t('whySteero.behavioralBadge')}
              </span>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t('whySteero.behavioralTitle')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('whySteero.behavioralDescription')}
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
                <span>{behavioralElementsData.length} {t('whySteero.principlesExplored')}</span>
                {exploredCards.size === behavioralElementsData.length && <motion.span initial={{
                scale: 0
              }} animate={{
                scale: [1, 1.2, 1]
              }} transition={{
                duration: 0.6,
                repeat: 2
              }} className="ml-2 text-primary font-semibold">
                    🎉 {t('whySteero.bravo')}
                  </motion.span>}
              </motion.div>
            </motion.div>
            
            <div className="space-y-4">
              {behavioralElementsData.map((element, index) => <div key={index} id={`behavioral-card-${index}`}>
                  <BehavioralCard element={element} index={index} isOpen={openCardIndex === index} onToggle={() => handleToggleCard(index)} isExplored={exploredCards.has(index)} t={t} />
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
              <p>{t('whySteero.clickToDiscover')}</p>
              <Link 
                to="/fonctionnalites" 
                className="inline-flex items-center gap-1 mt-2 text-primary font-medium hover:underline group"
              >
                {t('common.discoverFeatures')}
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
            {t('whySteero.testimonialsTitle')}
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
            <h2 className="text-3xl font-bold text-foreground mb-4">{t('whySteero.ctaTitle')}</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{t('whySteero.ctaDescription')}</p>
            <motion.button whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.98
          }} className="btn-primary group">
              {t('common.joinWaitlist')}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default PourquoiSteero;