import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Ruler } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

export default function PropertyCard({ property }) {
  const { t } = useTranslation();

  const formatPrice = (price) =>
    new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);

  const formatArea = (size, unit) =>
    size ? `${size.toLocaleString("es-CR")} ${unit || "m²"}` : null;

  const mainImage =
    property.images?.[0] ||
    "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop";

  return (
    <div className="group overflow-hidden rounded bg-[#1C1C1C] border border-[rgba(255,255,255,0.05)] hover:border-[rgba(45,90,64,0.4)] transition-colors duration-300 h-full flex flex-col">
      <div className="relative h-52 overflow-hidden">
        <img
          src={mainImage}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          decoding="async"
        />
        {property.property_type && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-black/70 text-[#F0EDE6]">
              {property.property_type}
            </span>
          </div>
        )}
      </div>

      <CardContent className="p-5 flex-1 flex flex-col gap-3">
        <div>
          <h3 className="font-medium text-sm text-[#F0EDE6] line-clamp-2 leading-snug">
            {property.title}
          </h3>
          <p className="text-xs text-[#888073] mt-1">
            {property.neighborhood ? `${property.neighborhood}, ` : ""}
            {property.district}
          </p>
        </div>

        {(property.bedrooms || property.bathrooms || property.land_size) && (
          <div className="flex gap-4 text-xs text-[#888073]">
            {property.bedrooms && (
              <span className="flex items-center gap-1">
                <Bed className="w-3.5 h-3.5" />
                {property.bedrooms}
              </span>
            )}
            {property.bathrooms && (
              <span className="flex items-center gap-1">
                <Bath className="w-3.5 h-3.5" />
                {property.bathrooms}
              </span>
            )}
            {property.land_size && (
              <span className="flex items-center gap-1">
                <Ruler className="w-3.5 h-3.5" />
                {formatArea(property.land_size, property.land_unit)}
              </span>
            )}
          </div>
        )}

        <div className="mt-auto pt-2 border-t border-[rgba(255,255,255,0.06)]">
          <span className="text-lg font-semibold text-[#2D5A40]">
            {formatPrice(property.price_dollars)}
          </span>
          {property.price_colones && (
            <p className="text-xs text-[#888073] mt-0.5">
              ₡{property.price_colones.toLocaleString("es-CR")}
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <Link to={createPageUrl(`PropertyDetail?id=${property.id}`)} className="w-full">
          <Button className="w-full text-xs" size="sm">
            {t("propertyCard.viewDetails")}
          </Button>
        </Link>
      </CardFooter>
    </div>
  );
}
