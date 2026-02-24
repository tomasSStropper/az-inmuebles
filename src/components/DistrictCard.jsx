import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card } from "@/components/ui/card";
import { MapPin, ArrowRight } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

export default function DistrictCard({ district, image, description }) {
  const { t } = useTranslation();

  return (
    <Link to={createPageUrl(`Properties?district=${encodeURIComponent(district)}`)}>
      <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 h-full border-2 border-[var(--accent-border)] hover:border-[#C46542]">
        <div className="relative h-64 overflow-hidden">
          <img
            src={image}
            alt={`${t("districtCard.altPrefix")} ${district}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-[#C46542] rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">{district}</h3>
            </div>
            {description && (
              <p className="text-white/90 text-sm line-clamp-2 mb-2">{description}</p>
            )}
          </div>
        </div>
        <div className="p-5 bg-[var(--bg-elev)] group-hover:bg-[var(--primary-50)] transition-colors">
          <div className="flex items-center justify-between text-[#C46542] font-semibold">
            <span>{t("districtCard.explore")}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
