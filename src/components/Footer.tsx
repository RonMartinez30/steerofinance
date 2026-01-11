import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import steeroLogo from "@/assets/steero-logo.png";

const Footer = () => {
  const productLinks = [
    { to: "/pourquoi-steero", label: "Pourquoi Steero" },
    { to: "/fonctionnalites", label: "Fonctionnalités" },
    { to: "/faq", label: "FAQ" },
  ];

  const resourceLinks = [
    { to: "/blog", label: "Blog" },
    { href: "mailto:contact@steero.fr", label: "Contact" },
  ];

  const legalLinks = [
    { to: "/mentions-legales", label: "Mentions légales" },
    { to: "/cgs", label: "CGS" },
    { to: "/politique-confidentialite", label: "Confidentialité" },
  ];

  return (
    <footer className="py-16 bg-muted/30 border-t border-border">
      <div className="container mx-auto px-6">
        {/* Main footer grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12"
        >
          {/* Column 1 - Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Link to="/" className="inline-block mb-4">
              <img src={steeroLogo} alt="Steero" className="h-12 w-auto object-contain" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Un cadre simple pour comprendre et piloter ses finances dans la durée.
            </p>
          </motion.div>

          {/* Column 2 - Product */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h4 className="text-sm font-semibold text-foreground mb-4">Produit</h4>
            <nav className="flex flex-col gap-3">
              {productLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Column 3 - Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold text-foreground mb-4">Ressources</h4>
            <nav className="flex flex-col gap-3">
              {resourceLinks.map((link) => (
                'to' in link ? (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                )
              ))}
            </nav>
          </motion.div>

          {/* Column 4 - Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <h4 className="text-sm font-semibold text-foreground mb-4">Légal</h4>
            <nav className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        </motion.div>

        {/* Closing phrase + Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-border/50"
        >
          <p className="text-center text-muted-foreground text-sm mb-4">
            Construis ta sérénité financière, un rituel à la fois.
          </p>
          <p className="text-center text-xs text-muted-foreground/70">
            © 2026 Steero. Tous droits réservés.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
