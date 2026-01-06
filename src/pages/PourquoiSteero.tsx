import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Check, Star, TrendingUp, Users, Target, Heart } from "lucide-react";

const stats = [
  { value: "10K+", label: "Utilisateurs actifs" },
  { value: "95%", label: "Taux de satisfaction" },
  { value: "30%", label: "Économies moyennes" },
  { value: "2min", label: "Par jour en moyenne" },
];

const testimonials = [
  {
    quote: "Steero m'a permis de comprendre enfin où partait mon argent. En 3 mois, j'ai économisé plus que jamais.",
    author: "Marie L.",
    role: "Freelance",
  },
  {
    quote: "La saisie manuelle semblait contraignante au début, mais c'est devenu un rituel qui m'aide vraiment à réfléchir.",
    author: "Thomas D.",
    role: "Cadre",
  },
  {
    quote: "Simple, efficace, sans prise de tête. Exactement ce dont j'avais besoin pour reprendre le contrôle.",
    author: "Sophie M.",
    role: "Enseignante",
  },
];

const advantages = [
  {
    title: "Pas d'automatisation aveugle",
    description: "Vous restez maître de chaque décision, pas spectateur de vos finances.",
    icon: Target,
  },
  {
    title: "Approche comportementale",
    description: "Basée sur les recherches en psychologie du changement et des habitudes.",
    icon: Heart,
  },
  {
    title: "Micro-rituels efficaces",
    description: "10 minutes par semaine suffisent pour transformer votre rapport à l'argent.",
    icon: TrendingUp,
  },
];

const PourquoiSteero = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-hero-gradient">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Pourquoi choisir <span className="text-gradient">Steero</span> ?
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Une approche différente de la gestion financière, basée sur la compréhension, 
              la régularité et le changement durable.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Notre mission</h2>
                <p className="text-muted-foreground mb-4">
                  Steero est né d'un constat simple : les applications de finances personnelles 
                  automatisent tout, mais ne changent rien à vos comportements.
                </p>
                <p className="text-muted-foreground mb-6">
                  Notre mission est de vous aider à développer une véritable intelligence financière, 
                  pas simplement à consulter des graphiques générés automatiquement.
                </p>
                <ul className="space-y-3">
                  {["Comprendre vos décisions", "Créer des habitudes durables", "Atteindre vos objectifs"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground">
                      <Check className="w-5 h-5 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-primary/5 rounded-3xl p-8">
                <blockquote className="text-xl italic text-foreground">
                  "La vraie liberté financière vient de la compréhension, pas de l'automatisation."
                </blockquote>
                <p className="mt-4 text-muted-foreground">— L'équipe Steero</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages comparatifs */}
      <section className="py-16 bg-hero-gradient">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Ce qui nous différencie
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {advantages.map((adv, index) => (
              <div key={index} className="card-feature text-center">
                <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <adv.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{adv.title}</h3>
                <p className="text-muted-foreground">{adv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 bg-hero-gradient">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Ce qu'en disent nos utilisateurs
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card rounded-2xl p-6 shadow-card">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Prêt à transformer votre relation à l'argent ?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Rejoignez des milliers d'utilisateurs qui ont choisi une approche différente.
          </p>
          <button className="btn-primary group">
            Commencer gratuitement
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PourquoiSteero;
