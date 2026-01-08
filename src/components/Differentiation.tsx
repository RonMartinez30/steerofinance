import featureBudgetiser from "@/assets/feature-budgetiser.webp";
import featureSaisir from "@/assets/feature-saisir.webp";
import featureRitualiser from "@/assets/feature-ritualiser.webp";
const advantages = [{
  title: "Budgétiser",
  description: "Tes ressources sont limitées : elles te permettent de construire le présent et de préparer l'avenir. Bien les définir est essentiel. Crée des budgets clairs, grâce à la trajectoire, notre outil intuitif qui t'accompagne pour définir ta destination.",
  image: featureBudgetiser
}, {
  title: "Saisir",
  description: "Contrairement à d'autres applications, Steero ne fait pas à ta place. La saisie manuelle crée un lien émotionnel : ce qui améliore significativement l'autorégulation… Nous l'avons amélioré grâce au Niveau - La jauge budgétaire qui indique le consommé, consommé avec la dépense saisie et le restant.",
  image: featureSaisir
}, {
  title: "Ritualiser",
  description: "La compréhension financière ne repose pas uniquement sur des connaissances, mais sur des habitudes comportementales. La répétition consciente est un facteur clé du changement durable, les rituels t'indiquent quoi faire, quoi regarder, quelles questions te poser et comment préparer la suite.",
  image: featureRitualiser
}];
const Differentiation = () => {
  return <section className="py-20 bg-hero-gradient bg-secondary-foreground">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pas d'automatisation qui te transforme en simple spectateur
          </h2>
          <p className="text-muted-foreground text-lg">
            Avec Steero, tu deviens le pilote : tu comprends, ajustes et
            ritualises ta trajectoire financière
            <br className="hidden md:block" /> pour atteindre la destination que
            tu as choisie.
          </p>
        </div>
        <div className="max-w-6xl mx-auto space-y-20">
          {advantages.map((adv, index) => {
          const isReversed = index % 2 === 1;
          return <div key={index} className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-16 items-center`}>
                {/* Image */}
                <div className="w-full md:w-1/2">
                  <div className="rounded-2xl overflow-hidden shadow-lg bg-muted/30">
                    <img src={adv.image} alt={adv.title} className="w-full h-auto object-cover" />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                    {adv.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {adv.description}
                  </p>
                </div>
              </div>;
        })}
        </div>
      </div>
    </section>;
};
export default Differentiation;