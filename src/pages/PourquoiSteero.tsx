import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Check, Star, Brain, Eye, RefreshCw, Pencil, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const alternatives = [{
  icon: "❌",
  title: "Excel dispersé",
  description: "Formules cassées, suivi irrégulier."
}, {
  icon: "❌",
  title: "Apps bancaires",
  description: "Beaucoup de données, peu de décisions."
}, {
  icon: "❌",
  title: "Notion bricolé",
  description: "Puissant mais fragile."
}, {
  icon: "✅",
  title: "Steero",
  description: "Un cadre simple, pensé pour durer.",
  highlight: true
}];

const testimonials = [{
  quote: "Steero m'a permis de comprendre enfin où partait mon argent. En 3 mois, j'ai économisé plus que jamais.",
  author: "Marie L.",
  role: "Freelance"
}, {
  quote: "La saisie manuelle semblait contraignante au début, mais c'est devenu un rituel qui m'aide vraiment à réfléchir.",
  author: "Thomas D.",
  role: "Cadre"
}, {
  quote: "Simple, efficace, sans prise de tête. Exactement ce dont j'avais besoin pour reprendre le contrôle.",
  author: "Sophie M.",
  role: "Enseignante"
}];

const behavioralElements = [{
  icon: Brain,
  title: "La compréhension naît de l'effort cognitif",
  subtitle: "Pas de la simple exposition à l'information",
  description: "Le cerveau apprend durablement lorsqu'il est actif, pas passif. L'enregistrement manuel oblige à identifier la dépense, la catégoriser, la comparer à une intention et l'assumer consciemment. Automatiser supprime l'effort cognitif, donc la compréhension profonde.",
  reference: "Chi et Wylie – The ICAP Framework"
}, {
  icon: Eye,
  title: "L'automatisation crée une illusion de contrôle",
  subtitle: "Sans maîtrise réelle",
  description: "\"Mes comptes sont connectés\", \"Mes dépenses sont catégorisées\"… Mais l'utilisateur ne sait pas expliquer où va son argent, ni pourquoi il dévie de ses objectifs. L'automatisation déplace la responsabilité vers l'outil, pas vers l'utilisateur.",
  reference: "Parasuraman & Riley – Humans and Automation"
}, {
  icon: RefreshCw,
  title: "Le rituel transforme la finance en comportement",
  subtitle: "Pas en donnée",
  description: "Ritualiser permet d'ancrer une routine consciente, de créer un point de contact régulier avec la réalité financière et de transformer une contrainte abstraite en pratique tangible. Les micro-rituels sont plus efficaces que les bilans occasionnels automatisés.",
  reference: "BJ Fogg – Behavior Model"
}, {
  icon: Pencil,
  title: "L'enregistrement manuel crée un lien émotionnel",
  subtitle: "Clé de la décision",
  description: "Une dépense enregistrée manuellement déclenche une micro-évaluation émotionnelle, rend le coût psychologiquement réel et renforce la mémoire de la décision. Sans friction minimale, il n'y a ni prise de conscience, ni arbitrage réel.",
  reference: "Baumeister & Vohs – Self-regulation"
}, {
  icon: BookOpen,
  title: "Automatiser trop tôt empêche l'apprentissage",
  subtitle: "Erreur classique des apps financières",
  description: "L'automatisation est utile après la compréhension, pas avant. Dans la majorité des apps, l'utilisateur est bombardé de données sans cadre mental ni pédagogie. Résultat : abandon rapide, consultation passive, aucune progression réelle.",
  reference: "Sweller – Cognitive Load Theory"
}];

const PourquoiSteero = () => {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-hero-gradient overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-bold text-foreground mb-6"
            >
              Pourquoi choisir <span className="text-gradient">Steero</span> ?
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="text-lg text-muted-foreground mb-8"
            >
              Une approche différente de la gestion financière, basée sur la compréhension, la régularité et le
              changement durable.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-foreground mb-4">Notre mission</h2>
                <p className="text-muted-foreground mb-4">
                  Steero est né d'un constat simple : les applications de finances personnelles automatisent tout, mais
                  ne changent rien à vos comportements.
                </p>
                <p className="text-muted-foreground mb-6">
                  Notre mission est de vous aider à développer une véritable intelligence financière, pas simplement à
                  consulter des graphiques générés automatiquement.
                </p>
                <ul className="space-y-3">
                  {["Comprendre vos décisions", "Créer des habitudes durables", "Atteindre vos objectifs"].map((item, i) => (
                    <motion.li 
                      key={i} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-3 text-foreground"
                    >
                      <Check className="w-5 h-5 text-primary" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-primary/5 rounded-3xl p-8"
              >
                <blockquote className="text-xl italic text-foreground">
                  "La vraie liberté financière vient de la compréhension, pas de l'automatisation."
                </blockquote>
                <p className="mt-4 text-muted-foreground">— L'équipe Steero</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparaison alternatives */}
      <section className="py-16 bg-hero-gradient">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Tu as peut-être déjà essayé...
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Des solutions qui promettent beaucoup, mais qui ne changent pas vraiment tes habitudes.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {alternatives.map((alt, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.15,
                  ease: "easeOut"
                }}
                className={`text-center p-6 rounded-2xl transition-all ${
                  alt.highlight 
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                    : 'bg-card border border-border/50'
                }`}
              >
                <span className="text-3xl mb-3 block">{alt.icon}</span>
                <h3 className={`font-semibold mb-2 ${alt.highlight ? 'text-primary-foreground' : 'text-foreground'}`}>
                  {alt.title}
                </h3>
                <p className={`text-sm ${alt.highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  {alt.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Éléments comportementaux */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">Les fondements comportementaux de Steero</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Steero aide chacun à piloter consciemment sa trajectoire financière, plutôt que de la subir.
              </p>
            </motion.div>
            <div className="space-y-6">
              {behavioralElements.map((element, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-background rounded-2xl p-6 shadow-card border border-border/50"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <element.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {index + 1}. {element.title}
                      </h3>
                      <p className="text-sm text-primary font-medium mb-3">{element.subtitle}</p>
                      <p className="text-muted-foreground leading-relaxed mb-3">{element.description}</p>
                      <p className="text-xs text-muted-foreground/70 italic">📚 Référence : {element.reference}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 bg-hero-gradient">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12 text-primary"
          >
            Ce qu'on aimerait que nos utilisateurs disent de Steero
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-card rounded-2xl p-6 shadow-card"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
                </div>
                <p className="text-foreground mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Prêt à transformer votre relation à l'argent ?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Rejoignez des milliers d'utilisateurs qui ont choisi une approche différente.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary group"
            >
              Je m'inscris à la liste d'attente
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PourquoiSteero;
