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
    question: "Qu'est-ce que Steero ?",
    answer:
      "Steero est une application de gestion financière personnelle qui vous aide à reprendre le contrôle de vos finances avec simplicité et sérénité. Contrairement aux autres apps, nous privilégions la saisie manuelle pour créer un véritable lien émotionnel avec vos décisions financières.",
  },
  {
    question: "Pourquoi la saisie manuelle plutôt que l'automatisation ?",
    answer:
      "La saisie manuelle crée un lien émotionnel avec vos dépenses : elle rend le coût psychologiquement réel, ce qui améliore significativement l'autorégulation et donc la qualité de vos décisions financières. Les recherches montrent que la répétition consciente est un facteur clé du changement durable.",
  },
  {
    question: "Steero est-il gratuit ?",
    answer:
      "Oui, Steero propose une version gratuite qui vous permet de commencer votre parcours vers la clarté financière. Des fonctionnalités premium sont disponibles pour ceux qui souhaitent aller plus loin.",
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer:
      "Absolument. La sécurité de vos données est notre priorité. Nous utilisons un chiffrement de bout en bout et ne partageons jamais vos informations avec des tiers. Vos données financières restent strictement confidentielles.",
  },
  {
    question: "Combien de temps faut-il consacrer à Steero ?",
    answer:
      "Nous recommandons un rituel hebdomadaire de 10 minutes pour ajuster et planifier vos finances. Ces micro-rituels réguliers sont bien plus efficaces que des bilans occasionnels et automatisés.",
  },
  {
    question: "Puis-je utiliser Steero sur mobile ?",
    answer:
      "Oui, Steero est accessible sur tous vos appareils : ordinateur, tablette et smartphone. Votre progression est synchronisée automatiquement.",
  },
  {
    question: "Comment Steero m'aide-t-il à atteindre mes objectifs ?",
    answer:
      "Steero vous accompagne en trois étapes : budgétiser vos ressources, traquer consciemment vos dépenses, et ritualiser vos décisions financières. Cette approche vous permet de construire des habitudes durables alignées avec vos objectifs de vie.",
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 bg-hero-gradient">
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
                  <AccordionContent className="text-muted-foreground">
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
