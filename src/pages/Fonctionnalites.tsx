import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useWaitlist } from "@/contexts/WaitlistContext";

type Tag = "T" | "E" | "M" | "P" | "O";

interface FeatureItem {
  title: string;
  desc: string;
  tags: Tag[];
  detail?: React.ReactNode;
}

interface PhaseGroup {
  tags: string;
  cadence: string;
  title: string;
  intro: string;
  features: FeatureItem[];
}

const TagPill = ({ tag }: { tag: Tag }) => (
  <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-[11px] font-semibold">
    {tag}
  </span>
);

const TagGroup = ({ tags }: { tags: Tag[] }) => (
  <div className="inline-flex items-center gap-1">
    {tags.map((t, i) => (
      <span key={i} className="contents">
        {i > 0 && <span className="text-muted-foreground/40 text-xs">·</span>}
        <TagPill tag={t} />
      </span>
    ))}
  </div>
);

// Mini tableau budget pour la première feature
const BudgetTable = () => {
  const rows = [
    { cat: "Revenus", apr: "2 100€", may: "2 100€", jun: "2 100€", income: true },
    { cat: "Logement", apr: "800€", may: "800€", jun: "800€" },
    { cat: "  Loyer", apr: "750€", may: "750€", jun: "750€", sub: true },
    { cat: "  Assurance", apr: "50€", may: "50€", jun: "50€", sub: true },
    { cat: "Alimentation", apr: "400€", may: "470€", jun: "490€", changed: true },
    { cat: "  Courses", apr: "280€", may: "310€", jun: "330€", sub: true },
    { cat: "  Restaurant", apr: "120€", may: "160€", jun: "160€", sub: true, changed: true },
    { cat: "Loisirs", apr: "300€", may: "370€", jun: "490€", changed: true },
  ];
  return (
    <div className="mt-5 overflow-x-auto rounded-xl border border-border/60 bg-background">
      <table className="w-full min-w-[420px] text-xs">
        <thead>
          <tr className="bg-muted/40">
            <th className="text-left p-3 text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">Catégorie</th>
            <th className="text-right p-3 text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">Avril</th>
            <th className="text-right p-3 text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">Mai</th>
            <th className="text-right p-3 text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">Juin</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={i !== 0 ? "border-t border-border/40" : ""}>
              <td className={`p-2.5 ${r.sub ? "text-muted-foreground pl-5" : "text-foreground font-medium"}`}>
                {r.cat.trim()}
              </td>
              <td className={`p-2.5 text-right ${r.income ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                {r.apr}
              </td>
              <td className={`p-2.5 text-right ${r.income ? "text-primary font-semibold" : r.changed ? "text-destructive font-medium" : "text-muted-foreground"}`}>
                {r.may}
              </td>
              <td className={`p-2.5 text-right ${r.income ? "text-primary font-semibold" : r.changed ? "text-destructive font-medium" : "text-muted-foreground"}`}>
                {r.jun}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Fonctionnalites = () => {
  const { openWaitlist } = useWaitlist();

  const phases: PhaseGroup[] = [
    {
      tags: "T · E",
      cadence: "Quotidien & Hebdo",
      title: "Tracer & Examiner",
      intro: "Saisir, observer, maintenir le lien avec sa situation réelle.",
      features: [
        {
          title: "Structure de budget",
          desc: "Catégories et sous-catégories qui reflètent ta vie réelle.",
          tags: ["T"],
          detail: (
            <>
              <p>
                Organise tes dépenses de manière hiérarchique pour une vision claire de ce qui compte vraiment. Tu définis les catégories — Steero ne t'impose pas une taxonomie générique.
              </p>
              <BudgetTable />
            </>
          ),
        },
        {
          title: "Modèles & saisie rapide",
          desc: "Enregistrer une dépense en quelques secondes.",
          tags: ["T"],
        },
        {
          title: "Le Niveau",
          desc: "Visualise ta marge en temps réel.",
          tags: ["E"],
        },
        {
          title: "Opérations fixes",
          desc: "Anticipe les flux récurrents. Ne les subis plus.",
          tags: ["T", "E"],
        },
      ],
    },
    {
      tags: "M · P",
      cadence: "Mensuel & Trimestriel",
      title: "Maîtriser & Positionner",
      intro: "Décider consciemment. Aligner finances et objectifs de vie.",
      features: [
        {
          title: "Trajectoire personnalisée",
          desc: "Fixe le cap. Steero te montre si tu t'en écartes.",
          tags: ["M", "P"],
        },
        {
          title: "Suivi d'habitudes",
          desc: "Ancre les comportements qui durent.",
          tags: ["M"],
        },
        {
          title: "Aide à la décision",
          desc: "Repère les écarts avant qu'ils ne s'installent.",
          tags: ["E", "M"],
        },
      ],
    },
  ];

  const upcoming = [
    {
      tag: "P",
      title: "Gestion par projets",
      desc: "Relie plusieurs budgets autour d'un seul objectif.",
    },
    {
      tag: "P",
      title: "Flux & avances",
      desc: "Gère le décalage entre encaissements et décaissements.",
    },
    {
      tag: "O",
      title: "Gestion du patrimoine",
      desc: "Comprends ta situation globale en un coup d'œil.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Fonctionnalités — Steero"
        description="Chaque fonctionnalité a sa place dans le système TEMPO. Une progression — du rituel quotidien aux arbitrages stratégiques."
      />
      <Header />

      {/* HERO */}
      <section className="relative bg-hero-gradient pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -left-20 top-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -right-20 bottom-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="badge-sparkle mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Le système TEMPO</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-6"
            >
              Chaque fonctionnalité a sa place dans le{" "}
              <span className="text-primary italic">système.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-xl mx-auto"
            >
              Pas une liste de features. Une progression — du rituel quotidien aux arbitrages stratégiques.
            </motion.p>
          </div>
        </div>
      </section>

      {/* PHASES */}
      {phases.map((phase, idx) => (
        <section
          key={idx}
          className={`py-20 ${idx % 2 === 0 ? "bg-background" : "bg-secondary/30"}`}
        >
          <div className="container mx-auto px-6 max-w-4xl">
            {/* En-tête phase */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row md:items-baseline md:gap-8 mb-12 pb-6 border-b border-border/60"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-3 md:mb-0 self-start whitespace-nowrap">
                {phase.tags} — {phase.cadence}
              </div>
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {phase.title}
                </h2>
                <p className="text-muted-foreground">{phase.intro}</p>
              </div>
            </motion.div>

            {/* Features */}
            <div className="space-y-4">
              {phase.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.05 * i }}
                  className="rounded-2xl border border-border/60 bg-card p-6 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-1.5">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                    <TagGroup tags={feature.tags} />
                  </div>

                  {feature.detail && (
                    <div className="mt-5 pt-5 border-t border-border/40 text-sm text-muted-foreground leading-relaxed">
                      {feature.detail}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* PROCHAINES ÉVOLUTIONS */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold tracking-widest text-muted-foreground mb-3 uppercase"
          >
            Prochaines évolutions
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold leading-tight text-foreground mb-4"
          >
            Le système continue de se construire.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground mb-10"
          >
            Ces fonctionnalités étendent le pilotage vers les horizons P et O de TEMPO.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcoming.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="rounded-2xl border border-border/60 bg-muted/30 p-5"
              >
                <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-background text-muted-foreground text-[10px] font-semibold tracking-widest uppercase mb-4">
                  <Clock className="w-3 h-3" />
                  Bientôt · {item.tag}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -left-20 top-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -right-20 bottom-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-primary-foreground mb-3"
            >
              Prêt à piloter tes finances ?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-primary-foreground/90 mb-10"
            >
              Rejoins Steero pour changer d'approche et atteindre tes objectifs.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 justify-center items-center"
            >
              <button
                onClick={openWaitlist}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-primary font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Commencer gratuitement
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <Link
                to="/pourquoi-steero"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-transparent border border-primary-foreground/30 text-primary-foreground font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Découvrir l'approche Steero
              </Link>
            </motion.div>
            <p className="text-xs text-primary-foreground/70 mt-5">
              14 jours gratuits — sans engagement
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Fonctionnalites;
