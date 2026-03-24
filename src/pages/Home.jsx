import React, { useState, useEffect } from "react";
import { Property } from "@/entities/Property";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import DistrictCard from "../components/DistrictCard";
import PropertyCard from "../components/PropertyCard";
import ContactButtons from "../components/ContactButtons";
import { whatsappUrl } from "@/config/contact";
import { useTranslation } from "@/i18n/LanguageContext";

const districtData = [
  { name: "San Vito",        image: "/images/distritos/san-vito.jpg.jpeg" },
  { name: "Sabalito",        image: "/images/distritos/sabalito.jpg.jpeg" },
  { name: "Agua Buena",      image: "/images/distritos/agua-buena.jpg.jpeg" },
  { name: "Limoncito",       image: "/images/distritos/limoncito.jpg.jpeg" },
  { name: "Pittier",         image: "/images/distritos/pittier.jpg.jpeg" },
  { name: "Gutiérrez Braun", image: "/images/distritos/gutierrez-braun.jpg.jpeg" },
];

const WHATSAPP_MSG =
  "Hola, estoy interesado en conocer más sobre las propiedades disponibles en Coto Brus.";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    Property.list("-created_date", 6).then(setProperties);
  }, []);

  const featuredProperties = properties.filter((p) => p.featured).slice(0, 3);
  const displayProperties =
    featuredProperties.length > 0 ? featuredProperties : properties.slice(0, 3);

  return (
    <div>
      {/* ── Hero ── */}
      <section
        className="relative flex flex-col"
        style={{
          minHeight: "100vh",
          backgroundImage:
            "url(\"https://images.unsplash.com/photo-1518457900213-7b12e3a7e7b1?w=1400&q=80\")",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.72)" }} />

        {/* Content — pushed down with padding-top */}
        <div
          className="relative z-10 w-full max-w-[800px] mx-auto px-6 text-center flex-1"
          style={{ paddingTop: "20vh" }}
        >
          {/* Eyebrow label */}
          <p
            className="text-[12px] uppercase text-[#C8A96E]"
            style={{ letterSpacing: "0.2em" }}
          >
            Coto Brus · Costa Rica
          </p>

          {/* Copper divider line */}
          <div
            className="mx-auto mt-5 mb-6"
            style={{
              width: "60px",
              height: "1px",
              background: "rgba(200,169,110,0.3)",
            }}
          />

          {/* Heading */}
          <h1
            className="text-[40px] md:text-[76px] font-light text-[#F0EDE6] leading-[1.05]"
            style={{ letterSpacing: "-0.02em" }}
          >
            Tu próxima propiedad está en Coto Brus.
          </h1>

          {/* Subheading */}
          <p
            className="mt-4 text-[17px] font-normal"
            style={{ color: "rgba(240,237,230,0.6)" }}
          >
            Venta directa con Carlos Azofeifa Arias — fincas, lotes y locales comerciales.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
            <Link to={createPageUrl("Properties")}>
              <button
                className="px-7 py-3 text-sm text-[#F0EDE6] transition-colors"
                style={{ border: "1px solid rgba(240,237,230,0.4)", background: "transparent" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                Ver propiedades
              </button>
            </Link>
            <a href="https://wa.me/50688319331" target="_blank" rel="noopener noreferrer">
              <button
                className="px-7 py-3 text-sm font-medium text-[#0D0D0D] transition-colors"
                style={{ background: "#C8A96E" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#A88848")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#C8A96E")}
              >
                WhatsApp
              </button>
            </a>
          </div>
        </div>

        {/* Scroll indicator — pinned to bottom */}
        <div className="relative z-10 flex flex-col items-center pb-10 gap-2">
          <span
            className="text-[11px] tracking-widest uppercase"
            style={{ color: "rgba(240,237,230,0.3)", fontFamily: "Inter, sans-serif" }}
          >
            Scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "rgba(200,169,110,0.5)",
            }}
          />
        </div>
      </section>

      {/* ── Districts ── */}
      <section className="bg-[#0D0D0D] border-t border-[rgba(255,255,255,0.07)] py-[120px]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-medium tracking-[0.12em] text-[#888073] uppercase mb-10">
            Distritos
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {districtData.map((district, index) => (
              <motion.div
                key={district.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * index, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <DistrictCard district={district.name} image={district.image} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Properties ── */}
      <section className="bg-[#0D0D0D] border-t border-[rgba(255,255,255,0.07)] py-[120px]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-medium tracking-[0.12em] text-[#888073] uppercase mb-10">
            Propiedades
          </p>

          {displayProperties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                {displayProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
              <Link to={createPageUrl("Properties")}>
                <Button variant="outline" size="sm">
                  Ver todas las propiedades
                </Button>
              </Link>
            </>
          ) : (
            <div>
              <p className="text-[15px] text-[#F0EDE6] mb-3">
                Propiedades disponibles próximamente
              </p>
              <a
                href={whatsappUrl(WHATSAPP_MSG)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] text-[#C8A96E] hover:text-[#A88848] transition-colors"
              >
                Escribinos al 8381-9331
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0D0D0D] border-t border-[rgba(255,255,255,0.07)] py-[120px]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-[36px] md:text-[52px] font-light text-[#F0EDE6] mb-4 leading-tight"
              style={{ letterSpacing: "-0.025em" }}
            >
              ¿Te interesa<br />una propiedad?
            </h2>
            <p className="text-[15px] text-[#888073] mb-10">
              Escribinos directamente.
            </p>
            <ContactButtons />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
