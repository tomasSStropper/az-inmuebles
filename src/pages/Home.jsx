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
import HeroSection from "../components/HeroSection";

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

function DistrictCardNew({ name, image }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to="/properties"
      style={{ textDecoration: "none", display: "block" }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        {/* Image */}
        <img
          src={image}
          alt={name}
          style={{
            width: "100%",
            height: "260px",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />

        {/* Gradient overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%)"
            : "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%)",
          transition: "background 0.3s ease",
          zIndex: 1,
        }} />

        {/* District name */}
        <p style={{
          position: "absolute",
          bottom: "18px",
          left: "20px",
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
          fontSize: "16px",
          color: "#F0EDE6",
          letterSpacing: "0.04em",
          margin: 0,
          zIndex: 2,
        }}>
          {name}
        </p>

        {/* Arrow */}
        <span style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          color: "#2D5A40",
          fontSize: "16px",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(4px)" : "translateX(0)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          zIndex: 2,
        }}>
          →
        </span>
      </div>
    </Link>
  );
}

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
      <HeroSection />

      {/* ── Districts ── */}
      <section style={{ background: "#0D0D0D", padding: "120px 6vw" }}>
        {/* Header */}
        <p style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "10px",
          letterSpacing: "0.25em",
          color: "#2D5A40",
          textTransform: "uppercase",
          marginBottom: "16px",
          marginTop: 0,
        }}>
          ZONAS · COTO BRUS
        </p>
        <h2 style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 300,
          fontSize: "42px",
          color: "#F0EDE6",
          letterSpacing: "-0.02em",
          margin: 0,
        }}>
          Explorá los distritos
        </h2>
        <div style={{
          width: "100%",
          height: "1px",
          background: "rgba(255,255,255,0.06)",
          margin: "40px 0",
        }} />

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2px",
        }} className="districts-grid">
          {districtData.map((district) => (
            <DistrictCardNew
              key={district.name}
              name={district.name}
              image={district.image}
            />
          ))}
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
                className="text-[15px] text-[#2D5A40] hover:opacity-75 transition-opacity"
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
