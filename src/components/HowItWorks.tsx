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
    title: "Faites grandir votre patrimoine",
    description:
      "Chaque petite décision s'accumule pour construire l'avenir avec sérénité et aligné avec tes objectifs : Bâtir un patrimoine, réaliser un projet ou voyager...",
  },
];
const HowItWorks = () => {
  return (
    <section className="py-24 bg-hero-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Comment ça marche ?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto"></p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative p-8 rounded-2xl bg-card shadow-card hover:shadow-lg transition-shadow duration-300"
            >
              <span className="step-number">{step.number}</span>
              <h3 className="text-xl font-semibold text-foreground mb-3 mt-2">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HowItWorks;
