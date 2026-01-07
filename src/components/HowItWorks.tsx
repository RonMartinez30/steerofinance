const steps = [{
  number: "01",
  title: "Observez vos habitudes",
  description: "Comprenez où va votre argent sans jugement. Steero vous aide à visualiser vos flux financiers avec clarté."
}, {
  number: "02",
  title: "Ritualisez vos décisions",
  description: "Créez des rituels financiers réguliers. Une fois par semaine, prenez 10 minutes pour ajuster et planifier."
}, {
  number: "03",
  title: "Faites grandir votre patrimoine",
  description: "Avancez à votre rythme. Chaque petite décision s'accumule pour construire votre avenir financier avec sérénité."
}];
const HowItWorks = () => {
  return <section className="py-24 bg-hero-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
        </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => <div key={index} className="relative p-8 rounded-2xl bg-card shadow-card hover:shadow-lg transition-shadow duration-300">
              <span className="step-number">{step.number}</span>
              <h3 className="text-xl font-semibold text-foreground mb-3 mt-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>)}
        </div>
      </div>
    </section>;
};
export default HowItWorks;