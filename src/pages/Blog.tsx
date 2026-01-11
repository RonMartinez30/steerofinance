import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";
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

La finance personnelle est une compétence qui se développe avec le temps

Apprendre à gérer son argent ne se fait pas en un jour.

La montée en compétences financières suit généralement plusieurs étapes :
1. Observer ses finances sans jugement
2. Structurer ses budgets et catégories
3. Analyser les écarts entre prévu et réel
4. Décider en fonction de ses objectifs

L'essentiel n'est pas d'être parfait, mais d'avoir un cadre simple et évolutif.

Comment Steero aide à mieux comprendre ses finances personnelles

Steero a été conçu pour répondre à un besoin simple :
rendre la gestion financière compréhensible, structurée et accessible.

Contrairement aux outils complexes ou trop techniques, Steero permet :
• une vision claire de ses finances globales,
• une structuration budgétaire flexible,
• un suivi ritualisé, rapide et durable,
• une montée en compétences progressive.

L'objectif n'est pas seulement de suivre des chiffres, mais de comprendre pour mieux décider.

Conclusion : apprendre à gérer son argent change durablement la relation à l'argent

La gestion des finances personnelles n'est pas réservée aux experts.
C'est une compétence accessible à tous, à condition d'avoir :
• un cadre clair,
• un outil adapté,
• et un rituel simple.

Avant d'optimiser, d'investir ou de chercher plus de rendement, il faut d'abord comprendre ses finances.

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
    content: `De la gestion subie au pilotage financier

On peut schématiser la relation à l'argent en deux grandes situations :

Subir ses finances
Argent flou, décisions réactives, stress latent.

Piloter ses finances
Vision claire, arbitrages conscients, décisions alignées avec ses objectifs.

La différence entre les deux n'est pas le revenu, mais le niveau de compétence financière.

Étape 1 : Observer ses finances sans jugement

La première étape n'est ni le budget, ni l'épargne, ni l'investissement.

C'est l'observation.

Observer, c'est :
• voir ses revenus et ses dépenses,
• identifier les grandes catégories,
• comprendre ses habitudes financières.

Sans jugement, sans culpabilité.

👉 Tant que l'argent reste flou, aucune décision solide n'est possible.

Étape 2 : Structurer pour donner du sens aux chiffres

Une fois les flux visibles, vient la structuration.

Structurer ses finances, c'est :
• organiser ses dépenses par catégories,
• poser des budgets simples,
• distinguer l'essentiel du variable.

Cette étape transforme des chiffres isolés en information exploitable.

Sans structure :
• les chiffres s'accumulent,
• mais ne racontent aucune histoire.

Étape 3 : Comprendre les écarts pour mieux décider

Un budget parfait n'existe pas.

Les écarts sont normaux :
• un mois plus cher que prévu,
• une dépense imprévue,
• une priorité qui change.

Le problème n'est pas l'écart, mais le fait de ne pas le voir.

Comprendre ses écarts permet :
• d'ajuster ses décisions,
• d'éviter les mauvaises surprises,
• de reprendre le contrôle sans se restreindre.

Étape 4 : Décider en fonction de ses objectifs

C'est ici que la gestion financière devient réellement utile.

Quand la vision est claire, on peut :
• arbitrer sans stress,
• aligner ses dépenses avec ses objectifs,
• donner un rôle précis à chaque euro.

L'argent cesse d'être une source d'anxiété pour devenir un outil au service de ses projets.

Pourquoi la montée en compétences financières échoue souvent

Beaucoup abandonnent à cette étape pour trois raisons principales :

Des outils trop complexes
Pensés pour des experts, pas pour progresser.

Un suivi trop lourd
Trop chronophage pour durer.

Aucun cadre évolutif
Tout ou rien, sans progression naturelle.

Résultat : motivation au départ, abandon quelques semaines plus tard.

Comment Steero accompagne la montée en compétences financières

Steero a été conçu comme un parcours, pas comme un simple outil de suivi.

Il permet :
• d'observer ses finances simplement,
• de structurer progressivement ses budgets,
• de visualiser les écarts sans culpabilité,
• de ritualiser le suivi pour durer dans le temps.

L'objectif n'est pas de devenir expert en finance, mais de monter en compétences à son rythme, avec un cadre clair.

Conclusion : piloter ses finances est une compétence accessible

Personne ne naît en sachant gérer son argent.
Mais tout le monde peut apprendre à le piloter.

La montée en compétences financières repose sur :
• la clarté,
• la régularité,
• et des outils pensés pour accompagner, pas pour complexifier.

Passer du flou au pilotage, c'est reprendre le contrôle de son avenir financier.

👉 Vous souhaitez passer du flou au pilotage de vos finances ?

Steero vous aide à :
• comprendre vos finances,
• structurer votre budget,
• et progresser étape par étape.

Commencez par voir clair. Le reste suivra.`
  },
  {
    id: 3,
    title: "Pourquoi sans rituel, aucun outil financier ne fonctionne",
    hook: `Télécharger une application de gestion financière est facile.
La consulter régulièrement… beaucoup moins.

Ce n'est pas un manque de motivation.
Ce n'est pas non plus un problème d'intelligence financière.

Le véritable point de rupture, c'est l'absence de rituel.

Sans rituel, même le meilleur outil finit oublié.
Avec un rituel simple, la gestion financière devient enfin durable.`,
    content: `Le vrai problème des outils financiers modernes

La majorité des outils de gestion financière échouent pour une raison simple :
ils supposent que l'utilisateur va s'adapter à l'outil.

Dans la réalité :
• les interfaces sont complexes,
• les actions demandées sont nombreuses,
• le suivi prend trop de temps.

Résultat :
• enthousiasme au début,
• effort perçu comme trop important,
• abandon progressif.

👉 Ce n'est pas un problème de discipline, mais de conception.

Rituel financier : de quoi parle-t-on vraiment ?

Un rituel financier n'est pas :
• un long bilan mensuel,
• une session Excel de deux heures,
• une contrainte rigide.

Un rituel, c'est :
• une action simple,
• répétée régulièrement,
• intégrée naturellement dans le quotidien.

Le rituel transforme la gestion financière en habitude, pas en corvée.

Pourquoi la régularité vaut mieux que la perfection

Beaucoup pensent qu'il faut :
• tout suivre,
• tout comprendre,
• tout optimiser.

En réalité, la régularité est bien plus importante que la précision.

5 minutes par semaine permettent :
• d'identifier les dérives,
• d'anticiper les problèmes,
• de garder le contrôle.

À l'inverse, un suivi parfait mais rare ne crée aucune maîtrise durable.

Sans rituel, la finance redevient anxiogène

Quand il n'y a pas de rituel :
• on regarde ses comptes en retard,
• souvent après une mauvaise surprise,
• avec une charge émotionnelle forte.

L'argent devient alors :
• source de stress,
• de culpabilité,
• voire d'évitement.

Le rituel agit comme un tampon émotionnel :
il neutralise la surprise et redonne de la sérénité.

Le rituel comme pilier de la montée en compétences financières

La montée en compétences financières repose sur une chose :
la répétition consciente.

Le rituel permet :
• d'observer régulièrement,
• de comprendre progressivement,
• d'ajuster sans brutalité.

Sans rituel, aucune compétence ne se développe.
Avec un rituel, la progression devient naturelle.

Pourquoi la plupart des rituels financiers échouent

Trois raisons principales expliquent l'échec des rituels financiers :

Ils prennent trop de temps
→ incompatibles avec la vie réelle.

Ils demandent trop d'efforts cognitifs
→ fatigue mentale.

Ils ne donnent pas de feedback immédiat
→ perte de motivation.

Un bon rituel doit être :
• rapide,
• clair,
• utile dès la première utilisation.

Comment Steero a été pensé autour du rituel, pas de l'outil

Steero n'a pas été conçu comme une application "à consulter quand on a le temps".

Il a été pensé pour :
• s'intégrer dans une routine courte,
• donner une information claire en quelques secondes,
• montrer immédiatement où l'on en est.

Le cœur de Steero, ce n'est pas la donnée brute,
c'est la ritualisation de la compréhension financière.

Parce que ce qui est simple se répète.
Et ce qui se répète transforme durablement.

Conclusion : sans rituel, il n'y a pas de contrôle financier

Aucun outil, aussi puissant soit-il, ne fonctionne sans rituel.
La maîtrise financière ne vient pas de l'intensité, mais de la constance.

Un rituel simple :
• réduit le stress,
• améliore les décisions,
• renforce la confiance.

C'est le socle invisible de toute gestion financière réussie.

👉 Et si votre gestion financière devenait un rituel simple, et non une contrainte ?

Steero vous aide à :
• créer un rituel financier durable,
• suivre vos finances sans friction,
• progresser sans surcharge mentale.

Commencez petit. Répétez souvent. Les résultats suivront.`
  }
];

// Calculate reading time (average 200 words per minute)
const calculateReadingTime = (text: string): number => {
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
};

// Format content with bold section titles
const formatContent = (content: string) => {
  const lines = content.split('\n');
  
  return lines.map((line, index) => {
    const trimmedLine = line.trim();
    
    // Skip empty lines
    if (!trimmedLine) {
      return <br key={index} />;
    }
    
    // Check if it's a section title (line that doesn't start with bullet, number, emoji, and is followed by content)
    const isSectionTitle = 
      !trimmedLine.startsWith('•') && 
      !trimmedLine.startsWith('👉') &&
      !trimmedLine.match(/^\d+\./) &&
      trimmedLine.length < 80 &&
      trimmedLine.length > 10 &&
      !trimmedLine.includes(':') &&
      (
        trimmedLine.startsWith('Pourquoi') ||
        trimmedLine.startsWith('Gagner') ||
        trimmedLine.startsWith('Comprendre') ||
        trimmedLine.startsWith('La finance') ||
        trimmedLine.startsWith('La clarté') ||
        trimmedLine.startsWith('Comment') ||
        trimmedLine.startsWith('Conclusion') ||
        trimmedLine.startsWith('De la gestion') ||
        trimmedLine.startsWith('Subir') ||
        trimmedLine.startsWith('Piloter') ||
        trimmedLine.startsWith('Étape') ||
        trimmedLine.startsWith("L'essentiel") ||
        trimmedLine.startsWith("L'objectif") ||
        trimmedLine.startsWith("L'argent") ||
        trimmedLine.startsWith('Résultat') ||
        trimmedLine.startsWith('Passer') ||
        trimmedLine.startsWith('Le vrai problème') ||
        trimmedLine.startsWith('Rituel financier') ||
        trimmedLine.startsWith('Le rituel') ||
        trimmedLine.startsWith('Sans rituel') ||
        trimmedLine.startsWith('Un rituel') ||
        trimmedLine.startsWith('Aucun outil') ||
        trimmedLine.startsWith('La maîtrise') ||
        trimmedLine.startsWith('La montée') ||
        trimmedLine.startsWith('Trois raisons') ||
        trimmedLine.startsWith('Ils prennent') ||
        trimmedLine.startsWith('Ils demandent') ||
        trimmedLine.startsWith('Ils ne donnent') ||
        trimmedLine.startsWith('Un bon rituel') ||
        trimmedLine.startsWith("C'est le socle")
      );
    
    if (isSectionTitle) {
      return (
        <span key={index} className="block font-semibold text-foreground mt-6 mb-2">
          {trimmedLine}
        </span>
      );
    }
    
    return (
      <span key={index} className="block">
        {trimmedLine}
      </span>
    );
  });
};

const ArticleCard = ({ article }: { article: Article }) => {
  const [isOpen, setIsOpen] = useState(false);
  const readingTime = calculateReadingTime(article.hook + article.content);

  return (
    <motion.div
      layout
      onClick={() => setIsOpen(!isOpen)}
      className={`cursor-pointer rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
        isOpen 
          ? "border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 shadow-md" 
          : "border-primary/20 bg-primary/5 hover:border-primary/40"
      }`}
    >
      {/* Header - always visible */}
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
              <Clock className="w-4 h-4" />
              <span>{readingTime} min de lecture</span>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-primary">
              {article.title}
            </h2>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-primary/60 flex-shrink-0 mt-8"
          >
            <svg width="20" height="20" viewBox="0 0 12 12" fill="none">
              <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </div>

        {/* Hook - truncated when closed */}
        <div className={`mt-4 ${!isOpen ? "line-clamp-4" : ""}`}>
          <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
            {article.hook}
          </p>
        </div>

        {!isOpen && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-primary text-sm mt-4 font-medium flex items-center gap-2"
          >
            Lire l'article complet
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="animate-pulse">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.p>
        )}
      </div>

      {/* Content - expandable */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-6 md:pb-8">
              <div className="pt-6 border-t border-primary/15">
                <div className="text-foreground leading-relaxed">
                  {formatContent(article.content)}
                </div>
              </div>
              
              {/* Collapse button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="mt-6 text-primary/70 text-sm font-medium flex items-center gap-2 hover:text-primary transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 12 12" fill="none" className="rotate-180">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Réduire l'article
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
