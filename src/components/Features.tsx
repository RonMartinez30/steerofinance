import { Circle, Settings, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Circle,
    title: "Budgétiser",
    description:
      "Tes ressources sont limitées : elles te permettent de construire le présent et de préparer l'avenir. Bien les définir est essentiel. Créé des budgets clairs, grâce à la trajectoire, notre outil intuitif qui t'accompagne pour définir ta destination.",
  },
  {
    icon: Settings,
    title: "Saisir",
    description:
      "Contrairement à d'autres applications, Steero ne fait pas à ta place. La saisie manuelle crée un lien émotionnel : ce qui améliore significativement l'autorégulation… Nous l'avons amélioré grâce au Niveau - La jauge budgétaire qui indique le consommé, consommé avec la dépense saisie et le restant",
  },
  {
    icon: TrendingUp,
    title: "Ritualiser",
    description:
      "La compréhension financière ne repose pas uniquement sur des connaissances, mais sur des habitudes comportementales. La répétition consciente est un facteur clé du changement durable, les rituels t'indiquent quoi faire, quoi regarder, quelles questions te poser et comment préparer la suite.",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pas d'automatisation qui te transforme en simple spectateur
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Avec Steero, tu deviens le pilote : tu comprends, ajustes et ritualises ta trajectoire financière pour
            atteindre la destination que tu as choisie.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="card-feature text-center text-primary-foreground bg-slate-50"
            >
              <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-left text-primary">{feature.title}</h3>
              <p className="leading-relaxed text-left text-base text-[#65758b] font-light font-[serif]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
