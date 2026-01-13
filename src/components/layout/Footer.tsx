import { Link } from "react-router-dom";
import { Leaf, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import ecoLogo from "@/assets/eco-logo.png";

const Footer = () => {
  return (
    <footer className="bg-eco-forest text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={ecoLogo} alt="EcoWarriors" className="h-12 w-12" />
              <span className="text-xl font-bold">EcoWarriors</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Tabiatni muhofaza qilish va ekologik barqarorlikni ta'minlash yo'lida
              birga ishlaymiz. Kelajak avlodlar uchun yashil muhit yaratamiz.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Tezkor havolalar</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Biz haqimizda
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Yangiliklar
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Tadbirlar
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Galereya
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Aloqa</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Toshkent shahri, Chilonzor tumani</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+998 90 123 45 67</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>info@ecowarriors.uz</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Ijtimoiy tarmoqlar</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <p className="text-center text-sm text-primary-foreground/70">
            © {new Date().getFullYear()} EcoWarriors. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
