import { motion } from "framer-motion";
import { ArrowRight, Download, FileSpreadsheet } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FreeResources = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden border border-primary/20 bg-card shadow-card">
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary" />

            <div className="p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileSpreadsheet className="w-8 h-8 text-primary" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                  {t('freeResources.badge')}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mt-1 mb-2">
                  {t('freeResources.title')}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-lg">
                  {t('freeResources.description')}
                </p>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-3 flex-shrink-0">
                <motion.a
                  href="/steero-budget-mensuel.xlsx"
                  download
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-soft hover:shadow-lg transition-all duration-300 group text-sm"
                >
                  <Download className="w-4 h-4" />
                  {t('freeResources.download')}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.a>
                <Link
                  to="/blog"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors text-center"
                >
                  {t('freeResources.learnMore')}
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FreeResources;
