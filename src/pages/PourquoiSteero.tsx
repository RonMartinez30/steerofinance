import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Info } from "lucide-react";
import { useWaitlist } from "@/contexts/WaitlistContext";

const BRAND = "#1B5CCC";
const BRAND_LIGHT = "#E8EFFB";
const SURFACE = "#F6F7F8";
const BORDER = "#E5E7EB";
const TEXT = "#111418";
const MUTED = "#6B7280";

const serif = { fontFamily: "'DM Serif Display', serif" };
const sans = { fontFamily: "'DM Sans', sans-serif" };

const PourquoiSteero = () => {
  const { openWaitlist } = useWaitlist();

  const retroItems = [
    "Montre où est allé l'argent",
    "Automatique, passif",
    "Observe le passé",
    "Ne prépare pas les décisions",
  ];
  const pareItems = [
    "Aide à piloter vers où tu veux aller",
    "Manuel, conscient, intentionnel",
    "Décide l'avenir",
    "Développe une compétence durable",
  ];

  const principles = [
    {
      num: "01",
      title: "La compréhension naît de l'effort cognitif, pas de l'exposition à l'information.",
      desc: "Enregistrer une dépense, c'est l'identifier, la catégoriser, la comparer à une intention. Ce mécanisme de traitement actif est ce qui produit la maîtrise réelle — pas la consultation d'un dashboard.",
      ref: "Chi & Wylie — The ICAP Framework, 2014",
    },
    {
      num: "02",
      title: "L'automatisation crée une illusion de contrôle, pas une maîtrise.",
      desc: "Les systèmes automatiques génèrent un biais de surconfiance passive : « mes comptes sont connectés » ne signifie pas « je sais où va mon argent ». L'outil porte la responsabilité — pas l'utilisateur.",
      ref: "Parasuraman & Riley — Humans and Automation, 1997",
    },
    {
      num: "03",
      title: "Le rituel transforme la finance en comportement, pas en obligation.",
      desc: "5 minutes par jour créent une boucle de feedback courte. C'est le principe de toute discipline installée durablement : la régularité faible et consistante bat l'effort intense et irrégulier.",
      ref: "Clear — Atomic Habits, 2018",
    },
  ];

  const tempo = [
    { letter: "T", name: "Tracer", desc: "Saisie intentionnelle. Maintient le lien.", freq: "Quotidien", time: "5 min" },
    { letter: "E", name: "Examiner", desc: "Prévoir vs réel. Corriger avant qu'il soit trop tard.", freq: "Hebdomadaire", time: "10 min" },
    { letter: "M", name: "Maîtriser", desc: "Décider où va l'argent le mois suivant.", freq: "Mensuel", time: "15 min" },
    { letter: "P", name: "Positionner", desc: "Aligner finances et objectifs de vie.", freq: "Trimestriel", time: "30 min" },
    { letter: "O", name: "Orienter", desc: "Grandes orientations. Arbitrages stratégiques.", freq: "Annuel", time: "60 min" },
  ];

  return (
    <div style={{ ...sans, backgroundColor: "#FFFFFF", color: TEXT }} className="min-h-screen">
      <SEO
        title="Pourquoi Steero — Tu as besoin d'un pare-brise"
        description="Steero n'est pas un agrégateur de plus. C'est un système de pilotage actif qui t'aide à décider où va ton argent."
      />
      <Header />

      {/* HERO */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-8"
            style={{ color: BRAND }}
          >
            Pourquoi Steero
          </p>
          <h1
            style={{ ...serif, color: TEXT }}
            className="text-4xl md:text-5xl lg:text-6xl leading-[1.15] mb-6"
          >
            Tu n'as pas besoin d'un<br />rétroviseur de plus.<br />
            <em style={{ color: BRAND, fontStyle: "italic" }}>
              Tu as besoin d'un pare-brise.
            </em>
          </h1>
          <p style={{ color: MUTED }} className="text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Les apps qui agrègent tes données te montrent où est allé ton argent. Steero t'aide à décider où il va aller.
          </p>
          <button
            onClick={openWaitlist}
            style={{ backgroundColor: BRAND }}
            className="px-8 py-3.5 text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Commencer 14 jours gratuits
          </button>
          <p style={{ color: MUTED }} className="text-xs mt-4">
            Sans engagement — carte requise à l'issue de la période
          </p>
        </div>
      </section>

      <hr style={{ borderColor: BORDER, borderWidth: "0.5px" }} />

      {/* LE VRAI PROBLÈME */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p style={{ color: MUTED }} className="text-xs font-semibold tracking-[0.2em] uppercase mb-6">
            Le vrai problème
          </p>
          <h2 style={{ ...serif, color: TEXT }} className="text-3xl md:text-4xl leading-tight mb-6">
            Tu sais déjà où ton argent est allé. Ce que tu ignores, c'est où il va aller.
          </h2>
          <p style={{ color: MUTED }} className="text-base leading-relaxed mb-12">
            Les apps automatiques te donnent une réponse au mauvais problème. Tu n'as pas un problème d'information — tu as un problème de décision. Finary, Linxo, Bankin te montrent le passé avec une précision parfaite. Ça ne change pas les comportements.
          </p>

          {/* Comparison table */}
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ border: `0.5px solid ${BORDER}` }}>
            {/* Rétroviseur */}
            <div style={{ backgroundColor: SURFACE }} className="p-6 md:border-r" >
              <p style={{ color: MUTED }} className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-4">
                Rétroviseur
              </p>
              <p style={{ color: TEXT }} className="font-medium mb-5">Finary, Bankin, Linxo</p>
              <ul className="space-y-0">
                {retroItems.map((item, i) => (
                  <li
                    key={i}
                    style={{ borderTop: i === 0 ? "none" : `0.5px solid ${BORDER}`, color: TEXT }}
                    className="py-3 text-sm flex gap-2"
                  >
                    <span style={{ color: MUTED }}>—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Pare-brise */}
            <div style={{ backgroundColor: "#FFFFFF", borderTop: `0.5px solid ${BORDER}` }} className="p-6 md:border-t-0 md:border-l" >
              <p style={{ color: BRAND }} className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-4">
                Pare-brise
              </p>
              <p style={{ color: TEXT }} className="font-medium mb-5">Steero</p>
              <ul className="space-y-0">
                {pareItems.map((item, i) => (
                  <li
                    key={i}
                    style={{ borderTop: i === 0 ? "none" : `0.5px solid ${BORDER}`, color: TEXT }}
                    className="py-3 text-sm flex gap-2"
                  >
                    <span style={{ color: BRAND }}>→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <hr style={{ borderColor: BORDER, borderWidth: "0.5px" }} />

      {/* APPROCHE COMPORTEMENTALE */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p style={{ color: MUTED }} className="text-xs font-semibold tracking-[0.2em] uppercase mb-6">
            Approche comportementale
          </p>
          <h2 style={{ ...serif, color: TEXT }} className="text-3xl md:text-4xl leading-tight mb-6">
            Pourquoi le manuel change tout.
          </h2>
          <p style={{ color: MUTED }} className="text-base leading-relaxed mb-12">
            La saisie manuelle n'est pas un manque de technologie. C'est la mécanique qui produit le changement de comportement. Trois principes, documentés.
          </p>

          <div className="space-y-4">
            {principles.map((p) => (
              <div
                key={p.num}
                style={{ border: `0.5px solid ${BORDER}`, backgroundColor: "#FFFFFF" }}
                className="p-6"
              >
                <div className="flex gap-5">
                  <span
                    style={{ backgroundColor: BRAND_LIGHT, color: BRAND }}
                    className="shrink-0 w-9 h-9 flex items-center justify-center text-xs font-semibold"
                  >
                    {p.num}
                  </span>
                  <div className="flex-1">
                    <p style={{ color: TEXT }} className="font-medium leading-snug mb-2">
                      {p.title}
                    </p>
                    <p style={{ color: MUTED }} className="text-sm leading-relaxed">
                      {p.desc}
                    </p>
                    <hr style={{ borderColor: BORDER, borderWidth: "0.5px" }} className="my-3" />
                    <p style={{ color: MUTED }} className="text-xs italic">
                      {p.ref}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr style={{ borderColor: BORDER, borderWidth: "0.5px" }} />

      {/* TEMPO */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p style={{ color: MUTED }} className="text-xs font-semibold tracking-[0.2em] uppercase mb-6">
            Le système
          </p>
          <h2 style={{ ...serif, color: TEXT }} className="text-3xl md:text-4xl leading-tight mb-6">
            TEMPO — cinq rituels, une discipline.
          </h2>
          <p style={{ color: MUTED }} className="text-base leading-relaxed mb-12">
            Du quotidien au stratégique. Chaque niveau a une fréquence, un objectif, une durée. L'ensemble forme un système de pilotage complet.
          </p>

          <div className="overflow-x-auto" style={{ border: `0.5px solid ${BORDER}` }}>
            <table className="w-full min-w-[640px]">
              <thead>
                <tr style={{ backgroundColor: SURFACE }}>
                  <th style={{ color: MUTED, borderBottom: `0.5px solid ${BORDER}` }} className="text-[10px] font-semibold tracking-[0.2em] uppercase text-left p-4 w-16">
                    
                  </th>
                  <th style={{ color: MUTED, borderBottom: `0.5px solid ${BORDER}` }} className="text-[10px] font-semibold tracking-[0.2em] uppercase text-left p-4">
                    Rituel
                  </th>
                  <th style={{ color: MUTED, borderBottom: `0.5px solid ${BORDER}` }} className="text-[10px] font-semibold tracking-[0.2em] uppercase text-left p-4">
                    Fréquence
                  </th>
                  <th style={{ color: MUTED, borderBottom: `0.5px solid ${BORDER}` }} className="text-[10px] font-semibold tracking-[0.2em] uppercase text-left p-4">
                    Durée
                  </th>
                </tr>
              </thead>
              <tbody>
                {tempo.map((row, i) => (
                  <tr key={row.letter} style={{ borderTop: i === 0 ? "none" : `0.5px solid ${BORDER}` }}>
                    <td className="p-4 align-top">
                      <span style={{ ...serif, color: BRAND }} className="text-3xl leading-none">
                        {row.letter}
                      </span>
                    </td>
                    <td className="p-4 align-top">
                      <p style={{ color: TEXT }} className="font-medium text-sm mb-1">{row.name}</p>
                      <p style={{ color: MUTED }} className="text-xs leading-relaxed">{row.desc}</p>
                    </td>
                    <td style={{ color: MUTED }} className="p-4 align-top text-sm">{row.freq}</td>
                    <td style={{ color: TEXT }} className="p-4 align-top text-sm font-medium">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            style={{ backgroundColor: SURFACE, border: `0.5px solid ${BORDER}` }}
            className="mt-6 p-4 flex gap-3"
          >
            <Info className="w-4 h-4 shrink-0 mt-0.5" style={{ color: BRAND }} />
            <p style={{ color: MUTED }} className="text-xs leading-relaxed">
              <span style={{ color: TEXT }} className="font-medium">Import de relevé bancaire à venir.</span>{" "}
              La prochaine évolution de Steero permettra d'importer tes relevés pour pré-remplir les transactions. La validation reste un acte humain. L'outil suggère — toi tu décides. Toujours.
            </p>
          </div>
        </div>
      </section>

      <hr style={{ borderColor: BORDER, borderWidth: "0.5px" }} />

      {/* CTA FINAL */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 style={{ ...serif, color: TEXT }} className="text-3xl md:text-4xl leading-tight mb-3">
            Installe un système.
          </h2>
          <h2 style={{ ...serif, color: TEXT }} className="text-3xl md:text-4xl leading-tight mb-6">
            Pas une app de plus.
          </h2>
          <p style={{ color: MUTED }} className="text-base mb-10">
            14 jours pour tester le pilotage actif de tes finances. Aucun automatisme — une discipline.
          </p>
          <button
            onClick={openWaitlist}
            style={{ backgroundColor: BRAND }}
            className="px-8 py-3.5 text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Commencer gratuitement
          </button>
          <p style={{ color: MUTED }} className="text-xs mt-4">
            Carte bancaire requise à l'issue des 14 jours.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PourquoiSteero;
