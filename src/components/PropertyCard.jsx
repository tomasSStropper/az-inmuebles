import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Ruler, ArrowRight, Sparkles } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

export default function PropertyCard({ property }) {
  const { t } = useTranslation();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatArea = (size, unit) => {
    if (!size) return null;
    return `${size.toLocaleString("es-CR")} ${unit || "m²"}`;
  };

  const mainImage =
    property.images?.[0] ||
    "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop";

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-sm border border-[var(--border)] hover:shadow-xl hover:border-[#B07D3A] transition-all duration-300 h-full flex flex-col">
      <div className="relative h-56 overflow-hidden">
        <img
          src={mainImage}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {property.featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#B07D3A] text-white text-xs font-semibold shadow-md">
              <Sparkles className="w-3 h-3" />
              {t("propertyCard.featured")}
            </span>
          </div>
        )}
        {property.property_type && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[var(--text)] text-xs font-semibold shadow-sm">
              {property.property_type}
            </span>
          </div>
        )}
      </div>

      <CardContent className="p-5 flex-1 flex flex-col">
        <h3 className="font-playfair font-semibold text-lg text-[var(--text)] line-clamp-2 mb-2 group-hover:text-[#B07D3A] transition-colors">
          {property.title}
        </h3>

        <div className="flex items-center gap-1.5 text-[var(--muted)] mb-4">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-[#B07D3A]" />
          <span className="text-sm font-inter">
            {property.neighborhood ? `${property.neighborhood}, ` : ""}
            {property.district}
          </span>
        </div>

        <div className="flex flex-wrap gap-3 mb-4 pb-4 border-b border-[var(--border)]">
          {property.bedrooms && (
            <div className="flex items-center gap-1.5 text-sm text-[var(--muted)]">
              <Bed className="w-4 h-4 text-[#B07D3A]" />
              <span className="font-medium">{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center gap-1.5 text-sm text-[var(--muted)]">
              <Bath className="w-4 h-4 text-[#B07D3A]" />
              <span className="font-medium">{property.bathrooms}</span>
            </div>
          )}
          {property.land_size && (
            <div className="flex items-center gap-1.5 text-sm text-[var(--muted)]">
              <Ruler className="w-4 h-4 text-[#B07D3A]" />
              <span className="font-medium">
                {formatArea(property.land_size, property.land_unit)}
              </span>
            </div>
          )}
        </div>

        {property.tags && property.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {property.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full text-xs border border-[#B07D3A]/30 text-[#B07D3A] bg-[rgba(176,125,58,0.06)] font-inter"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-3">
          <span className="font-playfair text-2xl font-bold text-[#B07D3A]">
            {formatPrice(property.price_dollars)}
          </span>
          {property.price_colones && (
            <p className="text-xs text-[var(--muted)] mt-0.5 font-inter">
              ₡{property.price_colones.toLocaleString("es-CR")}
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <Link
          to={createPageUrl(`PropertyDetail?id=${property.id}`)}
          className="w-full"
        >
          <Button className="w-full gap-2 group-hover:gap-3 transition-all">
            {t("propertyCard.viewDetails")}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </CardFooter>
    </div>
  );
}
