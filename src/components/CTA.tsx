import { ArrowRight, Shield, Users, Zap } from "lucide-react";
const CTA = () => {
  return <section className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center bg-primary rounded-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-foreground">Prêt à (re)prendre le contrôle ?</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto text-primary-foreground">Inscris toi à la liste d’attente pour recevoir des nouvelles de l’avancement du projet, profiter d’un accès anticipé et d’une offre de bienvenue*.</p>

          <button className="btn-primary group mb-12">
            Je m’inscris à la liste d’attente
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-primary-foreground">Gratuit pour commencer</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-primary-foreground">Sans publicités</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-primary-foreground">Données sécurisées</span>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default CTA;