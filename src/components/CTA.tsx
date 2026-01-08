import { ArrowRight, Shield, Users, Zap } from "lucide-react";
import { useState, useEffect } from "react";

const targetDate = new Date("2026-03-20T12:00:00+01:00");

const CTA = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: "Jours" },
    { value: timeLeft.hours, label: "Heures" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Secondes" },
  ];

  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
            Prêt à (re)prendre le contrôle ?
          </h2>
          <p className="text-lg mb-8 max-w-xl mx-auto text-primary-foreground/90">
            Inscris toi à la liste d'attente pour recevoir des nouvelles de l'avancement du projet, profiter d'un accès anticipé et d'une offre de bienvenue*.
          </p>

          <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group mb-12">
            Je m'inscris à la liste d'attente
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Countdown intégré */}
          <div className="mb-10 p-6 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm">
            <p className="text-primary-foreground/80 mb-4 text-sm">
              Lancement prévu le <span className="font-semibold text-primary-foreground">20 mars 2026 à 12h</span>
            </p>
            <div className="flex justify-center gap-3 md:gap-6">
              {timeUnits.map((unit, index) => (
                <div key={index} className="text-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-background flex items-center justify-center shadow-lg">
                    <span className="text-xl md:text-2xl font-bold text-primary">
                      {String(unit.value).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-primary-foreground/70">{unit.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary-foreground/70" />
              <span className="text-primary-foreground">Gratuit pour commencer</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary-foreground/70" />
              <span className="text-primary-foreground">Sans publicités</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary-foreground/70" />
              <span className="text-primary-foreground">Données sécurisées</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;