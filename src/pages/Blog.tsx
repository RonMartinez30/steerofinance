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
    content: `La finance personnelle n'est pas réservée aux experts ou aux passionnés de chiffres. C'est un ensemble de principes simples qui, une fois compris et appliqués, transforment notre rapport à l'argent.

Pourquoi est-ce si important aujourd'hui ?

Dans un monde où les sources de revenus se diversifient, où les dépenses sont de plus en plus fragmentées (abonnements, achats en ligne, services numériques), il devient crucial de reprendre le contrôle.

Les fondamentaux à maîtriser :

1. Connaître ses flux : Savoir exactement ce qui entre et ce qui sort chaque mois est la base de toute gestion saine.

2. Distinguer le nécessaire du superflu : Non pas pour se priver, mais pour faire des choix conscients alignés avec ses priorités.

3. Anticiper plutôt que subir : Constituer une épargne de précaution, prévoir les grosses dépenses, éviter les découverts.

4. Se fixer des objectifs : L'argent n'est qu'un outil. Il prend son sens quand il sert des projets concrets.

Comment commencer ?

La première étape est souvent la plus simple : observer. Pendant un mois, notez vos dépenses sans chercher à les modifier. Cette simple prise de conscience est déjà un premier pas vers une meilleure gestion.

Ensuite, définissez un budget réaliste, qui tient compte de vos revenus, de vos charges fixes, et de vos envies. Un budget n'est pas une prison, c'est une carte routière.

Enfin, automatisez ce qui peut l'être : virement vers l'épargne en début de mois, prélèvements des charges fixes... Moins vous avez de décisions à prendre au quotidien, plus vous libérez de l'énergie mentale.`
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
