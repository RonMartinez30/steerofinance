import { Link } from "react-router-dom";
import steeroLogo from "@/assets/steero-logo.jpg";

const Footer = () => {
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center">
            <img src={steeroLogo} alt="Steero" className="h-12 w-auto object-contain" />
          </Link>

          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <Link to="/mentions-legales" className="hover:text-primary transition-colors">
              Mentions légales
            </Link>
            <Link to="/cgs" className="hover:text-primary transition-colors">
              CGS
            </Link>
            <Link to="/faq" className="hover:text-primary transition-colors">
              FAQ
            </Link>
            <a href="mailto:contact@steero.fr" className="hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          <p className="text-sm text-muted-foreground">
            © 2024 Steero. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
