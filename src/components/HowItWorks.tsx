import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Observe tes habitudes",
    description:
      "Comprends où va ton argent sans jugement. Steero t'aide à visualiser, à chaque saisie, ce que tu as déjà consommé et ce qu'il te reste dans ton budget",
  },
  {
    number: "02",
    title: "Ritualise ton suivi",
    description:
      "Avec des rituels financiers réguliers conçus pour t'accompagner, prend un moment une fois par semaine, mois ou trimestre pour comprendre, ajuster et planifier..",
  },
  {
    number: "03",
    title: "Avance vers tes objectifs",
    description:
      "Chaque petite décision s'accumule pour construire l'avenir avec serenité et aligné avec tes objectifs : Constituer un patrimoine, créer ton entreprise ou voyager .",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: { 
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut" as const
    }
  },
};

const HowItWorks = () => {
  return (
    <section className="py-24 bg-primary/5 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Comment ça marche ?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Un processus simple en 3 étapes pour reprendre le contrôle de tes finances
          </p>
        </motion.div>

        {/* Progress line for desktop */}
        <div className="hidden md:block max-w-4xl mx-auto mb-8">
          <motion.div 
            className="h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 rounded-full origin-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={lineVariants}
          />
        </div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="relative p-8 rounded-2xl bg-card shadow-card hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-primary/20 group"
            >
              {/* Step indicator dot */}
              <div className="absolute -top-3 left-8 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              
              <span className="text-5xl font-bold text-primary/15 group-hover:text-primary/25 transition-colors">
                {step.number}
              </span>
              <h3 className="text-xl font-semibold text-foreground mb-3 mt-2">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              
              {/* Connecting line to next card (mobile) */}
              {index < steps.length - 1 && (
                <div className="md:hidden absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-primary/50 to-transparent" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;