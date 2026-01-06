import { ArrowRight, Shield, Users, Zap } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Prêt à reprendre le contrôle ?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Commencez votre voyage vers la clarté financière. Pas de complexité, 
            pas de culpabilité. Juste vous, vos finances et la sérénité.
          </p>

          <button className="btn-primary group mb-12">
            Commencer gratuitement
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span>Rejoignez des milliers d'utilisateurs sereins</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <span>Gratuit pour commencer</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>Données sécurisées</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
