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
import { CONTACT, PHONE_URL, EMAIL_URL, DEFAULT_WHATSAPP_MESSAGE, whatsappUrl } from "@/config/contact";

const districts = [
  "San Vito",
  "Sabalito", 
  "Agua Buena",
  "Limoncito",
  "Pittier",
  "Gutiérrez Braun"
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [q, setQ] = React.useState("");

  const whatsappUrlFull = whatsappUrl(DEFAULT_WHATSAPP_MESSAGE);

  const navigationLinks = [
    { name: "Inicio", url: createPageUrl("Home"), icon: Home },
    { name: "Propiedades", url: createPageUrl("Properties"), icon: MapPin },
    { name: "Contacto", url: createPageUrl("Contact"), icon: Mail },
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
      <header className="sticky top-0 z-50 bg-[var(--bg-elev)] shadow-md py-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center group shrink-0">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e2af09a469dc2a8b31b446/0d438de5b_image.png"
                alt="AZ Inmuebles - Coto Brus, Costa Rica"
                className="h-16 md:h-20 group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.url}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all font-medium ${
                    location.pathname === link.url
                      ? "bg-[#C46542] text-white shadow-md"
                      : "text-[var(--text)] hover:bg-[var(--primary-50)]"
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Header Search (Desktop) */}
            <form onSubmit={onSearch} className="hidden xl:flex items-center gap-2 flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Buscar por distrito, tipo o etiquetas..."
                  className="pl-9 h-10 border-2 focus:border-[#C46542]"
                />
              </div>
              <Button type="submit" size="sm" className="bg-[#C46542] hover:bg-[#A35436]">
                Buscar
              </Button>
            </form>

            {/* Contact Buttons */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <a href={PHONE_URL}>
                <Button variant="outline" size="sm" className="gap-2 border-2 border-[#C46542] text-[var(--text)] hover:bg-[var(--primary-50)]">
                  <Phone className="w-4 h-4" />
                  {CONTACT.phoneDisplay}
                </Button>
              </a>
              <a href={whatsappUrlFull} target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="gap-2 bg-green-600 hover:bg-green-700 shadow-lg">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
              </a>
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-6 mt-8">
                  {/* Logo in mobile menu */}
                  <div className="flex justify-center pb-6 border-b border-[var(--border)]">
                    <img
                      src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e2af09a469dc2a8b31b446/0d438de5b_image.png"
                      alt="AZ Inmuebles"
                      className="h-20"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* Quick Search (Mobile) */}
                  <form onSubmit={onSearch} className="xl:hidden">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                      <Input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Buscar..."
                        className="pl-9 h-10 border-2 focus:border-[#C46542]"
                      />
                    </div>
                    <Button type="submit" className="w-full mt-2 bg-[#C46542] hover:bg-[#A35436]">
                      Buscar
                    </Button>
                  </form>

                  <div className="space-y-2">
                    {navigationLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.url}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          location.pathname === link.url
                            ? "bg-[var(--primary-50)] text-[#C46542] font-medium"
                            : "text-[var(--text)] hover:bg-[var(--bg-elev2)]"
                        }`}
                      >
                        <link.icon className="w-5 h-5" />
                        {link.name}
                      </Link>
                    ))}
                  </div>

                  <div className="border-t border-[var(--border)] pt-6">
                    <h3 className="text-sm font-semibold text-[var(--muted)] mb-3">DISTRITOS</h3>
                    <div className="space-y-2">
                      {districts.map((district) => (
                        <Link
                          key={district}
                          to={createPageUrl(`Properties?district=${encodeURIComponent(district)}`)}
                          className="flex items-center gap-3 px-4 py-2 rounded-lg text-[var(--text)] hover:bg-[var(--bg-elev2)]"
                        >
                          <MapPin className="w-4 h-4" />
                          {district}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-[var(--border)] pt-6 space-y-3">
                    <a href={PHONE_URL} className="block">
                      <Button variant="outline" className="w-full gap-2 border-[#C46542] text-[var(--text)]">
                        <Phone className="w-4 h-4" />
                        {CONTACT.phoneDisplay}
                      </Button>
                    </a>
                    <a href={whatsappUrlFull} target="_blank" rel="noopener noreferrer" className="block">
                      <Button className="w-full gap-2 bg-green-600 hover:bg-green-700">
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </Button>
                    </a>
                    <a href={EMAIL_URL} className="block">
                      <Button variant="outline" className="w-full gap-2">
                        <Mail className="w-4 h-4" />
                        Correo
                      </Button>
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#161616] text-[var(--muted)] mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e2af09a469dc2a8b31b446/0d438de5b_image.png"
                alt="AZ Inmuebles"
                className="h-24 w-auto mb-4 brightness-110"
                loading="lazy"
                decoding="async"
              />
              <p className="text-sm text-[var(--muted)]">
                Propiedades con datos claros y asesoría local en Coto Brus
              </p>
            </div>

            {/* Districts */}
            <div>
              <h3 className="font-semibold text-[var(--text)] mb-4">Distritos</h3>
              <ul className="space-y-2 text-sm">
                {districts.map((district) => (
                  <li key={district}>
                    <Link
                      to={createPageUrl(`Properties?district=${encodeURIComponent(district)}`)}
                      className="hover:text-[#E8D5C4] transition-colors"
                    >
                      {district}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-semibold text-[var(--text)] mb-4">Navegación</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to={createPageUrl("Home")} className="hover:text-[#E8D5C4] transition-colors">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl("Properties")} className="hover:text-[#E8D5C4] transition-colors">
                    Propiedades
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl("Contact")} className="hover:text-[#E8D5C4] transition-colors">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl("TerminosPrivacidad")} className="hover:text-[#E8D5C4] transition-colors">
                    Términos y Privacidad
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-[var(--text)] mb-4">Contacto</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a href={PHONE_URL} className="hover:text-[#E8D5C4] transition-colors">
                    {CONTACT.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <a href={whatsappUrlFull} target="_blank" rel="noopener noreferrer" className="hover:text-[#E8D5C4] transition-colors">
                    WhatsApp
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href={EMAIL_URL} className="hover:text-[#E8D5C4] transition-colors break-all">
                    {CONTACT.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[var(--border)] mt-8 pt-8 text-center text-sm text-[var(--muted)]">
            <p>© {new Date().getFullYear()} AZ Inmuebles. Todos los derechos reservados.</p>
            <p className="mt-2">
              La información de cada propiedad es proporcionada por los propietarios o sus representantes y puede variar; verifíquela antes de cualquier decisión.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappUrlFull}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-600 hover:bg-green-700 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-8 h-8 text-white" />
      </a>
    </div>
  );
}
