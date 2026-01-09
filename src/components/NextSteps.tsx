import { UserPlus, Users, Rocket } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Inscris-toi à la liste d'attente",
    description:
      "Un outil simple, intuitif, conçu pour reprendre le contrôle de tes finances c'est notre priorité. Inscris-toi à la liste et partage Steero autour de toi : chaque soutien compte pour accélérer le lancement.",
    date: "Dès maintenant",
  },
  {
    icon: Users,
    title: "Deviens early adopter",
    description:
      "La version stable de Steero se construira avec toi, futur utilisateur. Un groupe restreint d'inscrits aura accès en avant-première afin de tester les fonctionnalités clés, affiner l'expérience et contribuer à la stabilisation du produit.",
    date: "Phase bêta : février 2026",
  },
  {
    icon: Rocket,
    title: "Lancement",
    description:
      "Un outil fiable, abouti et pensé pour durer, pour enfin piloter tes finances en toute sérénité. Après la phase de stabilisation, Steero deviendra ton espace de référence pour suivre, comprendre et décider.",
    date: "Disponibilité : Mars 2026",
  },
];

const NextSteps = () => {
  return (
    <section id="prochaines-etapes" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Les prochaines étapes</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvre la feuille de route de Steero et rejoins l'aventure dès maintenant.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-primary">Étape {index + 1}</span>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>

              <p className="text-muted-foreground mb-4 leading-relaxed">{step.description}</p>

              {step.date && (
                <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {step.date}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NextSteps;
