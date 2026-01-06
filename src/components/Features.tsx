import { Circle, Settings, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Circle,
    title: "Une roue fluide qui avance à votre rythme",
    description:
      "Noria vous guide pour comprendre, ajuster et ritualiser vos décisions financières. Comme une roue fluide, vous avancez pas à pas, sans stress.",
  },
  {
    icon: Settings,
    title: "Pas d'automatisation à votre place",
    description:
      "Contrairement aux autres applications, Noria ne fait pas à votre place. Elle vous aide à comprendre et à prendre vos propres décisions éclairées.",
  },
  {
    icon: TrendingUp,
    title: "Construisez, lisez et faites grandir votre patrimoine",
    description:
      "Avec clarté et sérénité, visualisez votre patrimoine, comprenez-le et faites-le grandir selon vos objectifs de vie.",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Une approche différente de vos finances
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Noria n'automatise pas pour vous : elle vous guide pour comprendre, 
            ajuster et ritualiser vos décisions financières.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card-feature text-center">
              <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
