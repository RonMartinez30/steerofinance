import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Clock, Zap, TrendingUp, Repeat, Target, CheckCircle2, AlertTriangle, FolderKanban, Wallet, Landmark } from "lucide-react";
import { Link } from "react-router-dom";
import { useWaitlist } from "@/contexts/WaitlistContext";

type Tag = "T" | "E" | "M" | "P" | "O";

interface FeatureItem {
  title: string;
  desc: string;
  tags: Tag[];
  illustration: React.ReactNode;
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

/* ----------- ILLUSTRATIONS ----------- */

// 1. Structure de budget — tableau Avril/Mai/Juin
const BudgetIllustration = () => {
  const rows = [
    { cat: "Revenus", apr: "2 100€", may: "2 100€", jun: "2 100€", income: true },
    { cat: "Logement", apr: "800€", may: "800€", jun: "800€" },
    { cat: "Loyer", apr: "750€", may: "750€", jun: "750€", sub: true },
    { cat: "Assurance", apr: "50€", may: "50€", jun: "50€", sub: true },
    { cat: "Alimentation", apr: "400€", may: "470€", jun: "490€", changed: true },
    { cat: "Courses", apr: "280€", may: "310€", jun: "330€", sub: true },
    { cat: "Restaurant", apr: "120€", may: "160€", jun: "160€", sub: true, changed: true },
    { cat: "Loisirs", apr: "300€", may: "370€", jun: "490€", changed: true },
  ];
  return (
    <div className="overflow-x-auto rounded-xl border border-border/60 bg-background">
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
              <td className={`p-2.5 ${r.sub ? "text-muted-foreground pl-6" : "text-foreground font-medium"}`}>
                {r.cat}
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

// 2. Saisie rapide — formulaire compact
const QuickEntryIllustration = () => {
  const templates = ["☕ Café — 3,50€", "🥖 Boulangerie — 8,20€", "⛽ Essence — 65€"];
  return (
    <div className="rounded-xl border border-border/60 bg-background p-4 space-y-2">
      <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-2">Modèles favoris</p>
      {templates.map((t, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
          className="flex items-center justify-between px-3 py-2 rounded-lg bg-muted/40 text-sm text-foreground"
        >
          <span>{t}</span>
          <Zap className="w-3.5 h-3.5 text-primary" />
        </motion.div>
      ))}
      <div className="pt-2 mt-2 border-t border-border/40 text-[11px] text-muted-foreground italic">
        Saisie en moins de 3 secondes.
      </div>
    </div>
  );
};

// 3. Le Niveau — jauge budgétaire
const NiveauIllustration = () => {
  const cats = [
    { name: "Alimentation", pct: 78, value: "390€ / 500€", warn: false },
    { name: "Loisirs", pct: 92, value: "276€ / 300€", warn: true },
    { name: "Transport", pct: 45, value: "90€ / 200€", warn: false },
  ];
  return (
    <div className="rounded-xl border border-border/60 bg-background p-4 space-y-4">
      {cats.map((c, i) => (
        <div key={i}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-medium text-foreground">{c.name}</span>
            <span className={`text-xs ${c.warn ? "text-destructive font-semibold" : "text-muted-foreground"}`}>
              {c.value}
            </span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${c.pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
              className={`h-full rounded-full ${c.warn ? "bg-destructive" : "bg-primary"}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// 4. Opérations fixes — calendrier récurrent
const FixedOpsIllustration = () => {
  const ops = [
    { day: "01", name: "Loyer", amount: "−750€", out: true },
    { day: "02", name: "Salaire", amount: "+2 100€", out: false },
    { day: "05", name: "Abonnement Internet", amount: "−35€", out: true },
    { day: "15", name: "Assurance", amount: "−50€", out: true },
  ];
  return (
    <div className="rounded-xl border border-border/60 bg-background p-4 space-y-1.5">
      <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-2">Récurrents — ce mois</p>
      {ops.map((o, i) => (
        <div key={i} className="flex items-center gap-3 py-1.5">
          <div className="w-9 h-9 rounded-lg bg-muted/60 flex items-center justify-center text-xs font-semibold text-muted-foreground shrink-0">
            {o.day}
          </div>
          <div className="flex-1 flex items-center gap-2">
            <Repeat className="w-3 h-3 text-muted-foreground/60" />
            <span className="text-sm text-foreground">{o.name}</span>
          </div>
          <span className={`text-sm font-semibold ${o.out ? "text-foreground" : "text-primary"}`}>
            {o.amount}
          </span>
        </div>
      ))}
    </div>
  );
};

// 5. Trajectoire — courbe objectif vs réel
const TrajectoireIllustration = () => (
  <div className="rounded-xl border border-border/60 bg-background p-4">
    <div className="flex items-center justify-between mb-3">
      <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">Épargne 12 mois</p>
      <span className="text-xs text-primary font-semibold">+ 6 200€</span>
    </div>
    <svg viewBox="0 0 300 100" className="w-full h-24">
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Cible (pointillé) */}
      <line x1="0" y1="80" x2="300" y2="20" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
      {/* Aire réel */}
      <motion.path
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        d="M0,82 C60,75 100,60 150,52 S250,28 300,18"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M0,82 C60,75 100,60 150,52 S250,28 300,18 L300,100 L0,100 Z" fill="url(#grad)" />
      <circle cx="300" cy="18" r="4" fill="hsl(var(--primary))" />
    </svg>
    <div className="flex items-center gap-4 mt-2 text-[11px] text-muted-foreground">
      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary" /> Réel</span>
      <span className="flex items-center gap-1.5"><span className="w-3 h-px border-t border-dashed border-muted-foreground" /> Cible</span>
    </div>
  </div>
);

// 6. Suivi d'habitudes — grille de streaks
const HabitsIllustration = () => {
  const days = Array.from({ length: 28 }, (_, i) => {
    const filled = i % 7 !== 5 && i % 11 !== 3;
    return filled;
  });
  return (
    <div className="rounded-xl border border-border/60 bg-background p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">Saisie quotidienne</p>
        <span className="text-xs font-semibold text-primary">23 jours / 28</span>
      </div>
      <div className="grid grid-cols-14 gap-1.5" style={{ gridTemplateColumns: "repeat(14, minmax(0, 1fr))" }}>
        {days.map((filled, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.015, duration: 0.2 }}
            className={`aspect-square rounded ${filled ? "bg-primary" : "bg-muted"}`}
          />
        ))}
      </div>
      <p className="text-[11px] text-muted-foreground italic mt-3">Le rituel se construit jour après jour.</p>
    </div>
  );
};

// 7. Aide à la décision — alertes contextuelles
const DecisionIllustration = () => (
  <div className="rounded-xl border border-border/60 bg-background p-4 space-y-2.5">
    <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
      <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-semibold text-foreground">Restaurant : +33% vs mois dernier</p>
        <p className="text-xs text-muted-foreground mt-0.5">Tu es à 160€ pour 120€ habituellement.</p>
      </div>
    </div>
    <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-semibold text-foreground">Logement stable depuis 6 mois</p>
        <p className="text-xs text-muted-foreground mt-0.5">Tu peux capitaliser sur cette régularité.</p>
      </div>
    </div>
  </div>
);

/* ----------- PAGE ----------- */

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
          desc: "Catégories et sous-catégories qui reflètent ta vie réelle. Tu définis la taxonomie — Steero ne t'impose rien.",
          tags: ["T"],
          illustration: <BudgetIllustration />,
        },
        {
          title: "Modèles & saisie rapide",
          desc: "Enregistre une dépense en quelques secondes grâce aux modèles préremplis et favoris.",
          tags: ["T"],
          illustration: <QuickEntryIllustration />,
        },
        {
          title: "Le Niveau",
          desc: "La jauge budgétaire qui indique ce qui est consommé et ce qu'il te reste, en temps réel.",
          tags: ["E"],
          illustration: <NiveauIllustration />,
        },
        {
          title: "Opérations fixes",
          desc: "Anticipe les flux récurrents — loyer, abonnements, salaire. Ne les subis plus.",
          tags: ["T", "E"],
          illustration: <FixedOpsIllustration />,
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
          desc: "Fixe le cap. Steero te montre si tu t'en écartes, mois après mois.",
          tags: ["M", "P"],
          illustration: <TrajectoireIllustration />,
        },
        {
          title: "Suivi d'habitudes",
          desc: "Ancre les comportements qui durent. La régularité bat l'intensité.",
          tags: ["M"],
          illustration: <HabitsIllustration />,
        },
        {
          title: "Aide à la décision",
          desc: "Repère les écarts avant qu'ils ne s'installent. Alertes contextuelles, sans bruit.",
          tags: ["E", "M"],
          illustration: <DecisionIllustration />,
        },
      ],
    },
  ];

  const upcoming = [
    { tag: "P", title: "Gestion par projets", desc: "Relie plusieurs budgets autour d'un seul objectif.", Icon: FolderKanban },
    { tag: "P", title: "Flux & avances", desc: "Gère le décalage entre encaissements et décaissements.", Icon: Wallet },
    { tag: "O", title: "Gestion du patrimoine", desc: "Comprends ta situation globale en un coup d'œil.", Icon: Landmark },
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
          <div className="container mx-auto px-6 max-w-5xl">
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
            <div className="space-y-6">
              {phase.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.05 * i }}
                  className="rounded-2xl border border-border/60 bg-card p-6 md:p-8 hover:border-primary/30 transition-colors"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
                    {/* Texte */}
                    <div className={i % 2 === 1 ? "md:order-2" : ""}>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="text-xl font-semibold text-foreground">
                          {feature.title}
                        </h3>
                        <TagGroup tags={feature.tags} />
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                    {/* Illustration */}
                    <div className={i % 2 === 1 ? "md:order-1" : ""}>
                      {feature.illustration}
                    </div>
                  </div>
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
            {upcoming.map((item, i) => {
              const Icon = item.Icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="rounded-2xl border border-border/60 bg-muted/30 p-5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-background text-muted-foreground text-[10px] font-semibold tracking-widest uppercase">
                      <Clock className="w-3 h-3" />
                      Bientôt · {item.tag}
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
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
