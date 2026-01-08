import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PolitiqueConfidentialite = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Politique de confidentialité
          </h1>
          <p className="text-muted-foreground mb-4">
            Protection des données personnelles & RGPD (UE)
          </p>
          <p className="text-sm text-muted-foreground mb-12">
            Dernière mise à jour : Vendredi 09 janvier 2026
          </p>

          <div className="space-y-10 text-foreground">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Pourquoi cette politique ?</h2>
              <p className="mb-4">Ta vie privée est importante pour nous.</p>
              <p className="mb-4">Cette politique de confidentialité explique :</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>quelles données nous collectons,</li>
                <li>pourquoi nous les collectons,</li>
                <li>comment nous les utilisons et les protégeons,</li>
                <li>et quels sont tes droits.</li>
              </ul>
              <p className="mt-4">Elle s'applique à tous les utilisateurs de l'application.</p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Qui est responsable de tes données ?</h2>
              <p className="mb-4">Le responsable du traitement est :</p>
              <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-muted-foreground">
                <p><strong className="text-foreground">Steero</strong></p>
                <p>[Forme juridique] – [RCS] / En cours de création</p>
                <p>Siège social : 295 rue Lecourbe</p>
                <p>📧 Contact : steerofinance@gmail.com (Mail temporaire)</p>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Quelles données collectons-nous ?</h2>
              <p className="mb-4">Nous collectons uniquement les données nécessaires au fonctionnement de l'application.</p>
              
              <h3 className="text-lg font-medium mb-3">🔹 Données que tu fournis volontairement</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                <li>Adresse email</li>
                <li>Mot de passe (chiffré)</li>
                <li>Informations de profil (facultatives)</li>
              </ul>

              <p className="mb-3">Données financières saisies manuellement :</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                <li>budgets (Objectifs)</li>
                <li>transactions</li>
                <li>revenus</li>
                <li>habitudes</li>
                <li>catégories personnalisées</li>
              </ul>
              <p className="text-sm text-muted-foreground mb-6">
                👉 Aucune donnée bancaire n'est collectée sans action volontaire explicite de ta part.
              </p>

              <h3 className="text-lg font-medium mb-3">🔹 Données techniques</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Type d'appareil et navigateur</li>
                <li>Adresse IP</li>
                <li>Logs de connexion</li>
                <li>Données d'usage anonymisées (pour améliorer le produit)</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Pourquoi utilisons-nous ces données ?</h2>
              <p className="mb-4">Tes données sont utilisées pour :</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Fournir et faire fonctionner l'application</li>
                <li>Sauvegarder et afficher tes informations</li>
                <li>Calculer des statistiques et visualisations</li>
                <li>Améliorer l'expérience utilisateur</li>
                <li>Assurer la sécurité et prévenir la fraude</li>
                <li>Gérer les abonnements et la facturation</li>
                <li>Répondre à tes demandes de support</li>
              </ul>
              <p className="mt-4 font-medium">Nous ne faisons aucun profilage publicitaire.</p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Base légale du traitement (RGPD)</h2>
              <p className="mb-4">Conformément au RGPD, les traitements reposent sur :</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>L'exécution du contrat (utilisation normale de l'application)</li>
                <li>Ton consentement (ex : communications non essentielles)</li>
                <li>Notre intérêt légitime (sécurité, amélioration du produit)</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Partage des données</h2>
              <p className="mb-4 font-medium">Nous ne vendons jamais tes données. Jamais.</p>
              <p className="mb-4">Tes données peuvent être partagées uniquement avec :</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>des prestataires techniques de confiance (hébergement, paiement, emails),</li>
                <li>strictement dans le cadre du fonctionnement de l'application,</li>
                <li>avec des garanties contractuelles conformes au RGPD.</li>
              </ul>
              <p className="mt-4">Aucune donnée n'est transmise à des tiers à des fins commerciales.</p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Où sont stockées tes données ?</h2>
              <p className="mb-4">
                Les données sont hébergées au sein de l'Union Européenne ou dans des pays reconnus comme adéquats par la Commission européenne.
              </p>
              <p>
                Si un prestataire hors UE est utilisé, des clauses contractuelles standard (SCC) sont mises en place.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Combien de temps conservons-nous tes données ?</h2>
              <p className="text-muted-foreground">
                Les données sont conservées pendant la durée de ton utilisation de l'application, puis supprimées ou anonymisées conformément aux obligations légales.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Sécurité des données</h2>
              <p className="mb-4">Nous mettons en œuvre des mesures techniques et organisationnelles adaptées :</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>chiffrement des mots de passe</li>
                <li>accès restreint aux données</li>
                <li>surveillance des accès</li>
                <li>sauvegardes sécurisées</li>
              </ul>
              <p className="mt-4">Aucun système n'est infaillible, mais la sécurité est une priorité.</p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Tes droits (RGPD)</h2>
              <p className="mb-4">Conformément au RGPD, tu disposes des droits suivants :</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Droit d'accès à tes données</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement (droit à l'oubli)</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité</li>
                <li>Droit d'opposition</li>
                <li>Droit de retirer ton consentement à tout moment</li>
              </ul>
              <p className="mt-4">
                📩 Pour exercer tes droits : Contacte-nous à <a href="mailto:steerofinance@gmail.com" className="text-primary hover:underline">steerofinance@gmail.com</a> (Mail temporaire)
              </p>
              <p className="mt-2 text-muted-foreground">Nous répondons sous 30 jours maximum.</p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Suppression du compte</h2>
              <p className="mb-4">Tu peux supprimer ton compte directement depuis l'application.</p>
              <p className="mb-2">Cette action entraîne :</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>la suppression de tes données personnelles,</li>
                <li>sauf obligations légales de conservation.</li>
              </ul>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Cookies et traceurs</h2>
              <p className="mb-4">L'application peut utiliser :</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>des cookies strictement nécessaires,</li>
                <li>des outils de mesure anonymisés.</li>
              </ul>
              <p className="mt-4">Aucun cookie publicitaire sans consentement explicite.</p>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">13. Modifications de la politique</h2>
              <p className="mb-4">Cette politique peut évoluer pour :</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>rester conforme à la loi,</li>
                <li>refléter l'évolution du produit.</li>
              </ul>
              <p className="mt-4">En cas de changement majeur, tu seras informé.</p>
            </section>

            {/* Section 14 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">14. Réclamation</h2>
              <p className="mb-4">Si tu estimes que tes droits ne sont pas respectés, tu peux :</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>nous contacter directement,</li>
                <li>ou saisir l'autorité de contrôle compétente (ex : CNIL en France).</li>
              </ul>
            </section>

            {/* Section 15 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">15. Contact</h2>
              <p className="mb-4">Une question sur tes données ?</p>
              <p>
                📧 <a href="mailto:steerofinance@gmail.com" className="text-primary hover:underline">steerofinance@gmail.com</a> (Mail temporaire)
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PolitiqueConfidentialite;
