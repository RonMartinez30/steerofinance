import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-dashboard.webp";
const Hero = () => {
  return <section className="relative min-h-screen bg-hero-gradient pt-24 pb-16 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-20 top-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-20 bottom-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* Left content */}
          <div className="space-y-8">
            <div className="badge-sparkle">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Clarté, régularité, sérénité</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              (Re)Prends le contrôle de tes finances avec <span className="text-gradient">simplicité</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl">Un tableau de bord simple pour suivre budgets, dépenses et habitudes : Le premier Operating System personnel qui relie finances et habitudes pour changer durablement.</p>

            <button className="btn-primary group">
              Je m’inscris à la liste d’attente
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Value props */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-border/50">
              <div>
                <h3 className="text-primary font-semibold text-lg">Simplicité</h3>
                <p className="text-sm text-muted-foreground">Pas d'automatisation ou de suivi complexe </p>
              </div>
              <div>
                <h3 className="text-primary font-semibold text-lg">Clarté</h3>
                <p className="text-sm text-muted-foreground">Comprends chaque décision </p>
              </div>
              <div>
                <h3 className="text-foreground font-semibold text-lg">Serenité</h3>
                <p className="text-sm text-muted-foreground">Avance à ton rythme</p>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="relative lg:pl-8">
            <div className="relative transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl transform rotate-6 scale-105" />
              <img src={heroImage} alt="Finances calmes et claires" className="relative rounded-3xl shadow-image w-full object-cover aspect-[4/3]" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;