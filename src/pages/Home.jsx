import React, { useState, useEffect } from "react";
import { Property } from "@/entities/Property";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Shield, Users, MapPin, TrendingUp, Award, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import DistrictCard from "../components/DistrictCard";
import PropertyCard from "../components/PropertyCard";
import ContactButtons from "../components/ContactButtons";
import { useTranslation } from "@/i18n/LanguageContext";
import { HERO_COTO_BRUS_DATA_URI } from "@/assets/heroCotoBrusDataUri";

const districtData = [
  { name: "San Vito",         image: "/images/distritos/san-vito.jpg.jpeg" },
  { name: "Sabalito",         image: "/images/distritos/sabalito.jpg.jpeg" },
  { name: "Agua Buena",       image: "/images/distritos/agua-buena.jpg.jpeg" },
  { name: "Limoncito",        image: "/images/distritos/limoncito.jpg.jpeg" },
  { name: "Pittier",          image: "/images/distritos/pittier.jpg.jpeg" },
  { name: "Gutiérrez Braun",  image: "/images/distritos/gutierrez-braun.jpg.jpeg" },
];

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();
  const heroImage = import.meta.env.VITE_HERO_BG_IMAGE_URL || HERO_COTO_BRUS_DATA_URI;

  useEffect(() => {
    Property.list("-created_date", 6).then(setProperties);
  }, []);

  const featuredProperties = properties.filter((p) => p.featured).slice(0, 3);
  const displayProperties = featuredProperties.length > 0 ? featuredProperties : properties.slice(0, 3);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = createPageUrl(
        `Properties?search=${encodeURIComponent(searchQuery)}`
      );
    }
  };

  const stats = [
    { icon: Award,      value: "15+",  label: t("home.statYears") },
    { icon: Users,      value: "200+", label: t("home.statClients") },
    { icon: TrendingUp, value: "100%", label: t("home.statLegal") },
    { icon: Clock,      value: "24/7", label: t("home.statAvailability") },
  ];

  const trustReasons = [
    { icon: Shield, title: t("home.trustTransparencyTitle"), description: t("home.trustTransparencyDesc") },
    { icon: Users,  title: t("home.trustGuidanceTitle"),    description: t("home.trustGuidanceDesc") },
    { icon: MapPin, title: t("home.trustLocalTitle"),       description: t("home.trustLocalDesc") },
  ];

  return (
    <div>
      {/* ── Hero ── */}
      <section className="bg-[#F0EDE6] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: text */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-[#B07D3A] text-white rounded-full text-sm font-medium font-inter shadow-sm">
                <MapPin className="w-3.5 h-3.5" />
                {t("home.heroBadge")}
              </div>

              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-tight mb-5">
                {t("home.heroTitle")}
                <span className="text-[#B07D3A] italic">
                  {t("home.heroTitleHighlight")}
                </span>
              </h1>

              <p className="font-inter text-lg text-[#5C5449] mb-8 leading-relaxed max-w-lg">
                {t("home.heroSubtitle")}
              </p>

              <ContactButtons />

              {/* Search bar */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="mt-10 flex gap-2 max-w-md"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                  <Input
                    placeholder={t("home.searchPlaceholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-9 h-11 text-sm"
                  />
                </div>
                <Button onClick={handleSearch} className="h-11 px-5">
                  <Search className="w-4 h-4" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Right: hero image (desktop) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="hidden lg:block"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img
                  src={heroImage}
                  alt="Coto Brus, Puntarenas, Costa Rica"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                {/* Floating card */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-3 flex items-center justify-between shadow-lg">
                  <div>
                    <p className="font-inter text-xs text-[#5C5449] uppercase tracking-wider">
                      Cantón de Coto Brus
                    </p>
                    <p className="font-playfair text-sm font-semibold text-[#1A1A1A]">
                      Puntarenas, Costa Rica
                    </p>
                  </div>
                  <MapPin className="w-5 h-5 text-[#B07D3A]" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg border border-[var(--border)] p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="text-center"
            >
              <div className="w-11 h-11 bg-[rgba(176,125,58,0.1)] rounded-xl flex items-center justify-center mx-auto mb-2">
                <stat.icon className="w-5 h-5 text-[#B07D3A]" />
              </div>
              <div className="font-playfair text-2xl font-bold text-[#1A1A1A]">{stat.value}</div>
              <div className="font-inter text-xs text-[#5C5449] mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Districts ── */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block mb-3 px-4 py-1 bg-[rgba(176,125,58,0.1)] text-[#B07D3A] rounded-full text-sm font-semibold font-inter">
            {t("home.districtsBadge")}
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3">
            {t("home.districtsTitle")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {districtData.map((district, index) => (
            <motion.div
              key={district.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * index, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <DistrictCard district={district.name} image={district.image} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Properties ── */}
      <section className="bg-[#F0EDE6] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <span className="inline-block mb-3 px-4 py-1 bg-white text-[#B07D3A] rounded-full text-sm font-semibold font-inter border border-[var(--border)]">
                {t("home.featuredBadge")}
              </span>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1A1A1A]">
                {t("home.featuredTitle")}
              </h2>
            </div>
            {displayProperties.length > 0 && (
              <Link to={createPageUrl("Properties")} className="hidden md:block">
                <Button variant="outline" className="gap-2">
                  {t("home.viewAll")}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </motion.div>

          {displayProperties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {displayProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * index, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <PropertyCard property={property} />
                  </motion.div>
                ))}
              </div>
              <div className="text-center md:hidden">
                <Link to={createPageUrl("Properties")}>
                  <Button variant="outline" className="gap-2">
                    {t("home.viewAllProperties")}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center py-16 bg-white rounded-2xl border border-[var(--border)] shadow-sm"
            >
              <div className="w-14 h-14 bg-[rgba(176,125,58,0.1)] rounded-full flex items-center justify-center mx-auto mb-5">
                <MapPin className="w-7 h-7 text-[#B07D3A]" />
              </div>
              <h3 className="font-playfair text-2xl font-semibold text-[#1A1A1A] mb-2">
                Propiedades disponibles próximamente
              </h3>
              <p className="font-inter text-[#5C5449] max-w-sm mx-auto">
                Estamos preparando el catálogo. Contáctenos para consultas sobre propiedades en Coto Brus.
              </p>
              <div className="mt-8 flex justify-center">
                <Link to={createPageUrl("Contact")}>
                  <Button className="gap-2">
                    Contactar ahora
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Trust ── */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block mb-3 px-4 py-1 bg-[rgba(176,125,58,0.1)] text-[#B07D3A] rounded-full text-sm font-semibold font-inter">
            {t("home.trustBadge")}
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3">
            {t("home.trustTitle")}
          </h2>
          <p className="font-inter text-[#5C5449] max-w-xl mx-auto">
            {t("home.trustSubtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trustReasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="group bg-white rounded-2xl p-8 shadow-sm border border-[var(--border)] hover:shadow-lg hover:border-[#B07D3A] transition-all duration-300 h-full">
                <div className="w-14 h-14 bg-[rgba(176,125,58,0.1)] rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#B07D3A] transition-colors duration-300">
                  <reason.icon className="w-7 h-7 text-[#B07D3A] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-playfair text-xl font-semibold text-[#1A1A1A] mb-3">
                  {reason.title}
                </h3>
                <p className="font-inter text-[#5C5449] leading-relaxed text-sm">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-20 overflow-hidden bg-[#1A1A1A]">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-80 h-80 bg-[#B07D3A] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#B07D3A] rounded-full blur-3xl" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B07D3A]/40 to-transparent" />

        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block mb-5 px-4 py-1.5 bg-[rgba(176,125,58,0.2)] text-[#B07D3A] rounded-full text-sm font-semibold font-inter">
              {t("home.ctaBadge")}
            </span>
            <h2 className="font-playfair text-3xl md:text-5xl font-bold text-white mb-5">
              {t("home.ctaTitle")}
            </h2>
            <p className="font-inter text-lg text-white/70 mb-10 max-w-xl mx-auto">
              {t("home.ctaSubtitle")}
            </p>
            <div className="flex justify-center">
              <ContactButtons />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
