import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import steeroLogo from "@/assets/steero-logo.png";

const Footer = () => {
  const links = [
    { to: "/mentions-legales", label: "Mentions légales" },
    { to: "/cgs", label: "CGS" },
    { to: "/politique-confidentialite", label: "Politique de confidentialité" },
    { to: "/faq", label: "FAQ" },
  ];

  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link to="/" className="flex items-center">
              <img src={steeroLogo} alt="Steero" className="h-16 w-auto object-contain" />
            </Link>
          </motion.div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {links.map((link, index) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
              >
                <Link to={link.to} className="hover:text-primary transition-colors">
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.a 
              href="mailto:contact@steero.fr" 
              className="hover:text-primary transition-colors"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              Contact
            </motion.a>
          </nav>

          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm text-muted-foreground"
          >
            © 2024 Steero. Tous droits réservés.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
