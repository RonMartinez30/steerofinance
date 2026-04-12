import { useState, useRef, useEffect } from "react";
import steeroBanner from "@/assets/steero-banner-3.png";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight, Lightbulb, AlertCircle, Share2, Check, List, Search, X, Download, FileSpreadsheet, CheckCircle2, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useWaitlist } from "@/contexts/WaitlistContext";

interface Article {
  id: number;
  titleKey: string;
  hookKey: string;
  content: string;
  tagsKey: string;
}

// Article content is kept in French as the main content - titles/hooks are translated
const getArticles = (t: (key: string, options?: Record<string, unknown>) => string): Article[] => [
  {
    id: 1,
    titleKey: "blog.articles.1.title",
    hookKey: "blog.articles.1.hook",
    tagsKey: "blog.articles.1.tags",
    content: `Ce n'est pas que tu dépenses trop. C'est que tu regardes trop rarement.

La dérive financière ne se construit pas en un jour. Elle s'installe progressivement puis se découvre en fin de mois quand il est trop tard pour corriger.

Les études comportementales sur la perception des dépenses le confirment : la plupart des gens sous-estiment leurs dépenses mensuelles de 20 à 30 %. Pas parce qu'ils se mentent mais parce que la mémoire financière est sélective : on retient les bons mois et on oublie les mauvais. On mémorise les gros postes, on oublie les petits débits qui s'accumulent.

Le résultat : une vision déformée de sa situation réelle, et des décisions prises sur des bases fausses.

Le problème n'est pas l'argent que tu gagnes. C'est la fréquence à laquelle tu regardes où il va.

Les 4 fuites invisibles qui plombent un budget cadre

Avant de construire un système, il faut nommer ce qu'on cherche à corriger.

Les abonnements zombies. Ils sont débités entre J+10 et J+20, jamais au même moment, souvent pour des services qu'on n'utilise plus. Invisibles parce que le montant unitaire est faible. Dévastateurs parce qu'ils s'accumulent.

Les dépenses sociales non budgétées. Le dîner de dernière minute, le week-end improvisé, le cadeau oublié. Chaque occurrence semble exceptionnelle. Ensemble, elles représentent souvent 15 à 20 % des dépenses réelles d'un cadre actif en grande métropole.

Le lissage mental. Ce mécanisme cognitif te fait inconsciemment moyenner tes dépenses sur les "bons mois" pour justifier les mauvais. "En janvier j'avais bien géré, donc février c'est rattrapable." Ce raisonnement est faux et coûteux.

La catégorie "divers". C'est la poubelle budgétaire. Tout ce qu'on ne veut pas regarder de trop près atterrit là. Une catégorie "divers" qui grossit est toujours le signe d'un pilotage qui s'effondre.

Pourquoi les bonnes résolutions ne fonctionnent pas

"Je vais faire plus attention ce mois-ci." Cette phrase a une durée de vie moyenne de 11 jours. Pas parce que tu manques de volonté mais parce qu'une intention sans structure est condamnée au premier imprévu.

Une résolution n'a pas de fréquence. Pas de moment dédié. Pas de feedback régulier. Elle repose entièrement sur ta motivation du moment, soit la ressource la plus volatile qui soit.

Ce qui fonctionne, ce n'est pas une règle. C'est un système. Et un système se compose de rituels, pas de bonnes intentions.

La vraie solution : un système de pilotage à 5 niveaux

C'est ici que la plupart des conseils financiers s'arrêtent à mi-chemin. Ils te disent de "faire un budget". Mais un budget sans cadence de révision est un document mort.

Le pilotage financier efficace fonctionne exactement comme le pilotage professionnel : des niveaux d'analyse différents, des fréquences différentes, des questions différentes. Du quotidien opérationnel au stratégique annuel.

C'est ce qu'on appelle le système TEMPO.

Tracer (quotidien, 5 minutes)

Objectif : garder le lien. Éviter la dérive invisible.

Chaque jour ou trois fois par semaine au minimum tu enregistres tes opérations récentes, tu vérifies le classement de chaque dépense, et tu observes l'impact sur ta trésorerie.

Aucune analyse n'est attendue ici. Il s'agit de saisir, observer, valider.

La clé : la saisie est manuelle et intentionnelle. Pas par contrainte technique, mais par choix comportemental. Enregistrer une dépense, c'est déjà en prendre conscience. C'est l'acte de pilotage le plus simple et le plus puissant. C'est là que la discipline s'installe, pas dans les grandes décisions de fin de mois.

Steero est construit sur ce principe : des modèles de saisie préremplis réduisent la friction à quelques secondes, sans supprimer le geste conscient d'enregistrer. Tu saisis vite et tu restes acteur.

La règle d'or : si tu n'as pas envie d'y passer 5 minutes par jour, commence par 3 fois par semaine. La régularité prime sur la fréquence parfaite.

Examiner (hebdomadaire, 10 minutes)

Objectif : corriger la trajectoire avant qu'il soit trop tard.

Chaque semaine, tu passes en revue les dépenses de la semaine écoulée. Tu identifies les écarts, les dépenses inhabituelles, et tu ajustes les catégories si nécessaire.

Trois questions suffisent : Ai-je dépensé comme prévu ? Qu'est-ce qui mérite d'être ajusté ? Que puis-je anticiper la semaine prochaine ?

Ce rituel est le pont entre le quotidien opérationnel et la décision mensuelle. Il t'évite l'effet "je verrai en fin de mois" qui est systématiquement trop tard. Il transforme un spectateur passif en pilote actif.

Maîtriser (mensuel, 15 minutes)

Objectif : reprendre la main sur tes choix financiers.

Une fois par mois, tu analyses : revenus vs dépenses, budget prévu vs réel, évolution de ta trésorerie. Tu ajustes les catégories et les montants budgétés. Et surtout, tu décides consciemment où va ton argent le mois suivant.

Ce n'est pas un bilan subi. C'est une décision active.

La question centrale n'est pas "où est passé mon argent ?" mais "est-ce que je choisis consciemment où il va ?" Ce déplacement de perspective change tout.

Steero structure ce moment avec une vue consolidée budget prévu / réel par catégorie pour que la décision soit basée sur des données, pas sur une impression.

Un mois imparfait n'est pas un problème. Un mois non regardé, oui.

Positionner (trimestriel, 30 minutes)

Objectif : aligner finances et objectifs de vie.

Tous les trois mois, tu prends de la hauteur. Tu ne regardes plus les dépenses mais regardes la direction. Est-ce que ma trésorerie évolue dans le bon sens ? Est-ce que mes finances soutiennent ce que je veux construire ? Qu'est-ce qui doit changer dans mes grandes catégories ?

Ce rituel évite la gestion automatique sans sens. Il renforce ton attachement à tes finances non pas comme une contrainte, mais comme un levier. C'est le niveau où tu passes du pilotage tactique à la stratégie personnelle.

Orienter (annuel, 60 minutes)

Objectif : choisir l'avenir, pas juste gérer le présent.

Une fois par an, tu fais le bilan global. Évolution du patrimoine, discipline installée, habitudes ancrées ou abandonnées. Et surtout : tu définis les grandes orientations : épargne, investissements, projets de vie.

Trois questions fondamentales : Qu'est-ce que je veux vraiment construire avec mon argent ? Quelle vie est-ce que je soutiens par mes décisions financières ? Qu'est-ce qui mérite mon énergie cette année et qu'est-ce qui n'en mérite plus ?

Une direction claire vaut mieux qu'un plan parfait.

Par où commencer quand on part de zéro

Ne commence pas par les cinq niveaux en même temps. C'est le meilleur moyen d'abandonner au bout de dix jours.

L'ordre logique : installe d'abord le T. Tracer, idéalement de manière quotidienne et à minima trois fois par semaine (Exemple : mardis, jeudis, samedis). Juste ça. Pendant trois semaines, sans ajouter autre chose.

Une fois que le geste est ancré, ajoute le E. Un quart d'heure le week-end.

Puis le M en fin de premier mois complet.

Le système TEMPO n'est pas un outil qu'on configure une fois, c'est une cadence qu'on installe progressivement. La tendance prime sur la perfection. Rater un rituel n'est pas un échec. Ne jamais le faire est le seul vrai problème.

Ce que tu vas changer cette semaine

Tu ne dépenses pas trop. Tu pilotes trop rarement.

Cinq minutes par jour et quinze minutes par mois changent plus une situation financière que n'importe quelle règle d'austérité. Pas parce qu'ils révèlent des fuites magiques — mais parce qu'ils installent une conscience active de là où va ton argent. Et cette conscience change les décisions, en amont, avant que la dépense soit faite.

Le système TEMPO est la méthode. Steero est l'outil construit pour l'implémenter — avec la friction juste, les rituels structurés, et la vision dont tu as besoin pour piloter, pas juste suivre.`
  },
  {
    id: 2,
    titleKey: "blog.articles.2.title",
    hookKey: "blog.articles.2.hook",
    tagsKey: "blog.articles.2.tags",
    content: `Subir ou piloter : la seule distinction qui compte

Regarder son solde de temps en temps, payer ses factures, épargner quand il reste quelque chose en fin de mois c'est subir ses finances. Pas les gérer mal. Les subir. La différence est subtile mais elle change tout.

Subir, c'est réagir. Une mauvaise surprise en fin de mois, une dépense imprévue qui déséquilibre tout, une décision prise sous pression faute de vision claire. L'argent est une source de stress latent, pas parce qu'il manque mais parce qu'il reste flou.

Piloter, c'est anticiper. Avoir une vision claire de sa situation en temps réel, identifier une dérive avant qu'elle s'installe, décider consciemment où va chaque euro. Un pilote ne regarde pas ses instruments une fois par mois, il les consulte en continu et à des fréquences différentes, pour des questions différentes.

La différence entre les deux n'est pas le revenu. C'est le niveau de compétence financière. Et ce niveau se développe par étapes.

Étape 1 : Observer sans juger (niveau Tracer)

Avant le budget, avant l'épargne, avant n'importe quelle optimisation : l'observation.

Voir ses revenus et ses dépenses tels qu'ils sont. Identifier ses grandes catégories. Comprendre ses habitudes réelles et non celles qu'on croit avoir.

Sans jugement. Sans culpabilité. Juste les faits.

Tant que l'argent reste flou, aucune décision solide n'est possible. On ne peut pas corriger ce qu'on ne voit pas. Et on ne peut pas voir clairement ce qu'on ne regarde que rarement.

C'est le niveau T du système TEMPO : Tracer. Cinq minutes par jour pour rester connecté à sa situation réelle. Pas pour analyser. Juste pour voir.

Étape 2 : Structurer pour transformer des chiffres en information (niveau Examiner)

Une fois les flux visibles, la structuration devient possible. Organiser ses dépenses par catégories, poser des budgets simples par poste, distinguer ce qui est fixe de ce qui est variable. Cette étape transforme des chiffres isolés en information exploitable.

C'est ici qu'on commence à comparer ce qu'on avait prévu face à ce qui s'est passé. Et c'est là que les premières décisions conscientes apparaissent.

C'est le niveau E pour Examiner. Dix minutes par semaine pour regarder la semaine écoulée et corriger la trajectoire avant qu'il soit trop tard. Pas un bilan global : une vérification de cap.

Étape 3 : Comprendre les écarts pour reprendre la main (niveau Maîtriser)

Un budget parfait n'existe pas. Les écarts sont normaux avec parfois un mois plus chargé que prévu, une priorité qui change, une dépense imprévue. Le problème n'est pas l'écart. C'est de ne pas le voir.

Comprendre ses écarts, c'est passer de la réaction à la décision. Au lieu de subir le bilan en fin de mois, on l'analyse consciemment : où a-t-on dépassé et pourquoi ? est-ce que c'était un choix ou une dérive ? Cette lecture régulière développe progressivement un instinct financier et la capacité à anticiper ses propres comportements.

C'est le niveau M pour Maîtriser. Quinze minutes par mois pour décider où va l'argent le mois suivant. Pas subir son budget mais pour le construire.

Étape 4 : Aligner finances et objectifs (niveaux Positionner et Orienter)

C'est ici que la gestion financière devient réellement utile. Quand elle cesse d'être une contrainte pour devenir un levier. Quand la vision est suffisamment claire pour arbitrer sans stress, aligner ses dépenses avec ses projets, donner un rôle précis à chaque euro.

À ce niveau, l'argent n'est plus une source d'anxiété. C'est un outil au service de ce qu'on veut construire. Un apport immobilier, une transition professionnelle, une liberté financière à horizon cinq ans : ces objectifs deviennent pilotables parce qu'on a installé les niveaux précédents.

C'est le niveau P puis O du système TEMPO pour Positionner trimestriellement et Orienter annuellement. Prendre de la hauteur pour vérifier que la direction est juste, pas seulement que les chiffres sont bons.

Pourquoi la montée en compétences échoue avant d'avoir commencé

La majorité des gens abandonnent dans les premières semaines. Pas par manque de sérieux mais par manque de cadre adapté. Les outils disponibles sont pensés pour des gens qui savent déjà piloter, pas pour ceux qui apprennent. Le suivi demande trop de temps. L'effort cognitif est trop important. Et surtout : le feedback n'est pas immédiat et sans résultat visible rapidement, la motivation s'effondre.

Un bon système de montée en compétences doit être progressif, pas tout ou rien. On n'installe pas les cinq niveaux TEMPO en même temps. On commence par Tracer quotidiennement, ça prend cinq minutes maximum. On installe l'habitude avant d'installer la méthode. Et on monte d'un niveau quand le précédent est ancré.

La tendance prime sur la perfection. Un rituel imparfait mais tenu vaut infiniment plus qu'un système parfait abandonné.

Le pilotage s'apprend. Comme n'importe quelle compétence.

Personne ne naît en sachant piloter ses finances. C'est une compétence qui s'apprend par exposition régulière, par répétition consciente, par feedback progressif. Exactement comme piloter un projet, manager une équipe ou maîtriser un outil professionnel.

La différence entre quelqu'un qui subit ses finances et quelqu'un qui les pilote n'est pas le revenu, ni la discipline, ni l'intelligence financière. C'est l'existence d'un système. Un cadre clair, des fréquences définies, des questions simples auxquelles répondre régulièrement.

Steero est construit autour de cette logique de progression. Les cinq niveaux TEMPO sont intégrés dans l'outil, pas comme des fonctionnalités à découvrir, mais comme une structure de pilotage à installer progressivement. Tu commences par Tracer. Le reste suit naturellement.`
  },
  {
    id: 3,
    titleKey: "blog.articles.3.title",
    hookKey: "blog.articles.3.hook",
    tagsKey: "blog.articles.3.tags",
    content: `La majorité des apps de finance personnelle sont des rétroviseurs

Finary, Bankin, Linxo, ces outils font une chose très bien : te montrer où est allé ton argent. Ils agrègent, catégorisent, affichent. Automatiquement, proprement, joliment.

Le problème : un rétroviseur te montre la route que tu viens de parcourir. Pas celle devant toi.

Conduire en regardant uniquement le rétroviseur, ça finit dans le fossé. Et c'est exactement ce qui se passe avec ces outils. Tu consultes ton bilan en fin de mois, quand la dérive est déjà installée depuis trois semaines, quand il est trop tard pour corriger quoi que ce soit. Résultat : Tu subis l'information au lieu de piloter avec.

Ce n'est pas un défaut de l'outil. C'est une erreur de paradigme. Ces apps ont été conçues pour observer le passé, pas pour piloter l'avenir.

Un rituel n'est pas un bilan mensuel

Quand on parle de rituel financier, la plupart imaginent une session Excel de deux heures, un dimanche soir, avec une calculatrice et un café froid. C'est exactement ce qu'un rituel n'est pas.

Un rituel, c'est une action courte, répétée à fréquence fixe, qui donne un feedback immédiat. Pas une corvée mais un geste. La différence entre les deux n'est pas la durée. C'est la régularité et la clarté de ce qu'on cherche à voir.

Un suivi parfait mais rare ne crée aucune maîtrise durable, c'est même pire, c'est anxiogène. Sans rituel régulier, on regarde ses comptes après une mauvaise surprise, sous charge émotionnelle, en mode pompier. L'argent devient une source de stress, pas un levier. Et plus le stress monte, plus l'évitement s'installe. C'est un cercle fermé.

La régularité, elle, agit comme un tampon. Elle neutralise la surprise. Elle transforme la gestion financière d'une épreuve à une compétence.

Pourquoi les rituels financiers échouent avant de commencer

Trois raisons expliquent l'abandon systématique :
• Ils prennent trop de temps : incompatibles avec une semaine chargée
• Ils demandent un effort cognitif trop important : trop de décisions, trop de données à interpréter
• Et ils ne donnent pas de feedback immédiat : sans résultat visible, la motivation s'évapore en dix jours.

Un bon rituel doit satisfaire trois critères non négociables : être rapide, être clair, et être utile dès la première utilisation.

Si l'un des trois manque, l'abandon est inévitable. Pas parce que tu manques de sérieux, mais parce que le cerveau humain abandonne tout comportement qui consomme plus qu'il ne produit.

Le système TEMPO : cinq rituels, cinq fréquences, un seul cap

Piloter ses finances, c'est exactement comme piloter une équipe. Tu ne gères pas une équipe avec une réunion annuelle. Tu as des points quotidiens, des bilans hebdomadaires, des revues mensuelles, des comités trimestriels, et une direction annuelle. Chaque fréquence répond à une question différente. Ensemble, elles forment un système.

C'est ce que le système TEMPO structure pour tes finances personnelles.

Tracer — quotidien, 5 minutes. Enregistrer ses opérations récentes, vérifier le classement, observer l'impact sur la trésorerie. Aucune analyse attendue juste le geste de saisir. Et ce geste compte : noter une dépense, c'est déjà en prendre conscience. C'est là que le comportement change, en amont, avant que la décision soit prise.

Examiner — hebdomadaire, 10 minutes. Comparer ce qu'on avait prévu à ce qui s'est passé. Identifier les écarts avant qu'ils s'installent. Ajuster une catégorie si nécessaire. Ce rituel est le pont entre l'opérationnel et la décision mensuelle, il t'évite l'effet "je verrai en fin de mois" qui est systématiquement trop tard.

Maîtriser — mensuel, 15 minutes. Analyser revenus vs dépenses, budget prévu vs réel, évolution de la trésorerie. Décider consciemment où va l'argent le mois suivant. Ce n'est pas un bilan subi mais bien un acte de pilotage. La question n'est pas "où est passé mon argent ?" mais "est-ce que je choisis où il va ?"

Positionner — trimestriel, 30 minutes. Prendre de la hauteur. Ne plus regarder les dépenses mais regarder la direction. Est-ce que ma trésorerie évolue dans le bon sens ? Est-ce que mes finances soutiennent ce que je veux construire ? Ce rituel sort du transactionnel pour entrer dans le stratégique.

Orienter — annuel, 60 minutes. Bilan global de l'année. Évolution du patrimoine, habitudes installées, arbitrages à venir. Et surtout : définir les grandes orientations : épargne, investissements, projets de vie. Choisir l'avenir, pas juste gérer le présent.

Cinq niveaux. De l'opérationnel au stratégique. Chaque rituel donne du sens aux autres — le quotidien alimente le mensuel, le mensuel prépare le trimestriel, le trimestriel oriente l'annuel.

Ce que ça change concrètement

Un rituel régulier ne te rend pas soudainement plus riche. Il te rend plus lucide et la lucidité change les décisions avant qu'elles soient prises.

Tu arrêtes de subir les fins de mois pour commencer à les anticiper. Tu passes de spectateur à pilote. Et progressivement, la compétence financière se construit, non pas par intensité mais par répétition consciente.

C'est ça, la maîtrise. Pas un tableau de bord parfait consulté une fois par an. Un regard régulier, structuré, sur une situation qui évolue.

Steero est construit autour de cette logique. La saisie y est manuelle et intentionnelle parce qu'enregistrer une dépense, c'est déjà l'acte de pilotage. Des modèles préremplis réduisent la friction à quelques secondes sans supprimer le geste. Et les cinq niveaux du système TEMPO sont structurés directement dans l'outil, pour que chaque rituel trouve sa place naturellement dans ta semaine.

Le seul outil qui fonctionne est celui qu'on utilise régulièrement

Aucun outil, aussi bien conçu soit-il, ne remplace la régularité. La maîtrise financière ne vient pas de l'intensité d'un bilan mensuel mais de la constance d'un regard régulier.

La question n'est pas "quel outil utiliser ?" Elle est "quelle cadence installer ?"

Installe le rituel. L'outil suit.`
  },
  {
    id: 4,
    titleKey: "blog.articles.4.title",
    hookKey: "blog.articles.4.hook",
    tagsKey: "blog.articles.4.tags",
    content: `Le vrai problème : on essaie de tout faire d'un coup

La gestion financière paraît lourde parce qu'elle est pensée comme un bloc monolithique. Un bilan mensuel de deux heures, ou rien. Un tableau Excel complet, ou abandon. Tout comprendre, tout analyser, tout décider en une seule session.

Ce mode de fonctionnement génère trois problèmes qui se renforcent mutuellement. La surcharge mentale d'abord avec trop de décisions à prendre en même temps qui épuise. La confusion ensuite, quand tout est mélangé, rien n'est clair. L'abandon enfin, un système trop lourd ne tient jamais.

La solution n'est pas de réduire le temps. C'est de séparer les rôles.

Un rituel, une question. Pas plus.

Un rituel financier efficace ne cherche jamais à tout faire. Il répond à une seule question, à une fréquence précise, en un temps défini. C'est cette séparation qui rend le système tenable et durable.

C'est exactement la logique d'un pilote. Il ne fait pas le bilan de vol, la vérification des instruments, la planification de la prochaine destination et la communication avec la tour de contrôle en même temps. Chaque action a son moment, sa fréquence, son objectif. Ensemble, elles forment un système de pilotage cohérent.

Pour les finances personnelles, c'est identique. Le système TEMPO structure cinq niveaux de rituels : chacun avec une vocation précise, une durée adaptée, une question centrale.

Les 5 niveaux du système TEMPO

Tracer — quotidien, 5 minutes. La question : est-ce que je vois ce qui se passe en ce moment ? Le rôle : maintenir le lien avec sa situation réelle. Enregistrer les opérations récentes, vérifier le classement, observer l'impact sur la trésorerie. Pas d'analyse — juste la conscience. C'est ce rituel qui évite la déconnexion progressive, les mauvaises surprises et l'évitement émotionnel. Il ne décide pas. Il voit.

Examiner — hebdomadaire, 10 minutes. La question : est-ce que je suis sur la trajectoire prévue ? Le rôle : corriger avant que l'écart devienne une dérive. Comparer la semaine réelle à la semaine prévue, identifier ce qui a dérapé, ajuster une catégorie si nécessaire. Ce rituel est le pont entre le quotidien et la décision mensuelle — il t'évite d'arriver en fin de mois sans avoir rien vu venir.

Maîtriser — mensuel, 15 minutes. La question : est-ce que je décide consciemment où va mon argent ? Le rôle : passer de la réaction à la décision. Analyser revenus vs dépenses, comprendre les écarts, construire le budget du mois suivant. Ce n'est pas un bilan subi — c'est un acte de pilotage. La nuance change tout.

Positionner — trimestriel, 30 minutes. La question : est-ce que mes finances avancent dans la bonne direction ? Le rôle : sortir du transactionnel pour entrer dans le stratégique. Observer les tendances sur trois mois, évaluer la cohérence globale, identifier ce qui doit évoluer. Ce rituel donne du recul là où les trois premiers donnent de la précision.

Orienter — annuel, 60 minutes. La question : quelle vie est-ce que je soutiens par mes décisions financières ? Le rôle : aligner finances et objectifs de vie. Bilan global de l'année, grandes orientations pour la suivante, arbitrages stratégiques. C'est le rituel de sens — celui qui donne de la valeur à tous les autres.

Alors, 2 minutes : mythe ou réalité ?

Ni l'un ni l'autre. Le rituel quotidien de Tracer peut tenir en moins 5 minutes quand le système est en place et la saisie fluide. Mais cette rapidité n'est pas une promesse de facilité, c'est le résultat d'une structure installée.

Ce qui est un mythe : croire qu'on peut gérer ses finances sérieusement avec 2 minutes par semaine sans cadre. Ce qui est réel : un rituel quotidien de 5 minutes, ancré dans une architecture cohérente, change durablement le rapport à l'argent pas parce qu'il prend peu de temps, mais parce qu'il est régulier.

La régularité bat l'intensité. Toujours.

Ce que change une architecture de rituels

Quand chaque rituel a une vocation claire et une fréquence définie, trois choses se produisent. La charge mentale diminue et on ne cherche plus à tout traiter en même temps. La régularité s'installe puisque chaque rituel est adapté pour ne pas être repoussé. Et les décisions sont prises au bon moment avec la bonne information et pas sous pression.

La gestion financière cesse d'être une tâche redoutée. Elle devient un système de pilotage discret, régulier et efficace.

Steero est structuré autour de cette architecture. Les cinq niveaux TEMPO sont intégrés directement dans l'outil. La saisie quotidienne se fait en quelques secondes avec des modèles préremplis sans supprimer le geste conscient d'enregistrer. Et chaque niveau du système s'ouvre naturellement quand le précédent est ancré.

Ce n'est pas le temps qui manque pour gérer ses finances. C'est la structure.`
  },
  {
    id: 5,
    titleKey: "blog.articles.5.title",
    hookKey: "blog.articles.5.hook",
    tagsKey: "blog.articles.5.tags",
    content: `Si regarder tes finances te met mal à l'aise, ce n'est probablement pas à cause des chiffres. C'est à cause de ce qu'ils semblent dire sur toi.

Pour beaucoup, ouvrir son application bancaire en fin de mois ressemble à recevoir un bulletin scolaire. On cherche instinctivement les erreurs, les excès, ce qu'on aurait dû mieux faire. Et quand on en trouve, ce qui arrive toujours, la réaction est prévisible : culpabilité, puis évitement, puis déconnexion progressive. Jusqu'au mois suivant, où le cycle recommence.

Ce n'est pas un problème de discipline. C'est un problème de posture.

Le rétroviseur ne te juge pas. Ton cerveau, si.

Quand un pilote regarde ses instruments de bord, il ne se demande pas s'il est un bon ou un mauvais pilote. Il lit une information : altitude, vitesse, cap; et prend une décision en conséquence. L'instrument est neutre. La lecture est factuelle. La réponse est immédiate.

Tes finances devraient fonctionner exactement comme ça. Un tableau de bord ne dit pas "tu as mal fait". Il dit "voilà où tu en es". La distinction est simple à formuler et radicalement difficile à intérioriser quand on a passé des années à lire ses relevés bancaires avec une charge émotionnelle.

Le problème n'est pas l'information. C'est le cadre interprétatif dans lequel on la reçoit.

Pourquoi l'évitement financier s'installe

L'évitement n'est pas une faiblesse de caractère. C'est une réponse rationnelle du cerveau à une source de stress récurrente. Si chaque fois que tu regardes tes finances tu te sens mal, ton cerveau finit par associer le geste au malaise et il évite le geste.

Le mécanisme est précis : on repousse le moment de regarder, on consulte uniquement en cas de problème, on arrive en fin de mois sans avoir rien vu venir. Et là, sous pression émotionnelle, on prend de mauvaises décisions pas parce qu'on manque d'intelligence financière, mais parce qu'on réagit au lieu de piloter.

L'évitement crée exactement la situation qu'il cherche à éviter. C'est le paradoxe central de la mauvaise relation à l'argent.

La posture de pilotage : observer sans juger

Changer de posture ne demande pas de changer de personnalité. Ça demande de changer la question qu'on pose en ouvrant ses finances.

La question punitive : "Qu'est-ce que j'ai mal fait ce mois-ci ?" La question de pilotage : "Où en suis-je ? Qu'est-ce que je décide maintenant ?"

Ce déplacement est minimal en apparence. Il est massif dans ses effets. La première question cherche une faute, spoiler : elle en trouve toujours une; et elle génère de la culpabilité qui mène à l'évitement. La seconde cherche une information, elle en trouve aussi, et elle génère une décision qui maintient le contrôle.

Un pilote qui voit son niveau de carburant descendre ne se reproche pas d'avoir consommé de l'essence. Il cherche la prochaine station.

Voir clair, c'est déjà décider mieux

Le cerveau humain prend de meilleures décisions face à une information claire et organisée que face à une masse de données floues et émotionnellement chargées. Ce n'est pas une question d'intelligence mais de la neurologie basique.

Une bonne visualisation financière permet trois choses distinctes. Identifier rapidement une dérive avant qu'elle s'installe. Confirmer que la trajectoire est cohérente, ce qui réduit l'anxiété de fond. Et prendre une décision sans surcharge mentale parce que l'information est là, lisible, disponible.

À l'inverse, quand les données sont dispersées sur trois banques, un compte joint, un broker ou de l'espèce quand rien n'est catégorisé, quand le dernier regard remonte à trois semaines : l'information fatigue avant d'informer. La décision est repoussée. Le stress monte.

Ce n'est pas un manque de sérieux. C'est l'absence d'un tableau de bord lisible.

De l'observation à la décision : le rôle des rituels

Changer de posture ne suffit pas si on ne change pas la fréquence à laquelle on regarde. Un tableau de bord consulté une fois par mois n'est pas un tableau de bord, c'est un bilan. Et un bilan, par définition, arrive trop tard pour piloter.

Le niveau T du système TEMPO — Tracer, cinq minutes par jour — existe précisément pour ça. Pas pour analyser. Pas pour décider. Juste pour maintenir un contact régulier avec sa situation réelle. Ce contact régulier neutralise progressivement la charge émotionnelle : quand on regarde souvent, chaque regard est petit. Quand on évite, chaque regard devient une confrontation.

C'est là que Steero intervient, pas pour te montrer où tu as failli, mais pour que regarder devienne un réflexe neutre. La saisie est manuelle et intentionnelle : enregistrer une dépense, c'est simplement noter un fait. Pas le juger. Le voir.

Et le niveau M — Maîtriser, quinze minutes par mois — est le moment où l'observation devient décision. Pas un bilan subi. Un choix actif sur où va l'argent le mois suivant.

Ce que change une lecture factuelle de ses finances

Quand les chiffres cessent d'être un jugement pour devenir une information, trois choses se produisent progressivement. La charge émotionnelle diminue — regarder ses finances devient aussi neutre que vérifier la météo avant de sortir. Les décisions s'améliorent — prises à froid, avec de l'information claire, elles sont structurellement meilleures. Et la régularité s'installe — parce qu'on n'évite plus ce qui ne fait plus peur.

Tes finances ne sont pas un bulletin de notes. Elles ne disent rien sur ta valeur, ta discipline ou ton intelligence. Elles indiquent simplement où tu en es, et dans quelle direction tu vas.

La clarté remplace la culpabilité. C'est là que tout change.`
  },
  {
    id: 6,
    titleKey: "blog.articles.6.title",
    hookKey: "blog.articles.6.hook",
    tagsKey: "blog.articles.6.tags",
    content: `Pourquoi la règle des 50 / 30 / 20 est si populaire

Cette règle a un énorme avantage : elle simplifie. Elle permet de donner un cadre clair, éviter de partir de zéro et de comprendre qu'un budget doit être équilibré.

Pour quelqu'un qui débute, c'est souvent la première fois que l'argent est structuré autrement que "ce qu'il reste à la fin du mois".

En ce sens, la règle joue parfaitement son rôle pédagogique toutefois cette règle simple appliquée à des vies complexes n'est pas toujours évident parce que dans la vraie vie :
• les loyers ne font pas 50 % partout,
• les revenus varient,
• les situations personnelles sont très différentes.

Famille, célibat, ville chère, projets personnels, phases de vie…

Vouloir faire entrer toutes les réalités dans une seule règle rigide peut créer plus de frustration que de clarté.

Pourquoi la règle peut devenir culpabilisante

Quand la règle est présentée comme une norme, elle peut devenir un piège. Si tu n'es pas à 20 % d'épargne tu as l'impression de mal faire, tu te compares et tu culpabilises.

Mais une règle n'a jamais été faite pour juger mais pour aider à réfléchir.

Le problème n'est pas l'écart, mais l'absence de compréhension derrière cet écart.

La vraie question à se poser (et que la règle ne pose pas)

La règle des 50 / 30 / 20 ne répond pas à la question la plus importante : Pourquoi dépenses-tu comme tu dépenses ?

Un bon budget ne cherche pas à faire rentrer la réalité dans des pourcentages ou d'atteindre un chiffre "idéal", il cherche à refléter ta vie, respecter tes contraintes et surtout soutenir tes objectifs.

La règle comme repère, pas comme objectif

Utilisée intelligemment, la règle des 50 / 30 / 20 peut être très utile, non pas comme une obligation, mais comme un point de comparaison, un outil de lecture et un déclencheur de questions. Par exemple :
• Pourquoi mes besoins sont-ils si élevés ?
• Est-ce temporaire ou structurel ?
• Quelle part de mes dépenses reflète vraiment mes priorités ?

C'est là que la règle devient intéressante.

Adapter plutôt qu'appliquer : la clé d'un budget durable

Un budget qui fonctionne est un budget : adaptable, évolutif, et aligné avec ta réalité.

Tu peux très bien :
• épargner moins aujourd'hui pour un projet précis,
• dépenser plus sur certaines envies sans culpabilité,
• ajuster tes ratios selon les périodes de ta vie.

La cohérence compte plus que le pourcentage.

Comment Steero t'aide à dépasser la règle sans la jeter

Steero ne te demande pas de rentrer dans une règle toute faite mais t'aide à structurer ton budget, visualiser tes répartitions, et comprendre ce qui est choisi et ce qui est subi.

La règle des 50 / 30 / 20 peut devenir un point de départ, un repère visuel et un outil de réflexion mais jamais une injonction.

Conclusion : une bonne règle ne remplace jamais la compréhension

La règle des 50 / 30 / 20 n'est ni bonne ni mauvaise. Elle est incomplète si elle est utilisée seule.

Ce qui fait la différence, ce n'est pas le respect parfait d'un ratio, mais la capacité à comprendre, ajuster et décider en conscience.

Un bon budget ne te dit pas ce que tu dois faire. Il t'aide à faire des choix alignés avec ta vie.

Et si ton budget s'adaptait enfin à ta réalité, plutôt que l'inverse ?

Steero t'aide à :
• structurer ton budget sans rigidité,
• comprendre tes arbitrages,
• et piloter ton argent sans culpabilité.

Des repères clairs. Des choix conscients. Une gestion qui te ressemble.`
  }
];

// Calculate reading time (average 200 words per minute)
const calculateReadingTime = (text: string): number => {
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
};

// Key idea block component
const KeyIdeaBlock = ({ children }: { children: React.ReactNode }) => (
  <div className="my-6 p-5 bg-primary/10 border-l-4 border-primary rounded-r-xl">
    <div className="flex items-start gap-3">
      <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
      <div>
        <span className="text-xs font-semibold text-primary uppercase tracking-wide">À retenir</span>
        <p className="mt-1 text-foreground font-medium">{children}</p>
      </div>
    </div>
  </div>
);

// Myth block component
const MythBlock = ({ children }: { children: React.ReactNode }) => (
  <div className="my-6 p-5 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-xl">
    <div className="flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
      <div>
        <span className="text-xs font-semibold text-amber-600 uppercase tracking-wide">Idée reçue</span>
        <p className="mt-1 text-foreground font-medium">{children}</p>
      </div>
    </div>
  </div>
);

// Define explicit section titles for each article (matching the document)
const articleSections: Record<number, string[]> = {
  1: [
    "Ce n'est pas que tu dépenses trop. C'est que tu regardes trop rarement.",
    "Les 4 fuites invisibles qui plombent un budget cadre",
    "Pourquoi les bonnes résolutions ne fonctionnent pas",
    "La vraie solution : un système de pilotage à 5 niveaux",
    "Par où commencer quand on part de zéro",
    "Ce que tu vas changer cette semaine"
  ],
  2: [
    "Subir ou piloter : la seule distinction qui compte",
    "Étape 1 : Observer sans juger (niveau Tracer)",
    "Étape 2 : Structurer pour transformer des chiffres en information (niveau Examiner)",
    "Étape 3 : Comprendre les écarts pour reprendre la main (niveau Maîtriser)",
    "Étape 4 : Aligner finances et objectifs (niveaux Positionner et Orienter)",
    "Pourquoi la montée en compétences échoue avant d'avoir commencé",
    "Le pilotage s'apprend. Comme n'importe quelle compétence."
  ],
  3: [
    "La majorité des apps de finance personnelle sont des rétroviseurs",
    "Un rituel n'est pas un bilan mensuel",
    "Pourquoi les rituels financiers échouent avant de commencer",
    "Le système TEMPO : cinq rituels, cinq fréquences, un seul cap",
    "Ce que ça change concrètement",
    "Le seul outil qui fonctionne est celui qu'on utilise régulièrement"
  ],
  4: [
    "Le vrai problème : on essaie de tout faire d'un coup",
    "Un rituel, une question. Pas plus.",
    "Les 5 niveaux du système TEMPO",
    "Alors, 2 minutes : mythe ou réalité ?",
    "Ce que change une architecture de rituels"
  ],
  5: [
    "Le rétroviseur ne te juge pas. Ton cerveau, si.",
    "Pourquoi l'évitement financier s'installe",
    "La posture de pilotage : observer sans juger",
    "Voir clair, c'est déjà décider mieux",
    "De l'observation à la décision : le rôle des rituels",
    "Ce que change une lecture factuelle de ses finances"
  ],
  6: [
    "Pourquoi la règle des 50 / 30 / 20 est si populaire",
    "Pourquoi la règle peut devenir culpabilisante",
    "La vraie question à se poser (et que la règle ne pose pas)",
    "La règle comme repère, pas comme objectif",
    "Adapter plutôt qu'appliquer : la clé d'un budget durable",
    "Comment Steero t'aide à dépasser la règle sans la jeter",
    "Conclusion : une bonne règle ne remplace jamais la compréhension"
  ]
};

// Extract section titles for TOC based on predefined sections
const extractSectionTitles = (content: string, articleId: number): { title: string; id: string }[] => {
  const sections = articleSections[articleId] || [];
  return sections.map((title, index) => ({
    title,
    id: `section-${articleId}-${index}`
  }));
};

// Format content with improved visual hierarchy
const formatContent = (content: string, articleId: number = 0) => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let sectionIndex = 0;
  const sections = articleSections[articleId] || [];
  
  while (i < lines.length) {
    const trimmedLine = lines[i].trim();
    
    // Skip empty lines - add spacing
    if (!trimmedLine) {
      elements.push(<div key={i} className="h-2" />);
      i++;
      continue;
    }
    
    // Check if it's a predefined section title
    const matchingSectionIndex = sections.findIndex(s => 
      trimmedLine === s || trimmedLine.startsWith(s.split(':')[0])
    );
    
    if (matchingSectionIndex !== -1 && sections.includes(trimmedLine)) {
      const sectionId = `section-${articleId}-${matchingSectionIndex}`;
      elements.push(
        <div key={i} id={sectionId} className="mt-10 mb-4 flex items-center gap-3 scroll-mt-24">
          <div className="w-1 h-6 bg-primary rounded-full" />
          <h3 className="text-lg md:text-xl font-bold text-foreground">
            {trimmedLine}
          </h3>
        </div>
      );
      sectionIndex++;
      i++;
      continue;
    }
    
    // Regular text with bullet points styling
    if (trimmedLine.startsWith('•')) {
      elements.push(
        <div key={i} className="flex items-start gap-3 py-1.5 pl-4">
          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
          <span className="text-muted-foreground">{trimmedLine.substring(1).trim()}</span>
        </div>
      );
    } else if (trimmedLine.startsWith('→')) {
      elements.push(
        <div key={i} className="flex items-start gap-3 py-1.5 pl-4 text-primary/80">
          <span className="flex-shrink-0">→</span>
          <span>{trimmedLine.substring(1).trim()}</span>
        </div>
      );
    } else if (trimmedLine.match(/^\d+\./)) {
      elements.push(
        <div key={i} className="flex items-start gap-3 py-2 pl-4">
          <span className="w-6 h-6 rounded-full bg-primary/15 text-primary text-sm font-semibold flex items-center justify-center flex-shrink-0">
            {trimmedLine.match(/^(\d+)/)?.[1]}
          </span>
          <span className="text-muted-foreground pt-0.5">{trimmedLine.replace(/^\d+\.\s*/, '')}</span>
        </div>
      );
    } else {
      elements.push(
        <p key={i} className="text-muted-foreground leading-relaxed py-1">
          {trimmedLine}
        </p>
      );
    }
    
    i++;
  }
  
  return elements;
};

// Table of contents component with active section tracking - sticky on desktop
const TableOfContents = ({ sections, isSticky = false }: { sections: { title: string; id: string }[], isSticky?: boolean }) => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (sections.length < 2) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`p-5 bg-muted/50 rounded-xl border border-primary/10 ${
        isSticky ? "" : "mb-8"
      }`}
    >
      <div className="flex items-center gap-2 mb-4">
        <List className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold text-foreground">{t('blog.tableOfContents')}</span>
      </div>
      <nav className="space-y-1">
        {sections.map((section, index) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={(e) => handleClick(e, section.id)}
              className={`w-full text-left flex items-start gap-3 py-2 px-3 rounded-lg text-sm transition-all duration-200 group ${
                isActive 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              }`}
            >
              <span className={`font-medium transition-colors flex-shrink-0 ${
                isActive ? "text-primary" : "text-primary/50 group-hover:text-primary"
              }`}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className={`flex-1 ${isSticky ? "line-clamp-2" : "line-clamp-1"}`}>{section.title}</span>
              {isActive && (
                <motion.div
                  layoutId={`activeIndicator-${isSticky ? 'sticky' : 'inline'}`}
                  className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </button>
          );
        })}
      </nav>
    </motion.div>
  );
};

// Reading progress bar component
const ReadingProgressBar = ({ contentRef }: { contentRef: React.RefObject<HTMLDivElement> }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    
    const handleScroll = () => {
      const rect = content.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const contentHeight = content.scrollHeight;
      
      // Calculate how much of the content has been scrolled past
      const scrolled = Math.max(0, windowHeight - rect.top);
      const totalScrollable = contentHeight;
      const progressPercent = Math.min(100, Math.max(0, (scrolled / totalScrollable) * 100));
      
      setProgress(progressPercent);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [contentRef]);
  
  return (
    <div className="h-1 bg-primary/10 rounded-full overflow-hidden mb-4">
      <motion.div 
        className="h-full bg-primary rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
};

interface ArticleCardProps {
  article: Article;
  t: (key: string, options?: Record<string, unknown>) => string;
  isOpen: boolean;
  onToggle: () => void;
  cardRef?: React.RefObject<HTMLDivElement>;
  openWaitlist: () => void;
}

const ArticleCard = ({ article, t, isOpen, onToggle, cardRef, openWaitlist }: ArticleCardProps) => {
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const hook = t(article.hookKey);
  const title = t(article.titleKey);
  const tags = t(article.tagsKey, { returnObjects: true }) as unknown as string[];
  const readingTime = calculateReadingTime(hook + article.content);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/blog#article-${article.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      data-article-id={article.id}
      className={`rounded-xl border transition-all duration-300 ${
        isOpen 
          ? "border-primary/30 bg-card shadow-md" 
          : "border-border bg-card hover:border-primary/30 hover:shadow-sm cursor-pointer"
      }`}
    >
      {/* Header - sticky when open */}
      <div 
        onClick={() => !isOpen && onToggle()}
        className={`p-4 ${isOpen ? 'sticky top-16 z-20 bg-card rounded-t-xl border-b border-border/30' : 'cursor-pointer'}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Tags and reading time inline */}
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-primary/10 text-primary"
                >
                  {tag}
                </span>
              ))}
              <span className="flex items-center gap-1 text-muted-foreground text-xs ml-auto">
                <Clock className="w-3 h-3" />
                {readingTime} {t('blog.min')}
              </span>
            </div>
            <h2 className="text-base font-semibold text-foreground leading-tight line-clamp-2">
              {title}
            </h2>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-muted-foreground flex-shrink-0 mt-1 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
          >
            <svg width="16" height="16" viewBox="0 0 12 12" fill="none">
              <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </div>
        
        {/* Progress bar - only when open */}
        {isOpen && (
          <div className="mt-3">
            <ReadingProgressBar contentRef={contentRef} />
          </div>
        )}
        
        {/* Hook - truncated when closed */}
        {!isOpen && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {hook.split('\n')[0]}
          </p>
        )}
      </div>

      {/* Expanded content */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div ref={contentRef} className="px-4 pb-4">
              {/* Hook full text */}
              <div className="py-3 border-b border-border/50">
                <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                  {hook}
                </p>
              </div>

              <div className="pt-3">
                {/* Mobile: TOC inline at top */}
                <div className="lg:hidden mb-6">
                  <TableOfContents sections={extractSectionTitles(article.content, article.id)} />
                </div>
                
                {/* Main content - full width on desktop (TOC is in sidebar) */}
                <div className="text-sm">
                  {formatContent(article.content, article.id)}
                </div>
              </div>
              
              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10"
              >
                <p className="text-sm text-foreground font-medium mb-3">
                  {t('blog.readyToTransform')}
                </p>
                <Button size="sm" className="group" onClick={openWaitlist}>
                    {t('blog.joinWaitlist')}
                    <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
              
              {/* Actions row */}
              <div className="mt-4 flex items-center gap-3">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={handleShare}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                    copied 
                      ? "bg-green-500/10 border-green-500/30 text-green-600" 
                      : "bg-muted/50 border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      {t('blog.linkCopied')}
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      {t('blog.share')}
                    </>
                  )}
                </motion.button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle();
                  }}
                  className="text-muted-foreground text-xs font-medium flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="rotate-180">
                    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {t('blog.collapseArticle')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Featured article card - visually distinct intro card
const FeaturedArticleCard = () => {
  const { t } = useTranslation();
  const { openWaitlist } = useWaitlist();

  const whyItems = [
    t('blog.featured.why1'),
    t('blog.featured.why2'),
    t('blog.featured.why3'),
  ];

  const containsItems = [
    t('blog.featured.contains1'),
    t('blog.featured.contains2'),
    t('blog.featured.contains3'),
    t('blog.featured.contains4'),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-2xl overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-card to-primary/5 shadow-lg mb-6"
    >
      {/* Decorative accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary" />

      <div className="p-6 md:p-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-5"
        >
          <FileSpreadsheet className="w-4 h-4" />
          {t('blog.featured.badge')}
        </motion.div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          {t('blog.featured.title')}
        </h2>
        <p className="text-base text-primary font-medium mb-4">
          {t('blog.featured.subtitle')}
        </p>
        <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl">
          {t('blog.featured.description')}
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Why */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-primary" />
              {t('blog.featured.whyTitle')}
            </h3>
            {whyItems.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Contains */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-primary" />
              {t('blog.featured.containsTitle')}
            </h3>
            {containsItems.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Limitations */}
        <div className="p-4 bg-muted/50 rounded-xl border border-border/50 mb-8">
          <h4 className="text-sm font-semibold text-foreground mb-2">{t('blog.featured.limitTitle')}</h4>
          <p className="text-sm text-muted-foreground mb-1">{t('blog.featured.limit1')}</p>
          <p className="text-sm text-muted-foreground italic">{t('blog.featured.limit2')}</p>
        </div>

        {/* Download CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <motion.a
            href="/steero-budget-mensuel.xlsx"
            download
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft hover:shadow-lg transition-all duration-300 group"
          >
            <Download className="w-5 h-5" />
            {t('blog.featured.downloadBtn')}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.a>
          <span className="text-xs text-muted-foreground">{t('blog.featured.downloadFormat')}</span>
        </div>

        {/* Go further */}
        <div className="mt-6 pt-6 border-t border-border/50 flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">{t('blog.featured.goFurther')}</span>
          <Button size="sm" variant="outline" className="group rounded-full" onClick={openWaitlist}>
            {t('common.joinWaitlist')}
            <ArrowUpRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const Blog = () => {
  const { t } = useTranslation();
  const { openWaitlist } = useWaitlist();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openArticles, setOpenArticles] = useState<Set<number>>(new Set());
  const [visibleArticleId, setVisibleArticleId] = useState<number | null>(null);
  const articleRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  
  const articles = getArticles(t);
  const allTags = Array.from(new Set(articles.flatMap(article => t(article.tagsKey, { returnObjects: true }) as string[])));

  // Track which open article is most visible
  useEffect(() => {
    const openArticleIds = Array.from(openArticles);
    if (openArticleIds.length === 0) {
      setVisibleArticleId(null);
      return;
    }

    const handleScroll = () => {
      let maxVisibleArea = 0;
      let mostVisibleId: number | null = null;

      openArticleIds.forEach(id => {
        const element = articleRefs.current.get(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          // Calculate visible area
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(windowHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          
          if (visibleHeight > maxVisibleArea) {
            maxVisibleArea = visibleHeight;
            mostVisibleId = id;
          }
        }
      });

      setVisibleArticleId(mostVisibleId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [openArticles]);

  const toggleArticle = (id: number) => {
    setOpenArticles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const setArticleRef = (id: number, element: HTMLDivElement | null) => {
    if (element) {
      articleRefs.current.set(id, element);
    } else {
      articleRefs.current.delete(id);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(tg => tg !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSearchQuery("");
  };

  const filteredArticles = articles.filter(article => {
    const tags = t(article.tagsKey, { returnObjects: true }) as string[];
    const title = t(article.titleKey) as string;
    const hook = t(article.hookKey) as string;
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => tags.includes(tag));
    const matchesSearch = searchQuery === "" || 
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hook.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTags && matchesSearch;
  });

  const hasActiveFilters = selectedTags.length > 0 || searchQuery !== "";

  // Get sections for the most visible article
  const visibleArticle = visibleArticleId ? articles.find(a => a.id === visibleArticleId) : null;
  const visibleSections = visibleArticle ? extractSectionTitles(visibleArticle.content, visibleArticle.id) : [];

  return (
    <div className="min-h-screen">
      <SEO
        title="Blog - Conseils pour bien gérer son argent"
        description="Articles et conseils pour apprendre à gérer son argent. Comment mieux gérer son budget sans Excel ? Découvrez nos guides pratiques sur les finances personnelles et les rituels financiers."
        keywords="blog finances personnelles, comment gérer son argent, conseils budget, mieux gérer son argent, gestion budget personnel, alternative excel finances"
        canonical="/blog"
        ogType="blog"
      />
      <Header />
      
      <main className="pt-32 pb-16 bg-hero-gradient">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
              {/* Left side - Sticky */}
              <div className="lg:w-1/3">
                <div className="lg:sticky lg:top-24">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                      <span className="text-gradient">Steero</span> Blog
                    </h1>
                    <p className="text-muted-foreground mb-6">
                      {t('blog.subtitle')}
                    </p>

                    {/* Search bar */}
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder={t('blog.searchPlaceholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-border bg-card focus:border-primary/50 focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground text-sm"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Tags filter */}
                    <div className="space-y-2">
                      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{t('blog.filterBy')}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {allTags.map((tag) => {
                          const isSelected = selectedTags.includes(tag);
                          return (
                            <button
                              key={tag}
                              onClick={() => toggleTag(tag)}
                              className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all ${
                                isSelected
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                              }`}
                            >
                              {tag}
                            </button>
                          );
                        })}
                      </div>
                      {hasActiveFilters && (
                        <button
                          onClick={clearFilters}
                          className="mt-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                        >
                          <X className="w-3 h-3" />
                          {t('blog.clear')}
                        </button>
                      )}
                    </div>

                    {/* Results count */}
                    {hasActiveFilters && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 text-sm text-muted-foreground"
                      >
                        {filteredArticles.length} {t('blog.articlesFound')}
                      </motion.p>
                    )}

                    {/* Dynamic TOC - appears when an article is open */}
                    <AnimatePresence>
                      {visibleSections.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.3 }}
                          className="mt-6 hidden lg:block"
                        >
                          <TableOfContents sections={visibleSections} isSticky={true} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </div>

              {/* Right side - Scrollable articles */}
              <div className="lg:w-2/3">
                <div className="space-y-4">
                  {/* Featured article card - always at the top */}
                  {!hasActiveFilters && <FeaturedArticleCard />}
                  
                  <AnimatePresence mode="popLayout">
                    {filteredArticles.map((article, index) => (
                      <motion.div
                        key={article.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        ref={(el) => setArticleRef(article.id, el)}
                      >
                        <ArticleCard 
                          article={article} 
                          t={t}
                          isOpen={openArticles.has(article.id)}
                          onToggle={() => toggleArticle(article.id)}
                          openWaitlist={openWaitlist}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {filteredArticles.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12 bg-card rounded-xl border border-border"
                    >
                      <p className="text-muted-foreground mb-4">
                        {t('blog.noResults')}
                      </p>
                      <button
                        onClick={clearFilters}
                        className="text-primary font-medium hover:underline text-sm"
                      >
                        {t('blog.clearFilters')}
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="py-20 bg-primary relative overflow-hidden">
        {/* Background banner image */}
        <div className="absolute inset-0">
          <img src={steeroBanner} alt="" className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-primary/50" />
        </div>
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -left-20 top-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -right-20 bottom-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }} 
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              {t('blog.ctaTitle')}
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              {t('blog.ctaDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                onClick={openWaitlist}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                {t('common.joinWaitlist')}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  to="/pourquoi-steero"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  {t('common.discoverApproach')}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
