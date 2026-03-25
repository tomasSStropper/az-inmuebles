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
