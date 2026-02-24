import React, { useState, useEffect } from "react";
import { Property } from "@/entities/Property";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Shield, Users, MapPin, TrendingUp, Award, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import DistrictCard from "../components/DistrictCard";
import PropertyCard from "../components/PropertyCard";
import ContactButtons from "../components/ContactButtons";
import { useTranslation } from "@/i18n/LanguageContext";
import { HERO_COTO_BRUS_DATA_URI } from "@/assets/heroCotoBrusDataUri";

const districtKeys = {
  "San Vito": "sanVito",
  "Sabalito": "sabalito",
  "Agua Buena": "aguaBuena",
  "Limoncito": "limoncito",
  "Pittier": "pittier",
  "Gutiérrez Braun": "gutierrezBraun"
};

const districtData = [
  { name: "San Vito", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e2af09a469dc2a8b31b446/30d2e28c6_image.png" },
  { name: "Sabalito", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop" },
  { name: "Agua Buena", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop" },
  { name: "Limoncito", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop" },
  { name: "Pittier", image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=600&fit=crop" },
  { name: "Gutiérrez Braun", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop" }
];

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();
  const heroBackgroundImage = import.meta.env.VITE_HERO_BG_IMAGE_URL || HERO_COTO_BRUS_DATA_URI;

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    const data = await Property.list("-created_date", 6);
    setProperties(data);
  };

  const featuredProperties = properties.filter((p) => p.featured).slice(0, 3);
  const displayProperties = featuredProperties.length > 0 ? featuredProperties : properties.slice(0, 3);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = createPageUrl(`Properties?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const stats = [
    { icon: Award, value: "15+", label: t("home.statYears") },
    { icon: Users, value: "200+", label: t("home.statClients") },
    { icon: TrendingUp, value: "100%", label: t("home.statLegal") },
    { icon: Clock, value: "24/7", label: t("home.statAvailability") },
  ];

  const trustReasons = [
    {
      icon: Shield,
      title: t("home.trustTransparencyTitle"),
      description: t("home.trustTransparencyDesc"),
    },
    {
      icon: Users,
      title: t("home.trustGuidanceTitle"),
      description: t("home.trustGuidanceDesc"),
    },
    {
      icon: MapPin,
      title: t("home.trustLocalTitle"),
      description: t("home.trustLocalDesc"),
    },
  ];

  const districts = districtData.map((d) => ({
    ...d,
    description: t(`districts.${districtKeys[d.name]}`),
  }));

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[650px] md:h-[750px] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("${heroBackgroundImage}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
          aria-label="Coto Brus, Puntarenas"
        />

        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white">

            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-[#C46542] rounded-full text-sm font-medium shadow-lg">
              <MapPin className="w-4 h-4" />
              {t("home.heroBadge")}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t("home.heroTitle")}
              <span className="text-[#E8D5C4]">{t("home.heroTitleHighlight")}</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              {t("home.heroSubtitle")}
            </p>

            <ContactButtons />

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-12 bg-[var(--bg-elev)] rounded-2xl p-3 flex gap-3 max-w-xl shadow-2xl">

              <Input
                placeholder={t("home.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="border-0 focus-visible:ring-0 text-[var(--text)] text-lg" />

              <Button onClick={handleSearch} className="bg-[#C46542] hover:bg-[#A35436] px-6">
                <Search className="w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg)] to-transparent" />
      </section>

      {/* Stats Bar */}
      <section className="relative -mt-20 z-10">
        <div className="my-20 px-4 max-w-7xl mx-auto">
          <div className="bg-[var(--bg-elev)] rounded-3xl shadow-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 border-2 border-[var(--accent-border)]">
            {stats.map((stat, index) =>
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="text-center">

                <div className="w-14 h-14 bg-gradient-to-br from-[#C46542] to-[#A35436] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl font-bold text-[var(--text)] mb-1">{stat.value}</div>
                <div className="text-sm text-[var(--muted)]">{stat.label}</div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Districts Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16">

          <div className="inline-block mb-4 px-4 py-2 bg-[var(--primary-50)] text-[#C46542] rounded-full text-sm font-semibold">
            {t("home.districtsBadge")}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-4">
            {t("home.districtsTitle")}
          </h2>
          <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
            {t("home.districtsSubtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {districts.map((district, index) =>
          <motion.div
            key={district.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.6 }}
            viewport={{ once: true }}>

              <DistrictCard
              district={district.name}
              image={district.image}
              description={district.description} />

            </motion.div>
          )}
        </div>
      </section>

      {/* Featured Properties */}
      {displayProperties.length > 0 &&
      <section className="bg-gradient-to-br from-[var(--bg)] to-[var(--primary-50)] py-24">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-16">

              <div>
                <div className="inline-block mb-4 px-4 py-2 bg-[var(--primary-50)] text-[#C46542] rounded-full text-sm font-semibold border border-[var(--accent-border)]">
                  {t("home.featuredBadge")}
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-4">
                  {t("home.featuredTitle")}
                </h2>
                <p className="text-xl text-[var(--muted)]">
                  {t("home.featuredSubtitle")}
                </p>
              </div>
              <Link to={createPageUrl("Properties")} className="hidden md:block">
                <Button size="lg" variant="outline" className="shadow-lg border-2 border-[#C46542] text-[#C46542] hover:bg-[var(--primary-50)]">
                  {t("home.viewAll")}
                </Button>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {displayProperties.map((property, index) =>
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              viewport={{ once: true }}>

                  <PropertyCard property={property} />
                </motion.div>
            )}
            </div>

            <div className="text-center md:hidden">
              <Link to={createPageUrl("Properties")}>
                <Button size="lg" variant="outline" className="shadow-lg border-2 border-[#C46542] text-[#C46542] hover:bg-[var(--primary-50)]">
                  {t("home.viewAllProperties")}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      }

      {/* Trust Reasons */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16">

          <div className="inline-block mb-4 px-4 py-2 bg-[var(--primary-50)] text-[#C46542] rounded-full text-sm font-semibold">
            {t("home.trustBadge")}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-4">
            {t("home.trustTitle")}
          </h2>
          <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
            {t("home.trustSubtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustReasons.map((reason, index) =>
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.6 }}
            viewport={{ once: true }}
            className="group">

              <div className="bg-[var(--bg-elev)] rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-[var(--accent-border)] h-full">
                <div className="w-20 h-20 bg-gradient-to-br from-[#C46542] to-[#A35436] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <reason.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--text)] mb-4">
                  {reason.title}
                </h3>
                <p className="text-[var(--muted)] leading-relaxed text-lg">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C46542] via-[#A35436] to-[#8B4530]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>

            <div className="inline-block mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold">
              {t("home.ctaBadge")}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t("home.ctaTitle")}
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
              {t("home.ctaSubtitle")}
            </p>
            <div className="flex justify-center">
              <ContactButtons />
            </div>
          </motion.div>
        </div>
      </section>
    </div>);

}
