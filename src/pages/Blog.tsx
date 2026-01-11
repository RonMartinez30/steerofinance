import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Article {
  id: number;
  title: string;
  hook: string;
  content: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "Comprendre avant d'agir : pourquoi la finance personnelle est une compétence clé",
    hook: `La gestion des finances personnelles est rarement enseignée à l'école.
Pourtant, comprendre son argent est aujourd'hui une compétence essentielle, au même titre que savoir organiser son temps ou développer ses compétences professionnelles.

Beaucoup de personnes gagnent correctement leur vie, mais peinent à :

• comprendre où part leur argent,
• prendre des décisions financières sereines,
• ou atteindre leurs objectifs financiers.

La bonne nouvelle ? La finance personnelle s'apprend.`,
    content: `Pourquoi la gestion des finances personnelles n'est pas innée

Contrairement aux idées reçues, être à l'aise avec l'argent n'est pas une question de talent ou de chance.

La gestion financière personnelle est une compétence acquise, qui repose sur :
• la compréhension de ses revenus et dépenses,
• la capacité à structurer un budget,
• et la prise de décisions conscientes dans le temps.

Sans méthode claire, beaucoup fonctionnent :
• au ressenti,
• à l'urgence,
• ou en évitant le sujet financier.

Ce flou est la principale source de stress financier.

---

Gagner plus d'argent ne suffit pas à mieux gérer ses finances

Un mythe très répandu consiste à penser que le problème vient uniquement du niveau de revenu.

En réalité :
• plus de revenus = plus de décisions financières,
• plus de flux = plus de complexité,
• plus de comptes = plus de confusion… sans cadre adapté.

Sans compréhension financière :
• les dépenses augmentent avec les revenus,
• l'épargne reste irrégulière,
• les objectifs financiers sont repoussés.

👉 Ce n'est pas le montant gagné qui sécurise, mais la capacité à piloter ses finances personnelles.

---

Comprendre son argent pour reprendre le contrôle financier

Comprendre ses finances personnelles, ce n'est pas devenir expert en finance.

C'est savoir :
• combien on gagne réellement,
• combien on dépense,
• et comment ces choix impactent le futur.

Une bonne compréhension financière permet :
• de réduire le stress lié à l'argent,
• de prendre de meilleures décisions budgétaires,
• d'aligner ses dépenses avec ses priorités de vie.

La clarté financière est le premier pas vers la liberté financière.

---

La finance personnelle est une compétence qui se développe avec le temps

Apprendre à gérer son argent ne se fait pas en un jour.

La montée en compétences financières suit généralement plusieurs étapes :
1. Observer ses finances sans jugement
2. Structurer ses budgets et catégories
3. Analyser les écarts entre prévu et réel
4. Décider en fonction de ses objectifs

L'essentiel n'est pas d'être parfait, mais d'avoir un cadre simple et évolutif.

---

Comment Steero aide à mieux comprendre ses finances personnelles

Steero a été conçu pour répondre à un besoin simple :
rendre la gestion financière compréhensible, structurée et accessible.

Contrairement aux outils complexes ou trop techniques, Steero permet :
• une vision claire de ses finances globales,
• une structuration budgétaire flexible,
• un suivi ritualisé, rapide et durable,
• une montée en compétences progressive.

L'objectif n'est pas seulement de suivre des chiffres, mais de comprendre pour mieux décider.

---

Conclusion : apprendre à gérer son argent change durablement la relation à l'argent

La gestion des finances personnelles n'est pas réservée aux experts.
C'est une compétence accessible à tous, à condition d'avoir :
• un cadre clair,
• un outil adapté,
• et un rituel simple.

Avant d'optimiser, d'investir ou de chercher plus de rendement, il faut d'abord comprendre ses finances.

---

👉 Vous souhaitez mieux comprendre et gérer vos finances personnelles ?

Steero vous aide à :
• clarifier votre budget,
• structurer vos finances,
• et monter en compétences à votre rythme.

Commencez par poser des bases solides pour votre avenir financier.`
  },
  {
    id: 2,
    title: "La montée en compétences financières : passer du flou au pilotage de son argent",
    hook: `Beaucoup de personnes ont l'impression de "mal gérer" leur argent.
En réalité, la plupart ne gèrent pas mal : elles ne pilotent pas.

Elles regardent parfois leur solde, paient leurs factures, épargnent quand il reste quelque chose… mais sans vision globale ni méthode claire.

La bonne nouvelle ?
La gestion financière n'est pas binaire. Elle se construit par étapes, comme une véritable montée en compétences.`,
    content: `Imaginez la gestion de vos finances comme un escalier. Chaque marche représente un niveau de maîtrise supplémentaire.

Niveau 1 : La survie
À ce stade, on vit au jour le jour. On regarde son solde avant chaque achat, on craint les fins de mois, on subit plus qu'on ne décide.

Niveau 2 : La stabilisation
On commence à avoir une vue d'ensemble. Les charges fixes sont identifiées, on évite les découverts, on a peut-être un petit matelas de sécurité.

Niveau 3 : L'organisation
Un budget existe, même simple. On sait où va l'argent, on anticipe les grosses dépenses, on épargne de façon régulière.

Niveau 4 : L'optimisation
On cherche à améliorer : réduire certaines dépenses, augmenter l'épargne, faire travailler son argent. On se fixe des objectifs financiers précis.

Niveau 5 : Le pilotage
La gestion financière devient un réflexe. On prend des décisions éclairées, on adapte sa stratégie aux changements de vie, on se sent serein face à l'argent.

Comment progresser ?

La clé n'est pas de sauter les étapes, mais de les franchir une à une, solidement.

Commencez par identifier où vous en êtes. Sans jugement. Puis fixez-vous un objectif réaliste pour les 3 prochains mois.

Par exemple :
• Si vous êtes au niveau 1 → visez à constituer 500€ d'épargne de précaution
• Si vous êtes au niveau 2 → mettez en place un budget mensuel simple
• Si vous êtes au niveau 3 → automatisez votre épargne en début de mois

Chaque petit progrès compte. Et surtout, chaque petit progrès vous rapproche d'une relation plus saine et plus sereine avec votre argent.`
  }
];

const ArticleCard = ({ article }: { article: Article }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setIsOpen(!isOpen)}
      className="cursor-pointer rounded-2xl border-2 border-primary/20 bg-primary/5 p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:border-primary/40"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-semibold text-primary mb-4">
            {article.title}
          </h2>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-primary opacity-50 flex-shrink-0 mt-1"
        >
          <svg width="20" height="20" viewBox="0 0 12 12" fill="none">
            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </div>

      <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
        {article.hook}
      </p>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-6 mt-6 border-t border-primary/10">
              <p className="text-foreground whitespace-pre-line leading-relaxed">
                {article.content}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <p className="text-primary/60 text-sm mt-4 font-medium">
          Cliquez pour lire la suite →
        </p>
      )}
    </motion.div>
  );
};

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des articles pour mieux comprendre et piloter vos finances personnelles.
            </p>
          </motion.div>

          {/* Articles */}
          <div className="space-y-6">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
