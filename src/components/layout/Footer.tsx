import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    settori: [
      { name: "Professionale", href: "/settori/professionale" },
      { name: "Domestico", href: "/settori/domestico" },
      { name: "Industriale", href: "/settori/industriale" },
    ],
    applicazioni: [
      { name: "Forni a legna", href: "/applicazioni/forni-a-legna" },
      { name: "Braci e carbone", href: "/applicazioni/braci-carbone" },
      { name: "Caldaie biomassa", href: "/applicazioni/caldaie-biomassa" },
      { name: "Camini", href: "/applicazioni/camini" },
    ],
    risorse: [
      { name: "Guide", href: "/guide" },
      { name: "Case study", href: "/clienti" },
      { name: "Partner", href: "/partner" },
      { name: "Contatti", href: "/contatti" },
    ],
  };

  return (
    <footer className="bg-zapper-dark text-primary-foreground">
      {/* Main Footer */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-display font-bold text-2xl">Z</span>
              </div>
              <span className="font-display font-bold text-2xl">ZAPPER</span>
            </Link>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              Sistemi di abbattimento fumi e polveri per il settore professionale, domestico e industriale. 
              Tecnologia italiana per aria più pulita.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors duration-200"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Settori</h4>
            <ul className="space-y-3">
              {footerLinks.settori.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Applicazioni</h4>
            <ul className="space-y-3">
              {footerLinks.applicazioni.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Risorse</h4>
            <ul className="space-y-3">
              {footerLinks.risorse.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="tel:+390000000000" className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors">
              <Phone className="w-5 h-5 text-accent" />
              <span>+39 000 000 0000</span>
            </a>
            <a href="mailto:info@zapper.it" className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors">
              <Mail className="w-5 h-5 text-accent" />
              <span>info@zapper.it</span>
            </a>
            <div className="flex items-center gap-3 text-primary-foreground/70">
              <MapPin className="w-5 h-5 text-accent" />
              <span>Via Esempio, 123 - Milano (MI)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/50">
            <p>© {currentYear} ZAPPER. Tutti i diritti riservati.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
              <Link to="/cookie" className="hover:text-accent transition-colors">Cookie Policy</Link>
              <Link to="/termini" className="hover:text-accent transition-colors">Termini di servizio</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
