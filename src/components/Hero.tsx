import { Sparkles, Timer, Eye, ShieldCheck } from "lucide-react";
import heroImage from "@/assets/hero-dashboard.webp";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-hero-gradient pt-24 pb-16 overflow-hidden">
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

            <p className="text-lg text-muted-foreground max-w-xl">
              Un tableau de bord simple pour suivre budgets, dépenses et habitudes : Le premier Operating System personnel qui relie finances et habitudes pour changer durablement.
            </p>

            {/* Value props - Modern triptych */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="group relative p-5 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <Timer className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-primary font-semibold text-base mb-1">Simplicité</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Un rituel de suivi en moins de 2 minutes par jour</p>
              </div>
              <div className="group relative p-5 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <Eye className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-primary font-semibold text-base mb-1">Clarté</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Tu sais exactement pourquoi tu dépenses et où tu vas</p>
              </div>
              <div className="group relative p-5 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-primary font-semibold text-base mb-1">Sérénité</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Plus de surprises en fin de mois</p>
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
    </section>
  );
};

export default Hero;
