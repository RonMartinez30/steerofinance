import { ArrowRight, Shield, Users, Zap } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Prêt à (re)prendre le contrôle ?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Inscris toi à la liste d’attente pour recevoir des nouvelles de l’avancement du projet, profiter d’un accès
            anticipé et d’une offre de bienvenue pour les 200 premiers abonnés.
          </p>

          <button className="btn-primary group mb-12">
            Je m’inscris à la liste d’attente
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span>Rejoignez des milliers d'utilisateurs sereins</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <span>Sans publicités</span>
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
