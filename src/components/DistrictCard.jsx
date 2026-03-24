import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useTranslation } from "@/i18n/LanguageContext";

export default function DistrictCard({ district, image }) {
  const { t } = useTranslation();
  const [imgError, setImgError] = React.useState(false);

  return (
    <Link to={createPageUrl(`Properties?district=${encodeURIComponent(district)}`)}>
      <div className="group overflow-hidden rounded bg-[#1C1C1C] border border-[rgba(255,255,255,0.05)] hover:border-[rgba(45,90,64,0.5)] transition-colors duration-300">
        <div className="relative h-52 overflow-hidden">
          {!imgError ? (
            <img
              src={image}
              alt={`${t("districtCard.altPrefix")} ${district}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              decoding="async"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full bg-[#1C1C1C] flex items-center justify-center">
              <span className="text-[#888073] text-sm">{district}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div className="px-4 py-3">
          <p className="text-sm font-normal text-[#F0EDE6]">{district}</p>
        </div>
      </div>
    </Link>
  );
}
