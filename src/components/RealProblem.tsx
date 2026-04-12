import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const RealProblem = () => {
  const { t } = useTranslation();

  const cards = [
    { num: "01", text: t("realProblem.card1") },
    { num: "02", text: t("realProblem.card2") },
    { num: "03", text: t("realProblem.card3") },
  ];

  return (
    <section className="py-20 bg-foreground text-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold tracking-widest text-muted-foreground mb-4"
        >
          {t("realProblem.label")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold leading-tight mb-6"
        >
          {t("realProblem.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-muted-foreground mb-12 max-w-2xl"
        >
          {t("realProblem.description")}
        </motion.p>

        <div className="grid sm:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="rounded-2xl bg-card/10 backdrop-blur-sm border border-border/20 p-6"
            >
              <span className="text-sm font-semibold text-muted-foreground mb-3 block">
                {card.num}
              </span>
              <p className="text-background/90 text-sm leading-relaxed">
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RealProblem;
