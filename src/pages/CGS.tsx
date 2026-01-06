import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CGS = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 bg-hero-gradient">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-8">Conditions Générales de Service</h1>
            
            <div className="space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">1. Objet</h2>
                <p>
                  Les présentes Conditions Générales de Service (CGS) définissent les modalités 
                  d'utilisation du service Steero, accessible via le site web et les applications 
                  mobiles. En utilisant Steero, vous acceptez sans réserve les présentes conditions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">2. Description du service</h2>
                <p>
                  Steero est une application de gestion financière personnelle permettant aux 
                  utilisateurs de suivre leurs dépenses, établir des budgets et développer de 
                  meilleures habitudes financières. Le service est proposé en version gratuite 
                  et en version premium avec des fonctionnalités étendues.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">3. Inscription et compte utilisateur</h2>
                <p className="mb-4">
                  L'utilisation de Steero nécessite la création d'un compte personnel. L'utilisateur 
                  s'engage à fournir des informations exactes et à maintenir la confidentialité de 
                  ses identifiants de connexion.
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>L'utilisateur doit être majeur ou disposer de l'autorisation parentale</li>
                  <li>Un seul compte par personne est autorisé</li>
                  <li>L'utilisateur est responsable de toute activité sur son compte</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">4. Utilisation du service</h2>
                <p className="mb-4">L'utilisateur s'engage à :</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Utiliser le service conformément à sa destination</li>
                  <li>Ne pas tenter de contourner les mesures de sécurité</li>
                  <li>Ne pas utiliser le service à des fins illégales</li>
                  <li>Respecter les droits de propriété intellectuelle</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">5. Données personnelles</h2>
                <p>
                  Steero s'engage à protéger vos données personnelles conformément au RGPD. 
                  Les données financières saisies sont chiffrées et ne sont jamais partagées 
                  avec des tiers sans votre consentement explicite.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">6. Responsabilité</h2>
                <p>
                  Steero fournit un outil d'aide à la gestion financière mais ne constitue pas 
                  un conseil financier professionnel. L'utilisateur reste seul responsable de 
                  ses décisions financières. Steero ne saurait être tenu responsable des 
                  conséquences de l'utilisation du service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">7. Tarification</h2>
                <p>
                  L'utilisation de base de Steero est gratuite. Des fonctionnalités premium 
                  sont disponibles via un abonnement mensuel ou annuel. Les tarifs sont 
                  indiqués sur le site et peuvent être modifiés avec un préavis de 30 jours.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">8. Résiliation</h2>
                <p>
                  L'utilisateur peut résilier son compte à tout moment depuis les paramètres 
                  de l'application. En cas de violation des présentes CGS, Steero se réserve 
                  le droit de suspendre ou supprimer le compte concerné.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">9. Modification des CGS</h2>
                <p>
                  Steero se réserve le droit de modifier les présentes CGS. Les utilisateurs 
                  seront informés de toute modification significative par email ou notification 
                  dans l'application.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">10. Contact</h2>
                <p>
                  Pour toute question relative aux présentes CGS, vous pouvez nous contacter 
                  à l'adresse : contact@steero.fr
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CGS;
