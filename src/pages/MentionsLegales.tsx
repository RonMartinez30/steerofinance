import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MentionsLegales = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-42 pb-16 bg-hero-gradient">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-8">Mentions légales</h1>
            
            <div className="space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">1. Éditeur du site</h2>
                <p>
                  Le site Steero est édité par la société Steero SAS, société par actions simplifiée 
                  au capital de 10 000 euros, immatriculée au Registre du Commerce et des Sociétés 
                  de Paris sous le numéro XXX XXX XXX.
                </p>
                <ul className="mt-4 space-y-2">
                  <li><strong className="text-foreground">Siège social :</strong> [Adresse à compléter]</li>
                  <li><strong className="text-foreground">Directeur de la publication :</strong> [Nom à compléter]</li>
                  <li><strong className="text-foreground">Email :</strong> contact@steero.fr</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">2. Hébergement</h2>
                <p>
                  Le site est hébergé par [Nom de l'hébergeur], dont le siège social est situé 
                  [Adresse de l'hébergeur].
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">3. Propriété intellectuelle</h2>
                <p>
                  L'ensemble du contenu de ce site (textes, images, vidéos, logos, icônes, sons, 
                  logiciels, etc.) est protégé par le droit d'auteur et le droit des marques. 
                  Toute reproduction, représentation, modification, publication, adaptation de tout 
                  ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, 
                  est interdite, sauf autorisation écrite préalable de Steero SAS.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">4. Protection des données personnelles</h2>
                <p>
                  Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez 
                  d'un droit d'accès, de rectification, de suppression et d'opposition aux données 
                  personnelles vous concernant. Pour exercer ces droits, vous pouvez nous contacter 
                  à l'adresse : contact@steero.fr
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">5. Cookies</h2>
                <p>
                  Ce site utilise des cookies pour améliorer l'expérience utilisateur et mesurer 
                  l'audience. Vous pouvez configurer votre navigateur pour refuser les cookies, 
                  mais certaines fonctionnalités du site pourraient ne plus être disponibles.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">6. Contact</h2>
                <p>
                  Pour toute question relative aux présentes mentions légales, vous pouvez nous 
                  contacter à l'adresse email suivante : contact@steero.fr
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

export default MentionsLegales;
