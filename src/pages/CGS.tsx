import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const CGS = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Conditions Générales de Services
          </h1>
          <p className="text-muted-foreground mb-4">
            Application de gestion financière personnelle
          </p>
          <p className="text-sm text-muted-foreground mb-12">
            Dernière mise à jour : Vendredi 9 janvier 2026
          </p>

          <div className="space-y-10 text-foreground">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Pourquoi ces conditions ?</h2>
              <p className="mb-4">Ces Conditions Générales de Services (les « CGS ») expliquent simplement :</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>ce que fait l'application,</li>
                <li>ce que tu peux en attendre,</li>
                <li>ce que nous faisons (et ne faisons pas),</li>
                <li>et comment chacun est protégé.</li>
              </ul>
              <p className="mt-4">En créant un compte ou en utilisant l'application, tu acceptes ces conditions.</p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Ce qu'est l'application</h2>
              <p className="mb-4">
                L'application est un outil personnel de gestion financière et de suivi d'habitudes, conçu pour t'aider à :
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>mieux comprendre tes finances,</li>
                <li>suivre tes dépenses, revenus et budgets,</li>
                <li>fixer des objectifs clairs,</li>
                <li>adopter de meilleurs comportements financiers sur la durée.</li>
              </ul>
              <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-muted-foreground">
                <p>👉 Ce n'est pas une banque,</p>
                <p>👉 ce n'est pas un conseiller financier,</p>
                <p>👉 et ce n'est pas un outil de trading ou d'investissement automatisé.</p>
              </div>
              <p className="mt-4">C'est un tableau de bord intelligent pour t'aider à prendre de meilleures décisions.</p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">3. À qui s'adresse l'application ?</h2>
              <p className="mb-4">
                L'application est destinée à toute personne majeure souhaitant organiser ses finances personnelles.
              </p>
              <p className="mb-4">En utilisant l'application, tu confirmes que :</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>tu es légalement capable de contracter,</li>
                <li>tu utilises l'outil pour un usage personnel (pas professionnel ou illégal).</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Création et gestion du compte</h2>
              <p className="mb-4">Pour utiliser l'application, tu dois créer un compte.</p>
              <p className="mb-4">Tu es responsable :</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>des informations que tu renseignes,</li>
                <li>de la confidentialité de tes identifiants,</li>
                <li>de l'usage de ton compte.</li>
              </ul>
              <p className="mt-4">Si tu constates une activité suspecte, contacte-nous rapidement.</p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Fonctionnalités et évolutions</h2>
              <p className="mb-4">Les fonctionnalités disponibles dépendent :</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                <li>de la version de l'application,</li>
                <li>de ton abonnement éventuel.</li>
              </ul>
              <p className="mb-4">
                L'application évolue en continu : nous pouvons ajouter, modifier ou améliorer certaines fonctionnalités pour offrir une meilleure expérience.
              </p>
              <p>Nous faisons toujours de notre mieux pour que ces évolutions restent cohérentes et bénéfiques.</p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Abonnements et paiements</h2>
              <p className="mb-4">Certaines fonctionnalités peuvent être accessibles via un abonnement payant.</p>
              <p className="mb-4">
                Les conditions (prix, durée, renouvellement) sont clairement indiquées au moment de la souscription.
              </p>
              <p className="mb-4">
                Les abonnements sont renouvelés automatiquement, sauf résiliation avant la date de renouvellement.
              </p>
              <p>Tu peux gérer ou résilier ton abonnement à tout moment depuis ton compte.</p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Ce que l'application ne fait pas</h2>
              <p className="mb-4 font-medium">C'est important d'être clair 👇</p>
              <p className="mb-4">L'application ne donne pas de conseils financiers personnalisés.</p>
              <p className="mb-4">
                Les analyses, graphiques, projections ou recommandations sont informatives, pas des garanties.
              </p>
              <p className="mb-4 font-medium">Tu restes 100 % responsable de tes décisions financières.</p>
              <p>
                Si tu as besoin de conseils professionnels (financiers, fiscaux, juridiques), fais appel à un expert qualifié.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Tes données</h2>
              <p className="mb-4 font-medium">Tes données t'appartiennent.</p>
              <p className="mb-4">Nous :</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>les stockons de manière sécurisée,</li>
                <li>les utilisons uniquement pour faire fonctionner l'application,</li>
                <li>ne les revendons jamais.</li>
              </ul>
              <p className="mt-4">
                Les détails sur la gestion des données personnelles sont disponibles dans notre{" "}
                <Link to="/politique-confidentialite" className="text-primary hover:underline">
                  Politique de confidentialité
                </Link>{" "}
                (conforme au RGPD).
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Disponibilité et sécurité</h2>
              <p className="mb-4">Nous mettons tout en œuvre pour :</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>assurer un service fiable,</li>
                <li>protéger tes données,</li>
                <li>maintenir l'application accessible.</li>
              </ul>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Responsabilité</h2>
              <p className="mb-4">L'application est un outil d'aide, pas une promesse de résultat.</p>
              <p className="mb-4">Nous ne pouvons pas être tenus responsables :</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>d'erreurs de saisie,</li>
                <li>de mauvaises interprétations,</li>
                <li>de pertes financières,</li>
                <li>de décisions prises sur la base des données affichées.</li>
              </ul>
              <p className="mt-4 font-medium">Tu gardes le contrôle. Toujours.</p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Propriété intellectuelle</h2>
              <p className="mb-4">
                Tout ce qui compose l'application (design, code, textes, marque, structure) nous appartient ou est utilisé avec autorisation.
              </p>
              <p className="mb-4">Tu peux utiliser l'application normalement, mais pas :</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>la copier,</li>
                <li>la revendre,</li>
                <li>la modifier,</li>
                <li>ou l'exploiter sans accord écrit.</li>
              </ul>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Résiliation</h2>
              <p className="mb-4">Tu peux supprimer ton compte à tout moment, simplement.</p>
              <p className="mb-4">De notre côté, nous pouvons suspendre ou fermer un compte en cas :</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>d'usage abusif,</li>
                <li>de fraude,</li>
                <li>ou de non-respect des présentes conditions.</li>
              </ul>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">13. Loi applicable</h2>
              <p className="mb-4">Ces conditions sont régies par le droit français.</p>
              <p>En cas de litige, nous privilégions toujours une solution amiable avant toute action judiciaire.</p>
            </section>

            {/* Section 14 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">14. Contact</h2>
              <p className="mb-4">Une question, un souci, une idée ?</p>
              <p>
                📧 Contacte-nous à :{" "}
                <a href="mailto:steerofinance@gmail.com" className="text-primary hover:underline">
                  steerofinance@gmail.com
                </a>{" "}
                (Mail temporaire)
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CGS;
