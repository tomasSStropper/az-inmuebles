import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { MapPin, ArrowRight } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

export default function DistrictCard({ district, image }) {
  const { t } = useTranslation();
  const [imgError, setImgError] = React.useState(false);

  return (
    <Link to={createPageUrl(`Properties?district=${encodeURIComponent(district)}`)}>
      <div className="group overflow-hidden rounded-2xl bg-white shadow-sm border border-[var(--border)] hover:shadow-xl hover:border-[#B07D3A] transition-all duration-400 h-full">
        <div className="relative h-60 overflow-hidden">
          {!imgError ? (
            <img
              src={image}
              alt={`${t("districtCard.altPrefix")} ${district}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
              loading="lazy"
              decoding="async"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full bg-[var(--bg-secondary)] flex items-center justify-center">
              <MapPin className="w-14 h-14 text-[#B07D3A]/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="font-playfair text-xl font-semibold text-white leading-tight">
              {district}
            </h3>
          </div>
        </div>
        <div className="px-5 py-4 flex items-center justify-between">
          <span className="text-sm font-medium text-[#B07D3A] font-inter">
            {t("districtCard.explore")}
          </span>
          <ArrowRight className="w-4 h-4 text-[#B07D3A] group-hover:translate-x-1.5 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
}
