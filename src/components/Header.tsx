import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import steeroLogo from "@/assets/steero-logo.jpg";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={steeroLogo} alt="Steero" className="h-8 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/pourquoi-steero" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Pourquoi Steero
          </Link>
          <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md border border-border text-sm text-muted-foreground">
            FR
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
          <Button className="btn-primary">Commencer</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
