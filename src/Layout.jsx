import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, MapPin, Mail, Menu, Phone, MessageCircle, Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CONTACT, PHONE_URL, EMAIL_URL, whatsappUrl } from "@/config/contact";
import { useTranslation } from "@/i18n/LanguageContext";
import LanguageSwitch from "@/components/LanguageSwitch";

const districts = [
  "San Vito",
  "Sabalito",
  "Agua Buena",
  "Limoncito",
  "Pittier",
  "Gutiérrez Braun",
];

function Logo() {
  return (
    <div className="flex flex-col leading-none select-none">
      <div className="flex items-baseline gap-0">
        <span className="font-playfair text-[1.45rem] font-bold text-[#1A1A1A] tracking-tight">
          AZ
        </span>
        <span className="font-playfair text-[1.45rem] font-bold text-[#B07D3A]">.</span>
        <span className="font-inter text-[1.1rem] font-light text-[#1A1A1A] ml-1.5 tracking-tight">
          Inmuebles
        </span>
      </div>
      <span
        className="font-inter text-[0.6rem] tracking-[0.18em] text-[#5C5449] uppercase mt-0.5"
        style={{ letterSpacing: "0.18em" }}
      >
        Coto Brus · Costa Rica
      </span>
    </div>
  );
}

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [q, setQ] = React.useState("");
  const { t } = useTranslation();

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappUrlFull = whatsappUrl(t("whatsapp.defaultMessage"));

  const navigationLinks = [
    { name: t("nav.home"), url: createPageUrl("Home"), icon: Home },
    { name: t("nav.properties"), url: createPageUrl("Properties"), icon: MapPin },
    { name: t("nav.contact"), url: createPageUrl("Contact"), icon: Mail },
  ];

  const onSearch = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(createPageUrl(`Properties?search=${encodeURIComponent(q.trim())}`));
    setQ("");
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">

      {/* Header */}
      <header
        className={`sticky top-0 z-50 py-3 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-md border-b border-[var(--border)]"
            : "bg-[#F0EDE6] shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between gap-4">

            {/* Logo */}
            <Link
              to={createPageUrl("Home")}
              className="flex items-center group shrink-0 hover:opacity-80 transition-opacity duration-200"
            >
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigationLinks.map((link) => (
                <Link
                  key={link.url}
                  to={link.url}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-inter font-medium text-sm transition-all duration-200 ${
                    location.pathname === link.url
                      ? "bg-[#B07D3A] text-white shadow-sm"
                      : "text-[#1A1A1A] hover:bg-[rgba(176,125,58,0.08)] hover:text-[#B07D3A]"
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Search (Desktop XL) */}
            <form
              onSubmit={onSearch}
              className="hidden xl:flex items-center gap-2 flex-1 max-w-sm"
            >
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={t("nav.searchPlaceholder")}
                  className="pl-9 h-9"
                />
              </div>
              <Button type="submit" size="sm">
                {t("nav.search")}
              </Button>
            </form>

            {/* Contact + Language (Desktop) */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <LanguageSwitch />
              <a href={PHONE_URL}>
                <Button variant="outline" size="sm" className="gap-1.5 text-sm">
                  <Phone className="w-3.5 h-3.5" />
                  {CONTACT.phoneDisplay}
                </Button>
              </a>
              <a href={whatsappUrlFull} target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="gap-1.5 text-sm">
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </Button>
              </a>
            </div>

            {/* Mobile: Language + Burger */}
            <div className="flex lg:hidden items-center gap-2">
              <LanguageSwitch />
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-[#1A1A1A]">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-white border-l border-[var(--border)]">
                  <div className="flex flex-col gap-6 mt-6">

                    {/* Logo in mobile menu */}
                    <div className="pb-5 border-b border-[var(--border)]">
                      <Logo />
                    </div>

                    {/* Quick Search */}
                    <form onSubmit={onSearch}>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                        <Input
                          value={q}
                          onChange={(e) => setQ(e.target.value)}
                          placeholder={t("nav.searchShort")}
                          className="pl-9 h-10"
                        />
                      </div>
                      <Button type="submit" className="w-full mt-2">
                        {t("nav.search")}
                      </Button>
                    </form>

                    {/* Nav links */}
                    <div className="space-y-1">
                      {navigationLinks.map((link) => (
                        <Link
                          key={link.url}
                          to={link.url}
                          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors font-inter text-sm font-medium ${
                            location.pathname === link.url
                              ? "bg-[rgba(176,125,58,0.1)] text-[#B07D3A]"
                              : "text-[#1A1A1A] hover:bg-[var(--bg-elev2)]"
                          }`}
                        >
                          <link.icon className="w-4 h-4" />
                          {link.name}
                        </Link>
                      ))}
                    </div>

                    {/* Districts */}
                    <div className="border-t border-[var(--border)] pt-5">
                      <h3 className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-3 font-inter">
                        {t("nav.districts")}
                      </h3>
                      <div className="space-y-1">
                        {districts.map((district) => (
                          <Link
                            key={district}
                            to={createPageUrl(
                              `Properties?district=${encodeURIComponent(district)}`
                            )}
                            className="flex items-center gap-3 px-4 py-2 rounded-lg text-[#1A1A1A] hover:bg-[var(--bg-elev2)] text-sm font-inter"
                          >
                            <MapPin className="w-3.5 h-3.5 text-[#B07D3A]" />
                            {district}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Contact buttons */}
                    <div className="border-t border-[var(--border)] pt-5 space-y-2">
                      <a href={PHONE_URL} className="block">
                        <Button variant="outline" className="w-full gap-2">
                          <Phone className="w-4 h-4" />
                          {CONTACT.phoneDisplay}
                        </Button>
                      </a>
                      <a
                        href={whatsappUrlFull}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button className="w-full gap-2">
                          <MessageCircle className="w-4 h-4" />
                          WhatsApp
                        </Button>
                      </a>
                      <a href={EMAIL_URL} className="block">
                        <Button variant="outline" className="w-full gap-2">
                          <Mail className="w-4 h-4" />
                          {t("nav.email")}
                        </Button>
                      </a>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-[#F8F6F1] mt-20">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <div className="grid md:grid-cols-4 gap-10">

            {/* Brand */}
            <div className="md:col-span-1">
              <div className="mb-4">
                <div className="flex items-baseline gap-0">
                  <span className="font-playfair text-xl font-bold text-white">AZ</span>
                  <span className="font-playfair text-xl font-bold text-[#B07D3A]">.</span>
                  <span className="font-inter text-base font-light text-white ml-1.5">Inmuebles</span>
                </div>
                <span className="block font-inter text-[0.6rem] tracking-[0.18em] text-[#5C5449] uppercase mt-0.5">
                  Coto Brus · Costa Rica
                </span>
              </div>
              <p className="text-sm text-[#5C5449] font-inter leading-relaxed">
                {t("footer.tagline")}
              </p>
            </div>

            {/* Districts */}
            <div>
              <h3 className="font-playfair font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                {t("footer.districtsTitle")}
              </h3>
              <ul className="space-y-2 text-sm">
                {districts.map((district) => (
                  <li key={district}>
                    <Link
                      to={createPageUrl(
                        `Properties?district=${encodeURIComponent(district)}`
                      )}
                      className="text-[#5C5449] hover:text-[#B07D3A] transition-colors font-inter"
                    >
                      {district}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="font-playfair font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                {t("footer.navigationTitle")}
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to={createPageUrl("Home")}
                    className="text-[#5C5449] hover:text-[#B07D3A] transition-colors font-inter"
                  >
                    {t("nav.home")}
                  </Link>
                </li>
                <li>
                  <Link
                    to={createPageUrl("Properties")}
                    className="text-[#5C5449] hover:text-[#B07D3A] transition-colors font-inter"
                  >
                    {t("nav.properties")}
                  </Link>
                </li>
                <li>
                  <Link
                    to={createPageUrl("Contact")}
                    className="text-[#5C5449] hover:text-[#B07D3A] transition-colors font-inter"
                  >
                    {t("nav.contact")}
                  </Link>
                </li>
                <li>
                  <Link
                    to={createPageUrl("TerminosPrivacidad")}
                    className="text-[#5C5449] hover:text-[#B07D3A] transition-colors font-inter"
                  >
                    {t("footer.termsLink")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-playfair font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                {t("footer.contactTitle")}
              </h3>
              <ul className="space-y-3 text-sm font-inter">
                <li className="flex items-center gap-2 text-[#5C5449]">
                  <Phone className="w-4 h-4 text-[#B07D3A] flex-shrink-0" />
                  <a
                    href={PHONE_URL}
                    className="hover:text-[#B07D3A] transition-colors"
                  >
                    {CONTACT.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-2 text-[#5C5449]">
                  <MessageCircle className="w-4 h-4 text-[#B07D3A] flex-shrink-0" />
                  <a
                    href={whatsappUrlFull}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#B07D3A] transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
                <li className="flex items-center gap-2 text-[#5C5449]">
                  <Mail className="w-4 h-4 text-[#B07D3A] flex-shrink-0" />
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="hover:text-[#B07D3A] transition-colors break-all"
                  >
                    {CONTACT.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-10 pt-8 text-center text-xs text-[#5C5449] font-inter">
            <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
            <p className="mt-1.5">{t("footer.disclaimer")}</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={whatsappUrlFull}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#B07D3A] hover:bg-[#8F6530] rounded-full shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
        aria-label={t("nav.whatsappAria")}
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  );
}
