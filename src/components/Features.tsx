import { Circle, Settings, TrendingUp } from "lucide-react";
const features = [{
  icon: Circle,
  title: "Budgétiser : aligner tes comportements avec des objectifs clairs et quantifiés",
  description: "Tes ressources sont limitées : elles te permettent de construire le présent et de préparer l’avenir. Définissons ensemble ce cadre essentiel à l’aide de budgets clairs, conçus pour t’aider à avancer vers ta destination."
}, {
  icon: Settings,
  title: "Traquer : suivre les transactions qui impactent ta trésorerie",
  description: "Contrairement à d’autres applications, Steero ne fait pas à ta place. La saisie manuelle crée un lien émotionnel : elle rend le coût psychologiquement réel, ce qui améliore significativement l’autorégulation… et donc la qualité de tes décisions financières."
}, {
  icon: TrendingUp,
  title: "Ritualiser : adopter un rythme qui transforme ton quotidien",
  description: "La compréhension financière ne repose pas uniquement sur des connaissances, mais sur des habitudes comportementales. Les recherches sur les habitudes montrent que la répétition consciente est un facteur clé du changement durable, et que les micro-rituels réguliers sont bien plus efficaces que des bilans occasionnels et automatisés."
}];
const Features = () => {
  return <section className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Pas d’automatisation qui te transforme en simple spectateur</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Avec Steero, tu deviens le pilote : tu comprends, ajustes et ritualises ta trajectoire financière pour atteindre la destination que tu as choisie.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => <div key={index} className="card-feature text-center">
              <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>)}
        </div>
      </div>
    </section>;
};
export default Features;