import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, MessageCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CONTACT, PHONE_URL, EMAIL_URL, whatsappUrl } from "@/config/contact";
import { useTranslation } from "@/i18n/LanguageContext";
import LanguageSwitch from "@/components/LanguageSwitch";

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsappUrlFull = whatsappUrl(t("whatsapp.defaultMessage"));

  const navLinks = [
    { name: t("nav.home"),       url: createPageUrl("Home") },
    { name: t("nav.properties"), url: createPageUrl("Properties") },
    { name: t("nav.contact"),    url: createPageUrl("Contact") },
  ];

  const isActive = (url) => location.pathname === url;

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col">

      {/* Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[rgba(255,255,255,0.05)]" 
            : "bg-[#0A0A0A]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

          {/* Logo */}
          <Link
            to={createPageUrl("Home")}
            className="text-sm font-normal text-[#F0EDE6] tracking-tight hover:opacity-75 transition-opacity"
          >
            AZ <span style={{ color: "#2D5A40" }}>·</span> Inmuebles
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.url}
                to={link.url}
                className={`text-sm transition-colors ${
                  isActive(link.url)
                    ? "text-[#2D5A40]"
                    : "text-[#888073] hover:text-[#F0EDE6]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitch />
            <a
              href={PHONE_URL}
              className="text-sm text-[#888073] hover:text-[#F0EDE6] transition-colors"
            >
              {CONTACT.phoneDisplay}
            </a>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-3">
            <LanguageSwitch />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5 text-[#F0EDE6]" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#161616] border-l border-[rgba(255,255,255,0.07)]">
                <div className="flex flex-col gap-8 mt-8">
                  <Link
                    to={createPageUrl("Home")}
                    className="text-sm font-normal text-[#F0EDE6]"
                  >
                    AZ <span style={{ color: "#2D5A40" }}>·</span> Inmuebles
                  </Link>
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.url}
                        to={link.url}
                        className={`text-sm transition-colors ${
                          isActive(link.url)
                            ? "text-[#2D5A40]"
                            : "text-[#888073] hover:text-[#F0EDE6]"
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                  <div className="flex flex-col gap-3 pt-6 border-t border-[rgba(255,255,255,0.07)]">
                    <a href={PHONE_URL} className="text-sm text-[#888073] hover:text-[#F0EDE6] transition-colors">
                      {CONTACT.phoneDisplay}
                    </a>
                    <a href={EMAIL_URL} className="text-sm text-[#888073] hover:text-[#F0EDE6] transition-colors break-all">
                      {CONTACT.email}
                    </a>
                    <a
                      href={whatsappUrlFull}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2"
                    >
                      <Button size="sm" className="w-full">WhatsApp</Button>
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-[rgba(255,255,255,0.07)]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-sm text-[#888073]">
            AZ Inmuebles · Coto Brus, Costa Rica
          </span>
          <div className="flex flex-wrap gap-6 text-sm text-[#888073]">
            <a href={PHONE_URL} className="hover:text-[#F0EDE6] transition-colors">
              {CONTACT.phoneDisplay}
            </a>
            <a href={EMAIL_URL} className="hover:text-[#F0EDE6] transition-colors break-all">
              {CONTACT.email}
            </a>
          </div>
        </div>
        <div className="border-t border-[rgba(255,255,255,0.04)]">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <p className="text-xs text-[#888073]/40">
              © {new Date().getFullYear()} AZ Inmuebles
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a
        href={whatsappUrlFull}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#1A3A2A] hover:bg-[#2D5A40] rounded flex items-center justify-center transition-colors duration-200 shadow-lg"
        aria-label={t("nav.whatsappAria")}
      >
        <MessageCircle className="w-5 h-5 text-[#F0EDE6]" />
      </a>
    </div>
  );
}
