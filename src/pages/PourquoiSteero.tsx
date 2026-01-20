import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { ArrowRight, Check, Star, ChevronDown, Hexagon, Circle, Triangle, Square, Octagon, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
            <span className="text-xs font-medium text-foreground truncate">{t(element.titleKey)}</span>
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
  icon: typeof Hexagon;
  principleNumber: string;
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  referenceKey: string;
}

const behavioralElementsData: BehavioralElement[] = [
  {
    icon: Hexagon,
    principleNumber: "01",
    titleKey: "whySteero.behavioral.cognitive.title",
    subtitleKey: "whySteero.behavioral.cognitive.subtitle",
    descriptionKey: "whySteero.behavioral.cognitive.description",
    referenceKey: "whySteero.behavioral.cognitive.reference",
  },
  {
    icon: Circle,
    principleNumber: "02",
    titleKey: "whySteero.behavioral.illusion.title",
    subtitleKey: "whySteero.behavioral.illusion.subtitle",
    descriptionKey: "whySteero.behavioral.illusion.description",
    referenceKey: "whySteero.behavioral.illusion.reference",
  },
  {
    icon: Triangle,
    principleNumber: "03",
    titleKey: "whySteero.behavioral.ritual.title",
    subtitleKey: "whySteero.behavioral.ritual.subtitle",
    descriptionKey: "whySteero.behavioral.ritual.description",
    referenceKey: "whySteero.behavioral.ritual.reference",
  },
  {
    icon: Square,
    principleNumber: "04",
    titleKey: "whySteero.behavioral.emotional.title",
    subtitleKey: "whySteero.behavioral.emotional.subtitle",
    descriptionKey: "whySteero.behavioral.emotional.description",
    referenceKey: "whySteero.behavioral.emotional.reference",
  },
  {
    icon: Octagon,
    principleNumber: "05",
    titleKey: "whySteero.behavioral.learning.title",
    subtitleKey: "whySteero.behavioral.learning.subtitle",
    descriptionKey: "whySteero.behavioral.learning.description",
    referenceKey: "whySteero.behavioral.learning.reference",
  }
];
// Animation 1: Cognitive Effort - Abstract network
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
    }, 700);
    return () => clearInterval(interval);
  }, [isOpen]);
  const nodes = [{
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
      <div className="relative h-20 bg-muted/20 rounded-lg overflow-hidden border border-border/30">
        {/* Central node - static */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-border/40 flex items-center justify-center z-10 bg-background">
          <Hexagon className="w-4 h-4 text-muted-foreground/60" />
        </div>
        
        {/* Network nodes */}
        {nodes.map((node, i) => <motion.div key={i} animate={{
        opacity: step >= node.delay ? 0.5 : 0
      }} transition={{
        duration: 0.4,
        ease: "easeOut"
      }} style={{
        left: `${node.x}%`,
        top: `${node.y}%`
      }} className="absolute w-2 h-2 rounded-full bg-muted-foreground/40 -translate-x-1/2 -translate-y-1/2" />)}
        
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {nodes.map((node, i) => <motion.line key={i} x1="50%" y1="50%" x2={`${node.x}%`} y2={`${node.y}%`} stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeOpacity="0.15" animate={{
          pathLength: step >= node.delay ? 1 : 0,
          opacity: step >= node.delay ? 0.2 : 0
        }} transition={{
          duration: 0.4
        }} />)}
        </svg>
      </div>
      
      {/* Label */}
      <motion.p animate={{
      opacity: step >= 4 ? 0.8 : 0
    }} transition={{ duration: 0.3 }} className="text-center text-xs text-muted-foreground/70">
        {t('animations.activeConnections')}
      </motion.p>
    </div>;
};

// Animation 2: Control Illusion - Comparison view
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
    const timers = [setTimeout(() => setPhase('reveal'), 1800), setTimeout(() => setPhase('real'), 3500)];
    const loop = setInterval(() => {
      setPhase('fake');
      setTimeout(() => setPhase('reveal'), 1800);
      setTimeout(() => setPhase('real'), 3500);
    }, 6000);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loop);
    };
  }, [isOpen]);
  return <div className="flex flex-col gap-2 py-2">
      <div className="relative h-20 flex items-center justify-center gap-4">
        {/* Automated view */}
        <motion.div animate={{
        opacity: phase === 'fake' ? 0.8 : 0.3,
      }} transition={{ duration: 0.4 }} className="relative flex-1 bg-muted/30 rounded-lg p-3 border border-border/40">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
            <span className="text-[10px] text-muted-foreground/60">{t('animations.autoSync')}</span>
          </div>
          <div className="space-y-1">
            <div className="h-1 bg-muted/60 rounded w-full" />
            <div className="h-1 bg-muted/60 rounded w-3/4" />
            <div className="h-1 bg-muted/60 rounded w-1/2" />
          </div>
        </motion.div>
        
        {/* Arrow */}
        <ArrowRight className="w-3 h-3 text-muted-foreground/40 flex-shrink-0" />
        
        {/* Understood view */}
        <motion.div animate={{
        opacity: phase === 'real' ? 0.9 : 0.3,
      }} transition={{ duration: 0.4 }} className="relative flex-1 bg-muted/20 rounded-lg p-3 border border-border/30">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
            <span className="text-[10px] text-muted-foreground/70">{t('animations.understood')}</span>
          </div>
          <div className="space-y-1">
            <div className="h-1 bg-muted-foreground/20 rounded w-full" />
            <div className="h-1 bg-muted-foreground/30 rounded w-3/4" />
            <div className="h-1 bg-muted-foreground/40 rounded w-1/2" />
          </div>
        </motion.div>
      </div>
      
      {/* Label */}
      <motion.p animate={{
      opacity: phase === 'real' ? 0.8 : 0
    }} transition={{ duration: 0.3 }} className="text-center text-xs text-muted-foreground/70">
        {t('animations.realUnderstanding')}
      </motion.p>
    </div>;
};

// Animation 3: Ritual Cycle - Circular progression
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
    }, 1200);
    return () => clearInterval(interval);
  }, [isOpen]);
  const ritualSteps = [{
    label: t('animations.define'),
  }, {
    label: t('animations.capture'),
  }, {
    label: t('animations.review'),
  }, {
    label: t('animations.anchor'),
  }];
  return <div className="flex flex-col gap-3 py-3 mb-4">
      <div className="relative h-20 flex items-center justify-center">
        {/* Circular path */}
        <div className="w-14 h-14 rounded-full border border-border/30" />
        
        {/* Ritual steps around the circle */}
        {ritualSteps.map((step, i) => {
        const angle = (i * 90 - 90) * (Math.PI / 180);
        const radius = 28;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return <motion.div key={i} style={{
          left: `calc(50% + ${x}px)`,
          top: `calc(50% + ${y}px)`,
          transform: 'translate(-50%, -50%)'
        }} animate={{
          opacity: activeStep === i ? 0.8 : 0.3
        }} transition={{
          duration: 0.4,
        }} className={`absolute w-2.5 h-2.5 rounded-full ${activeStep === i ? 'bg-muted-foreground/60' : 'bg-muted/60'}`} />;
      })}
        
        {/* Center indicator */}
        <motion.div animate={{
        rotate: activeStep * 90
      }} transition={{
        duration: 0.5,
        ease: "easeOut"
      }} className="absolute">
          <Triangle className="w-2.5 h-2.5 text-muted-foreground/40" />
        </motion.div>
      </div>
      
      {/* Current step label */}
      <motion.p key={activeStep} initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ duration: 0.3 }} className="text-center text-xs text-muted-foreground/70">
        {ritualSteps[activeStep].label}
      </motion.p>
    </div>;
};

// Animation 4: Awareness Process - Linear flow
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
    }, 900);
    return () => clearInterval(interval);
  }, [isOpen]);
  return <div className="flex flex-col gap-2 py-2">
      <div className="relative h-14 flex items-center justify-center gap-3">
        {/* Input */}
        <motion.div animate={{
        opacity: step >= 1 ? 0.5 : 0.2
      }} transition={{
        duration: 0.4
      }} className="w-7 h-7 rounded border border-border/40 bg-muted/20 flex items-center justify-center">
          <Square className="w-2.5 h-2.5 text-muted-foreground/50" />
        </motion.div>
        
        {/* Arrow */}
        <motion.div animate={{
        opacity: step >= 2 ? 0.4 : 0.15,
      }} transition={{ duration: 0.3 }}>
          <ArrowRight className="w-2.5 h-2.5 text-muted-foreground/40" />
        </motion.div>
        
        {/* Processing */}
        <motion.div animate={{
        opacity: step >= 3 ? 0.6 : 0.25
      }} transition={{
        duration: 0.4,
      }} className="w-9 h-9 rounded-full border border-border/30 bg-muted/15 flex items-center justify-center">
          <Circle className="w-3.5 h-3.5 text-muted-foreground/40" />
        </motion.div>
        
        {/* Arrow */}
        <motion.div animate={{
        opacity: step >= 4 ? 0.4 : 0.15,
      }} transition={{ duration: 0.3 }}>
          <ArrowRight className="w-2.5 h-2.5 text-muted-foreground/40" />
        </motion.div>
        
        {/* Output */}
        <motion.div animate={{
        opacity: step >= 4 ? 0.7 : 0.2,
      }} transition={{
        duration: 0.4,
      }} className="w-7 h-7 rounded border border-border/40 bg-muted/20 flex items-center justify-center">
          <Check className="w-2.5 h-2.5 text-muted-foreground/50" />
        </motion.div>
      </div>
      
      {/* Result text */}
      <motion.p animate={{
      opacity: step >= 4 ? 0.7 : 0
    }} transition={{ duration: 0.3 }} className="text-center text-xs text-muted-foreground/70">
        {t('animations.realAwareness')}
      </motion.p>
    </div>;
};

// Animation 5: Learning Progression
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
    }, 1400);
    return () => clearInterval(interval);
  }, [isOpen]);
  const stages = [{
    label: t('animations.learn'),
    fill: 33,
  }, {
    label: t('animations.understand'),
    fill: 66,
  }, {
    label: t('animations.master'),
    fill: 100,
  }];
  return <div className="flex flex-col gap-2 py-2">
      {/* Progress bar */}
      <div className="relative h-1 bg-muted/40 rounded-full overflow-hidden">
        <motion.div animate={{
        width: `${stages[stage % 3].fill}%`
      }} transition={{
        duration: 0.6,
        ease: "easeOut"
      }} className="absolute left-0 top-0 h-full bg-muted-foreground/30 rounded-full" />
      </div>
      
      {/* Stage indicators */}
      <div className="flex justify-between px-1">
        {stages.map((s, i) => {
        const currentStage = stage % 3;
        return <motion.div key={i} animate={{
          opacity: currentStage >= i ? 0.8 : 0.3
        }} transition={{
          duration: 0.4
        }} className="flex flex-col items-center gap-0.5">
              <div className={`w-1.5 h-1.5 rounded-full ${currentStage >= i ? 'bg-muted-foreground/50' : 'bg-muted/50'}`} />
              <span className={`text-[9px] ${currentStage === i ? 'text-muted-foreground/70' : 'text-muted-foreground/40'}`}>
                {s.label}
              </span>
            </motion.div>;
      })}
      </div>
      
      {/* Status message */}
      <div className="h-4 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {stage % 3 < 1 && <motion.p key="warning" initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} exit={{ opacity: 0 }} className="text-center text-[10px] text-muted-foreground/60">
              {t('animations.autoTooEarly')}
            </motion.p>}
          {stage % 3 === 1 && <motion.p key="progress" initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} exit={{ opacity: 0 }} className="text-center text-[10px] text-muted-foreground/60">
              {t('animations.understandingGrows')}
            </motion.p>}
          {stage % 3 === 2 && <motion.p key="ready" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} exit={{ opacity: 0 }} className="text-center text-[10px] text-muted-foreground/70">
              {t('animations.autoCanBeConsidered')}
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
  const Icon = element.icon;
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
        relative rounded-xl border cursor-pointer transition-all duration-300
        bg-card border-border/50
        ${isOpen ? 'shadow-sm ring-1 ring-primary/10' : 'hover:border-border'}
        ${isExplored && !isOpen ? 'opacity-80' : ''}
      `}>
      {/* Explored indicator - subtle */}
      <AnimatePresence>
        {isExplored && !isOpen && <motion.div initial={{
        opacity: 0,
      }} animate={{
        opacity: 1,
      }} exit={{
        opacity: 0,
      }} className="absolute top-3 right-3 z-10">
            <Check className="w-4 h-4 text-primary/50" />
          </motion.div>}
      </AnimatePresence>

      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Icon with principle number */}
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 rounded-lg border border-border/50 bg-muted/30 flex items-center justify-center">
              <Icon className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
            </div>
            {/* Principle number */}
            <span className="absolute -top-1 -left-1 text-[10px] font-mono text-muted-foreground/60">
              {element.principleNumber}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/60 mb-1 block">
                  Principe {element.principleNumber}
                </span>
                <h3 className="font-medium text-foreground leading-tight">
                  {t(element.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {t(element.subtitleKey)}
                </p>
              </div>
              <motion.div animate={{
              rotate: isOpen ? 180 : 0
            }} transition={{
              duration: 0.3
            }} className="flex-shrink-0 mt-1">
                <ChevronDown className="w-4 h-4 text-muted-foreground/50" />
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
  const sectionRef = useRef<HTMLElement>(null);

  const testimonials = (t('whySteero.testimonials', { returnObjects: true }) as { quote: string; author: string; role: string }[]);

  const handleToggleCard = (index: number) => {
    const isOpening = openCardIndex !== index;
    if (isOpening) {
      setExploredCards(prev => new Set(prev).add(index));
    }
    setOpenCardIndex(prev => prev === index ? null : index);
  };

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
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider text-muted-foreground border border-border/50 mb-4">
                {t('whySteero.behavioralBadge')}
              </span>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                {t('whySteero.behavioralTitle')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
                {t('whySteero.behavioralDescription')}
              </p>
              
              {/* Progress indicator - subtle */}
              <motion.div initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              delay: 0.3
            }} className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground/70 font-mono">
                <span>{exploredCards.size}</span>
                <span>/</span>
                <span>{behavioralElementsData.length}</span>
                {exploredCards.size === behavioralElementsData.length && <span className="ml-2 text-primary/70">
                    {t('whySteero.bravo')}
                  </span>}
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