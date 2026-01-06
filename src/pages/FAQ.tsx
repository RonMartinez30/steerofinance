import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "À qui s'adresse Steero ?",
    answer: `Steero s'adresse à toutes les personnes qui veulent reprendre le contrôle de leurs finances, sans devenir expertes ni passer des heures à gérer des chiffres.

Que tu débutes ou que tu aies déjà essayé des tableurs, des applications budgétaires ou des outils automatisés, Steero est fait pour toi si tu cherches avant tout de la clarté, des repères compréhensibles et un cadre simple pour avancer dans la durée.

Il n'y a aucun prérequis financier.`,
  },
  {
    question: "Quelle est la différence entre Steero et une app bancaire ou un agrégateur ?",
    answer: `Les applications bancaires et les agrégateurs montrent principalement ce qui s'est déjà passé : soldes, transactions, graphiques rétrospectifs.

Steero adopte une approche différente. Steero est un outil de pilotage, pas un simple outil de consultation. Il te permet de :
• définir une direction (objectifs)
• suivre une trajectoire (budgets, indicateurs)
• repérer les écarts
• ajuster consciemment tes décisions
• suivre un rythme clair qui te guide

Là où d'autres outils informent, Steero t'aide à comprendre et agir.`,
  },
  {
    question: "Pourquoi Steero ne se connecte pas à mes banques pour automatiser ?",
    answer: `Automatiser ≠ Comprendre. Les outils 100 % automatisés montrent des chiffres, mais n'enseignent pas. Sans effort cognitif, l'utilisateur voit ses finances sans les maîtriser. Résultat courant : illusion de contrôle → désengagement → abandon.

La compréhension naît de l'action consciente. Enregistrer manuellement une opération oblige à identifier la dépense, la catégoriser et la relier à un budget ou un objectif. Ce micro-effort active l'apprentissage et la mémorisation. C'est le principe du learning by doing : on comprend en faisant.

Le rituel crée un comportement durable. Steero privilégie un rituel court et régulier. La répétition consciente transforme la finance en habitude, pas en contrainte. Une habitude bat toujours un dashboard automatisé oublié.`,
  },
  {
    question: "Est-ce que Steero remplace mon application bancaire ?",
    answer: `Non, et ce n'est pas son objectif. Ton application bancaire reste indispensable pour payer, consulter tes comptes et effectuer des opérations bancaires.

Steero vient en complément. Il te permet de prendre de la hauteur, de structurer ta vision financière et de piloter ce que tes apps bancaires ne font pas : tes rituels, tes objectifs, ta trajectoire, tes arbitrages.

En résumé : la banque exécute, Steero t'aide à décider.`,
  },
  {
    question: "Combien de temps ça prend d'enregistrer mes opérations ?",
    answer: `Très peu de temps — et beaucoup moins que tu ne l'imagines.

Dans la réalité, la majorité des personnes effectue quelques opérations par jour, parfois seulement quelques-unes par semaine. Avec Steero, les enregistrer prend quelques secondes. Il ne s'agit pas de tout consigner obsessivement, mais de capturer l'essentiel, régulièrement.

Pourquoi ce n'est pas lourd :
• Tu n'as pas des dizaines de lignes par jour
• Les opérations récurrentes deviennent vite naturelles à saisir grâce aux modèles de transactions
• Le geste s'intègre dans un rituel simple, pas dans une corvée

Ce que tu gagnes : tu sais où tu en es sans attendre la fin du mois, et tu repères immédiatement où tu te situes grâce à un indicateur dynamique de budget.`,
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer: `Oui. La sécurité et le respect de tes données sont des priorités.

• Tes données sont stockées de manière sécurisée
• Steero ne revend pas tes informations
• Tu restes propriétaire de tes données à tout moment

Steero est conçu comme un outil de confiance, durable et respectueux — pas comme un produit basé sur l'exploitation de tes informations.

Nous t'invitons à prendre connaissance des conditions générales de services avant d'essayer.`,
  },
  {
    question: "Est-ce que Steero donne des conseils financiers ?",
    answer: `Non. Et c'est volontaire.

Steero ne fournit pas de conseils financiers personnalisés et ne remplace pas un professionnel (conseiller financier, fiscaliste, juriste).

Les analyses, graphiques, projections et indicateurs proposés par Steero ont un objectif informatif et pédagogique : ils t'aident à mieux comprendre ta situation, à visualiser ta trajectoire et à prendre du recul sur tes décisions.

Ils ne constituent ni des recommandations individualisées, ni des garanties de performance ou de résultat. Steero ne décide pas à ta place.`,
  },
  {
    question: "Est-ce que Steero est gratuit ?",
    answer: `Oui, Steero est gratuit pendant 14 jours. Cette période te permet de découvrir l'outil, de l'utiliser dans ton quotidien et de vérifier s'il s'intègre naturellement à ta façon de gérer tes finances. Aucune pression — tu peux arrêter à tout moment pendant cette période.

Et après les 14 jours ? Un abonnement est nécessaire pour continuer. Cet abonnement permet de maintenir et améliorer la solution, de garantir une expérience stable et de développer de nouvelles fonctionnalités.

Un prix volontairement accessible : l'abonnement principal coûtera moins de 10 € par mois — soit l'équivalent d'un café par semaine, ou de quelques minutes de charge mentale en moins chaque jour.`,
  },
  {
    question: "Puis-je utiliser Steero sur Mobile ?",
    answer: `Pas pour le moment — et c'est un choix assumé. Steero est conçu comme un outil de pilotage, pas comme une application à consulter entre deux notifications.

Le rituel financier que nous défendons nécessite du calme et de la concentration. Comprendre une trajectoire financière implique de la profondeur d'information, des comparaisons, des indicateurs lisibles et une vision globale.

Le mobile est excellent pour consulter rapidement. Il l'est beaucoup moins pour réfléchir, analyser et ajuster consciemment. Steero n'est pas conçu pour être "checké", mais pour être utilisé avec intention.

Et pour la suite ? Le mobile n'est pas exclu, mais s'il arrive un jour, ce sera pour servir le pilotage, pas pour l'appauvrir.`,
  },
  {
    question: "Steero va-t-il évoluer avec le temps ?",
    answer: `Oui, et c'est même au cœur du projet.

Steero est pensé comme un produit long terme, qui évolue progressivement pour rester simple, pertinent et aligné avec les besoins réels des utilisateurs.

De nouvelles fonctionnalités viendront enrichir l'expérience, toujours avec la même philosophie :
• pas de complexité inutile
• pas d'automatisation qui dépossède
• uniquement ce qui aide réellement à mieux piloter

Les abonnements servent précisément à maintenir cette qualité et à faire évoluer Steero dans le bon sens.`,
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-16 bg-hero-gradient">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Questions fréquentes
              </h1>
              <p className="text-lg text-muted-foreground">
                Tout ce que vous devez savoir sur Steero
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card rounded-xl px-6 border-none shadow-card"
                >
                  <AccordionTrigger className="text-left text-foreground font-medium hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground whitespace-pre-line">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
